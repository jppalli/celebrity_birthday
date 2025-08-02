var Hi = Object.defineProperty;
var qi = (e, t, r) => t in e ? Hi(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var E = (e, t, r) => qi(e, typeof t != "symbol" ? t + "" : t, r);
import * as nt from "vscode";
import { g as ji } from "./_commonjsHelpers-DaMA6jEr.js";
import { j as vs, f as dr } from "./initialize-C-lPoOET.js";
import { w as zi } from "./span-B4KfrtSO.js";
import "@opentelemetry/api";
import { T as Vi, l as Wi } from "./errors-ExctlPQy.js";
import "path";
import "os";
import "fs";
import "node-machine-id";
var Gi = /* @__PURE__ */ ((e) => (e.INVALID_AUTH = "INVALID_AUTH", e.INVALID_SSO_AUTH = "INVALID_SSO_AUTH", e.INVALID_IDC_AUTH = "INVALID_IDC_AUTH", e.MISSING_TOKEN = "MISSING_TOKEN", e.MALFORMED_TOKEN = "MALFORMED_TOKEN", e.USER_ENVIRONMENT_ERROR = "USER_ENVIRONMENT_ERROR", e.SERVER_ISSUE = "SERVER_ISSUE", e.UNEXPECTED_ISSUE = "UNEXPECTED_ISSUE", e.CANCELED = "CANCELED", e.ABANDONED = "ABANDONED", e.ACCESS_DENIED = "ACCESS_DENIED", e.INVALID_USER_INPUT = "INVALID_USER_INPUT", e.SIGN_IN_BLOCKED = "SIGN_IN_BLOCKED", e))(Gi || {});
class j extends Vi {
  constructor(t, r, n) {
    super(r), this.authErrorType = t, this.userFacingErrorMessage = n, this.name = t;
  }
  /**
   * Creates a new standard Error instance of the user facing message
   */
  toUserFacingError(t) {
    const r = new Error(this.userFacingErrorMessage || t);
    return r.name = this.name, r;
  }
}
class Ki extends j {
  constructor(t, r) {
    super("MISSING_TOKEN", t, r);
  }
}
class Ji extends j {
  constructor(t, r) {
    super("MALFORMED_TOKEN", t, r);
  }
}
class ye extends j {
  constructor(t, r) {
    super("INVALID_AUTH", t, r);
  }
}
class Ee extends j {
  constructor(t) {
    super(
      "INVALID_SSO_AUTH",
      t,
      "Authentication with IAM Identity Center failed. Please verify you have an active Q Developer Pro subscription. For more information: https://kiro.dev/docs/reference/troubleshooting/#aws-iam-identity-center-issues"
    );
  }
}
class Xi extends j {
  constructor(t, r) {
    super("INVALID_IDC_AUTH", t, r);
  }
}
class ht extends j {
  constructor(t, r) {
    super("USER_ENVIRONMENT_ERROR", t, r);
  }
}
class lr extends ht {
  constructor(t, r) {
    super(t, r || "Operation failed due to network connectivity issues. Please verify your network connection, firewall settings, or proxy configuration that might be blocking the connection.");
  }
}
class hh extends ht {
  constructor(t) {
    super(
      "Failed to access file system path",
      `Unable to access path: ${t}. Please verify that your user account has sufficient permissions for this location.`
    );
  }
}
class Qt extends j {
  constructor(t, r) {
    super("SERVER_ISSUE", t, r);
  }
}
class le extends j {
  constructor(t, r) {
    super("UNEXPECTED_ISSUE", t, r);
  }
}
let ph = class extends j {
  constructor(t, r) {
    super("CANCELED", t, r);
  }
};
class yh extends j {
  constructor() {
    super(
      "ABANDONED",
      "Timed-out waiting for browser login flow to complete",
      "Authentication session timed out. Please try signing in again."
    );
  }
}
class gh extends j {
  constructor(t, r) {
    super("ACCESS_DENIED", t, r);
  }
}
class Cs extends j {
  constructor(t, r) {
    super("INVALID_USER_INPUT", t, r);
  }
}
class Qi extends Cs {
  constructor() {
    super(
      "Invalid start URL provided",
      "The start URL you entered is invalid. Please verify the URL format and try again."
    );
  }
}
class _s extends j {
  constructor(t) {
    super("SIGN_IN_BLOCKED", t);
  }
}
class wh extends le {
  /** Constructs a new MissingPortError */
  constructor() {
    super("AuthSSOServer: missing auth server port");
  }
}
class Eh extends ye {
  /** Constructs a new MissingCodeError */
  constructor() {
    super("AuthSSOServer: missing code", "Authentication failed: Please try signing in again.");
  }
}
class Sh extends ye {
  /** Constructs a new MissingStateError */
  constructor() {
    super("AuthSSOServer: missing state", "Authentication failed: Please try signing in again.");
  }
}
class bh extends ye {
  /** Constructs a new InvalidStateError */
  constructor() {
    super("AuthSSOServer: invalid state", "Authentication failed: Please try signing in again.");
  }
}
class Rh extends ye {
  constructor() {
    super(
      "Access denied through identity provider",
      "Authentication failed: The identity provider denied access to Kiro. Please ensure you grant all required permissions."
    );
  }
}
class Ah extends ye {
  constructor(t) {
    super(
      `Failure from identity provider: ${t}`,
      `Authentication failed: The identity provider reported an error: ${t}`
    );
  }
}
class Th extends le {
  /** Constructs a new ServerTimeoutError */
  constructor() {
    super("AuthSSOServer: local server did not initiate within time limit.");
  }
}
class vh extends lr {
  constructor(t, r = []) {
    super(`AuthSSOServer: failed to listen to server. Tried ports: ${JSON.stringify(r)}. Cause: ${t}`);
  }
}
class xs extends lr {
  constructor(t) {
    var i;
    const r = ["EAI_AGAIN", "ENOTFOUND"].map((o) => t.split(o)).find((o) => o.length > 1), n = (i = r == null ? void 0 : r[1]) == null ? void 0 : i.trim(), s = n ? `Unable to establish connection to ${n}. Please verify your network connection, firewall settings, or proxy configuration that might be blocking the connection.` : "Unable to establish connection. Please verify your network connection, firewall settings, or proxy configuration that might be blocking the connection.";
    super(`Failed to connect. Cause: ${t}`, s);
  }
}
function Os(e) {
  return e instanceof Ki || e instanceof Ji || e instanceof Xi || e instanceof Ee || e instanceof ye;
}
function Is(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: Yi } = Object.prototype, { getPrototypeOf: fr } = Object, pt = /* @__PURE__ */ ((e) => (t) => {
  const r = Yi.call(t);
  return e[r] || (e[r] = r.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), J = (e) => (e = e.toLowerCase(), (t) => pt(t) === e), mt = (e) => (t) => typeof t === e, { isArray: Te } = Array, Ue = mt("undefined");
function Zi(e) {
  return e !== null && !Ue(e) && e.constructor !== null && !Ue(e.constructor) && H(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const Ds = J("ArrayBuffer");
function eo(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && Ds(e.buffer), t;
}
const to = mt("string"), H = mt("function"), Ps = mt("number"), yt = (e) => e !== null && typeof e == "object", ro = (e) => e === !0 || e === !1, Ye = (e) => {
  if (pt(e) !== "object")
    return !1;
  const t = fr(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}, no = J("Date"), so = J("File"), io = J("Blob"), oo = J("FileList"), ao = (e) => yt(e) && H(e.pipe), co = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || H(e.append) && ((t = pt(e)) === "formdata" || // detect form-data instance
  t === "object" && H(e.toString) && e.toString() === "[object FormData]"));
}, uo = J("URLSearchParams"), [lo, fo, ho, po] = ["ReadableStream", "Request", "Response", "Headers"].map(J), mo = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function He(e, t, { allOwnKeys: r = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let n, s;
  if (typeof e != "object" && (e = [e]), Te(e))
    for (n = 0, s = e.length; n < s; n++)
      t.call(null, e[n], n, e);
  else {
    const i = r ? Object.getOwnPropertyNames(e) : Object.keys(e), o = i.length;
    let a;
    for (n = 0; n < o; n++)
      a = i[n], t.call(null, e[a], a, e);
  }
}
function Ns(e, t) {
  t = t.toLowerCase();
  const r = Object.keys(e);
  let n = r.length, s;
  for (; n-- > 0; )
    if (s = r[n], t === s.toLowerCase())
      return s;
  return null;
}
const ue = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, ks = (e) => !Ue(e) && e !== ue;
function Yt() {
  const { caseless: e } = ks(this) && this || {}, t = {}, r = (n, s) => {
    const i = e && Ns(t, s) || s;
    Ye(t[i]) && Ye(n) ? t[i] = Yt(t[i], n) : Ye(n) ? t[i] = Yt({}, n) : Te(n) ? t[i] = n.slice() : t[i] = n;
  };
  for (let n = 0, s = arguments.length; n < s; n++)
    arguments[n] && He(arguments[n], r);
  return t;
}
const yo = (e, t, r, { allOwnKeys: n } = {}) => (He(t, (s, i) => {
  r && H(s) ? e[i] = Is(s, r) : e[i] = s;
}, { allOwnKeys: n }), e), go = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), wo = (e, t, r, n) => {
  e.prototype = Object.create(t.prototype, n), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), r && Object.assign(e.prototype, r);
}, Eo = (e, t, r, n) => {
  let s, i, o;
  const a = {};
  if (t = t || {}, e == null) return t;
  do {
    for (s = Object.getOwnPropertyNames(e), i = s.length; i-- > 0; )
      o = s[i], (!n || n(o, e, t)) && !a[o] && (t[o] = e[o], a[o] = !0);
    e = r !== !1 && fr(e);
  } while (e && (!r || r(e, t)) && e !== Object.prototype);
  return t;
}, So = (e, t, r) => {
  e = String(e), (r === void 0 || r > e.length) && (r = e.length), r -= t.length;
  const n = e.indexOf(t, r);
  return n !== -1 && n === r;
}, bo = (e) => {
  if (!e) return null;
  if (Te(e)) return e;
  let t = e.length;
  if (!Ps(t)) return null;
  const r = new Array(t);
  for (; t-- > 0; )
    r[t] = e[t];
  return r;
}, Ro = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && fr(Uint8Array)), Ao = (e, t) => {
  const n = (e && e[Symbol.iterator]).call(e);
  let s;
  for (; (s = n.next()) && !s.done; ) {
    const i = s.value;
    t.call(e, i[0], i[1]);
  }
}, To = (e, t) => {
  let r;
  const n = [];
  for (; (r = e.exec(t)) !== null; )
    n.push(r);
  return n;
}, vo = J("HTMLFormElement"), Co = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(r, n, s) {
    return n.toUpperCase() + s;
  }
), Nr = (({ hasOwnProperty: e }) => (t, r) => e.call(t, r))(Object.prototype), _o = J("RegExp"), Ms = (e, t) => {
  const r = Object.getOwnPropertyDescriptors(e), n = {};
  He(r, (s, i) => {
    let o;
    (o = t(s, i, e)) !== !1 && (n[i] = o || s);
  }), Object.defineProperties(e, n);
}, xo = (e) => {
  Ms(e, (t, r) => {
    if (H(e) && ["arguments", "caller", "callee"].indexOf(r) !== -1)
      return !1;
    const n = e[r];
    if (H(n)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + r + "'");
      });
    }
  });
}, Oo = (e, t) => {
  const r = {}, n = (s) => {
    s.forEach((i) => {
      r[i] = !0;
    });
  };
  return Te(e) ? n(e) : n(String(e).split(t)), r;
}, Io = () => {
}, Do = (e, t) => e != null && Number.isFinite(e = +e) ? e : t;
function Po(e) {
  return !!(e && H(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator]);
}
const No = (e) => {
  const t = new Array(10), r = (n, s) => {
    if (yt(n)) {
      if (t.indexOf(n) >= 0)
        return;
      if (!("toJSON" in n)) {
        t[s] = n;
        const i = Te(n) ? [] : {};
        return He(n, (o, a) => {
          const u = r(o, s + 1);
          !Ue(u) && (i[a] = u);
        }), t[s] = void 0, i;
      }
    }
    return n;
  };
  return r(e, 0);
}, ko = J("AsyncFunction"), Mo = (e) => e && (yt(e) || H(e)) && H(e.then) && H(e.catch), Us = ((e, t) => e ? setImmediate : t ? ((r, n) => (ue.addEventListener("message", ({ source: s, data: i }) => {
  s === ue && i === r && n.length && n.shift()();
}, !1), (s) => {
  n.push(s), ue.postMessage(r, "*");
}))(`axios@${Math.random()}`, []) : (r) => setTimeout(r))(
  typeof setImmediate == "function",
  H(ue.postMessage)
), Uo = typeof queueMicrotask < "u" ? queueMicrotask.bind(ue) : typeof process < "u" && process.nextTick || Us, p = {
  isArray: Te,
  isArrayBuffer: Ds,
  isBuffer: Zi,
  isFormData: co,
  isArrayBufferView: eo,
  isString: to,
  isNumber: Ps,
  isBoolean: ro,
  isObject: yt,
  isPlainObject: Ye,
  isReadableStream: lo,
  isRequest: fo,
  isResponse: ho,
  isHeaders: po,
  isUndefined: Ue,
  isDate: no,
  isFile: so,
  isBlob: io,
  isRegExp: _o,
  isFunction: H,
  isStream: ao,
  isURLSearchParams: uo,
  isTypedArray: Ro,
  isFileList: oo,
  forEach: He,
  merge: Yt,
  extend: yo,
  trim: mo,
  stripBOM: go,
  inherits: wo,
  toFlatObject: Eo,
  kindOf: pt,
  kindOfTest: J,
  endsWith: So,
  toArray: bo,
  forEachEntry: Ao,
  matchAll: To,
  isHTMLForm: vo,
  hasOwnProperty: Nr,
  hasOwnProp: Nr,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: Ms,
  freezeMethods: xo,
  toObjectSet: Oo,
  toCamelCase: Co,
  noop: Io,
  toFiniteNumber: Do,
  findKey: Ns,
  global: ue,
  isContextDefined: ks,
  isSpecCompliantForm: Po,
  toJSONObject: No,
  isAsyncFn: ko,
  isThenable: Mo,
  setImmediate: Us,
  asap: Uo
};
function A(e, t, r, n, s) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), r && (this.config = r), n && (this.request = n), s && (this.response = s, this.status = s.status ? s.status : null);
}
p.inherits(A, Error, {
  toJSON: function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: p.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const $s = A.prototype, Ls = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((e) => {
  Ls[e] = { value: e };
});
Object.defineProperties(A, Ls);
Object.defineProperty($s, "isAxiosError", { value: !0 });
A.from = (e, t, r, n, s, i) => {
  const o = Object.create($s);
  return p.toFlatObject(e, o, function(u) {
    return u !== Error.prototype;
  }, (a) => a !== "isAxiosError"), A.call(o, e.message, t, r, n, s), o.cause = e, o.name = e.name, i && Object.assign(o, i), o;
};
const $o = null;
function Zt(e) {
  return p.isPlainObject(e) || p.isArray(e);
}
function Fs(e) {
  return p.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function kr(e, t, r) {
  return e ? e.concat(t).map(function(s, i) {
    return s = Fs(s), !r && i ? "[" + s + "]" : s;
  }).join(r ? "." : "") : t;
}
function Lo(e) {
  return p.isArray(e) && !e.some(Zt);
}
const Fo = p.toFlatObject(p, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function gt(e, t, r) {
  if (!p.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), r = p.toFlatObject(r, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(w, m) {
    return !p.isUndefined(m[w]);
  });
  const n = r.metaTokens, s = r.visitor || d, i = r.dots, o = r.indexes, u = (r.Blob || typeof Blob < "u" && Blob) && p.isSpecCompliantForm(t);
  if (!p.isFunction(s))
    throw new TypeError("visitor must be a function");
  function c(y) {
    if (y === null) return "";
    if (p.isDate(y))
      return y.toISOString();
    if (!u && p.isBlob(y))
      throw new A("Blob is not supported. Use a Buffer instead.");
    return p.isArrayBuffer(y) || p.isTypedArray(y) ? u && typeof Blob == "function" ? new Blob([y]) : Buffer.from(y) : y;
  }
  function d(y, w, m) {
    let S = y;
    if (y && !m && typeof y == "object") {
      if (p.endsWith(w, "{}"))
        w = n ? w : w.slice(0, -2), y = JSON.stringify(y);
      else if (p.isArray(y) && Lo(y) || (p.isFileList(y) || p.endsWith(w, "[]")) && (S = p.toArray(y)))
        return w = Fs(w), S.forEach(function(T, v) {
          !(p.isUndefined(T) || T === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            o === !0 ? kr([w], v, i) : o === null ? w : w + "[]",
            c(T)
          );
        }), !1;
    }
    return Zt(y) ? !0 : (t.append(kr(m, w, i), c(y)), !1);
  }
  const l = [], f = Object.assign(Fo, {
    defaultVisitor: d,
    convertValue: c,
    isVisitable: Zt
  });
  function h(y, w) {
    if (!p.isUndefined(y)) {
      if (l.indexOf(y) !== -1)
        throw Error("Circular reference detected in " + w.join("."));
      l.push(y), p.forEach(y, function(S, b) {
        (!(p.isUndefined(S) || S === null) && s.call(
          t,
          S,
          p.isString(b) ? b.trim() : b,
          w,
          f
        )) === !0 && h(S, w ? w.concat(b) : [b]);
      }), l.pop();
    }
  }
  if (!p.isObject(e))
    throw new TypeError("data must be an object");
  return h(e), t;
}
function Mr(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(n) {
    return t[n];
  });
}
function hr(e, t) {
  this._pairs = [], e && gt(e, this, t);
}
const Bs = hr.prototype;
Bs.append = function(t, r) {
  this._pairs.push([t, r]);
};
Bs.toString = function(t) {
  const r = t ? function(n) {
    return t.call(this, n, Mr);
  } : Mr;
  return this._pairs.map(function(s) {
    return r(s[0]) + "=" + r(s[1]);
  }, "").join("&");
};
function Bo(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function Hs(e, t, r) {
  if (!t)
    return e;
  const n = r && r.encode || Bo;
  p.isFunction(r) && (r = {
    serialize: r
  });
  const s = r && r.serialize;
  let i;
  if (s ? i = s(t, r) : i = p.isURLSearchParams(t) ? t.toString() : new hr(t, r).toString(n), i) {
    const o = e.indexOf("#");
    o !== -1 && (e = e.slice(0, o)), e += (e.indexOf("?") === -1 ? "?" : "&") + i;
  }
  return e;
}
class Ur {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(t, r, n) {
    return this.handlers.push({
      fulfilled: t,
      rejected: r,
      synchronous: n ? n.synchronous : !1,
      runWhen: n ? n.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(t) {
    p.forEach(this.handlers, function(n) {
      n !== null && t(n);
    });
  }
}
const qs = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, Ho = typeof URLSearchParams < "u" ? URLSearchParams : hr, qo = typeof FormData < "u" ? FormData : null, jo = typeof Blob < "u" ? Blob : null, zo = {
  isBrowser: !0,
  classes: {
    URLSearchParams: Ho,
    FormData: qo,
    Blob: jo
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, pr = typeof window < "u" && typeof document < "u", er = typeof navigator == "object" && navigator || void 0, Vo = pr && (!er || ["ReactNative", "NativeScript", "NS"].indexOf(er.product) < 0), Wo = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", Go = pr && window.location.href || "http://localhost", Ko = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: pr,
  hasStandardBrowserEnv: Vo,
  hasStandardBrowserWebWorkerEnv: Wo,
  navigator: er,
  origin: Go
}, Symbol.toStringTag, { value: "Module" })), U = {
  ...Ko,
  ...zo
};
function Jo(e, t) {
  return gt(e, new U.classes.URLSearchParams(), Object.assign({
    visitor: function(r, n, s, i) {
      return U.isNode && p.isBuffer(r) ? (this.append(n, r.toString("base64")), !1) : i.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function Xo(e) {
  return p.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function Qo(e) {
  const t = {}, r = Object.keys(e);
  let n;
  const s = r.length;
  let i;
  for (n = 0; n < s; n++)
    i = r[n], t[i] = e[i];
  return t;
}
function js(e) {
  function t(r, n, s, i) {
    let o = r[i++];
    if (o === "__proto__") return !0;
    const a = Number.isFinite(+o), u = i >= r.length;
    return o = !o && p.isArray(s) ? s.length : o, u ? (p.hasOwnProp(s, o) ? s[o] = [s[o], n] : s[o] = n, !a) : ((!s[o] || !p.isObject(s[o])) && (s[o] = []), t(r, n, s[o], i) && p.isArray(s[o]) && (s[o] = Qo(s[o])), !a);
  }
  if (p.isFormData(e) && p.isFunction(e.entries)) {
    const r = {};
    return p.forEachEntry(e, (n, s) => {
      t(Xo(n), s, r, 0);
    }), r;
  }
  return null;
}
function Yo(e, t, r) {
  if (p.isString(e))
    try {
      return (t || JSON.parse)(e), p.trim(e);
    } catch (n) {
      if (n.name !== "SyntaxError")
        throw n;
    }
  return (r || JSON.stringify)(e);
}
const qe = {
  transitional: qs,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(t, r) {
    const n = r.getContentType() || "", s = n.indexOf("application/json") > -1, i = p.isObject(t);
    if (i && p.isHTMLForm(t) && (t = new FormData(t)), p.isFormData(t))
      return s ? JSON.stringify(js(t)) : t;
    if (p.isArrayBuffer(t) || p.isBuffer(t) || p.isStream(t) || p.isFile(t) || p.isBlob(t) || p.isReadableStream(t))
      return t;
    if (p.isArrayBufferView(t))
      return t.buffer;
    if (p.isURLSearchParams(t))
      return r.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let a;
    if (i) {
      if (n.indexOf("application/x-www-form-urlencoded") > -1)
        return Jo(t, this.formSerializer).toString();
      if ((a = p.isFileList(t)) || n.indexOf("multipart/form-data") > -1) {
        const u = this.env && this.env.FormData;
        return gt(
          a ? { "files[]": t } : t,
          u && new u(),
          this.formSerializer
        );
      }
    }
    return i || s ? (r.setContentType("application/json", !1), Yo(t)) : t;
  }],
  transformResponse: [function(t) {
    const r = this.transitional || qe.transitional, n = r && r.forcedJSONParsing, s = this.responseType === "json";
    if (p.isResponse(t) || p.isReadableStream(t))
      return t;
    if (t && p.isString(t) && (n && !this.responseType || s)) {
      const o = !(r && r.silentJSONParsing) && s;
      try {
        return JSON.parse(t);
      } catch (a) {
        if (o)
          throw a.name === "SyntaxError" ? A.from(a, A.ERR_BAD_RESPONSE, this, null, this.response) : a;
      }
    }
    return t;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: U.classes.FormData,
    Blob: U.classes.Blob
  },
  validateStatus: function(t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
p.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  qe.headers[e] = {};
});
const Zo = p.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), ea = (e) => {
  const t = {};
  let r, n, s;
  return e && e.split(`
`).forEach(function(o) {
    s = o.indexOf(":"), r = o.substring(0, s).trim().toLowerCase(), n = o.substring(s + 1).trim(), !(!r || t[r] && Zo[r]) && (r === "set-cookie" ? t[r] ? t[r].push(n) : t[r] = [n] : t[r] = t[r] ? t[r] + ", " + n : n);
  }), t;
}, $r = Symbol("internals");
function xe(e) {
  return e && String(e).trim().toLowerCase();
}
function Ze(e) {
  return e === !1 || e == null ? e : p.isArray(e) ? e.map(Ze) : String(e);
}
function ta(e) {
  const t = /* @__PURE__ */ Object.create(null), r = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let n;
  for (; n = r.exec(e); )
    t[n[1]] = n[2];
  return t;
}
const ra = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function Lt(e, t, r, n, s) {
  if (p.isFunction(n))
    return n.call(this, t, r);
  if (s && (t = r), !!p.isString(t)) {
    if (p.isString(n))
      return t.indexOf(n) !== -1;
    if (p.isRegExp(n))
      return n.test(t);
  }
}
function na(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, r, n) => r.toUpperCase() + n);
}
function sa(e, t) {
  const r = p.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((n) => {
    Object.defineProperty(e, n + r, {
      value: function(s, i, o) {
        return this[n].call(this, t, s, i, o);
      },
      configurable: !0
    });
  });
}
let B = class {
  constructor(t) {
    t && this.set(t);
  }
  set(t, r, n) {
    const s = this;
    function i(a, u, c) {
      const d = xe(u);
      if (!d)
        throw new Error("header name must be a non-empty string");
      const l = p.findKey(s, d);
      (!l || s[l] === void 0 || c === !0 || c === void 0 && s[l] !== !1) && (s[l || u] = Ze(a));
    }
    const o = (a, u) => p.forEach(a, (c, d) => i(c, d, u));
    if (p.isPlainObject(t) || t instanceof this.constructor)
      o(t, r);
    else if (p.isString(t) && (t = t.trim()) && !ra(t))
      o(ea(t), r);
    else if (p.isHeaders(t))
      for (const [a, u] of t.entries())
        i(u, a, n);
    else
      t != null && i(r, t, n);
    return this;
  }
  get(t, r) {
    if (t = xe(t), t) {
      const n = p.findKey(this, t);
      if (n) {
        const s = this[n];
        if (!r)
          return s;
        if (r === !0)
          return ta(s);
        if (p.isFunction(r))
          return r.call(this, s, n);
        if (p.isRegExp(r))
          return r.exec(s);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, r) {
    if (t = xe(t), t) {
      const n = p.findKey(this, t);
      return !!(n && this[n] !== void 0 && (!r || Lt(this, this[n], n, r)));
    }
    return !1;
  }
  delete(t, r) {
    const n = this;
    let s = !1;
    function i(o) {
      if (o = xe(o), o) {
        const a = p.findKey(n, o);
        a && (!r || Lt(n, n[a], a, r)) && (delete n[a], s = !0);
      }
    }
    return p.isArray(t) ? t.forEach(i) : i(t), s;
  }
  clear(t) {
    const r = Object.keys(this);
    let n = r.length, s = !1;
    for (; n--; ) {
      const i = r[n];
      (!t || Lt(this, this[i], i, t, !0)) && (delete this[i], s = !0);
    }
    return s;
  }
  normalize(t) {
    const r = this, n = {};
    return p.forEach(this, (s, i) => {
      const o = p.findKey(n, i);
      if (o) {
        r[o] = Ze(s), delete r[i];
        return;
      }
      const a = t ? na(i) : String(i).trim();
      a !== i && delete r[i], r[a] = Ze(s), n[a] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const r = /* @__PURE__ */ Object.create(null);
    return p.forEach(this, (n, s) => {
      n != null && n !== !1 && (r[s] = t && p.isArray(n) ? n.join(", ") : n);
    }), r;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, r]) => t + ": " + r).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...r) {
    const n = new this(t);
    return r.forEach((s) => n.set(s)), n;
  }
  static accessor(t) {
    const n = (this[$r] = this[$r] = {
      accessors: {}
    }).accessors, s = this.prototype;
    function i(o) {
      const a = xe(o);
      n[a] || (sa(s, o), n[a] = !0);
    }
    return p.isArray(t) ? t.forEach(i) : i(t), this;
  }
};
B.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
p.reduceDescriptors(B.prototype, ({ value: e }, t) => {
  let r = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(n) {
      this[r] = n;
    }
  };
});
p.freezeMethods(B);
function Ft(e, t) {
  const r = this || qe, n = t || r, s = B.from(n.headers);
  let i = n.data;
  return p.forEach(e, function(a) {
    i = a.call(r, i, s.normalize(), t ? t.status : void 0);
  }), s.normalize(), i;
}
function zs(e) {
  return !!(e && e.__CANCEL__);
}
function ve(e, t, r) {
  A.call(this, e ?? "canceled", A.ERR_CANCELED, t, r), this.name = "CanceledError";
}
p.inherits(ve, A, {
  __CANCEL__: !0
});
function Vs(e, t, r) {
  const n = r.config.validateStatus;
  !r.status || !n || n(r.status) ? e(r) : t(new A(
    "Request failed with status code " + r.status,
    [A.ERR_BAD_REQUEST, A.ERR_BAD_RESPONSE][Math.floor(r.status / 100) - 4],
    r.config,
    r.request,
    r
  ));
}
function ia(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function oa(e, t) {
  e = e || 10;
  const r = new Array(e), n = new Array(e);
  let s = 0, i = 0, o;
  return t = t !== void 0 ? t : 1e3, function(u) {
    const c = Date.now(), d = n[i];
    o || (o = c), r[s] = u, n[s] = c;
    let l = i, f = 0;
    for (; l !== s; )
      f += r[l++], l = l % e;
    if (s = (s + 1) % e, s === i && (i = (i + 1) % e), c - o < t)
      return;
    const h = d && c - d;
    return h ? Math.round(f * 1e3 / h) : void 0;
  };
}
function aa(e, t) {
  let r = 0, n = 1e3 / t, s, i;
  const o = (c, d = Date.now()) => {
    r = d, s = null, i && (clearTimeout(i), i = null), e.apply(null, c);
  };
  return [(...c) => {
    const d = Date.now(), l = d - r;
    l >= n ? o(c, d) : (s = c, i || (i = setTimeout(() => {
      i = null, o(s);
    }, n - l)));
  }, () => s && o(s)];
}
const st = (e, t, r = 3) => {
  let n = 0;
  const s = oa(50, 250);
  return aa((i) => {
    const o = i.loaded, a = i.lengthComputable ? i.total : void 0, u = o - n, c = s(u), d = o <= a;
    n = o;
    const l = {
      loaded: o,
      total: a,
      progress: a ? o / a : void 0,
      bytes: u,
      rate: c || void 0,
      estimated: c && a && d ? (a - o) / c : void 0,
      event: i,
      lengthComputable: a != null,
      [t ? "download" : "upload"]: !0
    };
    e(l);
  }, r);
}, Lr = (e, t) => {
  const r = e != null;
  return [(n) => t[0]({
    lengthComputable: r,
    total: e,
    loaded: n
  }), t[1]];
}, Fr = (e) => (...t) => p.asap(() => e(...t)), ca = U.hasStandardBrowserEnv ? /* @__PURE__ */ ((e, t) => (r) => (r = new URL(r, U.origin), e.protocol === r.protocol && e.host === r.host && (t || e.port === r.port)))(
  new URL(U.origin),
  U.navigator && /(msie|trident)/i.test(U.navigator.userAgent)
) : () => !0, ua = U.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, t, r, n, s, i) {
      const o = [e + "=" + encodeURIComponent(t)];
      p.isNumber(r) && o.push("expires=" + new Date(r).toGMTString()), p.isString(n) && o.push("path=" + n), p.isString(s) && o.push("domain=" + s), i === !0 && o.push("secure"), document.cookie = o.join("; ");
    },
    read(e) {
      const t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
      return t ? decodeURIComponent(t[3]) : null;
    },
    remove(e) {
      this.write(e, "", Date.now() - 864e5);
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function da(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function la(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function Ws(e, t, r) {
  let n = !da(t);
  return e && (n || r == !1) ? la(e, t) : t;
}
const Br = (e) => e instanceof B ? { ...e } : e;
function me(e, t) {
  t = t || {};
  const r = {};
  function n(c, d, l, f) {
    return p.isPlainObject(c) && p.isPlainObject(d) ? p.merge.call({ caseless: f }, c, d) : p.isPlainObject(d) ? p.merge({}, d) : p.isArray(d) ? d.slice() : d;
  }
  function s(c, d, l, f) {
    if (p.isUndefined(d)) {
      if (!p.isUndefined(c))
        return n(void 0, c, l, f);
    } else return n(c, d, l, f);
  }
  function i(c, d) {
    if (!p.isUndefined(d))
      return n(void 0, d);
  }
  function o(c, d) {
    if (p.isUndefined(d)) {
      if (!p.isUndefined(c))
        return n(void 0, c);
    } else return n(void 0, d);
  }
  function a(c, d, l) {
    if (l in t)
      return n(c, d);
    if (l in e)
      return n(void 0, c);
  }
  const u = {
    url: i,
    method: i,
    data: i,
    baseURL: o,
    transformRequest: o,
    transformResponse: o,
    paramsSerializer: o,
    timeout: o,
    timeoutMessage: o,
    withCredentials: o,
    withXSRFToken: o,
    adapter: o,
    responseType: o,
    xsrfCookieName: o,
    xsrfHeaderName: o,
    onUploadProgress: o,
    onDownloadProgress: o,
    decompress: o,
    maxContentLength: o,
    maxBodyLength: o,
    beforeRedirect: o,
    transport: o,
    httpAgent: o,
    httpsAgent: o,
    cancelToken: o,
    socketPath: o,
    responseEncoding: o,
    validateStatus: a,
    headers: (c, d, l) => s(Br(c), Br(d), l, !0)
  };
  return p.forEach(Object.keys(Object.assign({}, e, t)), function(d) {
    const l = u[d] || s, f = l(e[d], t[d], d);
    p.isUndefined(f) && l !== a || (r[d] = f);
  }), r;
}
const Gs = (e) => {
  const t = me({}, e);
  let { data: r, withXSRFToken: n, xsrfHeaderName: s, xsrfCookieName: i, headers: o, auth: a } = t;
  t.headers = o = B.from(o), t.url = Hs(Ws(t.baseURL, t.url, t.allowAbsoluteUrls), e.params, e.paramsSerializer), a && o.set(
    "Authorization",
    "Basic " + btoa((a.username || "") + ":" + (a.password ? unescape(encodeURIComponent(a.password)) : ""))
  );
  let u;
  if (p.isFormData(r)) {
    if (U.hasStandardBrowserEnv || U.hasStandardBrowserWebWorkerEnv)
      o.setContentType(void 0);
    else if ((u = o.getContentType()) !== !1) {
      const [c, ...d] = u ? u.split(";").map((l) => l.trim()).filter(Boolean) : [];
      o.setContentType([c || "multipart/form-data", ...d].join("; "));
    }
  }
  if (U.hasStandardBrowserEnv && (n && p.isFunction(n) && (n = n(t)), n || n !== !1 && ca(t.url))) {
    const c = s && i && ua.read(i);
    c && o.set(s, c);
  }
  return t;
}, fa = typeof XMLHttpRequest < "u", ha = fa && function(e) {
  return new Promise(function(r, n) {
    const s = Gs(e);
    let i = s.data;
    const o = B.from(s.headers).normalize();
    let { responseType: a, onUploadProgress: u, onDownloadProgress: c } = s, d, l, f, h, y;
    function w() {
      h && h(), y && y(), s.cancelToken && s.cancelToken.unsubscribe(d), s.signal && s.signal.removeEventListener("abort", d);
    }
    let m = new XMLHttpRequest();
    m.open(s.method.toUpperCase(), s.url, !0), m.timeout = s.timeout;
    function S() {
      if (!m)
        return;
      const T = B.from(
        "getAllResponseHeaders" in m && m.getAllResponseHeaders()
      ), C = {
        data: !a || a === "text" || a === "json" ? m.responseText : m.response,
        status: m.status,
        statusText: m.statusText,
        headers: T,
        config: e,
        request: m
      };
      Vs(function(K) {
        r(K), w();
      }, function(K) {
        n(K), w();
      }, C), m = null;
    }
    "onloadend" in m ? m.onloadend = S : m.onreadystatechange = function() {
      !m || m.readyState !== 4 || m.status === 0 && !(m.responseURL && m.responseURL.indexOf("file:") === 0) || setTimeout(S);
    }, m.onabort = function() {
      m && (n(new A("Request aborted", A.ECONNABORTED, e, m)), m = null);
    }, m.onerror = function() {
      n(new A("Network Error", A.ERR_NETWORK, e, m)), m = null;
    }, m.ontimeout = function() {
      let v = s.timeout ? "timeout of " + s.timeout + "ms exceeded" : "timeout exceeded";
      const C = s.transitional || qs;
      s.timeoutErrorMessage && (v = s.timeoutErrorMessage), n(new A(
        v,
        C.clarifyTimeoutError ? A.ETIMEDOUT : A.ECONNABORTED,
        e,
        m
      )), m = null;
    }, i === void 0 && o.setContentType(null), "setRequestHeader" in m && p.forEach(o.toJSON(), function(v, C) {
      m.setRequestHeader(C, v);
    }), p.isUndefined(s.withCredentials) || (m.withCredentials = !!s.withCredentials), a && a !== "json" && (m.responseType = s.responseType), c && ([f, y] = st(c, !0), m.addEventListener("progress", f)), u && m.upload && ([l, h] = st(u), m.upload.addEventListener("progress", l), m.upload.addEventListener("loadend", h)), (s.cancelToken || s.signal) && (d = (T) => {
      m && (n(!T || T.type ? new ve(null, e, m) : T), m.abort(), m = null);
    }, s.cancelToken && s.cancelToken.subscribe(d), s.signal && (s.signal.aborted ? d() : s.signal.addEventListener("abort", d)));
    const b = ia(s.url);
    if (b && U.protocols.indexOf(b) === -1) {
      n(new A("Unsupported protocol " + b + ":", A.ERR_BAD_REQUEST, e));
      return;
    }
    m.send(i || null);
  });
}, pa = (e, t) => {
  const { length: r } = e = e ? e.filter(Boolean) : [];
  if (t || r) {
    let n = new AbortController(), s;
    const i = function(c) {
      if (!s) {
        s = !0, a();
        const d = c instanceof Error ? c : this.reason;
        n.abort(d instanceof A ? d : new ve(d instanceof Error ? d.message : d));
      }
    };
    let o = t && setTimeout(() => {
      o = null, i(new A(`timeout ${t} of ms exceeded`, A.ETIMEDOUT));
    }, t);
    const a = () => {
      e && (o && clearTimeout(o), o = null, e.forEach((c) => {
        c.unsubscribe ? c.unsubscribe(i) : c.removeEventListener("abort", i);
      }), e = null);
    };
    e.forEach((c) => c.addEventListener("abort", i));
    const { signal: u } = n;
    return u.unsubscribe = () => p.asap(a), u;
  }
}, ma = function* (e, t) {
  let r = e.byteLength;
  if (r < t) {
    yield e;
    return;
  }
  let n = 0, s;
  for (; n < r; )
    s = n + t, yield e.slice(n, s), n = s;
}, ya = async function* (e, t) {
  for await (const r of ga(e))
    yield* ma(r, t);
}, ga = async function* (e) {
  if (e[Symbol.asyncIterator]) {
    yield* e;
    return;
  }
  const t = e.getReader();
  try {
    for (; ; ) {
      const { done: r, value: n } = await t.read();
      if (r)
        break;
      yield n;
    }
  } finally {
    await t.cancel();
  }
}, Hr = (e, t, r, n) => {
  const s = ya(e, t);
  let i = 0, o, a = (u) => {
    o || (o = !0, n && n(u));
  };
  return new ReadableStream({
    async pull(u) {
      try {
        const { done: c, value: d } = await s.next();
        if (c) {
          a(), u.close();
          return;
        }
        let l = d.byteLength;
        if (r) {
          let f = i += l;
          r(f);
        }
        u.enqueue(new Uint8Array(d));
      } catch (c) {
        throw a(c), c;
      }
    },
    cancel(u) {
      return a(u), s.return();
    }
  }, {
    highWaterMark: 2
  });
}, wt = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function", Ks = wt && typeof ReadableStream == "function", wa = wt && (typeof TextEncoder == "function" ? /* @__PURE__ */ ((e) => (t) => e.encode(t))(new TextEncoder()) : async (e) => new Uint8Array(await new Response(e).arrayBuffer())), Js = (e, ...t) => {
  try {
    return !!e(...t);
  } catch {
    return !1;
  }
}, Ea = Ks && Js(() => {
  let e = !1;
  const t = new Request(U.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      return e = !0, "half";
    }
  }).headers.has("Content-Type");
  return e && !t;
}), qr = 64 * 1024, tr = Ks && Js(() => p.isReadableStream(new Response("").body)), it = {
  stream: tr && ((e) => e.body)
};
wt && ((e) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((t) => {
    !it[t] && (it[t] = p.isFunction(e[t]) ? (r) => r[t]() : (r, n) => {
      throw new A(`Response type '${t}' is not supported`, A.ERR_NOT_SUPPORT, n);
    });
  });
})(new Response());
const Sa = async (e) => {
  if (e == null)
    return 0;
  if (p.isBlob(e))
    return e.size;
  if (p.isSpecCompliantForm(e))
    return (await new Request(U.origin, {
      method: "POST",
      body: e
    }).arrayBuffer()).byteLength;
  if (p.isArrayBufferView(e) || p.isArrayBuffer(e))
    return e.byteLength;
  if (p.isURLSearchParams(e) && (e = e + ""), p.isString(e))
    return (await wa(e)).byteLength;
}, ba = async (e, t) => {
  const r = p.toFiniteNumber(e.getContentLength());
  return r ?? Sa(t);
}, Ra = wt && (async (e) => {
  let {
    url: t,
    method: r,
    data: n,
    signal: s,
    cancelToken: i,
    timeout: o,
    onDownloadProgress: a,
    onUploadProgress: u,
    responseType: c,
    headers: d,
    withCredentials: l = "same-origin",
    fetchOptions: f
  } = Gs(e);
  c = c ? (c + "").toLowerCase() : "text";
  let h = pa([s, i && i.toAbortSignal()], o), y;
  const w = h && h.unsubscribe && (() => {
    h.unsubscribe();
  });
  let m;
  try {
    if (u && Ea && r !== "get" && r !== "head" && (m = await ba(d, n)) !== 0) {
      let C = new Request(t, {
        method: "POST",
        body: n,
        duplex: "half"
      }), D;
      if (p.isFormData(n) && (D = C.headers.get("content-type")) && d.setContentType(D), C.body) {
        const [K, Ve] = Lr(
          m,
          st(Fr(u))
        );
        n = Hr(C.body, qr, K, Ve);
      }
    }
    p.isString(l) || (l = l ? "include" : "omit");
    const S = "credentials" in Request.prototype;
    y = new Request(t, {
      ...f,
      signal: h,
      method: r.toUpperCase(),
      headers: d.normalize().toJSON(),
      body: n,
      duplex: "half",
      credentials: S ? l : void 0
    });
    let b = await fetch(y);
    const T = tr && (c === "stream" || c === "response");
    if (tr && (a || T && w)) {
      const C = {};
      ["status", "statusText", "headers"].forEach((Pr) => {
        C[Pr] = b[Pr];
      });
      const D = p.toFiniteNumber(b.headers.get("content-length")), [K, Ve] = a && Lr(
        D,
        st(Fr(a), !0)
      ) || [];
      b = new Response(
        Hr(b.body, qr, K, () => {
          Ve && Ve(), w && w();
        }),
        C
      );
    }
    c = c || "text";
    let v = await it[p.findKey(it, c) || "text"](b, e);
    return !T && w && w(), await new Promise((C, D) => {
      Vs(C, D, {
        data: v,
        headers: B.from(b.headers),
        status: b.status,
        statusText: b.statusText,
        config: e,
        request: y
      });
    });
  } catch (S) {
    throw w && w(), S && S.name === "TypeError" && /fetch/i.test(S.message) ? Object.assign(
      new A("Network Error", A.ERR_NETWORK, e, y),
      {
        cause: S.cause || S
      }
    ) : A.from(S, S && S.code, e, y);
  }
}), rr = {
  http: $o,
  xhr: ha,
  fetch: Ra
};
p.forEach(rr, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const jr = (e) => `- ${e}`, Aa = (e) => p.isFunction(e) || e === null || e === !1, Xs = {
  getAdapter: (e) => {
    e = p.isArray(e) ? e : [e];
    const { length: t } = e;
    let r, n;
    const s = {};
    for (let i = 0; i < t; i++) {
      r = e[i];
      let o;
      if (n = r, !Aa(r) && (n = rr[(o = String(r)).toLowerCase()], n === void 0))
        throw new A(`Unknown adapter '${o}'`);
      if (n)
        break;
      s[o || "#" + i] = n;
    }
    if (!n) {
      const i = Object.entries(s).map(
        ([a, u]) => `adapter ${a} ` + (u === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let o = t ? i.length > 1 ? `since :
` + i.map(jr).join(`
`) : " " + jr(i[0]) : "as no adapter specified";
      throw new A(
        "There is no suitable adapter to dispatch the request " + o,
        "ERR_NOT_SUPPORT"
      );
    }
    return n;
  },
  adapters: rr
};
function Bt(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new ve(null, e);
}
function zr(e) {
  return Bt(e), e.headers = B.from(e.headers), e.data = Ft.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), Xs.getAdapter(e.adapter || qe.adapter)(e).then(function(n) {
    return Bt(e), n.data = Ft.call(
      e,
      e.transformResponse,
      n
    ), n.headers = B.from(n.headers), n;
  }, function(n) {
    return zs(n) || (Bt(e), n && n.response && (n.response.data = Ft.call(
      e,
      e.transformResponse,
      n.response
    ), n.response.headers = B.from(n.response.headers))), Promise.reject(n);
  });
}
const Qs = "1.8.4", Et = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  Et[e] = function(n) {
    return typeof n === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const Vr = {};
Et.transitional = function(t, r, n) {
  function s(i, o) {
    return "[Axios v" + Qs + "] Transitional option '" + i + "'" + o + (n ? ". " + n : "");
  }
  return (i, o, a) => {
    if (t === !1)
      throw new A(
        s(o, " has been removed" + (r ? " in " + r : "")),
        A.ERR_DEPRECATED
      );
    return r && !Vr[o] && (Vr[o] = !0, console.warn(
      s(
        o,
        " has been deprecated since v" + r + " and will be removed in the near future"
      )
    )), t ? t(i, o, a) : !0;
  };
};
Et.spelling = function(t) {
  return (r, n) => (console.warn(`${n} is likely a misspelling of ${t}`), !0);
};
function Ta(e, t, r) {
  if (typeof e != "object")
    throw new A("options must be an object", A.ERR_BAD_OPTION_VALUE);
  const n = Object.keys(e);
  let s = n.length;
  for (; s-- > 0; ) {
    const i = n[s], o = t[i];
    if (o) {
      const a = e[i], u = a === void 0 || o(a, i, e);
      if (u !== !0)
        throw new A("option " + i + " must be " + u, A.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (r !== !0)
      throw new A("Unknown option " + i, A.ERR_BAD_OPTION);
  }
}
const et = {
  assertOptions: Ta,
  validators: Et
}, X = et.validators;
let fe = class {
  constructor(t) {
    this.defaults = t, this.interceptors = {
      request: new Ur(),
      response: new Ur()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(t, r) {
    try {
      return await this._request(t, r);
    } catch (n) {
      if (n instanceof Error) {
        let s = {};
        Error.captureStackTrace ? Error.captureStackTrace(s) : s = new Error();
        const i = s.stack ? s.stack.replace(/^.+\n/, "") : "";
        try {
          n.stack ? i && !String(n.stack).endsWith(i.replace(/^.+\n.+\n/, "")) && (n.stack += `
` + i) : n.stack = i;
        } catch {
        }
      }
      throw n;
    }
  }
  _request(t, r) {
    typeof t == "string" ? (r = r || {}, r.url = t) : r = t || {}, r = me(this.defaults, r);
    const { transitional: n, paramsSerializer: s, headers: i } = r;
    n !== void 0 && et.assertOptions(n, {
      silentJSONParsing: X.transitional(X.boolean),
      forcedJSONParsing: X.transitional(X.boolean),
      clarifyTimeoutError: X.transitional(X.boolean)
    }, !1), s != null && (p.isFunction(s) ? r.paramsSerializer = {
      serialize: s
    } : et.assertOptions(s, {
      encode: X.function,
      serialize: X.function
    }, !0)), r.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? r.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : r.allowAbsoluteUrls = !0), et.assertOptions(r, {
      baseUrl: X.spelling("baseURL"),
      withXsrfToken: X.spelling("withXSRFToken")
    }, !0), r.method = (r.method || this.defaults.method || "get").toLowerCase();
    let o = i && p.merge(
      i.common,
      i[r.method]
    );
    i && p.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (y) => {
        delete i[y];
      }
    ), r.headers = B.concat(o, i);
    const a = [];
    let u = !0;
    this.interceptors.request.forEach(function(w) {
      typeof w.runWhen == "function" && w.runWhen(r) === !1 || (u = u && w.synchronous, a.unshift(w.fulfilled, w.rejected));
    });
    const c = [];
    this.interceptors.response.forEach(function(w) {
      c.push(w.fulfilled, w.rejected);
    });
    let d, l = 0, f;
    if (!u) {
      const y = [zr.bind(this), void 0];
      for (y.unshift.apply(y, a), y.push.apply(y, c), f = y.length, d = Promise.resolve(r); l < f; )
        d = d.then(y[l++], y[l++]);
      return d;
    }
    f = a.length;
    let h = r;
    for (l = 0; l < f; ) {
      const y = a[l++], w = a[l++];
      try {
        h = y(h);
      } catch (m) {
        w.call(this, m);
        break;
      }
    }
    try {
      d = zr.call(this, h);
    } catch (y) {
      return Promise.reject(y);
    }
    for (l = 0, f = c.length; l < f; )
      d = d.then(c[l++], c[l++]);
    return d;
  }
  getUri(t) {
    t = me(this.defaults, t);
    const r = Ws(t.baseURL, t.url, t.allowAbsoluteUrls);
    return Hs(r, t.params, t.paramsSerializer);
  }
};
p.forEach(["delete", "get", "head", "options"], function(t) {
  fe.prototype[t] = function(r, n) {
    return this.request(me(n || {}, {
      method: t,
      url: r,
      data: (n || {}).data
    }));
  };
});
p.forEach(["post", "put", "patch"], function(t) {
  function r(n) {
    return function(i, o, a) {
      return this.request(me(a || {}, {
        method: t,
        headers: n ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: i,
        data: o
      }));
    };
  }
  fe.prototype[t] = r(), fe.prototype[t + "Form"] = r(!0);
});
let va = class Ys {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let r;
    this.promise = new Promise(function(i) {
      r = i;
    });
    const n = this;
    this.promise.then((s) => {
      if (!n._listeners) return;
      let i = n._listeners.length;
      for (; i-- > 0; )
        n._listeners[i](s);
      n._listeners = null;
    }), this.promise.then = (s) => {
      let i;
      const o = new Promise((a) => {
        n.subscribe(a), i = a;
      }).then(s);
      return o.cancel = function() {
        n.unsubscribe(i);
      }, o;
    }, t(function(i, o, a) {
      n.reason || (n.reason = new ve(i, o, a), r(n.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : this._listeners = [t];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(t) {
    if (!this._listeners)
      return;
    const r = this._listeners.indexOf(t);
    r !== -1 && this._listeners.splice(r, 1);
  }
  toAbortSignal() {
    const t = new AbortController(), r = (n) => {
      t.abort(n);
    };
    return this.subscribe(r), t.signal.unsubscribe = () => this.unsubscribe(r), t.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let t;
    return {
      token: new Ys(function(s) {
        t = s;
      }),
      cancel: t
    };
  }
};
function Ca(e) {
  return function(r) {
    return e.apply(null, r);
  };
}
function _a(e) {
  return p.isObject(e) && e.isAxiosError === !0;
}
const nr = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(nr).forEach(([e, t]) => {
  nr[t] = e;
});
function Zs(e) {
  const t = new fe(e), r = Is(fe.prototype.request, t);
  return p.extend(r, fe.prototype, t, { allOwnKeys: !0 }), p.extend(r, t, null, { allOwnKeys: !0 }), r.create = function(s) {
    return Zs(me(e, s));
  }, r;
}
const I = Zs(qe);
I.Axios = fe;
I.CanceledError = ve;
I.CancelToken = va;
I.isCancel = zs;
I.VERSION = Qs;
I.toFormData = gt;
I.AxiosError = A;
I.Cancel = I.CanceledError;
I.all = function(t) {
  return Promise.all(t);
};
I.spread = Ca;
I.isAxiosError = _a;
I.mergeConfig = me;
I.AxiosHeaders = B;
I.formToJSON = (e) => js(p.isHTMLForm(e) ? new FormData(e) : e);
I.getAdapter = Xs.getAdapter;
I.HttpStatusCode = nr;
I.default = I;
const {
  Axios: xh,
  AxiosError: ce,
  CanceledError: Oh,
  isCancel: Ih,
  CancelToken: Dh,
  VERSION: Ph,
  all: Nh,
  Cancel: kh,
  isAxiosError: Mh,
  spread: Uh,
  toFormData: $h,
  AxiosHeaders: Lh,
  HttpStatusCode: Fh,
  formToJSON: Bh,
  getAdapter: Hh,
  mergeConfig: qh
} = I;
var Ht, Wr;
function xa() {
  if (Wr) return Ht;
  Wr = 1;
  const e = /* @__PURE__ */ new Set([
    "ENOTFOUND",
    "ENETUNREACH",
    // SSL errors from https://github.com/nodejs/node/blob/fc8e3e2cdc521978351de257030db0076d79e0ab/src/crypto/crypto_common.cc#L301-L328
    "UNABLE_TO_GET_ISSUER_CERT",
    "UNABLE_TO_GET_CRL",
    "UNABLE_TO_DECRYPT_CERT_SIGNATURE",
    "UNABLE_TO_DECRYPT_CRL_SIGNATURE",
    "UNABLE_TO_DECODE_ISSUER_PUBLIC_KEY",
    "CERT_SIGNATURE_FAILURE",
    "CRL_SIGNATURE_FAILURE",
    "CERT_NOT_YET_VALID",
    "CERT_HAS_EXPIRED",
    "CRL_NOT_YET_VALID",
    "CRL_HAS_EXPIRED",
    "ERROR_IN_CERT_NOT_BEFORE_FIELD",
    "ERROR_IN_CERT_NOT_AFTER_FIELD",
    "ERROR_IN_CRL_LAST_UPDATE_FIELD",
    "ERROR_IN_CRL_NEXT_UPDATE_FIELD",
    "OUT_OF_MEM",
    "DEPTH_ZERO_SELF_SIGNED_CERT",
    "SELF_SIGNED_CERT_IN_CHAIN",
    "UNABLE_TO_GET_ISSUER_CERT_LOCALLY",
    "UNABLE_TO_VERIFY_LEAF_SIGNATURE",
    "CERT_CHAIN_TOO_LONG",
    "CERT_REVOKED",
    "INVALID_CA",
    "PATH_LENGTH_EXCEEDED",
    "INVALID_PURPOSE",
    "CERT_UNTRUSTED",
    "CERT_REJECTED",
    "HOSTNAME_MISMATCH"
  ]);
  return Ht = (t) => !e.has(t && t.code), Ht;
}
var Oa = xa();
const Ia = /* @__PURE__ */ ji(Oa), mr = "axios-retry";
function ei(e) {
  const t = ["ERR_CANCELED", "ECONNABORTED"];
  return e.response || !e.code || t.includes(e.code) ? !1 : Ia(e);
}
const ti = ["get", "head", "options"], Da = ti.concat(["put", "delete"]);
function yr(e) {
  return e.code !== "ECONNABORTED" && (!e.response || e.response.status === 429 || e.response.status >= 500 && e.response.status <= 599);
}
function Pa(e) {
  var t;
  return (t = e.config) != null && t.method ? yr(e) && ti.indexOf(e.config.method) !== -1 : !1;
}
function ri(e) {
  var t;
  return (t = e.config) != null && t.method ? yr(e) && Da.indexOf(e.config.method) !== -1 : !1;
}
function ni(e) {
  return ei(e) || ri(e);
}
function gr(e = void 0) {
  var n;
  const t = (n = e == null ? void 0 : e.response) == null ? void 0 : n.headers["retry-after"];
  if (!t)
    return 0;
  let r = (Number(t) || 0) * 1e3;
  return r === 0 && (r = (new Date(t).valueOf() || 0) - Date.now()), Math.max(0, r);
}
function Na(e = 0, t = void 0) {
  return Math.max(0, gr(t));
}
function ka(e = 0, t = void 0, r = 100) {
  const n = 2 ** e * r, s = Math.max(n, gr(t)), i = s * 0.2 * Math.random();
  return s + i;
}
function Ma(e = 100) {
  return (t = 0, r = void 0) => {
    const n = t * e;
    return Math.max(n, gr(r));
  };
}
const Ua = {
  retries: 3,
  retryCondition: ni,
  retryDelay: Na,
  shouldResetTimeout: !1,
  onRetry: () => {
  },
  onMaxRetryTimesExceeded: () => {
  },
  validateResponse: null
};
function $a(e, t) {
  return { ...Ua, ...t, ...e[mr] };
}
function Gr(e, t, r = !1) {
  const n = $a(e, t || {});
  return n.retryCount = n.retryCount || 0, (!n.lastRequestTime || r) && (n.lastRequestTime = Date.now()), e[mr] = n, n;
}
function La(e, t) {
  e.defaults.agent === t.agent && delete t.agent, e.defaults.httpAgent === t.httpAgent && delete t.httpAgent, e.defaults.httpsAgent === t.httpsAgent && delete t.httpsAgent;
}
async function Fa(e, t) {
  const { retries: r, retryCondition: n } = e, s = (e.retryCount || 0) < r && n(t);
  if (typeof s == "object")
    try {
      return await s !== !1;
    } catch {
      return !1;
    }
  return s;
}
async function Ba(e, t, r, n) {
  var u;
  t.retryCount += 1;
  const { retryDelay: s, shouldResetTimeout: i, onRetry: o } = t, a = s(t.retryCount, r);
  if (La(e, n), !i && n.timeout && t.lastRequestTime) {
    const c = Date.now() - t.lastRequestTime, d = n.timeout - c - a;
    if (d <= 0)
      return Promise.reject(r);
    n.timeout = d;
  }
  return n.transformRequest = [(c) => c], await o(t.retryCount, r, n), (u = n.signal) != null && u.aborted ? Promise.resolve(e(n)) : new Promise((c) => {
    var f;
    const d = () => {
      clearTimeout(l), c(e(n));
    }, l = setTimeout(() => {
      var h;
      c(e(n)), (h = n.signal) != null && h.removeEventListener && n.signal.removeEventListener("abort", d);
    }, a);
    (f = n.signal) != null && f.addEventListener && n.signal.addEventListener("abort", d, { once: !0 });
  });
}
async function Ha(e, t) {
  e.retryCount >= e.retries && await e.onMaxRetryTimesExceeded(t, e.retryCount);
}
const Y = (e, t) => {
  const r = e.interceptors.request.use((s) => {
    var i;
    return Gr(s, t, !0), (i = s[mr]) != null && i.validateResponse && (s.validateStatus = () => !1), s;
  }), n = e.interceptors.response.use(null, async (s) => {
    var a;
    const { config: i } = s;
    if (!i)
      return Promise.reject(s);
    const o = Gr(i, t);
    return s.response && ((a = o.validateResponse) != null && a.call(o, s.response)) ? s.response : await Fa(o, s) ? Ba(e, o, s, i) : (await Ha(o, s), Promise.reject(s));
  });
  return { requestInterceptorId: r, responseInterceptorId: n };
};
Y.isNetworkError = ei;
Y.isSafeRequestError = Pa;
Y.isIdempotentRequestError = ri;
Y.isNetworkOrIdempotentRequestError = ni;
Y.exponentialDelay = ka;
Y.linearDelay = Ma;
Y.isRetryableError = yr;
const qa = {
  endpoint: "https://prod.us-east-1.auth.desktop.kiro.dev"
};
function ja() {
  const e = nt.workspace.getConfiguration().get("kiroAuthConfig");
  if (e) {
    if (e.endpoint)
      return e;
    nt.window.showErrorMessage("Invalid Kiro Auth configuration, please specify an endpoint");
  }
  return qa;
}
const Oe = "x-amzn-requestid", za = "New signups are temporarily paused.", Ie = new vs(dr.Auth, "auth-service-client"), Va = (e) => Os(e) ? {
  unauthorized: 1
} : e instanceof _s ? {
  blocked: 1
} : e instanceof ht ? {
  environmentIssue: 1
} : {
  failure: 1
};
function De(e) {
  return {
    traceName: e,
    errorMapper: Va
  };
}
function Wa(e, t) {
  zi(dr.Auth, "retryAuth", (r) => {
    var n;
    r.setAttribute("retryCount", e), r.setAttribute("errorCode", t.code || "unknown"), r.setAttribute("errorStatus", ((n = t.response) == null ? void 0 : n.status) || 0), r.setAttribute("errorMessage", t.message);
  });
}
function Kr(e) {
  var t;
  try {
    return ((t = e.toJSON().data) == null ? void 0 : t.message) || "";
  } catch {
    return "unknown error";
  }
}
function We(e, t = !1) {
  var r, n, s;
  if (!(e instanceof ce))
    return new le("AuthService client: Unexpected issue");
  if (((n = (r = e.response) == null ? void 0 : r.data) == null ? void 0 : n.message) === za)
    return new _s("AuthService client: Sign-in temporarily not allowed");
  switch (e.code) {
    case ce.ECONNABORTED:
    case ce.ETIMEDOUT:
      return new lr(`AuthService client: Network related issue: ${e.message}`);
    case ce.ERR_BAD_RESPONSE:
      return new Qt(`AuthService client: Bad response: ${e.message}`);
    case ce.ERR_NETWORK:
      return new xs(((s = e.cause) == null ? void 0 : s.message) || "unknown cause");
    // 4xx response will be considered as unexpected for the sign-in case but invalid auth
    // for the token refresh.
    case ce.ERR_BAD_REQUEST:
      return new (t ? le : ye)(
        "AuthService client: " + Kr(e)
      );
    default:
      return new le("AuthService client: " + Kr(e));
  }
}
class jh {
  constructor() {
    E(this, "endpoint");
    E(this, "client");
    this.endpoint = ja().endpoint, this.client = I.create({ baseURL: this.endpoint, timeout: 1e4 }), Y(this.client, {
      retries: 3,
      retryCondition: (t) => Y.isNetworkOrIdempotentRequestError(t) && !(t.response && t.response.status >= 500 && t.response.status < 600),
      // eslint-disable-next-line @typescript-eslint/unbound-method
      retryDelay: Y.exponentialDelay,
      onRetry: Wa
    });
  }
  get loginUrl() {
    return `${this.endpoint}/login`;
  }
  get createTokenUrl() {
    return `${this.endpoint}/oauth/token`;
  }
  get refreshTokenUrl() {
    return `${this.endpoint}/refreshToken`;
  }
  get logoutUrl() {
    return `${this.endpoint}/logout`;
  }
  get deleteAccountUrl() {
    return `${this.endpoint}/account`;
  }
  /**
   * Opens the web browser to
   */
  login({ provider: t, redirectUri: r, codeChallenge: n, state: s }) {
    return Ie.withTrace(De("login"), async (i) => (i.setAttribute("authProvider", t), nt.env.openExternal(
      nt.Uri.parse(
        // eslint-disable-next-line spellcheck/spell-checker
        `${this.loginUrl}?idp=${t}&redirect_uri=${encodeURIComponent(r)}&code_challenge=${n}&code_challenge_method=S256&state=${s}`
      )
    )));
  }
  /**
   * Creates an returns a new token
   */
  createToken({ code: t, codeVerifier: r, redirectUri: n }) {
    return Ie.withTrace(De("createToken"), async (s) => {
      try {
        const i = await this.client.post(
          this.createTokenUrl,
          { code: t, code_verifier: r, redirect_uri: n },
          { headers: { "Content-Type": "application/json" } }
        );
        return s.setAttribute("requestId", String(i.headers[Oe] || "")), i.data;
      } catch (i) {
        throw i instanceof ce && i.response && s.setAttribute("requestId", String(i.response.headers[Oe] || "")), We(i, !0);
      }
    });
  }
  /**
   * Refreshes the auth token
   */
  refreshToken({ refreshToken: t }) {
    return Ie.withTrace(De("refreshToken"), async (r) => {
      try {
        const n = await this.client.post(
          this.refreshTokenUrl,
          { refreshToken: t },
          { headers: { "Content-Type": "application/json" } }
        );
        return r.setAttribute("requestId", String(n.headers[Oe] || "")), n.data;
      } catch (n) {
        throw We(n);
      }
    });
  }
  /**
   * Invalidates the refresh token
   */
  logout({ refreshToken: t }) {
    return Ie.withTrace(De("logout"), async (r) => {
      try {
        const n = await this.client.post(this.logoutUrl, { refreshToken: t }, { headers: { "Content-Type": "application/json" } });
        r.setAttribute("requestId", String(n.headers[Oe] || ""));
      } catch (n) {
        throw We(n);
      }
    });
  }
  /**
   * Deletes the user account
   */
  deleteAccount(t) {
    return Ie.withTrace(De("deleteAccount"), async (r) => {
      try {
        const n = await this.client.delete(this.deleteAccountUrl, {
          headers: {
            Authorization: `Bearer ${t}`,
            "user-agent": "KiroIDE"
          }
        });
        r.setAttribute("requestId", String(n.headers[Oe] || ""));
      } catch (n) {
        throw We(n);
      }
    });
  }
}
const Ga = (e) => ({
  setHttpHandler(t) {
    e.httpHandler = t;
  },
  httpHandler() {
    return e.httpHandler;
  },
  updateHttpClientConfig(t, r) {
    var n;
    (n = e.httpHandler) == null || n.updateHttpClientConfig(t, r);
  },
  httpHandlerConfigs() {
    return e.httpHandler.httpHandlerConfigs();
  }
}), Ka = (e) => ({
  httpHandler: e.httpHandler()
});
var Jr;
(function(e) {
  e.HEADER = "header", e.QUERY = "query";
})(Jr || (Jr = {}));
var Xr;
(function(e) {
  e.HEADER = "header", e.QUERY = "query";
})(Xr || (Xr = {}));
var Qr;
(function(e) {
  e.HTTP = "http", e.HTTPS = "https";
})(Qr || (Qr = {}));
var Yr;
(function(e) {
  e.MD5 = "md5", e.CRC32 = "crc32", e.CRC32C = "crc32c", e.SHA1 = "sha1", e.SHA256 = "sha256";
})(Yr || (Yr = {}));
var Zr;
(function(e) {
  e[e.HEADER = 0] = "HEADER", e[e.TRAILER = 1] = "TRAILER";
})(Zr || (Zr = {}));
var en;
(function(e) {
  e.PROFILE = "profile", e.SSO_SESSION = "sso-session", e.SERVICES = "services";
})(en || (en = {}));
var tn;
(function(e) {
  e.HTTP_0_9 = "http/0.9", e.HTTP_1_0 = "http/1.0", e.TDS_8_0 = "tds/8.0";
})(tn || (tn = {}));
let oe = class sr {
  constructor(t) {
    this.method = t.method || "GET", this.hostname = t.hostname || "localhost", this.port = t.port, this.query = t.query || {}, this.headers = t.headers || {}, this.body = t.body, this.protocol = t.protocol ? t.protocol.slice(-1) !== ":" ? `${t.protocol}:` : t.protocol : "https:", this.path = t.path ? t.path.charAt(0) !== "/" ? `/${t.path}` : t.path : "/", this.username = t.username, this.password = t.password, this.fragment = t.fragment;
  }
  static clone(t) {
    const r = new sr({
      ...t,
      headers: { ...t.headers }
    });
    return r.query && (r.query = Ja(r.query)), r;
  }
  static isInstance(t) {
    if (!t)
      return !1;
    const r = t;
    return "method" in r && "protocol" in r && "hostname" in r && "path" in r && typeof r.query == "object" && typeof r.headers == "object";
  }
  clone() {
    return sr.clone(this);
  }
};
function Ja(e) {
  return Object.keys(e).reduce((t, r) => {
    const n = e[r];
    return {
      ...t,
      [r]: Array.isArray(n) ? [...n] : n
    };
  }, {});
}
class ot {
  constructor(t) {
    this.statusCode = t.statusCode, this.reason = t.reason, this.headers = t.headers || {}, this.body = t.body;
  }
  static isInstance(t) {
    if (!t)
      return !1;
    const r = t;
    return typeof r.statusCode == "number" && typeof r.headers == "object";
  }
}
const Xa = (e) => (t) => async (r) => {
  if (!oe.isInstance(r.request))
    return t(r);
  const { request: n } = r, { handlerProtocol: s = "" } = e.requestHandler.metadata || {};
  if (s.indexOf("h2") >= 0 && !n.headers[":authority"])
    delete n.headers.host, n.headers[":authority"] = n.hostname + (n.port ? ":" + n.port : "");
  else if (!n.headers.host) {
    let i = n.hostname;
    n.port != null && (i += `:${n.port}`), n.headers.host = i;
  }
  return t(r);
}, Qa = {
  name: "hostHeaderMiddleware",
  step: "build",
  priority: "low",
  tags: ["HOST"],
  override: !0
}, Ya = (e) => ({
  applyToStack: (t) => {
    t.add(Xa(e), Qa);
  }
}), Za = () => (e, t) => async (r) => {
  var n, s;
  try {
    const i = await e(r), { clientName: o, commandName: a, logger: u, dynamoDbDocumentClientOptions: c = {} } = t, { overrideInputFilterSensitiveLog: d, overrideOutputFilterSensitiveLog: l } = c, f = d ?? t.inputFilterSensitiveLog, h = l ?? t.outputFilterSensitiveLog, { $metadata: y, ...w } = i.output;
    return (n = u == null ? void 0 : u.info) == null || n.call(u, {
      clientName: o,
      commandName: a,
      input: f(r.input),
      output: h(w),
      metadata: y
    }), i;
  } catch (i) {
    const { clientName: o, commandName: a, logger: u, dynamoDbDocumentClientOptions: c = {} } = t, { overrideInputFilterSensitiveLog: d } = c, l = d ?? t.inputFilterSensitiveLog;
    throw (s = u == null ? void 0 : u.error) == null || s.call(u, {
      clientName: o,
      commandName: a,
      input: l(r.input),
      error: i,
      metadata: i.$metadata
    }), i;
  }
}, ec = {
  name: "loggerMiddleware",
  tags: ["LOGGER"],
  step: "initialize",
  override: !0
}, tc = (e) => ({
  applyToStack: (t) => {
    t.add(Za(), ec);
  }
}), rn = "X-Amzn-Trace-Id", rc = "AWS_LAMBDA_FUNCTION_NAME", nc = "_X_AMZN_TRACE_ID", sc = (e) => (t) => async (r) => {
  const { request: n } = r;
  if (!oe.isInstance(n) || e.runtime !== "node" || n.headers.hasOwnProperty(rn))
    return t(r);
  const s = process.env[rc], i = process.env[nc], o = (a) => typeof a == "string" && a.length > 0;
  return o(s) && o(i) && (n.headers[rn] = i), t({
    ...r,
    request: n
  });
}, ic = {
  step: "build",
  tags: ["RECURSION_DETECTION"],
  name: "recursionDetectionMiddleware",
  override: !0,
  priority: "low"
}, oc = (e) => ({
  applyToStack: (t) => {
    t.add(sc(e), ic);
  }
});
var nn;
(function(e) {
  e.HEADER = "header", e.QUERY = "query";
})(nn || (nn = {}));
var sn;
(function(e) {
  e.HEADER = "header", e.QUERY = "query";
})(sn || (sn = {}));
var on;
(function(e) {
  e.HTTP = "http", e.HTTPS = "https";
})(on || (on = {}));
var an;
(function(e) {
  e.MD5 = "md5", e.CRC32 = "crc32", e.CRC32C = "crc32c", e.SHA1 = "sha1", e.SHA256 = "sha256";
})(an || (an = {}));
var cn;
(function(e) {
  e[e.HEADER = 0] = "HEADER", e[e.TRAILER = 1] = "TRAILER";
})(cn || (cn = {}));
var un;
(function(e) {
  e.PROFILE = "profile", e.SSO_SESSION = "sso-session", e.SERVICES = "services";
})(un || (un = {}));
var dn;
(function(e) {
  e.HTTP_0_9 = "http/0.9", e.HTTP_1_0 = "http/1.0", e.TDS_8_0 = "tds/8.0";
})(dn || (dn = {}));
var ln;
(function(e) {
  e.HEADER = "header", e.QUERY = "query";
})(ln || (ln = {}));
var fn;
(function(e) {
  e.HEADER = "header", e.QUERY = "query";
})(fn || (fn = {}));
var hn;
(function(e) {
  e.HTTP = "http", e.HTTPS = "https";
})(hn || (hn = {}));
var pn;
(function(e) {
  e.MD5 = "md5", e.CRC32 = "crc32", e.CRC32C = "crc32c", e.SHA1 = "sha1", e.SHA256 = "sha256";
})(pn || (pn = {}));
var mn;
(function(e) {
  e[e.HEADER = 0] = "HEADER", e[e.TRAILER = 1] = "TRAILER";
})(mn || (mn = {}));
const yn = "__smithy_context";
var gn;
(function(e) {
  e.PROFILE = "profile", e.SSO_SESSION = "sso-session", e.SERVICES = "services";
})(gn || (gn = {}));
var wn;
(function(e) {
  e.HTTP_0_9 = "http/0.9", e.HTTP_1_0 = "http/1.0", e.TDS_8_0 = "tds/8.0";
})(wn || (wn = {}));
const St = (e) => e[yn] || (e[yn] = {}), re = (e) => {
  if (typeof e == "function")
    return e;
  const t = Promise.resolve(e);
  return () => t;
}, ac = (e, t) => {
  if (!t || t.length === 0)
    return e;
  const r = [];
  for (const n of t)
    for (const s of e)
      s.schemeId.split("#")[1] === n && r.push(s);
  for (const n of e)
    r.find(({ schemeId: s }) => s === n.schemeId) || r.push(n);
  return r;
};
function cc(e) {
  const t = /* @__PURE__ */ new Map();
  for (const r of e)
    t.set(r.schemeId, r);
  return t;
}
const uc = (e, t) => (r, n) => async (s) => {
  var l;
  const i = e.httpAuthSchemeProvider(await t.httpAuthSchemeParametersProvider(e, n, s.input)), o = e.authSchemePreference ? await e.authSchemePreference() : [], a = ac(i, o), u = cc(e.httpAuthSchemes), c = St(n), d = [];
  for (const f of a) {
    const h = u.get(f.schemeId);
    if (!h) {
      d.push(`HttpAuthScheme \`${f.schemeId}\` was not enabled for this service.`);
      continue;
    }
    const y = h.identityProvider(await t.identityProviderConfigProvider(e));
    if (!y) {
      d.push(`HttpAuthScheme \`${f.schemeId}\` did not have an IdentityProvider configured.`);
      continue;
    }
    const { identityProperties: w = {}, signingProperties: m = {} } = ((l = f.propertiesExtractor) == null ? void 0 : l.call(f, e, n)) || {};
    f.identityProperties = Object.assign(f.identityProperties || {}, w), f.signingProperties = Object.assign(f.signingProperties || {}, m), c.selectedHttpAuthScheme = {
      httpAuthOption: f,
      identity: await y(f.identityProperties),
      signer: h.signer
    };
    break;
  }
  if (!c.selectedHttpAuthScheme)
    throw new Error(d.join(`
`));
  return r(s);
}, dc = {
  step: "serialize",
  tags: ["HTTP_AUTH_SCHEME"],
  name: "httpAuthSchemeMiddleware",
  override: !0,
  relation: "before",
  toMiddleware: "endpointV2Middleware"
}, lc = (e, { httpAuthSchemeParametersProvider: t, identityProviderConfigProvider: r }) => ({
  applyToStack: (n) => {
    n.addRelativeTo(uc(e, {
      httpAuthSchemeParametersProvider: t,
      identityProviderConfigProvider: r
    }), dc);
  }
});
class $e {
  constructor(t) {
    this.method = t.method || "GET", this.hostname = t.hostname || "localhost", this.port = t.port, this.query = t.query || {}, this.headers = t.headers || {}, this.body = t.body, this.protocol = t.protocol ? t.protocol.slice(-1) !== ":" ? `${t.protocol}:` : t.protocol : "https:", this.path = t.path ? t.path.charAt(0) !== "/" ? `/${t.path}` : t.path : "/", this.username = t.username, this.password = t.password, this.fragment = t.fragment;
  }
  static clone(t) {
    const r = new $e({
      ...t,
      headers: { ...t.headers }
    });
    return r.query && (r.query = fc(r.query)), r;
  }
  static isInstance(t) {
    if (!t)
      return !1;
    const r = t;
    return "method" in r && "protocol" in r && "hostname" in r && "path" in r && typeof r.query == "object" && typeof r.headers == "object";
  }
  clone() {
    return $e.clone(this);
  }
}
function fc(e) {
  return Object.keys(e).reduce((t, r) => {
    const n = e[r];
    return {
      ...t,
      [r]: Array.isArray(n) ? [...n] : n
    };
  }, {});
}
const hc = (e) => (t) => {
  throw t;
}, pc = (e, t) => {
}, mc = (e) => (t, r) => async (n) => {
  if (!$e.isInstance(n.request))
    return t(n);
  const i = St(r).selectedHttpAuthScheme;
  if (!i)
    throw new Error("No HttpAuthScheme was selected: unable to sign request");
  const { httpAuthOption: { signingProperties: o = {} }, identity: a, signer: u } = i, c = await t({
    ...n,
    request: await u.sign(n.request, a, o)
  }).catch((u.errorHandler || hc)(o));
  return (u.successHandler || pc)(c.response, o), c;
}, yc = {
  step: "finalizeRequest",
  tags: ["HTTP_SIGNING"],
  name: "httpSigningMiddleware",
  aliases: ["apiKeyMiddleware", "tokenMiddleware", "awsAuthMiddleware"],
  override: !0,
  relation: "after",
  toMiddleware: "retryMiddleware"
}, gc = (e) => ({
  applyToStack: (t) => {
    t.addRelativeTo(mc(), yc);
  }
}), Pe = (e) => {
  if (typeof e == "function")
    return e;
  const t = Promise.resolve(e);
  return () => t;
}, se = {}, Ce = new Array(64);
for (let e = 0, t = 65, r = 90; e + t <= r; e++) {
  const n = String.fromCharCode(e + t);
  se[n] = e, Ce[e] = n;
}
for (let e = 0, t = 97, r = 122; e + t <= r; e++) {
  const n = String.fromCharCode(e + t), s = e + 26;
  se[n] = s, Ce[s] = n;
}
for (let e = 0; e < 10; e++) {
  se[e.toString(10)] = e + 52;
  const t = e.toString(10), r = e + 52;
  se[t] = r, Ce[r] = t;
}
se["+"] = 62;
Ce[62] = "+";
se["/"] = 63;
Ce[63] = "/";
const be = 6, Ne = 8, wc = 63, wr = (e) => {
  let t = e.length / 4 * 3;
  e.slice(-2) === "==" ? t -= 2 : e.slice(-1) === "=" && t--;
  const r = new ArrayBuffer(t), n = new DataView(r);
  for (let s = 0; s < e.length; s += 4) {
    let i = 0, o = 0;
    for (let c = s, d = s + 3; c <= d; c++)
      if (e[c] !== "=") {
        if (!(e[c] in se))
          throw new TypeError(`Invalid character ${e[c]} in base64 string.`);
        i |= se[e[c]] << (d - c) * be, o += be;
      } else
        i >>= be;
    const a = s / 4 * 3;
    i >>= o % Ne;
    const u = Math.floor(o / Ne);
    for (let c = 0; c < u; c++) {
      const d = (u - c - 1) * Ne;
      n.setUint8(a + c, (i & 255 << d) >> d);
    }
  }
  return new Uint8Array(r);
}, Re = (e) => new TextEncoder().encode(e), ke = (e) => typeof e == "string" ? Re(e) : ArrayBuffer.isView(e) ? new Uint8Array(e.buffer, e.byteOffset, e.byteLength / Uint8Array.BYTES_PER_ELEMENT) : new Uint8Array(e), si = (e) => {
  if (typeof e == "string")
    return e;
  if (typeof e != "object" || typeof e.byteOffset != "number" || typeof e.byteLength != "number")
    throw new Error("@smithy/util-utf8: toUtf8 encoder function only accepts string | Uint8Array.");
  return new TextDecoder("utf-8").decode(e);
};
function ii(e) {
  let t;
  typeof e == "string" ? t = Re(e) : t = e;
  const r = typeof t == "object" && typeof t.length == "number", n = typeof t == "object" && typeof t.byteOffset == "number" && typeof t.byteLength == "number";
  if (!r && !n)
    throw new Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");
  let s = "";
  for (let i = 0; i < t.length; i += 3) {
    let o = 0, a = 0;
    for (let c = i, d = Math.min(i + 3, t.length); c < d; c++)
      o |= t[c] << (d - c - 1) * Ne, a += Ne;
    const u = Math.ceil(a / be);
    o <<= u * be - a;
    for (let c = 1; c <= u; c++) {
      const d = (u - c) * be;
      s += Ce[(o & wc << d) >> d];
    }
    s += "==".slice(0, 4 - u);
  }
  return s;
}
function Ec(e, t = "utf-8") {
  return t === "base64" ? ii(e) : si(e);
}
function Sc(e, t) {
  return t === "base64" ? he.mutate(wr(e)) : he.mutate(Re(e));
}
class he extends Uint8Array {
  static fromString(t, r = "utf-8") {
    switch (typeof t) {
      case "string":
        return Sc(t, r);
      default:
        throw new Error(`Unsupported conversion from ${typeof t} to Uint8ArrayBlobAdapter.`);
    }
  }
  static mutate(t) {
    return Object.setPrototypeOf(t, he.prototype), t;
  }
  transformToString(t = "utf-8") {
    return Ec(this, t);
  }
}
var En;
(function(e) {
  e.HEADER = "header", e.QUERY = "query";
})(En || (En = {}));
var Sn;
(function(e) {
  e.HEADER = "header", e.QUERY = "query";
})(Sn || (Sn = {}));
var bn;
(function(e) {
  e.HTTP = "http", e.HTTPS = "https";
})(bn || (bn = {}));
var Rn;
(function(e) {
  e.MD5 = "md5", e.CRC32 = "crc32", e.CRC32C = "crc32c", e.SHA1 = "sha1", e.SHA256 = "sha256";
})(Rn || (Rn = {}));
var An;
(function(e) {
  e[e.HEADER = 0] = "HEADER", e[e.TRAILER = 1] = "TRAILER";
})(An || (An = {}));
var Tn;
(function(e) {
  e.PROFILE = "profile", e.SSO_SESSION = "sso-session", e.SERVICES = "services";
})(Tn || (Tn = {}));
var vn;
(function(e) {
  e.HTTP_0_9 = "http/0.9", e.HTTP_1_0 = "http/1.0", e.TDS_8_0 = "tds/8.0";
})(vn || (vn = {}));
const pe = (e) => encodeURIComponent(e).replace(/[!'()*]/g, bc), bc = (e) => `%${e.charCodeAt(0).toString(16).toUpperCase()}`;
function Rc(e) {
  const t = [];
  for (let r of Object.keys(e).sort()) {
    const n = e[r];
    if (r = pe(r), Array.isArray(n))
      for (let s = 0, i = n.length; s < i; s++)
        t.push(`${r}=${pe(n[s])}`);
    else {
      let s = r;
      (n || typeof n == "string") && (s += `=${pe(n)}`), t.push(s);
    }
  }
  return t.join("&");
}
for (let e = 0; e < 256; e++) {
  let t = e.toString(16).toLowerCase();
  t.length === 1 && (t = `0${t}`);
}
const Ac = async (e = new Uint8Array(), t) => {
  if (e instanceof Uint8Array)
    return he.mutate(e);
  if (!e)
    return he.mutate(new Uint8Array());
  const r = t.streamCollector(e);
  return he.mutate(await r);
};
function Cn(e) {
  return encodeURIComponent(e).replace(/[!'()*]/g, function(t) {
    return "%" + t.charCodeAt(0).toString(16).toUpperCase();
  });
}
const Tc = (e, t, r, n, s, i) => {
  if (t != null && t[r] !== void 0) {
    const o = n();
    if (o.length <= 0)
      throw new Error("Empty value provided for input HTTP label: " + r + ".");
    e = e.replace(s, i ? o.split("/").map((a) => Cn(a)).join("/") : Cn(o));
  } else
    throw new Error("No value provided for input HTTP label: " + r + ".");
  return e;
};
function bt(e, t) {
  return new vc(e, t);
}
class vc {
  constructor(t, r) {
    this.input = t, this.context = r, this.query = {}, this.method = "", this.headers = {}, this.path = "", this.body = null, this.hostname = "", this.resolvePathStack = [];
  }
  async build() {
    const { hostname: t, protocol: r = "https", port: n, path: s } = await this.context.endpoint();
    this.path = s;
    for (const i of this.resolvePathStack)
      i(this.path);
    return new $e({
      protocol: r,
      hostname: this.hostname || t,
      port: n,
      method: this.method,
      path: this.path,
      query: this.query,
      body: this.body,
      headers: this.headers
    });
  }
  hn(t) {
    return this.hostname = t, this;
  }
  bp(t) {
    return this.resolvePathStack.push((r) => {
      this.path = `${r != null && r.endsWith("/") ? r.slice(0, -1) : r || ""}` + t;
    }), this;
  }
  p(t, r, n, s) {
    return this.resolvePathStack.push((i) => {
      this.path = Tc(i, this.input, t, r, n, s);
    }), this;
  }
  h(t) {
    return this.headers = t, this;
  }
  q(t) {
    return this.query = t, this;
  }
  b(t) {
    return this.body = t, this;
  }
  m(t) {
    return this.method = t, this;
  }
}
function Cc(e, t, r) {
  e.__smithy_context ? e.__smithy_context.features || (e.__smithy_context.features = {}) : e.__smithy_context = {
    features: {}
  }, e.__smithy_context.features[t] = r;
}
class _c {
  constructor(t) {
    this.authSchemes = /* @__PURE__ */ new Map();
    for (const [r, n] of Object.entries(t))
      n !== void 0 && this.authSchemes.set(r, n);
  }
  getIdentityProvider(t) {
    return this.authSchemes.get(t);
  }
}
class xc {
  async sign(t, r, n) {
    return t;
  }
}
const Oc = (e) => (t) => oi(t) && t.expiration.getTime() - Date.now() < e, Ic = 3e5, Dc = Oc(Ic), oi = (e) => e.expiration !== void 0, Pc = (e, t, r) => {
  if (e === void 0)
    return;
  const n = typeof e != "function" ? async () => Promise.resolve(e) : e;
  let s, i, o, a = !1;
  const u = async (c) => {
    i || (i = n(c));
    try {
      s = await i, o = !0, a = !1;
    } finally {
      i = void 0;
    }
    return s;
  };
  return t === void 0 ? async (c) => ((!o || c != null && c.forceRefresh) && (s = await u(c)), s) : async (c) => ((!o || c != null && c.forceRefresh) && (s = await u(c)), a ? s : r(s) ? (t(s) && await u(c), s) : (a = !0, s));
}, Nc = void 0;
function kc(e) {
  return e === void 0 ? !0 : typeof e == "string" && e.length <= 50;
}
function Mc(e) {
  const t = Pe(e.userAgentAppId ?? Nc);
  return {
    ...e,
    customUserAgent: typeof e.customUserAgent == "string" ? [[e.customUserAgent]] : e.customUserAgent,
    userAgentAppId: async () => {
      var n, s;
      const r = await t();
      if (!kc(r)) {
        const i = ((s = (n = e.logger) == null ? void 0 : n.constructor) == null ? void 0 : s.name) === "NoOpLogger" || !e.logger ? console : e.logger;
        typeof r != "string" ? i == null || i.warn("userAgentAppId must be a string or undefined.") : r.length > 50 && (i == null || i.warn("The provided userAgentAppId exceeds the maximum length of 50 characters."));
      }
      return r;
    }
  };
}
class Uc {
  constructor({ size: t, params: r }) {
    this.data = /* @__PURE__ */ new Map(), this.parameters = [], this.capacity = t ?? 50, r && (this.parameters = r);
  }
  get(t, r) {
    const n = this.hash(t);
    if (n === !1)
      return r();
    if (!this.data.has(n)) {
      if (this.data.size > this.capacity + 10) {
        const s = this.data.keys();
        let i = 0;
        for (; ; ) {
          const { value: o, done: a } = s.next();
          if (this.data.delete(o), a || ++i > 10)
            break;
        }
      }
      this.data.set(n, r());
    }
    return this.data.get(n);
  }
  size() {
    return this.data.size;
  }
  hash(t) {
    let r = "";
    const { parameters: n } = this;
    if (n.length === 0)
      return !1;
    for (const s of n) {
      const i = String(t[s] ?? "");
      if (i.includes("|;"))
        return !1;
      r += i + "|;";
    }
    return r;
  }
}
const $c = new RegExp("^(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}$"), ai = (e) => $c.test(e) || e.startsWith("[") && e.endsWith("]"), Lc = new RegExp("^(?!.*-$)(?!-)[a-zA-Z0-9-]{1,63}$"), Er = (e, t = !1) => {
  if (!t)
    return Lc.test(e);
  const r = e.split(".");
  for (const n of r)
    if (!Er(n))
      return !1;
  return !0;
}, at = {}, Le = "endpoints";
function ie(e) {
  return typeof e != "object" || e == null ? e : "ref" in e ? `$${ie(e.ref)}` : "fn" in e ? `${e.fn}(${(e.argv || []).map(ie).join(", ")})` : JSON.stringify(e, null, 2);
}
class q extends Error {
  constructor(t) {
    super(t), this.name = "EndpointError";
  }
}
const Fc = (e, t) => e === t, Bc = (e) => {
  const t = e.split("."), r = [];
  for (const n of t) {
    const s = n.indexOf("[");
    if (s !== -1) {
      if (n.indexOf("]") !== n.length - 1)
        throw new q(`Path: '${e}' does not end with ']'`);
      const i = n.slice(s + 1, -1);
      if (Number.isNaN(parseInt(i)))
        throw new q(`Invalid array index: '${i}' in path: '${e}'`);
      s !== 0 && r.push(n.slice(0, s)), r.push(i);
    } else
      r.push(n);
  }
  return r;
}, ci = (e, t) => Bc(t).reduce((r, n) => {
  if (typeof r != "object")
    throw new q(`Index '${n}' in '${t}' not found in '${JSON.stringify(e)}'`);
  return Array.isArray(r) ? r[parseInt(n)] : r[n];
}, e), Hc = (e) => e != null, qc = (e) => !e;
var _n;
(function(e) {
  e.HEADER = "header", e.QUERY = "query";
})(_n || (_n = {}));
var xn;
(function(e) {
  e.HEADER = "header", e.QUERY = "query";
})(xn || (xn = {}));
var Fe;
(function(e) {
  e.HTTP = "http", e.HTTPS = "https";
})(Fe || (Fe = {}));
var On;
(function(e) {
  e.MD5 = "md5", e.CRC32 = "crc32", e.CRC32C = "crc32c", e.SHA1 = "sha1", e.SHA256 = "sha256";
})(On || (On = {}));
var In;
(function(e) {
  e[e.HEADER = 0] = "HEADER", e[e.TRAILER = 1] = "TRAILER";
})(In || (In = {}));
var Dn;
(function(e) {
  e.PROFILE = "profile", e.SSO_SESSION = "sso-session", e.SERVICES = "services";
})(Dn || (Dn = {}));
var Pn;
(function(e) {
  e.HTTP_0_9 = "http/0.9", e.HTTP_1_0 = "http/1.0", e.TDS_8_0 = "tds/8.0";
})(Pn || (Pn = {}));
const qt = {
  [Fe.HTTP]: 80,
  [Fe.HTTPS]: 443
}, jc = (e) => {
  const t = (() => {
    try {
      if (e instanceof URL)
        return e;
      if (typeof e == "object" && "hostname" in e) {
        const { hostname: f, port: h, protocol: y = "", path: w = "", query: m = {} } = e, S = new URL(`${y}//${f}${h ? `:${h}` : ""}${w}`);
        return S.search = Object.entries(m).map(([b, T]) => `${b}=${T}`).join("&"), S;
      }
      return new URL(e);
    } catch {
      return null;
    }
  })();
  if (!t)
    return console.error(`Unable to parse ${JSON.stringify(e)} as a whatwg URL.`), null;
  const r = t.href, { host: n, hostname: s, pathname: i, protocol: o, search: a } = t;
  if (a)
    return null;
  const u = o.slice(0, -1);
  if (!Object.values(Fe).includes(u))
    return null;
  const c = ai(s), d = r.includes(`${n}:${qt[u]}`) || typeof e == "string" && e.includes(`${n}:${qt[u]}`), l = `${n}${d ? `:${qt[u]}` : ""}`;
  return {
    scheme: u,
    authority: l,
    path: i,
    normalizedPath: i.endsWith("/") ? i : `${i}/`,
    isIp: c
  };
}, zc = (e, t) => e === t, Vc = (e, t, r, n) => t >= r || e.length < r ? null : n ? e.substring(e.length - r, e.length - t) : e.substring(t, r), Wc = (e) => encodeURIComponent(e).replace(/[!*'()]/g, (t) => `%${t.charCodeAt(0).toString(16).toUpperCase()}`), Gc = {
  booleanEquals: Fc,
  getAttr: ci,
  isSet: Hc,
  isValidHostLabel: Er,
  not: qc,
  parseURL: jc,
  stringEquals: zc,
  substring: Vc,
  uriEncode: Wc
}, ui = (e, t) => {
  const r = [], n = {
    ...t.endpointParams,
    ...t.referenceRecord
  };
  let s = 0;
  for (; s < e.length; ) {
    const i = e.indexOf("{", s);
    if (i === -1) {
      r.push(e.slice(s));
      break;
    }
    r.push(e.slice(s, i));
    const o = e.indexOf("}", i);
    if (o === -1) {
      r.push(e.slice(i));
      break;
    }
    e[i + 1] === "{" && e[o + 1] === "}" && (r.push(e.slice(i + 1, o)), s = o + 2);
    const a = e.substring(i + 1, o);
    if (a.includes("#")) {
      const [u, c] = a.split("#");
      r.push(ci(n[u], c));
    } else
      r.push(n[a]);
    s = o + 1;
  }
  return r.join("");
}, Kc = ({ ref: e }, t) => ({
  ...t.endpointParams,
  ...t.referenceRecord
})[e], Rt = (e, t, r) => {
  if (typeof e == "string")
    return ui(e, r);
  if (e.fn)
    return di(e, r);
  if (e.ref)
    return Kc(e, r);
  throw new q(`'${t}': ${String(e)} is not a string, function or reference.`);
}, di = ({ fn: e, argv: t }, r) => {
  const n = t.map((i) => ["boolean", "number"].includes(typeof i) ? i : Rt(i, "arg", r)), s = e.split(".");
  return s[0] in at && s[1] != null ? at[s[0]][s[1]](...n) : Gc[e](...n);
}, Jc = ({ assign: e, ...t }, r) => {
  var s, i;
  if (e && e in r.referenceRecord)
    throw new q(`'${e}' is already defined in Reference Record.`);
  const n = di(t, r);
  return (i = (s = r.logger) == null ? void 0 : s.debug) == null || i.call(s, `${Le} evaluateCondition: ${ie(t)} = ${ie(n)}`), {
    result: n === "" ? !0 : !!n,
    ...e != null && { toAssign: { name: e, value: n } }
  };
}, Sr = (e = [], t) => {
  var n, s;
  const r = {};
  for (const i of e) {
    const { result: o, toAssign: a } = Jc(i, {
      ...t,
      referenceRecord: {
        ...t.referenceRecord,
        ...r
      }
    });
    if (!o)
      return { result: o };
    a && (r[a.name] = a.value, (s = (n = t.logger) == null ? void 0 : n.debug) == null || s.call(n, `${Le} assign: ${a.name} := ${ie(a.value)}`));
  }
  return { result: !0, referenceRecord: r };
}, Xc = (e, t) => Object.entries(e).reduce((r, [n, s]) => ({
  ...r,
  [n]: s.map((i) => {
    const o = Rt(i, "Header value entry", t);
    if (typeof o != "string")
      throw new q(`Header '${n}' value '${o}' is not a string`);
    return o;
  })
}), {}), li = (e, t) => {
  if (Array.isArray(e))
    return e.map((r) => li(r, t));
  switch (typeof e) {
    case "string":
      return ui(e, t);
    case "object":
      if (e === null)
        throw new q(`Unexpected endpoint property: ${e}`);
      return fi(e, t);
    case "boolean":
      return e;
    default:
      throw new q(`Unexpected endpoint property type: ${typeof e}`);
  }
}, fi = (e, t) => Object.entries(e).reduce((r, [n, s]) => ({
  ...r,
  [n]: li(s, t)
}), {}), Qc = (e, t) => {
  const r = Rt(e, "Endpoint URL", t);
  if (typeof r == "string")
    try {
      return new URL(r);
    } catch (n) {
      throw console.error(`Failed to construct URL with ${r}`, n), n;
    }
  throw new q(`Endpoint URL must be a string, got ${typeof r}`);
}, Yc = (e, t) => {
  var d, l;
  const { conditions: r, endpoint: n } = e, { result: s, referenceRecord: i } = Sr(r, t);
  if (!s)
    return;
  const o = {
    ...t,
    referenceRecord: { ...t.referenceRecord, ...i }
  }, { url: a, properties: u, headers: c } = n;
  return (l = (d = t.logger) == null ? void 0 : d.debug) == null || l.call(d, `${Le} Resolving endpoint from template: ${ie(n)}`), {
    ...c != null && {
      headers: Xc(c, o)
    },
    ...u != null && {
      properties: fi(u, o)
    },
    url: Qc(a, o)
  };
}, Zc = (e, t) => {
  const { conditions: r, error: n } = e, { result: s, referenceRecord: i } = Sr(r, t);
  if (s)
    throw new q(Rt(n, "Error", {
      ...t,
      referenceRecord: { ...t.referenceRecord, ...i }
    }));
}, eu = (e, t) => {
  const { conditions: r, rules: n } = e, { result: s, referenceRecord: i } = Sr(r, t);
  if (s)
    return hi(n, {
      ...t,
      referenceRecord: { ...t.referenceRecord, ...i }
    });
}, hi = (e, t) => {
  for (const r of e)
    if (r.type === "endpoint") {
      const n = Yc(r, t);
      if (n)
        return n;
    } else if (r.type === "error")
      Zc(r, t);
    else if (r.type === "tree") {
      const n = eu(r, t);
      if (n)
        return n;
    } else
      throw new q(`Unknown endpoint rule: ${r}`);
  throw new q("Rules evaluation failed");
}, tu = (e, t) => {
  var c, d, l, f;
  const { endpointParams: r, logger: n } = t, { parameters: s, rules: i } = e;
  (d = (c = t.logger) == null ? void 0 : c.debug) == null || d.call(c, `${Le} Initial EndpointParams: ${ie(r)}`);
  const o = Object.entries(s).filter(([, h]) => h.default != null).map(([h, y]) => [h, y.default]);
  if (o.length > 0)
    for (const [h, y] of o)
      r[h] = r[h] ?? y;
  const a = Object.entries(s).filter(([, h]) => h.required).map(([h]) => h);
  for (const h of a)
    if (r[h] == null)
      throw new q(`Missing required parameter: '${h}'`);
  const u = hi(i, { endpointParams: r, logger: n, referenceRecord: {} });
  return (f = (l = t.logger) == null ? void 0 : l.debug) == null || f.call(l, `${Le} Resolved endpoint: ${ie(u)}`), u;
}, pi = (e, t = !1) => {
  if (t) {
    for (const r of e.split("."))
      if (!pi(r))
        return !1;
    return !0;
  }
  return !(!Er(e) || e.length < 3 || e.length > 63 || e !== e.toLowerCase() || ai(e));
}, Nn = ":", ru = "/", nu = (e) => {
  const t = e.split(Nn);
  if (t.length < 6)
    return null;
  const [r, n, s, i, o, ...a] = t;
  if (r !== "arn" || n === "" || s === "" || a.join(Nn) === "")
    return null;
  const u = a.map((c) => c.split(ru)).flat();
  return {
    partition: n,
    service: s,
    region: i,
    accountId: o,
    resourceId: u
  };
}, su = [{ id: "aws", outputs: { dnsSuffix: "amazonaws.com", dualStackDnsSuffix: "api.aws", implicitGlobalRegion: "us-east-1", name: "aws", supportsDualStack: !0, supportsFIPS: !0 }, regionRegex: "^(us|eu|ap|sa|ca|me|af|il|mx)\\-\\w+\\-\\d+$", regions: { "af-south-1": { description: "Africa (Cape Town)" }, "ap-east-1": { description: "Asia Pacific (Hong Kong)" }, "ap-northeast-1": { description: "Asia Pacific (Tokyo)" }, "ap-northeast-2": { description: "Asia Pacific (Seoul)" }, "ap-northeast-3": { description: "Asia Pacific (Osaka)" }, "ap-south-1": { description: "Asia Pacific (Mumbai)" }, "ap-south-2": { description: "Asia Pacific (Hyderabad)" }, "ap-southeast-1": { description: "Asia Pacific (Singapore)" }, "ap-southeast-2": { description: "Asia Pacific (Sydney)" }, "ap-southeast-3": { description: "Asia Pacific (Jakarta)" }, "ap-southeast-4": { description: "Asia Pacific (Melbourne)" }, "ap-southeast-5": { description: "Asia Pacific (Malaysia)" }, "ap-southeast-7": { description: "Asia Pacific (Thailand)" }, "aws-global": { description: "AWS Standard global region" }, "ca-central-1": { description: "Canada (Central)" }, "ca-west-1": { description: "Canada West (Calgary)" }, "eu-central-1": { description: "Europe (Frankfurt)" }, "eu-central-2": { description: "Europe (Zurich)" }, "eu-north-1": { description: "Europe (Stockholm)" }, "eu-south-1": { description: "Europe (Milan)" }, "eu-south-2": { description: "Europe (Spain)" }, "eu-west-1": { description: "Europe (Ireland)" }, "eu-west-2": { description: "Europe (London)" }, "eu-west-3": { description: "Europe (Paris)" }, "il-central-1": { description: "Israel (Tel Aviv)" }, "me-central-1": { description: "Middle East (UAE)" }, "me-south-1": { description: "Middle East (Bahrain)" }, "mx-central-1": { description: "Mexico (Central)" }, "sa-east-1": { description: "South America (Sao Paulo)" }, "us-east-1": { description: "US East (N. Virginia)" }, "us-east-2": { description: "US East (Ohio)" }, "us-west-1": { description: "US West (N. California)" }, "us-west-2": { description: "US West (Oregon)" } } }, { id: "aws-cn", outputs: { dnsSuffix: "amazonaws.com.cn", dualStackDnsSuffix: "api.amazonwebservices.com.cn", implicitGlobalRegion: "cn-northwest-1", name: "aws-cn", supportsDualStack: !0, supportsFIPS: !0 }, regionRegex: "^cn\\-\\w+\\-\\d+$", regions: { "aws-cn-global": { description: "AWS China global region" }, "cn-north-1": { description: "China (Beijing)" }, "cn-northwest-1": { description: "China (Ningxia)" } } }, { id: "aws-us-gov", outputs: { dnsSuffix: "amazonaws.com", dualStackDnsSuffix: "api.aws", implicitGlobalRegion: "us-gov-west-1", name: "aws-us-gov", supportsDualStack: !0, supportsFIPS: !0 }, regionRegex: "^us\\-gov\\-\\w+\\-\\d+$", regions: { "aws-us-gov-global": { description: "AWS GovCloud (US) global region" }, "us-gov-east-1": { description: "AWS GovCloud (US-East)" }, "us-gov-west-1": { description: "AWS GovCloud (US-West)" } } }, { id: "aws-iso", outputs: { dnsSuffix: "c2s.ic.gov", dualStackDnsSuffix: "c2s.ic.gov", implicitGlobalRegion: "us-iso-east-1", name: "aws-iso", supportsDualStack: !1, supportsFIPS: !0 }, regionRegex: "^us\\-iso\\-\\w+\\-\\d+$", regions: { "aws-iso-global": { description: "AWS ISO (US) global region" }, "us-iso-east-1": { description: "US ISO East" }, "us-iso-west-1": { description: "US ISO WEST" } } }, { id: "aws-iso-b", outputs: { dnsSuffix: "sc2s.sgov.gov", dualStackDnsSuffix: "sc2s.sgov.gov", implicitGlobalRegion: "us-isob-east-1", name: "aws-iso-b", supportsDualStack: !1, supportsFIPS: !0 }, regionRegex: "^us\\-isob\\-\\w+\\-\\d+$", regions: { "aws-iso-b-global": { description: "AWS ISOB (US) global region" }, "us-isob-east-1": { description: "US ISOB East (Ohio)" } } }, { id: "aws-iso-e", outputs: { dnsSuffix: "cloud.adc-e.uk", dualStackDnsSuffix: "cloud.adc-e.uk", implicitGlobalRegion: "eu-isoe-west-1", name: "aws-iso-e", supportsDualStack: !1, supportsFIPS: !0 }, regionRegex: "^eu\\-isoe\\-\\w+\\-\\d+$", regions: { "eu-isoe-west-1": { description: "EU ISOE West" } } }, { id: "aws-iso-f", outputs: { dnsSuffix: "csp.hci.ic.gov", dualStackDnsSuffix: "csp.hci.ic.gov", implicitGlobalRegion: "us-isof-south-1", name: "aws-iso-f", supportsDualStack: !1, supportsFIPS: !0 }, regionRegex: "^us\\-isof\\-\\w+\\-\\d+$", regions: {} }], iu = {
  partitions: su
};
let ou = iu;
const au = (e) => {
  const { partitions: t } = ou;
  for (const n of t) {
    const { regions: s, outputs: i } = n;
    for (const [o, a] of Object.entries(s))
      if (o === e)
        return {
          ...i,
          ...a
        };
  }
  for (const n of t) {
    const { regionRegex: s, outputs: i } = n;
    if (new RegExp(s).test(e))
      return {
        ...i
      };
  }
  const r = t.find((n) => n.id === "aws");
  if (!r)
    throw new Error("Provided region was not found in the partition array or regex, and default partition with id 'aws' doesn't exist.");
  return {
    ...r.outputs
  };
}, mi = {
  isVirtualHostableS3Bucket: pi,
  parseArn: nu,
  partition: au
};
at.aws = mi;
function cu(e, t, r) {
  return e.$source || (e.$source = {}), e.$source[t] = r, e;
}
function Q(e, t, r) {
  e.__aws_sdk_context ? e.__aws_sdk_context.features || (e.__aws_sdk_context.features = {}) : e.__aws_sdk_context = {
    features: {}
  }, e.__aws_sdk_context.features[t] = r;
}
const kn = (e) => {
  var t, r;
  return ot.isInstance(e) ? ((t = e.headers) == null ? void 0 : t.date) ?? ((r = e.headers) == null ? void 0 : r.Date) : void 0;
}, yi = (e) => new Date(Date.now() + e), uu = (e, t) => Math.abs(yi(t).getTime() - e) >= 3e5, Mn = (e, t) => {
  const r = Date.parse(e);
  return uu(r, t) ? r - Date.now() : t;
}, Me = (e, t) => {
  if (!t)
    throw new Error(`Property \`${e}\` is not resolved for AWS SDK SigV4Auth`);
  return t;
}, du = async (e) => {
  var c, d, l;
  const t = Me("context", e.context), r = Me("config", e.config), n = (l = (d = (c = t.endpointV2) == null ? void 0 : c.properties) == null ? void 0 : d.authSchemes) == null ? void 0 : l[0], i = await Me("signer", r.signer)(n), o = e == null ? void 0 : e.signingRegion, a = e == null ? void 0 : e.signingRegionSet, u = e == null ? void 0 : e.signingName;
  return {
    config: r,
    signer: i,
    signingRegion: o,
    signingRegionSet: a,
    signingName: u
  };
};
class lu {
  async sign(t, r, n) {
    var l;
    if (!oe.isInstance(t))
      throw new Error("The request is not an instance of `HttpRequest` and cannot be signed");
    const s = await du(n), { config: i, signer: o } = s;
    let { signingRegion: a, signingName: u } = s;
    const c = n.context;
    if (((l = c == null ? void 0 : c.authSchemes) == null ? void 0 : l.length) ?? !1) {
      const [f, h] = c.authSchemes;
      (f == null ? void 0 : f.name) === "sigv4a" && (h == null ? void 0 : h.name) === "sigv4" && (a = (h == null ? void 0 : h.signingRegion) ?? a, u = (h == null ? void 0 : h.signingName) ?? u);
    }
    return await o.sign(t, {
      signingDate: yi(i.systemClockOffset),
      signingRegion: a,
      signingService: u
    });
  }
  errorHandler(t) {
    return (r) => {
      const n = r.ServerTime ?? kn(r.$response);
      if (n) {
        const s = Me("config", t.config), i = s.systemClockOffset;
        s.systemClockOffset = Mn(n, s.systemClockOffset), s.systemClockOffset !== i && r.$metadata && (r.$metadata.clockSkewCorrected = !0);
      }
      throw r;
    };
  }
  successHandler(t, r) {
    const n = kn(t);
    if (n) {
      const s = Me("config", r.config);
      s.systemClockOffset = Mn(n, s.systemClockOffset);
    }
  }
}
const fu = (e, t, r) => {
  let n, s, i, o = !1;
  const a = async () => {
    s || (s = e());
    try {
      n = await s, i = !0, o = !1;
    } finally {
      s = void 0;
    }
    return n;
  };
  return async (u) => ((!i || u != null && u.forceRefresh) && (n = await a()), n);
}, gi = {}, ir = {};
for (let e = 0; e < 256; e++) {
  let t = e.toString(16).toLowerCase();
  t.length === 1 && (t = `0${t}`), gi[e] = t, ir[t] = e;
}
function hu(e) {
  if (e.length % 2 !== 0)
    throw new Error("Hex encoded strings must have an even number length");
  const t = new Uint8Array(e.length / 2);
  for (let r = 0; r < e.length; r += 2) {
    const n = e.slice(r, r + 2).toLowerCase();
    if (n in ir)
      t[r / 2] = ir[n];
    else
      throw new Error(`Cannot decode unrecognized sequence ${n} as hexadecimal`);
  }
  return t;
}
function de(e) {
  let t = "";
  for (let r = 0; r < e.byteLength; r++)
    t += gi[e[r]];
  return t;
}
const pu = "X-Amz-Algorithm", mu = "X-Amz-Credential", wi = "X-Amz-Date", yu = "X-Amz-SignedHeaders", gu = "X-Amz-Expires", Ei = "X-Amz-Signature", Si = "X-Amz-Security-Token", bi = "authorization", Ri = wi.toLowerCase(), wu = "date", Eu = [bi, Ri, wu], Su = Ei.toLowerCase(), or = "x-amz-content-sha256", bu = Si.toLowerCase(), Ru = {
  authorization: !0,
  "cache-control": !0,
  connection: !0,
  expect: !0,
  from: !0,
  "keep-alive": !0,
  "max-forwards": !0,
  pragma: !0,
  referer: !0,
  te: !0,
  trailer: !0,
  "transfer-encoding": !0,
  upgrade: !0,
  "user-agent": !0,
  "x-amzn-trace-id": !0
}, Au = /^proxy-/, Tu = /^sec-/, jt = "AWS4-HMAC-SHA256", vu = "AWS4-HMAC-SHA256-PAYLOAD", Cu = "UNSIGNED-PAYLOAD", _u = 50, Ai = "aws4_request", xu = 60 * 60 * 24 * 7, Ge = {}, zt = [], Vt = (e, t, r) => `${e}/${t}/${r}/${Ai}`, Ou = async (e, t, r, n, s) => {
  const i = await Un(e, t.secretAccessKey, t.accessKeyId), o = `${r}:${n}:${s}:${de(i)}:${t.sessionToken}`;
  if (o in Ge)
    return Ge[o];
  for (zt.push(o); zt.length > _u; )
    delete Ge[zt.shift()];
  let a = `AWS4${t.secretAccessKey}`;
  for (const u of [r, n, s, Ai])
    a = await Un(e, a, u);
  return Ge[o] = a;
}, Un = (e, t, r) => {
  const n = new e(t);
  return n.update(ke(r)), n.digest();
}, $n = ({ headers: e }, t, r) => {
  const n = {};
  for (const s of Object.keys(e).sort()) {
    if (e[s] == null)
      continue;
    const i = s.toLowerCase();
    (i in Ru || t != null && t.has(i) || Au.test(i) || Tu.test(i)) && (!r || r && !r.has(i)) || (n[i] = e[s].trim().replace(/\s+/g, " "));
  }
  return n;
}, Iu = ({ query: e = {} }) => {
  const t = [], r = {};
  for (const n of Object.keys(e)) {
    if (n.toLowerCase() === Su)
      continue;
    const s = pe(n);
    t.push(s);
    const i = e[n];
    typeof i == "string" ? r[s] = `${s}=${pe(i)}` : Array.isArray(i) && (r[s] = i.slice(0).reduce((o, a) => o.concat([`${s}=${pe(a)}`]), []).sort().join("&"));
  }
  return t.sort().map((n) => r[n]).filter((n) => n).join("&");
}, Du = (e) => typeof ArrayBuffer == "function" && e instanceof ArrayBuffer || Object.prototype.toString.call(e) === "[object ArrayBuffer]", Wt = async ({ headers: e, body: t }, r) => {
  for (const n of Object.keys(e))
    if (n.toLowerCase() === or)
      return e[n];
  if (t == null)
    return "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
  if (typeof t == "string" || ArrayBuffer.isView(t) || Du(t)) {
    const n = new r();
    return n.update(ke(t)), de(await n.digest());
  }
  return Cu;
};
class Pu {
  format(t) {
    const r = [];
    for (const i of Object.keys(t)) {
      const o = Re(i);
      r.push(Uint8Array.from([o.byteLength]), o, this.formatHeaderValue(t[i]));
    }
    const n = new Uint8Array(r.reduce((i, o) => i + o.byteLength, 0));
    let s = 0;
    for (const i of r)
      n.set(i, s), s += i.byteLength;
    return n;
  }
  formatHeaderValue(t) {
    switch (t.type) {
      case "boolean":
        return Uint8Array.from([t.value ? 0 : 1]);
      case "byte":
        return Uint8Array.from([2, t.value]);
      case "short":
        const r = new DataView(new ArrayBuffer(3));
        return r.setUint8(0, 3), r.setInt16(1, t.value, !1), new Uint8Array(r.buffer);
      case "integer":
        const n = new DataView(new ArrayBuffer(5));
        return n.setUint8(0, 4), n.setInt32(1, t.value, !1), new Uint8Array(n.buffer);
      case "long":
        const s = new Uint8Array(9);
        return s[0] = 5, s.set(t.value.bytes, 1), s;
      case "binary":
        const i = new DataView(new ArrayBuffer(3 + t.value.byteLength));
        i.setUint8(0, 6), i.setUint16(1, t.value.byteLength, !1);
        const o = new Uint8Array(i.buffer);
        return o.set(t.value, 3), o;
      case "string":
        const a = Re(t.value), u = new DataView(new ArrayBuffer(3 + a.byteLength));
        u.setUint8(0, 7), u.setUint16(1, a.byteLength, !1);
        const c = new Uint8Array(u.buffer);
        return c.set(a, 3), c;
      case "timestamp":
        const d = new Uint8Array(9);
        return d[0] = 8, d.set(br.fromNumber(t.value.valueOf()).bytes, 1), d;
      case "uuid":
        if (!Nu.test(t.value))
          throw new Error(`Invalid UUID received: ${t.value}`);
        const l = new Uint8Array(17);
        return l[0] = 9, l.set(hu(t.value.replace(/\-/g, "")), 1), l;
    }
  }
}
var Ln;
(function(e) {
  e[e.boolTrue = 0] = "boolTrue", e[e.boolFalse = 1] = "boolFalse", e[e.byte = 2] = "byte", e[e.short = 3] = "short", e[e.integer = 4] = "integer", e[e.long = 5] = "long", e[e.byteArray = 6] = "byteArray", e[e.string = 7] = "string", e[e.timestamp = 8] = "timestamp", e[e.uuid = 9] = "uuid";
})(Ln || (Ln = {}));
const Nu = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
class br {
  constructor(t) {
    if (this.bytes = t, t.byteLength !== 8)
      throw new Error("Int64 buffers must be exactly 8 bytes");
  }
  static fromNumber(t) {
    if (t > 9223372036854776e3 || t < -9223372036854776e3)
      throw new Error(`${t} is too large (or, if negative, too small) to represent as an Int64`);
    const r = new Uint8Array(8);
    for (let n = 7, s = Math.abs(Math.round(t)); n > -1 && s > 0; n--, s /= 256)
      r[n] = s;
    return t < 0 && Fn(r), new br(r);
  }
  valueOf() {
    const t = this.bytes.slice(0), r = t[0] & 128;
    return r && Fn(t), parseInt(de(t), 16) * (r ? -1 : 1);
  }
  toString() {
    return String(this.valueOf());
  }
}
function Fn(e) {
  for (let t = 0; t < 8; t++)
    e[t] ^= 255;
  for (let t = 7; t > -1 && (e[t]++, e[t] === 0); t--)
    ;
}
const ku = (e, t) => {
  e = e.toLowerCase();
  for (const r of Object.keys(t))
    if (e === r.toLowerCase())
      return !0;
  return !1;
}, Mu = (e, t = {}) => {
  var s, i;
  const { headers: r, query: n = {} } = oe.clone(e);
  for (const o of Object.keys(r)) {
    const a = o.toLowerCase();
    (a.slice(0, 6) === "x-amz-" && !((s = t.unhoistableHeaders) != null && s.has(a)) || (i = t.hoistableHeaders) != null && i.has(a)) && (n[o] = r[o], delete r[o]);
  }
  return {
    ...e,
    headers: r,
    query: n
  };
}, Bn = (e) => {
  e = oe.clone(e);
  for (const t of Object.keys(e.headers))
    Eu.indexOf(t.toLowerCase()) > -1 && delete e.headers[t];
  return e;
}, Uu = (e) => $u(e).toISOString().replace(/\.\d{3}Z$/, "Z"), $u = (e) => typeof e == "number" ? new Date(e * 1e3) : typeof e == "string" ? Number(e) ? new Date(Number(e) * 1e3) : new Date(e) : e;
class Hn {
  constructor({ applyChecksum: t, credentials: r, region: n, service: s, sha256: i, uriEscapePath: o = !0 }) {
    this.headerFormatter = new Pu(), this.service = s, this.sha256 = i, this.uriEscapePath = o, this.applyChecksum = typeof t == "boolean" ? t : !0, this.regionProvider = re(n), this.credentialProvider = re(r);
  }
  async presign(t, r = {}) {
    const { signingDate: n = /* @__PURE__ */ new Date(), expiresIn: s = 3600, unsignableHeaders: i, unhoistableHeaders: o, signableHeaders: a, hoistableHeaders: u, signingRegion: c, signingService: d } = r, l = await this.credentialProvider();
    this.validateResolvedCredentials(l);
    const f = c ?? await this.regionProvider(), { longDate: h, shortDate: y } = Ke(n);
    if (s > xu)
      return Promise.reject("Signature version 4 presigned URLs must have an expiration date less than one week in the future");
    const w = Vt(y, f, d ?? this.service), m = Mu(Bn(t), { unhoistableHeaders: o, hoistableHeaders: u });
    l.sessionToken && (m.query[Si] = l.sessionToken), m.query[pu] = jt, m.query[mu] = `${l.accessKeyId}/${w}`, m.query[wi] = h, m.query[gu] = s.toString(10);
    const S = $n(m, i, a);
    return m.query[yu] = qn(S), m.query[Ei] = await this.getSignature(h, w, this.getSigningKey(l, f, y, d), this.createCanonicalRequest(m, S, await Wt(t, this.sha256))), m;
  }
  async sign(t, r) {
    return typeof t == "string" ? this.signString(t, r) : t.headers && t.payload ? this.signEvent(t, r) : t.message ? this.signMessage(t, r) : this.signRequest(t, r);
  }
  async signEvent({ headers: t, payload: r }, { signingDate: n = /* @__PURE__ */ new Date(), priorSignature: s, signingRegion: i, signingService: o }) {
    const a = i ?? await this.regionProvider(), { shortDate: u, longDate: c } = Ke(n), d = Vt(u, a, o ?? this.service), l = await Wt({ headers: {}, body: r }, this.sha256), f = new this.sha256();
    f.update(t);
    const h = de(await f.digest()), y = [
      vu,
      c,
      d,
      s,
      h,
      l
    ].join(`
`);
    return this.signString(y, { signingDate: n, signingRegion: a, signingService: o });
  }
  async signMessage(t, { signingDate: r = /* @__PURE__ */ new Date(), signingRegion: n, signingService: s }) {
    return this.signEvent({
      headers: this.headerFormatter.format(t.message.headers),
      payload: t.message.body
    }, {
      signingDate: r,
      signingRegion: n,
      signingService: s,
      priorSignature: t.priorSignature
    }).then((o) => ({ message: t.message, signature: o }));
  }
  async signString(t, { signingDate: r = /* @__PURE__ */ new Date(), signingRegion: n, signingService: s } = {}) {
    const i = await this.credentialProvider();
    this.validateResolvedCredentials(i);
    const o = n ?? await this.regionProvider(), { shortDate: a } = Ke(r), u = new this.sha256(await this.getSigningKey(i, o, a, s));
    return u.update(ke(t)), de(await u.digest());
  }
  async signRequest(t, { signingDate: r = /* @__PURE__ */ new Date(), signableHeaders: n, unsignableHeaders: s, signingRegion: i, signingService: o } = {}) {
    const a = await this.credentialProvider();
    this.validateResolvedCredentials(a);
    const u = i ?? await this.regionProvider(), c = Bn(t), { longDate: d, shortDate: l } = Ke(r), f = Vt(l, u, o ?? this.service);
    c.headers[Ri] = d, a.sessionToken && (c.headers[bu] = a.sessionToken);
    const h = await Wt(c, this.sha256);
    !ku(or, c.headers) && this.applyChecksum && (c.headers[or] = h);
    const y = $n(c, s, n), w = await this.getSignature(d, f, this.getSigningKey(a, u, l, o), this.createCanonicalRequest(c, y, h));
    return c.headers[bi] = `${jt} Credential=${a.accessKeyId}/${f}, SignedHeaders=${qn(y)}, Signature=${w}`, c;
  }
  createCanonicalRequest(t, r, n) {
    const s = Object.keys(r).sort();
    return `${t.method}
${this.getCanonicalPath(t)}
${Iu(t)}
${s.map((i) => `${i}:${r[i]}`).join(`
`)}

${s.join(";")}
${n}`;
  }
  async createStringToSign(t, r, n) {
    const s = new this.sha256();
    s.update(ke(n));
    const i = await s.digest();
    return `${jt}
${t}
${r}
${de(i)}`;
  }
  getCanonicalPath({ path: t }) {
    if (this.uriEscapePath) {
      const r = [];
      for (const i of t.split("/"))
        (i == null ? void 0 : i.length) !== 0 && i !== "." && (i === ".." ? r.pop() : r.push(i));
      const n = `${t != null && t.startsWith("/") ? "/" : ""}${r.join("/")}${r.length > 0 && (t != null && t.endsWith("/")) ? "/" : ""}`;
      return pe(n).replace(/%2F/g, "/");
    }
    return t;
  }
  async getSignature(t, r, n, s) {
    const i = await this.createStringToSign(t, r, s), o = new this.sha256(await n);
    return o.update(ke(i)), de(await o.digest());
  }
  getSigningKey(t, r, n, s) {
    return Ou(this.sha256, t, n, r, s || this.service);
  }
  validateResolvedCredentials(t) {
    if (typeof t != "object" || typeof t.accessKeyId != "string" || typeof t.secretAccessKey != "string")
      throw new Error("Resolved credential object is not valid");
  }
}
const Ke = (e) => {
  const t = Uu(e).replace(/[\-:]/g, "");
  return {
    longDate: t,
    shortDate: t.slice(0, 8)
  };
}, qn = (e) => Object.keys(e).sort().join(";"), Lu = (e) => {
  let t = !1, r;
  e.credentials && (t = !0, r = Pc(e.credentials, Dc, oi)), r || (e.credentialDefaultProvider ? r = Pe(e.credentialDefaultProvider(Object.assign({}, e, {
    parentClientConfig: e
  }))) : r = async () => {
    throw new Error("`credentials` is missing");
  });
  const n = async () => r({ callerClientConfig: e }), { signingEscapePath: s = !0, systemClockOffset: i = e.systemClockOffset || 0, sha256: o } = e;
  let a;
  return e.signer ? a = Pe(e.signer) : e.regionInfoProvider ? a = () => Pe(e.region)().then(async (u) => [
    await e.regionInfoProvider(u, {
      useFipsEndpoint: await e.useFipsEndpoint(),
      useDualstackEndpoint: await e.useDualstackEndpoint()
    }) || {},
    u
  ]).then(([u, c]) => {
    const { signingRegion: d, signingService: l } = u;
    e.signingRegion = e.signingRegion || d || c, e.signingName = e.signingName || l || e.serviceId;
    const f = {
      ...e,
      credentials: n,
      region: e.signingRegion,
      service: e.signingName,
      sha256: o,
      uriEscapePath: s
    }, h = e.signerConstructor || Hn;
    return new h(f);
  }) : a = async (u) => {
    u = Object.assign({}, {
      name: "sigv4",
      signingName: e.signingName || e.defaultSigningName,
      signingRegion: await Pe(e.region)(),
      properties: {}
    }, u);
    const c = u.signingRegion, d = u.signingName;
    e.signingRegion = e.signingRegion || c, e.signingName = e.signingName || d || e.serviceId;
    const l = {
      ...e,
      credentials: n,
      region: e.signingRegion,
      service: e.signingName,
      sha256: o,
      uriEscapePath: s
    }, f = e.signerConstructor || Hn;
    return new f(l);
  }, {
    ...e,
    systemClockOffset: i,
    signingEscapePath: s,
    credentials: t ? async () => n().then((u) => cu(u, "CREDENTIALS_CODE", "e")) : n,
    signer: a
  };
}, ae = (e, t) => {
  const r = [];
  if (e && r.push(e), t)
    for (const n of t)
      r.push(n);
  return r;
}, ee = (e, t) => `${e || "anonymous"}${t && t.length > 0 ? ` (a.k.a. ${t.join(",")})` : ""}`, ct = () => {
  let e = [], t = [], r = !1;
  const n = /* @__PURE__ */ new Set(), s = (l) => l.sort((f, h) => jn[h.step] - jn[f.step] || zn[h.priority || "normal"] - zn[f.priority || "normal"]), i = (l) => {
    let f = !1;
    const h = (y) => {
      const w = ae(y.name, y.aliases);
      if (w.includes(l)) {
        f = !0;
        for (const m of w)
          n.delete(m);
        return !1;
      }
      return !0;
    };
    return e = e.filter(h), t = t.filter(h), f;
  }, o = (l) => {
    let f = !1;
    const h = (y) => {
      if (y.middleware === l) {
        f = !0;
        for (const w of ae(y.name, y.aliases))
          n.delete(w);
        return !1;
      }
      return !0;
    };
    return e = e.filter(h), t = t.filter(h), f;
  }, a = (l) => {
    var f;
    return e.forEach((h) => {
      l.add(h.middleware, { ...h });
    }), t.forEach((h) => {
      l.addRelativeTo(h.middleware, { ...h });
    }), (f = l.identifyOnResolve) == null || f.call(l, d.identifyOnResolve()), l;
  }, u = (l) => {
    const f = [];
    return l.before.forEach((h) => {
      h.before.length === 0 && h.after.length === 0 ? f.push(h) : f.push(...u(h));
    }), f.push(l), l.after.reverse().forEach((h) => {
      h.before.length === 0 && h.after.length === 0 ? f.push(h) : f.push(...u(h));
    }), f;
  }, c = (l = !1) => {
    const f = [], h = [], y = {};
    return e.forEach((m) => {
      const S = {
        ...m,
        before: [],
        after: []
      };
      for (const b of ae(S.name, S.aliases))
        y[b] = S;
      f.push(S);
    }), t.forEach((m) => {
      const S = {
        ...m,
        before: [],
        after: []
      };
      for (const b of ae(S.name, S.aliases))
        y[b] = S;
      h.push(S);
    }), h.forEach((m) => {
      if (m.toMiddleware) {
        const S = y[m.toMiddleware];
        if (S === void 0) {
          if (l)
            return;
          throw new Error(`${m.toMiddleware} is not found when adding ${ee(m.name, m.aliases)} middleware ${m.relation} ${m.toMiddleware}`);
        }
        m.relation === "after" && S.after.push(m), m.relation === "before" && S.before.push(m);
      }
    }), s(f).map(u).reduce((m, S) => (m.push(...S), m), []);
  }, d = {
    add: (l, f = {}) => {
      const { name: h, override: y, aliases: w } = f, m = {
        step: "initialize",
        priority: "normal",
        middleware: l,
        ...f
      }, S = ae(h, w);
      if (S.length > 0) {
        if (S.some((b) => n.has(b))) {
          if (!y)
            throw new Error(`Duplicate middleware name '${ee(h, w)}'`);
          for (const b of S) {
            const T = e.findIndex((C) => {
              var D;
              return C.name === b || ((D = C.aliases) == null ? void 0 : D.some((K) => K === b));
            });
            if (T === -1)
              continue;
            const v = e[T];
            if (v.step !== m.step || m.priority !== v.priority)
              throw new Error(`"${ee(v.name, v.aliases)}" middleware with ${v.priority} priority in ${v.step} step cannot be overridden by "${ee(h, w)}" middleware with ${m.priority} priority in ${m.step} step.`);
            e.splice(T, 1);
          }
        }
        for (const b of S)
          n.add(b);
      }
      e.push(m);
    },
    addRelativeTo: (l, f) => {
      const { name: h, override: y, aliases: w } = f, m = {
        middleware: l,
        ...f
      }, S = ae(h, w);
      if (S.length > 0) {
        if (S.some((b) => n.has(b))) {
          if (!y)
            throw new Error(`Duplicate middleware name '${ee(h, w)}'`);
          for (const b of S) {
            const T = t.findIndex((C) => {
              var D;
              return C.name === b || ((D = C.aliases) == null ? void 0 : D.some((K) => K === b));
            });
            if (T === -1)
              continue;
            const v = t[T];
            if (v.toMiddleware !== m.toMiddleware || v.relation !== m.relation)
              throw new Error(`"${ee(v.name, v.aliases)}" middleware ${v.relation} "${v.toMiddleware}" middleware cannot be overridden by "${ee(h, w)}" middleware ${m.relation} "${m.toMiddleware}" middleware.`);
            t.splice(T, 1);
          }
        }
        for (const b of S)
          n.add(b);
      }
      t.push(m);
    },
    clone: () => a(ct()),
    use: (l) => {
      l.applyToStack(d);
    },
    remove: (l) => typeof l == "string" ? i(l) : o(l),
    removeByTag: (l) => {
      let f = !1;
      const h = (y) => {
        const { tags: w, name: m, aliases: S } = y;
        if (w && w.includes(l)) {
          const b = ae(m, S);
          for (const T of b)
            n.delete(T);
          return f = !0, !1;
        }
        return !0;
      };
      return e = e.filter(h), t = t.filter(h), f;
    },
    concat: (l) => {
      var h;
      const f = a(ct());
      return f.use(l), f.identifyOnResolve(r || f.identifyOnResolve() || (((h = l.identifyOnResolve) == null ? void 0 : h.call(l)) ?? !1)), f;
    },
    applyToStack: a,
    identify: () => c(!0).map((l) => {
      const f = l.step ?? l.relation + " " + l.toMiddleware;
      return ee(l.name, l.aliases) + " - " + f;
    }),
    identifyOnResolve(l) {
      return typeof l == "boolean" && (r = l), r;
    },
    resolve: (l, f) => {
      for (const h of c().map((y) => y.middleware).reverse())
        l = h(l, f);
      return r && console.log(d.identify()), l;
    }
  };
  return d;
}, jn = {
  initialize: 5,
  serialize: 4,
  build: 3,
  finalizeRequest: 2,
  deserialize: 1
}, zn = {
  high: 3,
  normal: 2,
  low: 1
};
class Fu {
  constructor(t) {
    this.config = t, this.middlewareStack = ct();
  }
  send(t, r, n) {
    const s = typeof r != "function" ? r : void 0, i = typeof r == "function" ? r : n, o = s === void 0 && this.config.cacheMiddleware === !0;
    let a;
    if (o) {
      this.handlers || (this.handlers = /* @__PURE__ */ new WeakMap());
      const u = this.handlers;
      u.has(t.constructor) ? a = u.get(t.constructor) : (a = t.resolveMiddleware(this.middlewareStack, this.config, s), u.set(t.constructor, a));
    } else
      delete this.handlers, a = t.resolveMiddleware(this.middlewareStack, this.config, s);
    if (i)
      a(t).then((u) => i(null, u.output), (u) => i(u)).catch(() => {
      });
    else
      return a(t).then((u) => u.output);
  }
  destroy() {
    var t, r, n;
    (n = (r = (t = this.config) == null ? void 0 : t.requestHandler) == null ? void 0 : r.destroy) == null || n.call(r), delete this.handlers;
  }
}
var Vn;
(function(e) {
  e.HEADER = "header", e.QUERY = "query";
})(Vn || (Vn = {}));
var Wn;
(function(e) {
  e.HEADER = "header", e.QUERY = "query";
})(Wn || (Wn = {}));
var Gn;
(function(e) {
  e.HTTP = "http", e.HTTPS = "https";
})(Gn || (Gn = {}));
var ut;
(function(e) {
  e.MD5 = "md5", e.CRC32 = "crc32", e.CRC32C = "crc32c", e.SHA1 = "sha1", e.SHA256 = "sha256";
})(ut || (ut = {}));
var Kn;
(function(e) {
  e[e.HEADER = 0] = "HEADER", e[e.TRAILER = 1] = "TRAILER";
})(Kn || (Kn = {}));
const Bu = "__smithy_context";
var Jn;
(function(e) {
  e.PROFILE = "profile", e.SSO_SESSION = "sso-session", e.SERVICES = "services";
})(Jn || (Jn = {}));
var Xn;
(function(e) {
  e.HTTP_0_9 = "http/0.9", e.HTTP_1_0 = "http/1.0", e.TDS_8_0 = "tds/8.0";
})(Xn || (Xn = {}));
class je {
  constructor() {
    this.middlewareStack = ct();
  }
  static classBuilder() {
    return new Hu();
  }
  resolveMiddlewareWithContext(t, r, n, { middlewareFn: s, clientName: i, commandName: o, inputFilterSensitiveLog: a, outputFilterSensitiveLog: u, smithyContext: c, additionalContext: d, CommandCtor: l }) {
    for (const m of s.bind(this)(l, t, r, n))
      this.middlewareStack.use(m);
    const f = t.concat(this.middlewareStack), { logger: h } = r, y = {
      logger: h,
      clientName: i,
      commandName: o,
      inputFilterSensitiveLog: a,
      outputFilterSensitiveLog: u,
      [Bu]: {
        commandInstance: this,
        ...c
      },
      ...d
    }, { requestHandler: w } = r;
    return f.resolve((m) => w.handle(m.request, n || {}), y);
  }
}
class Hu {
  constructor() {
    this._init = () => {
    }, this._ep = {}, this._middlewareFn = () => [], this._commandName = "", this._clientName = "", this._additionalContext = {}, this._smithyContext = {}, this._inputFilterSensitiveLog = (t) => t, this._outputFilterSensitiveLog = (t) => t, this._serializer = null, this._deserializer = null;
  }
  init(t) {
    this._init = t;
  }
  ep(t) {
    return this._ep = t, this;
  }
  m(t) {
    return this._middlewareFn = t, this;
  }
  s(t, r, n = {}) {
    return this._smithyContext = {
      service: t,
      operation: r,
      ...n
    }, this;
  }
  c(t = {}) {
    return this._additionalContext = t, this;
  }
  n(t, r) {
    return this._clientName = t, this._commandName = r, this;
  }
  f(t = (n) => n, r = (n) => n) {
    return this._inputFilterSensitiveLog = t, this._outputFilterSensitiveLog = r, this;
  }
  ser(t) {
    return this._serializer = t, this;
  }
  de(t) {
    return this._deserializer = t, this;
  }
  build() {
    const t = this;
    let r;
    return r = class extends je {
      static getEndpointParameterInstructions() {
        return t._ep;
      }
      constructor(...[n]) {
        super(), this.serialize = t._serializer, this.deserialize = t._deserializer, this.input = n ?? {}, t._init(this);
      }
      resolveMiddleware(n, s, i) {
        return this.resolveMiddlewareWithContext(n, s, i, {
          CommandCtor: r,
          middlewareFn: t._middlewareFn,
          clientName: t._clientName,
          commandName: t._commandName,
          inputFilterSensitiveLog: t._inputFilterSensitiveLog,
          outputFilterSensitiveLog: t._outputFilterSensitiveLog,
          smithyContext: t._smithyContext,
          additionalContext: t._additionalContext
        });
      }
    };
  }
}
const L = "***SensitiveInformation***", qu = (e, t) => {
  for (const r of Object.keys(e)) {
    const n = e[r], s = async function(o, a, u) {
      const c = new n(o);
      if (typeof a == "function")
        this.send(c, a);
      else if (typeof u == "function") {
        if (typeof a != "object")
          throw new Error(`Expected http options but got ${typeof a}`);
        this.send(c, a || {}, u);
      } else
        return this.send(c, a);
    }, i = (r[0].toLowerCase() + r.slice(1)).replace(/Command$/, "");
    t.prototype[i] = s;
  }
}, ar = (e) => {
  if (e != null) {
    if (Number.isInteger(e) && !Number.isNaN(e))
      return e;
    throw new TypeError(`Expected integer, got ${typeof e}: ${e}`);
  }
}, dt = (e) => ju(e, 32), ju = (e, t) => {
  const r = ar(e);
  if (r !== void 0 && zu(r, t) !== r)
    throw new TypeError(`Expected ${t}-bit integer, got ${e}`);
  return r;
}, zu = (e, t) => {
  switch (t) {
    case 32:
      return Int32Array.of(e)[0];
    case 16:
      return Int16Array.of(e)[0];
    case 8:
      return Int8Array.of(e)[0];
  }
}, At = (e, t) => {
  if (e == null)
    throw new TypeError(`Expected a non-null value for ${t}`);
  return e;
}, Tt = (e) => {
  if (e == null)
    return;
  if (typeof e == "object" && !Array.isArray(e))
    return e;
  const t = Array.isArray(e) ? "array" : typeof e;
  throw new TypeError(`Expected object, got ${t}: ${e}`);
}, R = (e) => {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (["boolean", "number", "bigint"].includes(typeof e))
      return Wu.warn(Vu(`Expected string, got ${typeof e}: ${e}`)), String(e);
    throw new TypeError(`Expected string, got ${typeof e}: ${e}`);
  }
}, Vu = (e) => String(new TypeError(e).stack || e).split(`
`).slice(0, 5).filter((t) => !t.includes("stackTraceWarning")).join(`
`), Wu = {
  warn: console.warn
};
class Se extends Error {
  constructor(t) {
    super(t.message), Object.setPrototypeOf(this, Object.getPrototypeOf(this).constructor.prototype), this.name = t.name, this.$fault = t.$fault, this.$metadata = t.$metadata;
  }
  static isInstance(t) {
    if (!t)
      return !1;
    const r = t;
    return Se.prototype.isPrototypeOf(r) || !!r.$fault && !!r.$metadata && (r.$fault === "client" || r.$fault === "server");
  }
  static [Symbol.hasInstance](t) {
    if (!t)
      return !1;
    const r = t;
    return this === Se ? Se.isInstance(t) : Se.isInstance(t) ? r.name && this.name ? this.prototype.isPrototypeOf(t) || r.name === this.name : this.prototype.isPrototypeOf(t) : !1;
  }
}
const F = (e, t = {}) => {
  Object.entries(t).filter(([, n]) => n !== void 0).forEach(([n, s]) => {
    (e[n] == null || e[n] === "") && (e[n] = s);
  });
  const r = e.message || e.Message || "UnknownError";
  return e.message = r, delete e.Message, e;
}, Gu = ({ output: e, parsedBody: t, exceptionCtor: r, errorCode: n }) => {
  const s = Ju(e), i = s.httpStatusCode ? s.httpStatusCode + "" : void 0, o = new r({
    name: (t == null ? void 0 : t.code) || (t == null ? void 0 : t.Code) || n || i || "UnknownError",
    $fault: "client",
    $metadata: s
  });
  throw F(o, t);
}, Ku = (e) => ({ output: t, parsedBody: r, errorCode: n }) => {
  Gu({ output: t, parsedBody: r, exceptionCtor: e, errorCode: n });
}, Ju = (e) => ({
  httpStatusCode: e.statusCode,
  requestId: e.headers["x-amzn-requestid"] ?? e.headers["x-amzn-request-id"] ?? e.headers["x-amz-request-id"],
  extendedRequestId: e.headers["x-amz-id-2"],
  cfId: e.headers["x-amz-cf-id"]
}), Xu = (e) => {
  switch (e) {
    case "standard":
      return {
        retryMode: "standard",
        connectionTimeout: 3100
      };
    case "in-region":
      return {
        retryMode: "standard",
        connectionTimeout: 1100
      };
    case "cross-region":
      return {
        retryMode: "standard",
        connectionTimeout: 3100
      };
    case "mobile":
      return {
        retryMode: "standard",
        connectionTimeout: 3e4
      };
    default:
      return {};
  }
}, Qu = (e) => {
  const t = [];
  for (const r in ut) {
    const n = ut[r];
    e[n] !== void 0 && t.push({
      algorithmId: () => n,
      checksumConstructor: () => e[n]
    });
  }
  return {
    addChecksumAlgorithm(r) {
      t.push(r);
    },
    checksumAlgorithms() {
      return t;
    }
  };
}, Yu = (e) => {
  const t = {};
  return e.checksumAlgorithms().forEach((r) => {
    t[r.algorithmId()] = r.checksumConstructor();
  }), t;
}, Zu = (e) => ({
  setRetryStrategy(t) {
    e.retryStrategy = t;
  },
  retryStrategy() {
    return e.retryStrategy;
  }
}), ed = (e) => {
  const t = {};
  return t.retryStrategy = e.retryStrategy(), t;
}, td = (e) => Object.assign(Qu(e), Zu(e)), rd = (e) => Object.assign(Yu(e), ed(e));
class Ti {
  trace() {
  }
  debug() {
  }
  info() {
  }
  warn() {
  }
  error() {
  }
}
function P(e, t, r) {
  let n, s;
  n = {}, s = e;
  for (const i of Object.keys(s)) {
    if (!Array.isArray(s[i])) {
      n[i] = s[i];
      continue;
    }
    vi(n, null, s, i);
  }
  return n;
}
const x = (e, t) => {
  const r = {};
  for (const n in t)
    vi(r, e, t, n);
  return r;
}, vi = (e, t, r, n) => {
  if (t !== null) {
    let o = r[n];
    typeof o == "function" && (o = [, o]);
    const [a = nd, u = sd, c = n] = o;
    (typeof a == "function" && a(t[c]) || typeof a != "function" && a) && (e[n] = u(t[c]));
    return;
  }
  let [s, i] = r[n];
  if (typeof i == "function") {
    let o;
    const a = s === void 0 && (o = i()) != null, u = typeof s == "function" && !!s(void 0) || typeof s != "function" && !!s;
    a ? e[n] = o : u && (e[n] = i());
  } else {
    const o = s === void 0 && i != null, a = typeof s == "function" && !!s(i) || typeof s != "function" && !!s;
    (o || a) && (e[n] = i);
  }
}, nd = (e) => e != null, sd = (e) => e, ne = (e) => {
  if (e == null)
    return {};
  if (Array.isArray(e))
    return e.filter((t) => t != null).map(ne);
  if (typeof e == "object") {
    const t = {};
    for (const r of Object.keys(e))
      e[r] != null && (t[r] = ne(e[r]));
    return t;
  }
  return e;
}, id = (e, t) => Ac(e, t).then((r) => t.utf8Encoder(r)), ze = (e, t) => id(e, t).then((r) => {
  if (r.length)
    try {
      return JSON.parse(r);
    } catch (n) {
      throw (n == null ? void 0 : n.name) === "SyntaxError" && Object.defineProperty(n, "$responseBodyText", {
        value: r
      }), n;
    }
  return {};
}), od = async (e, t) => {
  const r = await ze(e, t);
  return r.message = r.message ?? r.Message, r;
}, ad = (e, t) => {
  const r = (i, o) => Object.keys(i).find((a) => a.toLowerCase() === o.toLowerCase()), n = (i) => {
    let o = i;
    return typeof o == "number" && (o = o.toString()), o.indexOf(",") >= 0 && (o = o.split(",")[0]), o.indexOf(":") >= 0 && (o = o.split(":")[0]), o.indexOf("#") >= 0 && (o = o.split("#")[1]), o;
  }, s = r(e.headers, "x-amzn-errortype");
  if (s !== void 0)
    return n(e.headers[s]);
  if (t.code !== void 0)
    return n(t.code);
  if (t.__type !== void 0)
    return n(t.__type);
}, cd = /\d{12}\.ddb/;
async function ud(e, t, r) {
  var i, o, a, u, c, d, l;
  const n = r.request;
  if (((i = n == null ? void 0 : n.headers) == null ? void 0 : i["smithy-protocol"]) === "rpc-v2-cbor" && Q(e, "PROTOCOL_RPC_V2_CBOR", "M"), typeof t.retryStrategy == "function") {
    const f = await t.retryStrategy();
    typeof f.acquireInitialRetryToken == "function" ? (a = (o = f.constructor) == null ? void 0 : o.name) != null && a.includes("Adaptive") ? Q(e, "RETRY_MODE_ADAPTIVE", "F") : Q(e, "RETRY_MODE_STANDARD", "E") : Q(e, "RETRY_MODE_LEGACY", "D");
  }
  if (typeof t.accountIdEndpointMode == "function") {
    const f = e.endpointV2;
    switch (String((u = f == null ? void 0 : f.url) == null ? void 0 : u.hostname).match(cd) && Q(e, "ACCOUNT_ID_ENDPOINT", "O"), await ((c = t.accountIdEndpointMode) == null ? void 0 : c.call(t))) {
      case "disabled":
        Q(e, "ACCOUNT_ID_MODE_DISABLED", "Q");
        break;
      case "preferred":
        Q(e, "ACCOUNT_ID_MODE_PREFERRED", "P");
        break;
      case "required":
        Q(e, "ACCOUNT_ID_MODE_REQUIRED", "R");
        break;
    }
  }
  const s = (l = (d = e.__smithy_context) == null ? void 0 : d.selectedHttpAuthScheme) == null ? void 0 : l.identity;
  if (s != null && s.$source) {
    const f = s;
    f.accountId && Q(e, "RESOLVED_ACCOUNT_ID", "T");
    for (const [h, y] of Object.entries(f.$source ?? {}))
      Q(e, h, y);
  }
}
const Qn = "user-agent", Gt = "x-amz-user-agent", Yn = " ", Kt = "/", dd = /[^\!\$\%\&\'\*\+\-\.\^\_\`\|\~\d\w]/g, ld = /[^\!\$\%\&\'\*\+\-\.\^\_\`\|\~\d\w\#]/g, Zn = "-", fd = 1024;
function hd(e) {
  let t = "";
  for (const r in e) {
    const n = e[r];
    if (t.length + n.length + 1 <= fd) {
      t.length ? t += "," + n : t += n;
      continue;
    }
    break;
  }
  return t;
}
const pd = (e) => (t, r) => async (n) => {
  var h, y, w, m;
  const { request: s } = n;
  if (!oe.isInstance(s))
    return t(n);
  const { headers: i } = s, o = ((h = r == null ? void 0 : r.userAgent) == null ? void 0 : h.map(Je)) || [], a = (await e.defaultUserAgentProvider()).map(Je);
  await ud(r, e, n);
  const u = r;
  a.push(`m/${hd(Object.assign({}, (y = r.__smithy_context) == null ? void 0 : y.features, (w = u.__aws_sdk_context) == null ? void 0 : w.features))}`);
  const c = ((m = e == null ? void 0 : e.customUserAgent) == null ? void 0 : m.map(Je)) || [], d = await e.userAgentAppId();
  d && a.push(Je([`app/${d}`]));
  const l = [].concat([...a, ...o, ...c]).join(Yn), f = [
    ...a.filter((S) => S.startsWith("aws-sdk-")),
    ...c
  ].join(Yn);
  return e.runtime !== "browser" ? (f && (i[Gt] = i[Gt] ? `${i[Qn]} ${f}` : f), i[Qn] = l) : i[Gt] = l, t({
    ...n,
    request: s
  });
}, Je = (e) => {
  var o;
  const t = e[0].split(Kt).map((a) => a.replace(dd, Zn)).join(Kt), r = (o = e[1]) == null ? void 0 : o.replace(ld, Zn), n = t.indexOf(Kt), s = t.substring(0, n);
  let i = t.substring(n + 1);
  return s === "api" && (i = i.toLowerCase()), [s, i, r].filter((a) => a && a.length > 0).reduce((a, u, c) => {
    switch (c) {
      case 0:
        return u;
      case 1:
        return `${a}/${u}`;
      default:
        return `${a}#${u}`;
    }
  }, "");
}, md = {
  name: "getUserAgentMiddleware",
  step: "build",
  priority: "low",
  tags: ["SET_USER_AGENT", "USER_AGENT"],
  override: !0
}, yd = (e) => ({
  applyToStack: (t) => {
    t.add(pd(e), md);
  }
});
var es;
(function(e) {
  e.ENV = "env", e.CONFIG = "shared config entry";
})(es || (es = {}));
const gd = !1, wd = !1, Ci = (e) => typeof e == "string" && (e.startsWith("fips-") || e.endsWith("-fips")), ts = (e) => Ci(e) ? ["fips-aws-global", "aws-fips"].includes(e) ? "us-east-1" : e.replace(/fips-(dkr-|prod-)?|-fips/, "") : e, Ed = (e) => {
  const { region: t, useFipsEndpoint: r } = e;
  if (!t)
    throw new Error("Region is missing");
  return {
    ...e,
    region: async () => {
      if (typeof t == "string")
        return ts(t);
      const n = await t();
      return ts(n);
    },
    useFipsEndpoint: async () => {
      const n = typeof t == "string" ? t : await t();
      return Ci(n) ? !0 : typeof r != "function" ? Promise.resolve(!!r) : r();
    }
  };
}, rs = "content-length";
function Sd(e) {
  return (t) => async (r) => {
    const n = r.request;
    if (oe.isInstance(n)) {
      const { body: s, headers: i } = n;
      if (s && Object.keys(i).map((o) => o.toLowerCase()).indexOf(rs) === -1)
        try {
          const o = e(s);
          n.headers = {
            ...n.headers,
            [rs]: String(o)
          };
        } catch {
        }
    }
    return t({
      ...r,
      request: n
    });
  };
}
const bd = {
  step: "build",
  tags: ["SET_CONTENT_LENGTH", "CONTENT_LENGTH"],
  name: "contentLengthMiddleware",
  override: !0
}, Rd = (e) => ({
  applyToStack: (t) => {
    t.add(Sd(e.bodyLengthChecker), bd);
  }
}), Ad = async (e) => {
  const t = (e == null ? void 0 : e.Bucket) || "";
  if (typeof e.Bucket == "string" && (e.Bucket = t.replace(/#/g, encodeURIComponent("#")).replace(/\?/g, encodeURIComponent("?"))), xd(t)) {
    if (e.ForcePathStyle === !0)
      throw new Error("Path-style addressing cannot be used with ARN buckets");
  } else (!_d(t) || t.indexOf(".") !== -1 && !String(e.Endpoint).startsWith("http:") || t.toLowerCase() !== t || t.length < 3) && (e.ForcePathStyle = !0);
  return e.DisableMultiRegionAccessPoints && (e.disableMultiRegionAccessPoints = !0, e.DisableMRAP = !0), e;
}, Td = /^[a-z0-9][a-z0-9\.\-]{1,61}[a-z0-9]$/, vd = /(\d+\.){3}\d+/, Cd = /\.\./, _d = (e) => Td.test(e) && !vd.test(e) && !Cd.test(e), xd = (e) => {
  const [t, r, n, , , s] = e.split(":"), i = t === "arn" && e.split(":").length >= 6, o = !!(i && r && n && s);
  if (i && !o)
    throw new Error(`Invalid ARN: ${e} was an invalid ARN.`);
  return o;
}, Od = (e, t, r) => {
  const n = async () => {
    const s = r[e] ?? r[t];
    return typeof s == "function" ? s() : s;
  };
  return e === "credentialScope" || t === "CredentialScope" ? async () => {
    const s = typeof r.credentials == "function" ? await r.credentials() : r.credentials;
    return (s == null ? void 0 : s.credentialScope) ?? (s == null ? void 0 : s.CredentialScope);
  } : e === "accountId" || t === "AccountId" ? async () => {
    const s = typeof r.credentials == "function" ? await r.credentials() : r.credentials;
    return (s == null ? void 0 : s.accountId) ?? (s == null ? void 0 : s.AccountId);
  } : e === "endpoint" || t === "endpoint" ? async () => {
    const s = await n();
    if (s && typeof s == "object") {
      if ("url" in s)
        return s.url.href;
      if ("hostname" in s) {
        const { protocol: i, hostname: o, port: a, path: u } = s;
        return `${i}//${o}${a ? ":" + a : ""}${u}`;
      }
    }
    return s;
  } : n;
}, _i = async (e) => {
};
function Id(e) {
  const t = {};
  if (e = e.replace(/^\?/, ""), e)
    for (const r of e.split("&")) {
      let [n, s = null] = r.split("=");
      n = decodeURIComponent(n), s && (s = decodeURIComponent(s)), n in t ? Array.isArray(t[n]) ? t[n].push(s) : t[n] = [t[n], s] : t[n] = s;
    }
  return t;
}
const lt = (e) => {
  if (typeof e == "string")
    return lt(new URL(e));
  const { hostname: t, pathname: r, port: n, protocol: s, search: i } = e;
  let o;
  return i && (o = Id(i)), {
    hostname: t,
    port: n ? parseInt(n) : void 0,
    protocol: s,
    path: r,
    query: o
  };
}, xi = (e) => typeof e == "object" ? "url" in e ? lt(e.url) : e : lt(e), Dd = async (e, t, r, n) => {
  if (!r.endpoint) {
    let o;
    r.serviceConfiguredEndpoint ? o = await r.serviceConfiguredEndpoint() : o = await _i(r.serviceId), o && (r.endpoint = () => Promise.resolve(xi(o)));
  }
  const s = await Pd(e, t, r);
  if (typeof r.endpointProvider != "function")
    throw new Error("config.endpointProvider is not set.");
  return r.endpointProvider(s, n);
}, Pd = async (e, t, r) => {
  var i;
  const n = {}, s = ((i = t == null ? void 0 : t.getEndpointParameterInstructions) == null ? void 0 : i.call(t)) || {};
  for (const [o, a] of Object.entries(s))
    switch (a.type) {
      case "staticContextParams":
        n[o] = a.value;
        break;
      case "contextParams":
        n[o] = e[a.name];
        break;
      case "clientContextParams":
      case "builtInParams":
        n[o] = await Od(a.name, o, r)();
        break;
      case "operationContextParams":
        n[o] = a.get(e);
        break;
      default:
        throw new Error("Unrecognized endpoint parameter instruction: " + JSON.stringify(a));
    }
  return Object.keys(s).length === 0 && Object.assign(n, r), String(r.serviceId).toLowerCase() === "s3" && await Ad(n), n;
}, Nd = ({ config: e, instructions: t }) => (r, n) => async (s) => {
  var a, u, c;
  e.endpoint && Cc(n, "ENDPOINT_OVERRIDE", "N");
  const i = await Dd(s.input, {
    getEndpointParameterInstructions() {
      return t;
    }
  }, { ...e }, n);
  n.endpointV2 = i, n.authSchemes = (a = i.properties) == null ? void 0 : a.authSchemes;
  const o = (u = n.authSchemes) == null ? void 0 : u[0];
  if (o) {
    n.signing_region = o.signingRegion, n.signing_service = o.signingName;
    const d = St(n), l = (c = d == null ? void 0 : d.selectedHttpAuthScheme) == null ? void 0 : c.httpAuthOption;
    l && (l.signingProperties = Object.assign(l.signingProperties || {}, {
      signing_region: o.signingRegion,
      signingRegion: o.signingRegion,
      signing_service: o.signingName,
      signingName: o.signingName,
      signingRegionSet: o.signingRegionSet
    }, o.properties));
  }
  return r({
    ...s
  });
}, kd = (e, t) => (r, n) => async (s) => {
  var o, a, u, c;
  const { response: i } = await r(s);
  try {
    const d = await t(i, e);
    return {
      response: i,
      output: d
    };
  } catch (d) {
    if (Object.defineProperty(d, "$response", {
      value: i
    }), !("$metadata" in d)) {
      const l = "Deserialization error: to see the raw response, inspect the hidden field {error}.$response on this object.";
      try {
        d.message += `
  ` + l;
      } catch {
        !n.logger || ((a = (o = n.logger) == null ? void 0 : o.constructor) == null ? void 0 : a.name) === "NoOpLogger" ? console.warn(l) : (c = (u = n.logger) == null ? void 0 : u.warn) == null || c.call(u, l);
      }
      typeof d.$responseBodyText < "u" && d.$response && (d.$response.body = d.$responseBodyText);
    }
    throw d;
  }
}, Md = (e, t) => (r, n) => async (s) => {
  var a;
  const i = (a = n.endpointV2) != null && a.url && e.urlParser ? async () => e.urlParser(n.endpointV2.url) : e.endpoint;
  if (!i)
    throw new Error("No valid endpoint provider available.");
  const o = await t(s.input, { ...e, endpoint: i });
  return r({
    ...s,
    request: o
  });
}, Ud = {
  name: "deserializerMiddleware",
  step: "deserialize",
  tags: ["DESERIALIZER"],
  override: !0
}, Oi = {
  name: "serializerMiddleware",
  step: "serialize",
  tags: ["SERIALIZER"],
  override: !0
};
function vt(e, t, r) {
  return {
    applyToStack: (n) => {
      n.add(kd(e, r), Ud), n.add(Md(e, t), Oi);
    }
  };
}
const $d = {
  step: "serialize",
  tags: ["ENDPOINT_PARAMETERS", "ENDPOINT_V2", "ENDPOINT"],
  name: "endpointV2Middleware",
  override: !0,
  relation: "before",
  toMiddleware: Oi.name
}, Ct = (e, t) => ({
  applyToStack: (r) => {
    r.addRelativeTo(Nd({
      config: e,
      instructions: t
    }), $d);
  }
}), Ld = (e) => {
  const t = e.tls ?? !0, { endpoint: r, useDualstackEndpoint: n, useFipsEndpoint: s } = e, i = r != null ? async () => xi(await re(r)()) : void 0, a = Object.assign(e, {
    endpoint: i,
    tls: t,
    isCustomEndpoint: !!r,
    useDualstackEndpoint: re(n ?? !1),
    useFipsEndpoint: re(s ?? !1)
  });
  let u;
  return a.serviceConfiguredEndpoint = async () => (e.serviceId && !u && (u = _i(e.serviceId)), u), a;
};
var Ae;
(function(e) {
  e.STANDARD = "standard", e.ADAPTIVE = "adaptive";
})(Ae || (Ae = {}));
const ft = 3, Fd = Ae.STANDARD, Bd = [
  "BandwidthLimitExceeded",
  "EC2ThrottledException",
  "LimitExceededException",
  "PriorRequestNotComplete",
  "ProvisionedThroughputExceededException",
  "RequestLimitExceeded",
  "RequestThrottled",
  "RequestThrottledException",
  "SlowDown",
  "ThrottledException",
  "Throttling",
  "ThrottlingException",
  "TooManyRequestsException",
  "TransactionInProgressException"
], Hd = (e) => {
  var t, r;
  return ((t = e.$metadata) == null ? void 0 : t.httpStatusCode) === 429 || Bd.includes(e.name) || ((r = e.$retryable) == null ? void 0 : r.throttling) == !0;
};
class _t {
  constructor(t) {
    this.currentCapacity = 0, this.enabled = !1, this.lastMaxRate = 0, this.measuredTxRate = 0, this.requestCount = 0, this.lastTimestamp = 0, this.timeWindow = 0, this.beta = (t == null ? void 0 : t.beta) ?? 0.7, this.minCapacity = (t == null ? void 0 : t.minCapacity) ?? 1, this.minFillRate = (t == null ? void 0 : t.minFillRate) ?? 0.5, this.scaleConstant = (t == null ? void 0 : t.scaleConstant) ?? 0.4, this.smooth = (t == null ? void 0 : t.smooth) ?? 0.8;
    const r = this.getCurrentTimeInSeconds();
    this.lastThrottleTime = r, this.lastTxRateBucket = Math.floor(this.getCurrentTimeInSeconds()), this.fillRate = this.minFillRate, this.maxCapacity = this.minCapacity;
  }
  getCurrentTimeInSeconds() {
    return Date.now() / 1e3;
  }
  async getSendToken() {
    return this.acquireTokenBucket(1);
  }
  async acquireTokenBucket(t) {
    if (this.enabled) {
      if (this.refillTokenBucket(), t > this.currentCapacity) {
        const r = (t - this.currentCapacity) / this.fillRate * 1e3;
        await new Promise((n) => _t.setTimeoutFn(n, r));
      }
      this.currentCapacity = this.currentCapacity - t;
    }
  }
  refillTokenBucket() {
    const t = this.getCurrentTimeInSeconds();
    if (!this.lastTimestamp) {
      this.lastTimestamp = t;
      return;
    }
    const r = (t - this.lastTimestamp) * this.fillRate;
    this.currentCapacity = Math.min(this.maxCapacity, this.currentCapacity + r), this.lastTimestamp = t;
  }
  updateClientSendingRate(t) {
    let r;
    if (this.updateMeasuredRate(), Hd(t)) {
      const s = this.enabled ? Math.min(this.measuredTxRate, this.fillRate) : this.measuredTxRate;
      this.lastMaxRate = s, this.calculateTimeWindow(), this.lastThrottleTime = this.getCurrentTimeInSeconds(), r = this.cubicThrottle(s), this.enableTokenBucket();
    } else
      this.calculateTimeWindow(), r = this.cubicSuccess(this.getCurrentTimeInSeconds());
    const n = Math.min(r, 2 * this.measuredTxRate);
    this.updateTokenBucketRate(n);
  }
  calculateTimeWindow() {
    this.timeWindow = this.getPrecise(Math.pow(this.lastMaxRate * (1 - this.beta) / this.scaleConstant, 1 / 3));
  }
  cubicThrottle(t) {
    return this.getPrecise(t * this.beta);
  }
  cubicSuccess(t) {
    return this.getPrecise(this.scaleConstant * Math.pow(t - this.lastThrottleTime - this.timeWindow, 3) + this.lastMaxRate);
  }
  enableTokenBucket() {
    this.enabled = !0;
  }
  updateTokenBucketRate(t) {
    this.refillTokenBucket(), this.fillRate = Math.max(t, this.minFillRate), this.maxCapacity = Math.max(t, this.minCapacity), this.currentCapacity = Math.min(this.currentCapacity, this.maxCapacity);
  }
  updateMeasuredRate() {
    const t = this.getCurrentTimeInSeconds(), r = Math.floor(t * 2) / 2;
    if (this.requestCount++, r > this.lastTxRateBucket) {
      const n = this.requestCount / (r - this.lastTxRateBucket);
      this.measuredTxRate = this.getPrecise(n * this.smooth + this.measuredTxRate * (1 - this.smooth)), this.requestCount = 0, this.lastTxRateBucket = r;
    }
  }
  getPrecise(t) {
    return parseFloat(t.toFixed(8));
  }
}
_t.setTimeoutFn = setTimeout;
const cr = 100, Ii = 20 * 1e3, qd = 500, ns = 500, jd = 5, zd = 10, Vd = 1, Wd = "amz-sdk-invocation-id", Gd = "amz-sdk-request", Kd = () => {
  let e = cr;
  return {
    computeNextBackoffDelay: (n) => Math.floor(Math.min(Ii, Math.random() * 2 ** n * e)),
    setDelayBase: (n) => {
      e = n;
    }
  };
}, ss = ({ retryDelay: e, retryCount: t, retryCost: r }) => ({
  getRetryCount: () => t,
  getRetryDelay: () => Math.min(Ii, e),
  getRetryCost: () => r
});
class Di {
  constructor(t) {
    this.maxAttempts = t, this.mode = Ae.STANDARD, this.capacity = ns, this.retryBackoffStrategy = Kd(), this.maxAttemptsProvider = typeof t == "function" ? t : async () => t;
  }
  async acquireInitialRetryToken(t) {
    return ss({
      retryDelay: cr,
      retryCount: 0
    });
  }
  async refreshRetryTokenForRetry(t, r) {
    const n = await this.getMaxAttempts();
    if (this.shouldRetry(t, r, n)) {
      const s = r.errorType;
      this.retryBackoffStrategy.setDelayBase(s === "THROTTLING" ? qd : cr);
      const i = this.retryBackoffStrategy.computeNextBackoffDelay(t.getRetryCount()), o = r.retryAfterHint ? Math.max(r.retryAfterHint.getTime() - Date.now() || 0, i) : i, a = this.getCapacityCost(s);
      return this.capacity -= a, ss({
        retryDelay: o,
        retryCount: t.getRetryCount() + 1,
        retryCost: a
      });
    }
    throw new Error("No retry token available");
  }
  recordSuccess(t) {
    this.capacity = Math.max(ns, this.capacity + (t.getRetryCost() ?? Vd));
  }
  getCapacity() {
    return this.capacity;
  }
  async getMaxAttempts() {
    try {
      return await this.maxAttemptsProvider();
    } catch {
      return console.warn(`Max attempts provider could not resolve. Using default of ${ft}`), ft;
    }
  }
  shouldRetry(t, r, n) {
    return t.getRetryCount() + 1 < n && this.capacity >= this.getCapacityCost(r.errorType) && this.isRetryableError(r.errorType);
  }
  getCapacityCost(t) {
    return t === "TRANSIENT" ? zd : jd;
  }
  isRetryableError(t) {
    return t === "THROTTLING" || t === "TRANSIENT";
  }
}
class Jd {
  constructor(t, r) {
    this.maxAttemptsProvider = t, this.mode = Ae.ADAPTIVE;
    const { rateLimiter: n } = r ?? {};
    this.rateLimiter = n ?? new _t(), this.standardRetryStrategy = new Di(t);
  }
  async acquireInitialRetryToken(t) {
    return await this.rateLimiter.getSendToken(), this.standardRetryStrategy.acquireInitialRetryToken(t);
  }
  async refreshRetryTokenForRetry(t, r) {
    return this.rateLimiter.updateClientSendingRate(r), this.standardRetryStrategy.refreshRetryTokenForRetry(t, r);
  }
  recordSuccess(t) {
    this.rateLimiter.updateClientSendingRate({}), this.standardRetryStrategy.recordSuccess(t);
  }
}
const Xd = [
  "BandwidthLimitExceeded",
  "EC2ThrottledException",
  "LimitExceededException",
  "PriorRequestNotComplete",
  "ProvisionedThroughputExceededException",
  "RequestLimitExceeded",
  "RequestThrottled",
  "RequestThrottledException",
  "SlowDown",
  "ThrottledException",
  "Throttling",
  "ThrottlingException",
  "TooManyRequestsException",
  "TransactionInProgressException"
], Qd = ["TimeoutError", "RequestTimeout", "RequestTimeoutException"], Yd = [500, 502, 503, 504], Zd = ["ECONNRESET", "ECONNREFUSED", "EPIPE", "ETIMEDOUT"], el = (e) => {
  var t;
  return (t = e.$metadata) == null ? void 0 : t.clockSkewCorrected;
}, tl = (e) => {
  var t, r;
  return ((t = e.$metadata) == null ? void 0 : t.httpStatusCode) === 429 || Xd.includes(e.name) || ((r = e.$retryable) == null ? void 0 : r.throttling) == !0;
}, Rr = (e, t = 0) => {
  var r;
  return el(e) || Qd.includes(e.name) || Zd.includes((e == null ? void 0 : e.code) || "") || Yd.includes(((r = e.$metadata) == null ? void 0 : r.httpStatusCode) || 0) || e.cause !== void 0 && t <= 10 && Rr(e.cause, t + 1);
}, rl = (e) => {
  var t;
  if (((t = e.$metadata) == null ? void 0 : t.httpStatusCode) !== void 0) {
    const r = e.$metadata.httpStatusCode;
    return 500 <= r && r <= 599 && !Rr(e);
  }
  return !1;
};
let Xe;
const nl = new Uint8Array(16);
function sl() {
  if (!Xe && (Xe = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !Xe))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return Xe(nl);
}
const M = [];
for (let e = 0; e < 256; ++e)
  M.push((e + 256).toString(16).slice(1));
function il(e, t = 0) {
  return M[e[t + 0]] + M[e[t + 1]] + M[e[t + 2]] + M[e[t + 3]] + "-" + M[e[t + 4]] + M[e[t + 5]] + "-" + M[e[t + 6]] + M[e[t + 7]] + "-" + M[e[t + 8]] + M[e[t + 9]] + "-" + M[e[t + 10]] + M[e[t + 11]] + M[e[t + 12]] + M[e[t + 13]] + M[e[t + 14]] + M[e[t + 15]];
}
const ol = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), is = {
  randomUUID: ol
};
function al(e, t, r) {
  if (is.randomUUID && !e)
    return is.randomUUID();
  e = e || {};
  const n = e.random || (e.rng || sl)();
  return n[6] = n[6] & 15 | 64, n[8] = n[8] & 63 | 128, il(n);
}
const cl = (e) => e instanceof Error ? e : e instanceof Object ? Object.assign(new Error(), e) : typeof e == "string" ? new Error(e) : new Error(`AWS SDK error wrapper for ${e}`), ul = (e) => {
  const { retryStrategy: t, retryMode: r, maxAttempts: n } = e, s = re(n ?? ft);
  return Object.assign(e, {
    maxAttempts: s,
    retryStrategy: async () => t || (await re(r)() === Ae.ADAPTIVE ? new Jd(s) : new Di(s))
  });
}, dl = (e) => (e == null ? void 0 : e.body) instanceof ReadableStream, ll = (e) => (t, r) => async (n) => {
  var o;
  let s = await e.retryStrategy();
  const i = await e.maxAttempts();
  if (fl(s)) {
    s = s;
    let a = await s.acquireInitialRetryToken(r.partition_id), u = new Error(), c = 0, d = 0;
    const { request: l } = n, f = oe.isInstance(l);
    for (f && (l.headers[Wd] = al()); ; )
      try {
        f && (l.headers[Gd] = `attempt=${c + 1}; max=${i}`);
        const { response: h, output: y } = await t(n);
        return s.recordSuccess(a), y.$metadata.attempts = c + 1, y.$metadata.totalRetryDelay = d, { response: h, output: y };
      } catch (h) {
        const y = hl(h);
        if (u = cl(h), f && dl(l))
          throw (o = r.logger instanceof Ti ? console : r.logger) == null || o.warn("An error was encountered in a non-retryable streaming request."), u;
        try {
          a = await s.refreshRetryTokenForRetry(a, y);
        } catch {
          throw u.$metadata || (u.$metadata = {}), u.$metadata.attempts = c + 1, u.$metadata.totalRetryDelay = d, u;
        }
        c = a.getRetryCount();
        const w = a.getRetryDelay();
        d += w, await new Promise((m) => setTimeout(m, w));
      }
  } else
    return s = s, s != null && s.mode && (r.userAgent = [...r.userAgent || [], ["cfg/retry-mode", s.mode]]), s.retry(t, n);
}, fl = (e) => typeof e.acquireInitialRetryToken < "u" && typeof e.refreshRetryTokenForRetry < "u" && typeof e.recordSuccess < "u", hl = (e) => {
  const t = {
    error: e,
    errorType: pl(e)
  }, r = gl(e.$response);
  return r && (t.retryAfterHint = r), t;
}, pl = (e) => tl(e) ? "THROTTLING" : Rr(e) ? "TRANSIENT" : rl(e) ? "SERVER_ERROR" : "CLIENT_ERROR", ml = {
  name: "retryMiddleware",
  tags: ["RETRY"],
  step: "finalizeRequest",
  priority: "high",
  override: !0
}, yl = (e) => ({
  applyToStack: (t) => {
    t.add(ll(e), ml);
  }
}), gl = (e) => {
  if (!ot.isInstance(e))
    return;
  const t = Object.keys(e.headers).find((i) => i.toLowerCase() === "retry-after");
  if (!t)
    return;
  const r = e.headers[t], n = Number(r);
  return Number.isNaN(n) ? new Date(r) : new Date(n * 1e3);
}, wl = async (e, t, r) => ({
  operation: St(t).operation,
  region: await re(e.region)() || (() => {
    throw new Error("expected `region` to be configured for `aws.auth#sigv4`");
  })()
});
function El(e) {
  return {
    schemeId: "aws.auth#sigv4",
    signingProperties: {
      name: "sso-oauth",
      region: e.region
    },
    propertiesExtractor: (t, r) => ({
      signingProperties: {
        config: t,
        context: r
      }
    })
  };
}
function Jt(e) {
  return {
    schemeId: "smithy.api#noAuth"
  };
}
const Sl = (e) => {
  const t = [];
  switch (e.operation) {
    case "CreateToken": {
      t.push(Jt());
      break;
    }
    case "RegisterClient": {
      t.push(Jt());
      break;
    }
    case "StartDeviceAuthorization": {
      t.push(Jt());
      break;
    }
    default:
      t.push(El(e));
  }
  return t;
}, bl = (e) => ({
  ...Lu(e)
}), Rl = (e) => ({
  ...e,
  useDualstackEndpoint: e.useDualstackEndpoint ?? !1,
  useFipsEndpoint: e.useFipsEndpoint ?? !1,
  defaultSigningName: "sso-oauth"
}), xt = {
  UseFIPS: { type: "builtInParams", name: "useFipsEndpoint" },
  Endpoint: { type: "builtInParams", name: "endpoint" },
  Region: { type: "builtInParams", name: "region" },
  UseDualStack: { type: "builtInParams", name: "useDualstackEndpoint" }
}, Al = "3.738.0", Tl = {
  version: Al
}, vl = (e) => new TextEncoder().encode(e);
var Cl = typeof Buffer < "u" && Buffer.from ? function(e) {
  return Buffer.from(e, "utf8");
} : vl;
function ur(e) {
  return e instanceof Uint8Array ? e : typeof e == "string" ? Cl(e) : ArrayBuffer.isView(e) ? new Uint8Array(e.buffer, e.byteOffset, e.byteLength / Uint8Array.BYTES_PER_ELEMENT) : new Uint8Array(e);
}
function os(e) {
  return typeof e == "string" ? e.length === 0 : e.byteLength === 0;
}
var Pi = { name: "SHA-256" }, as = {
  name: "HMAC",
  hash: Pi
}, _l = new Uint8Array([
  227,
  176,
  196,
  66,
  152,
  252,
  28,
  20,
  154,
  251,
  244,
  200,
  153,
  111,
  185,
  36,
  39,
  174,
  65,
  228,
  100,
  155,
  147,
  76,
  164,
  149,
  153,
  27,
  120,
  82,
  184,
  85
]);
const xl = {};
function tt() {
  return typeof window < "u" ? window : typeof self < "u" ? self : xl;
}
var Ol = (
  /** @class */
  function() {
    function e(t) {
      this.toHash = new Uint8Array(0), this.secret = t, this.reset();
    }
    return e.prototype.update = function(t) {
      if (!os(t)) {
        var r = ur(t), n = new Uint8Array(this.toHash.byteLength + r.byteLength);
        n.set(this.toHash, 0), n.set(r, this.toHash.byteLength), this.toHash = n;
      }
    }, e.prototype.digest = function() {
      var t = this;
      return this.key ? this.key.then(function(r) {
        return tt().crypto.subtle.sign(as, r, t.toHash).then(function(n) {
          return new Uint8Array(n);
        });
      }) : os(this.toHash) ? Promise.resolve(_l) : Promise.resolve().then(function() {
        return tt().crypto.subtle.digest(Pi, t.toHash);
      }).then(function(r) {
        return Promise.resolve(new Uint8Array(r));
      });
    }, e.prototype.reset = function() {
      var t = this;
      this.toHash = new Uint8Array(0), this.secret && this.secret !== void 0 && (this.key = new Promise(function(r, n) {
        tt().crypto.subtle.importKey("raw", ur(t.secret), as, !1, ["sign"]).then(r, n);
      }), this.key.catch(function() {
      }));
    }, e;
  }()
);
function Il(e, t, r, n) {
  function s(i) {
    return i instanceof r ? i : new r(function(o) {
      o(i);
    });
  }
  return new (r || (r = Promise))(function(i, o) {
    function a(d) {
      try {
        c(n.next(d));
      } catch (l) {
        o(l);
      }
    }
    function u(d) {
      try {
        c(n.throw(d));
      } catch (l) {
        o(l);
      }
    }
    function c(d) {
      d.done ? i(d.value) : s(d.value).then(a, u);
    }
    c((n = n.apply(e, t || [])).next());
  });
}
function Dl(e, t) {
  var r = { label: 0, sent: function() {
    if (i[0] & 1) throw i[1];
    return i[1];
  }, trys: [], ops: [] }, n, s, i, o = Object.create((typeof Iterator == "function" ? Iterator : Object).prototype);
  return o.next = a(0), o.throw = a(1), o.return = a(2), typeof Symbol == "function" && (o[Symbol.iterator] = function() {
    return this;
  }), o;
  function a(c) {
    return function(d) {
      return u([c, d]);
    };
  }
  function u(c) {
    if (n) throw new TypeError("Generator is already executing.");
    for (; o && (o = 0, c[0] && (r = 0)), r; ) try {
      if (n = 1, s && (i = c[0] & 2 ? s.return : c[0] ? s.throw || ((i = s.return) && i.call(s), 0) : s.next) && !(i = i.call(s, c[1])).done) return i;
      switch (s = 0, i && (c = [c[0] & 2, i.value]), c[0]) {
        case 0:
        case 1:
          i = c;
          break;
        case 4:
          return r.label++, { value: c[1], done: !1 };
        case 5:
          r.label++, s = c[1], c = [0];
          continue;
        case 7:
          c = r.ops.pop(), r.trys.pop();
          continue;
        default:
          if (i = r.trys, !(i = i.length > 0 && i[i.length - 1]) && (c[0] === 6 || c[0] === 2)) {
            r = 0;
            continue;
          }
          if (c[0] === 3 && (!i || c[1] > i[0] && c[1] < i[3])) {
            r.label = c[1];
            break;
          }
          if (c[0] === 6 && r.label < i[1]) {
            r.label = i[1], i = c;
            break;
          }
          if (i && r.label < i[2]) {
            r.label = i[2], r.ops.push(c);
            break;
          }
          i[2] && r.ops.pop(), r.trys.pop();
          continue;
      }
      c = t.call(e, r);
    } catch (d) {
      c = [6, d], s = 0;
    } finally {
      n = i = 0;
    }
    if (c[0] & 5) throw c[1];
    return { value: c[0] ? c[1] : void 0, done: !0 };
  }
}
var V = 64, Pl = 32, Nl = new Uint32Array([
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
]), kl = [
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
], Ml = Math.pow(2, 53) - 1, rt = (
  /** @class */
  function() {
    function e() {
      this.state = Int32Array.from(kl), this.temp = new Int32Array(64), this.buffer = new Uint8Array(64), this.bufferLength = 0, this.bytesHashed = 0, this.finished = !1;
    }
    return e.prototype.update = function(t) {
      if (this.finished)
        throw new Error("Attempted to update an already finished hash.");
      var r = 0, n = t.byteLength;
      if (this.bytesHashed += n, this.bytesHashed * 8 > Ml)
        throw new Error("Cannot hash more than 2^53 - 1 bits");
      for (; n > 0; )
        this.buffer[this.bufferLength++] = t[r++], n--, this.bufferLength === V && (this.hashBuffer(), this.bufferLength = 0);
    }, e.prototype.digest = function() {
      if (!this.finished) {
        var t = this.bytesHashed * 8, r = new DataView(this.buffer.buffer, this.buffer.byteOffset, this.buffer.byteLength), n = this.bufferLength;
        if (r.setUint8(this.bufferLength++, 128), n % V >= V - 8) {
          for (var s = this.bufferLength; s < V; s++)
            r.setUint8(s, 0);
          this.hashBuffer(), this.bufferLength = 0;
        }
        for (var s = this.bufferLength; s < V - 8; s++)
          r.setUint8(s, 0);
        r.setUint32(V - 8, Math.floor(t / 4294967296), !0), r.setUint32(V - 4, t), this.hashBuffer(), this.finished = !0;
      }
      for (var i = new Uint8Array(Pl), s = 0; s < 8; s++)
        i[s * 4] = this.state[s] >>> 24 & 255, i[s * 4 + 1] = this.state[s] >>> 16 & 255, i[s * 4 + 2] = this.state[s] >>> 8 & 255, i[s * 4 + 3] = this.state[s] >>> 0 & 255;
      return i;
    }, e.prototype.hashBuffer = function() {
      for (var t = this, r = t.buffer, n = t.state, s = n[0], i = n[1], o = n[2], a = n[3], u = n[4], c = n[5], d = n[6], l = n[7], f = 0; f < V; f++) {
        if (f < 16)
          this.temp[f] = (r[f * 4] & 255) << 24 | (r[f * 4 + 1] & 255) << 16 | (r[f * 4 + 2] & 255) << 8 | r[f * 4 + 3] & 255;
        else {
          var h = this.temp[f - 2], y = (h >>> 17 | h << 15) ^ (h >>> 19 | h << 13) ^ h >>> 10;
          h = this.temp[f - 15];
          var w = (h >>> 7 | h << 25) ^ (h >>> 18 | h << 14) ^ h >>> 3;
          this.temp[f] = (y + this.temp[f - 7] | 0) + (w + this.temp[f - 16] | 0);
        }
        var m = (((u >>> 6 | u << 26) ^ (u >>> 11 | u << 21) ^ (u >>> 25 | u << 7)) + (u & c ^ ~u & d) | 0) + (l + (Nl[f] + this.temp[f] | 0) | 0) | 0, S = ((s >>> 2 | s << 30) ^ (s >>> 13 | s << 19) ^ (s >>> 22 | s << 10)) + (s & i ^ s & o ^ i & o) | 0;
        l = d, d = c, c = u, u = a + m | 0, a = o, o = i, i = s, s = m + S | 0;
      }
      n[0] += s, n[1] += i, n[2] += o, n[3] += a, n[4] += u, n[5] += c, n[6] += d, n[7] += l;
    }, e;
  }()
);
const Ul = (e) => new TextEncoder().encode(e);
var $l = typeof Buffer < "u" && Buffer.from ? function(e) {
  return Buffer.from(e, "utf8");
} : Ul;
function Ni(e) {
  return e instanceof Uint8Array ? e : typeof e == "string" ? $l(e) : ArrayBuffer.isView(e) ? new Uint8Array(e.buffer, e.byteOffset, e.byteLength / Uint8Array.BYTES_PER_ELEMENT) : new Uint8Array(e);
}
function Ll(e) {
  return typeof e == "string" ? e.length === 0 : e.byteLength === 0;
}
var Fl = (
  /** @class */
  function() {
    function e(t) {
      this.secret = t, this.hash = new rt(), this.reset();
    }
    return e.prototype.update = function(t) {
      if (!(Ll(t) || this.error))
        try {
          this.hash.update(Ni(t));
        } catch (r) {
          this.error = r;
        }
    }, e.prototype.digestSync = function() {
      if (this.error)
        throw this.error;
      return this.outer ? (this.outer.finished || this.outer.update(this.hash.digest()), this.outer.digest()) : this.hash.digest();
    }, e.prototype.digest = function() {
      return Il(this, void 0, void 0, function() {
        return Dl(this, function(t) {
          return [2, this.digestSync()];
        });
      });
    }, e.prototype.reset = function() {
      if (this.hash = new rt(), this.secret) {
        this.outer = new rt();
        var t = Bl(this.secret), r = new Uint8Array(V);
        r.set(t);
        for (var n = 0; n < V; n++)
          t[n] ^= 54, r[n] ^= 92;
        this.hash.update(t), this.outer.update(r);
        for (var n = 0; n < t.byteLength; n++)
          t[n] = 0;
      }
    }, e;
  }()
);
function Bl(e) {
  var t = Ni(e);
  if (t.byteLength > V) {
    var r = new rt();
    r.update(t), t = r.digest();
  }
  var n = new Uint8Array(V);
  return n.set(t), n;
}
var Hl = [
  "decrypt",
  "digest",
  "encrypt",
  "exportKey",
  "generateKey",
  "importKey",
  "sign",
  "verify"
];
function ql(e) {
  if (jl(e) && typeof e.crypto.subtle == "object") {
    var t = e.crypto.subtle;
    return zl(t);
  }
  return !1;
}
function jl(e) {
  if (typeof e == "object" && typeof e.crypto == "object") {
    var t = e.crypto.getRandomValues;
    return typeof t == "function";
  }
  return !1;
}
function zl(e) {
  return e && Hl.every(function(t) {
    return typeof e[t] == "function";
  });
}
var Vl = (
  /** @class */
  function() {
    function e(t) {
      ql(tt()) ? this.hash = new Ol(t) : this.hash = new Fl(t);
    }
    return e.prototype.update = function(t, r) {
      this.hash.update(ur(t));
    }, e.prototype.digest = function() {
      return this.hash.digest();
    }, e.prototype.reset = function() {
      this.hash.reset();
    }, e;
  }()
);
const Wl = {
  "Amazon Silk": "amazon_silk",
  "Android Browser": "android",
  Bada: "bada",
  BlackBerry: "blackberry",
  Chrome: "chrome",
  Chromium: "chromium",
  Electron: "electron",
  Epiphany: "epiphany",
  Firefox: "firefox",
  Focus: "focus",
  Generic: "generic",
  "Google Search": "google_search",
  Googlebot: "googlebot",
  "Internet Explorer": "ie",
  "K-Meleon": "k_meleon",
  Maxthon: "maxthon",
  "Microsoft Edge": "edge",
  "MZ Browser": "mz",
  "NAVER Whale Browser": "naver",
  Opera: "opera",
  "Opera Coast": "opera_coast",
  PhantomJS: "phantomjs",
  Puffin: "puffin",
  QupZilla: "qupzilla",
  QQ: "qq",
  QQLite: "qqlite",
  Safari: "safari",
  Sailfish: "sailfish",
  "Samsung Internet for Android": "samsung_internet",
  SeaMonkey: "seamonkey",
  Sleipnir: "sleipnir",
  Swing: "swing",
  Tizen: "tizen",
  "UC Browser": "uc",
  Vivaldi: "vivaldi",
  "WebOS Browser": "webos",
  WeChat: "wechat",
  "Yandex Browser": "yandex",
  Roku: "roku"
}, ki = {
  amazon_silk: "Amazon Silk",
  android: "Android Browser",
  bada: "Bada",
  blackberry: "BlackBerry",
  chrome: "Chrome",
  chromium: "Chromium",
  electron: "Electron",
  epiphany: "Epiphany",
  firefox: "Firefox",
  focus: "Focus",
  generic: "Generic",
  googlebot: "Googlebot",
  google_search: "Google Search",
  ie: "Internet Explorer",
  k_meleon: "K-Meleon",
  maxthon: "Maxthon",
  edge: "Microsoft Edge",
  mz: "MZ Browser",
  naver: "NAVER Whale Browser",
  opera: "Opera",
  opera_coast: "Opera Coast",
  phantomjs: "PhantomJS",
  puffin: "Puffin",
  qupzilla: "QupZilla",
  qq: "QQ Browser",
  qqlite: "QQ Browser Lite",
  safari: "Safari",
  sailfish: "Sailfish",
  samsung_internet: "Samsung Internet for Android",
  seamonkey: "SeaMonkey",
  sleipnir: "Sleipnir",
  swing: "Swing",
  tizen: "Tizen",
  uc: "UC Browser",
  vivaldi: "Vivaldi",
  webos: "WebOS Browser",
  wechat: "WeChat",
  yandex: "Yandex Browser"
}, O = {
  tablet: "tablet",
  mobile: "mobile",
  desktop: "desktop",
  tv: "tv"
}, $ = {
  WindowsPhone: "Windows Phone",
  Windows: "Windows",
  MacOS: "macOS",
  iOS: "iOS",
  Android: "Android",
  WebOS: "WebOS",
  BlackBerry: "BlackBerry",
  Bada: "Bada",
  Tizen: "Tizen",
  Linux: "Linux",
  ChromeOS: "Chrome OS",
  PlayStation4: "PlayStation 4",
  Roku: "Roku"
}, te = {
  EdgeHTML: "EdgeHTML",
  Blink: "Blink",
  Trident: "Trident",
  Presto: "Presto",
  Gecko: "Gecko",
  WebKit: "WebKit"
};
class g {
  /**
   * Get first matched item for a string
   * @param {RegExp} regexp
   * @param {String} ua
   * @return {Array|{index: number, input: string}|*|boolean|string}
   */
  static getFirstMatch(t, r) {
    const n = r.match(t);
    return n && n.length > 0 && n[1] || "";
  }
  /**
   * Get second matched item for a string
   * @param regexp
   * @param {String} ua
   * @return {Array|{index: number, input: string}|*|boolean|string}
   */
  static getSecondMatch(t, r) {
    const n = r.match(t);
    return n && n.length > 1 && n[2] || "";
  }
  /**
   * Match a regexp and return a constant or undefined
   * @param {RegExp} regexp
   * @param {String} ua
   * @param {*} _const Any const that will be returned if regexp matches the string
   * @return {*}
   */
  static matchAndReturnConst(t, r, n) {
    if (t.test(r))
      return n;
  }
  static getWindowsVersionName(t) {
    switch (t) {
      case "NT":
        return "NT";
      case "XP":
        return "XP";
      case "NT 5.0":
        return "2000";
      case "NT 5.1":
        return "XP";
      case "NT 5.2":
        return "2003";
      case "NT 6.0":
        return "Vista";
      case "NT 6.1":
        return "7";
      case "NT 6.2":
        return "8";
      case "NT 6.3":
        return "8.1";
      case "NT 10.0":
        return "10";
      default:
        return;
    }
  }
  /**
   * Get macOS version name
   *    10.5 - Leopard
   *    10.6 - Snow Leopard
   *    10.7 - Lion
   *    10.8 - Mountain Lion
   *    10.9 - Mavericks
   *    10.10 - Yosemite
   *    10.11 - El Capitan
   *    10.12 - Sierra
   *    10.13 - High Sierra
   *    10.14 - Mojave
   *    10.15 - Catalina
   *
   * @example
   *   getMacOSVersionName("10.14") // 'Mojave'
   *
   * @param  {string} version
   * @return {string} versionName
   */
  static getMacOSVersionName(t) {
    const r = t.split(".").splice(0, 2).map((n) => parseInt(n, 10) || 0);
    if (r.push(0), r[0] === 10)
      switch (r[1]) {
        case 5:
          return "Leopard";
        case 6:
          return "Snow Leopard";
        case 7:
          return "Lion";
        case 8:
          return "Mountain Lion";
        case 9:
          return "Mavericks";
        case 10:
          return "Yosemite";
        case 11:
          return "El Capitan";
        case 12:
          return "Sierra";
        case 13:
          return "High Sierra";
        case 14:
          return "Mojave";
        case 15:
          return "Catalina";
        default:
          return;
      }
  }
  /**
   * Get Android version name
   *    1.5 - Cupcake
   *    1.6 - Donut
   *    2.0 - Eclair
   *    2.1 - Eclair
   *    2.2 - Froyo
   *    2.x - Gingerbread
   *    3.x - Honeycomb
   *    4.0 - Ice Cream Sandwich
   *    4.1 - Jelly Bean
   *    4.4 - KitKat
   *    5.x - Lollipop
   *    6.x - Marshmallow
   *    7.x - Nougat
   *    8.x - Oreo
   *    9.x - Pie
   *
   * @example
   *   getAndroidVersionName("7.0") // 'Nougat'
   *
   * @param  {string} version
   * @return {string} versionName
   */
  static getAndroidVersionName(t) {
    const r = t.split(".").splice(0, 2).map((n) => parseInt(n, 10) || 0);
    if (r.push(0), !(r[0] === 1 && r[1] < 5)) {
      if (r[0] === 1 && r[1] < 6) return "Cupcake";
      if (r[0] === 1 && r[1] >= 6) return "Donut";
      if (r[0] === 2 && r[1] < 2) return "Eclair";
      if (r[0] === 2 && r[1] === 2) return "Froyo";
      if (r[0] === 2 && r[1] > 2) return "Gingerbread";
      if (r[0] === 3) return "Honeycomb";
      if (r[0] === 4 && r[1] < 1) return "Ice Cream Sandwich";
      if (r[0] === 4 && r[1] < 4) return "Jelly Bean";
      if (r[0] === 4 && r[1] >= 4) return "KitKat";
      if (r[0] === 5) return "Lollipop";
      if (r[0] === 6) return "Marshmallow";
      if (r[0] === 7) return "Nougat";
      if (r[0] === 8) return "Oreo";
      if (r[0] === 9) return "Pie";
    }
  }
  /**
   * Get version precisions count
   *
   * @example
   *   getVersionPrecision("1.10.3") // 3
   *
   * @param  {string} version
   * @return {number}
   */
  static getVersionPrecision(t) {
    return t.split(".").length;
  }
  /**
   * Calculate browser version weight
   *
   * @example
   *   compareVersions('1.10.2.1',  '1.8.2.1.90')    // 1
   *   compareVersions('1.010.2.1', '1.09.2.1.90');  // 1
   *   compareVersions('1.10.2.1',  '1.10.2.1');     // 0
   *   compareVersions('1.10.2.1',  '1.0800.2');     // -1
   *   compareVersions('1.10.2.1',  '1.10',  true);  // 0
   *
   * @param {String} versionA versions versions to compare
   * @param {String} versionB versions versions to compare
   * @param {boolean} [isLoose] enable loose comparison
   * @return {Number} comparison result: -1 when versionA is lower,
   * 1 when versionA is bigger, 0 when both equal
   */
  /* eslint consistent-return: 1 */
  static compareVersions(t, r, n = !1) {
    const s = g.getVersionPrecision(t), i = g.getVersionPrecision(r);
    let o = Math.max(s, i), a = 0;
    const u = g.map([t, r], (c) => {
      const d = o - g.getVersionPrecision(c), l = c + new Array(d + 1).join(".0");
      return g.map(l.split("."), (f) => new Array(20 - f.length).join("0") + f).reverse();
    });
    for (n && (a = o - Math.min(s, i)), o -= 1; o >= a; ) {
      if (u[0][o] > u[1][o])
        return 1;
      if (u[0][o] === u[1][o]) {
        if (o === a)
          return 0;
        o -= 1;
      } else if (u[0][o] < u[1][o])
        return -1;
    }
  }
  /**
   * Array::map polyfill
   *
   * @param  {Array} arr
   * @param  {Function} iterator
   * @return {Array}
   */
  static map(t, r) {
    const n = [];
    let s;
    if (Array.prototype.map)
      return Array.prototype.map.call(t, r);
    for (s = 0; s < t.length; s += 1)
      n.push(r(t[s]));
    return n;
  }
  /**
   * Array::find polyfill
   *
   * @param  {Array} arr
   * @param  {Function} predicate
   * @return {Array}
   */
  static find(t, r) {
    let n, s;
    if (Array.prototype.find)
      return Array.prototype.find.call(t, r);
    for (n = 0, s = t.length; n < s; n += 1) {
      const i = t[n];
      if (r(i, n))
        return i;
    }
  }
  /**
   * Object::assign polyfill
   *
   * @param  {Object} obj
   * @param  {Object} ...objs
   * @return {Object}
   */
  static assign(t, ...r) {
    const n = t;
    let s, i;
    if (Object.assign)
      return Object.assign(t, ...r);
    for (s = 0, i = r.length; s < i; s += 1) {
      const o = r[s];
      typeof o == "object" && o !== null && Object.keys(o).forEach((u) => {
        n[u] = o[u];
      });
    }
    return t;
  }
  /**
   * Get short version/alias for a browser name
   *
   * @example
   *   getBrowserAlias('Microsoft Edge') // edge
   *
   * @param  {string} browserName
   * @return {string}
   */
  static getBrowserAlias(t) {
    return Wl[t];
  }
  /**
   * Get short version/alias for a browser name
   *
   * @example
   *   getBrowserAlias('edge') // Microsoft Edge
   *
   * @param  {string} browserAlias
   * @return {string}
   */
  static getBrowserTypeByAlias(t) {
    return ki[t] || "";
  }
}
const _ = /version\/(\d+(\.?_?\d+)+)/i, Gl = [
  /* Googlebot */
  {
    test: [/googlebot/i],
    describe(e) {
      const t = {
        name: "Googlebot"
      }, r = g.getFirstMatch(/googlebot\/(\d+(\.\d+))/i, e) || g.getFirstMatch(_, e);
      return r && (t.version = r), t;
    }
  },
  /* Opera < 13.0 */
  {
    test: [/opera/i],
    describe(e) {
      const t = {
        name: "Opera"
      }, r = g.getFirstMatch(_, e) || g.getFirstMatch(/(?:opera)[\s/](\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  },
  /* Opera > 13.0 */
  {
    test: [/opr\/|opios/i],
    describe(e) {
      const t = {
        name: "Opera"
      }, r = g.getFirstMatch(/(?:opr|opios)[\s/](\S+)/i, e) || g.getFirstMatch(_, e);
      return r && (t.version = r), t;
    }
  },
  {
    test: [/SamsungBrowser/i],
    describe(e) {
      const t = {
        name: "Samsung Internet for Android"
      }, r = g.getFirstMatch(_, e) || g.getFirstMatch(/(?:SamsungBrowser)[\s/](\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  },
  {
    test: [/Whale/i],
    describe(e) {
      const t = {
        name: "NAVER Whale Browser"
      }, r = g.getFirstMatch(_, e) || g.getFirstMatch(/(?:whale)[\s/](\d+(?:\.\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  },
  {
    test: [/MZBrowser/i],
    describe(e) {
      const t = {
        name: "MZ Browser"
      }, r = g.getFirstMatch(/(?:MZBrowser)[\s/](\d+(?:\.\d+)+)/i, e) || g.getFirstMatch(_, e);
      return r && (t.version = r), t;
    }
  },
  {
    test: [/focus/i],
    describe(e) {
      const t = {
        name: "Focus"
      }, r = g.getFirstMatch(/(?:focus)[\s/](\d+(?:\.\d+)+)/i, e) || g.getFirstMatch(_, e);
      return r && (t.version = r), t;
    }
  },
  {
    test: [/swing/i],
    describe(e) {
      const t = {
        name: "Swing"
      }, r = g.getFirstMatch(/(?:swing)[\s/](\d+(?:\.\d+)+)/i, e) || g.getFirstMatch(_, e);
      return r && (t.version = r), t;
    }
  },
  {
    test: [/coast/i],
    describe(e) {
      const t = {
        name: "Opera Coast"
      }, r = g.getFirstMatch(_, e) || g.getFirstMatch(/(?:coast)[\s/](\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  },
  {
    test: [/opt\/\d+(?:.?_?\d+)+/i],
    describe(e) {
      const t = {
        name: "Opera Touch"
      }, r = g.getFirstMatch(/(?:opt)[\s/](\d+(\.?_?\d+)+)/i, e) || g.getFirstMatch(_, e);
      return r && (t.version = r), t;
    }
  },
  {
    test: [/yabrowser/i],
    describe(e) {
      const t = {
        name: "Yandex Browser"
      }, r = g.getFirstMatch(/(?:yabrowser)[\s/](\d+(\.?_?\d+)+)/i, e) || g.getFirstMatch(_, e);
      return r && (t.version = r), t;
    }
  },
  {
    test: [/ucbrowser/i],
    describe(e) {
      const t = {
        name: "UC Browser"
      }, r = g.getFirstMatch(_, e) || g.getFirstMatch(/(?:ucbrowser)[\s/](\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  },
  {
    test: [/Maxthon|mxios/i],
    describe(e) {
      const t = {
        name: "Maxthon"
      }, r = g.getFirstMatch(_, e) || g.getFirstMatch(/(?:Maxthon|mxios)[\s/](\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  },
  {
    test: [/epiphany/i],
    describe(e) {
      const t = {
        name: "Epiphany"
      }, r = g.getFirstMatch(_, e) || g.getFirstMatch(/(?:epiphany)[\s/](\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  },
  {
    test: [/puffin/i],
    describe(e) {
      const t = {
        name: "Puffin"
      }, r = g.getFirstMatch(_, e) || g.getFirstMatch(/(?:puffin)[\s/](\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  },
  {
    test: [/sleipnir/i],
    describe(e) {
      const t = {
        name: "Sleipnir"
      }, r = g.getFirstMatch(_, e) || g.getFirstMatch(/(?:sleipnir)[\s/](\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  },
  {
    test: [/k-meleon/i],
    describe(e) {
      const t = {
        name: "K-Meleon"
      }, r = g.getFirstMatch(_, e) || g.getFirstMatch(/(?:k-meleon)[\s/](\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  },
  {
    test: [/micromessenger/i],
    describe(e) {
      const t = {
        name: "WeChat"
      }, r = g.getFirstMatch(/(?:micromessenger)[\s/](\d+(\.?_?\d+)+)/i, e) || g.getFirstMatch(_, e);
      return r && (t.version = r), t;
    }
  },
  {
    test: [/qqbrowser/i],
    describe(e) {
      const t = {
        name: /qqbrowserlite/i.test(e) ? "QQ Browser Lite" : "QQ Browser"
      }, r = g.getFirstMatch(/(?:qqbrowserlite|qqbrowser)[/](\d+(\.?_?\d+)+)/i, e) || g.getFirstMatch(_, e);
      return r && (t.version = r), t;
    }
  },
  {
    test: [/msie|trident/i],
    describe(e) {
      const t = {
        name: "Internet Explorer"
      }, r = g.getFirstMatch(/(?:msie |rv:)(\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  },
  {
    test: [/\sedg\//i],
    describe(e) {
      const t = {
        name: "Microsoft Edge"
      }, r = g.getFirstMatch(/\sedg\/(\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  },
  {
    test: [/edg([ea]|ios)/i],
    describe(e) {
      const t = {
        name: "Microsoft Edge"
      }, r = g.getSecondMatch(/edg([ea]|ios)\/(\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  },
  {
    test: [/vivaldi/i],
    describe(e) {
      const t = {
        name: "Vivaldi"
      }, r = g.getFirstMatch(/vivaldi\/(\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  },
  {
    test: [/seamonkey/i],
    describe(e) {
      const t = {
        name: "SeaMonkey"
      }, r = g.getFirstMatch(/seamonkey\/(\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  },
  {
    test: [/sailfish/i],
    describe(e) {
      const t = {
        name: "Sailfish"
      }, r = g.getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i, e);
      return r && (t.version = r), t;
    }
  },
  {
    test: [/silk/i],
    describe(e) {
      const t = {
        name: "Amazon Silk"
      }, r = g.getFirstMatch(/silk\/(\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  },
  {
    test: [/phantom/i],
    describe(e) {
      const t = {
        name: "PhantomJS"
      }, r = g.getFirstMatch(/phantomjs\/(\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  },
  {
    test: [/slimerjs/i],
    describe(e) {
      const t = {
        name: "SlimerJS"
      }, r = g.getFirstMatch(/slimerjs\/(\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  },
  {
    test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
    describe(e) {
      const t = {
        name: "BlackBerry"
      }, r = g.getFirstMatch(_, e) || g.getFirstMatch(/blackberry[\d]+\/(\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  },
  {
    test: [/(web|hpw)[o0]s/i],
    describe(e) {
      const t = {
        name: "WebOS Browser"
      }, r = g.getFirstMatch(_, e) || g.getFirstMatch(/w(?:eb)?[o0]sbrowser\/(\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  },
  {
    test: [/bada/i],
    describe(e) {
      const t = {
        name: "Bada"
      }, r = g.getFirstMatch(/dolfin\/(\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  },
  {
    test: [/tizen/i],
    describe(e) {
      const t = {
        name: "Tizen"
      }, r = g.getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.?_?\d+)+)/i, e) || g.getFirstMatch(_, e);
      return r && (t.version = r), t;
    }
  },
  {
    test: [/qupzilla/i],
    describe(e) {
      const t = {
        name: "QupZilla"
      }, r = g.getFirstMatch(/(?:qupzilla)[\s/](\d+(\.?_?\d+)+)/i, e) || g.getFirstMatch(_, e);
      return r && (t.version = r), t;
    }
  },
  {
    test: [/firefox|iceweasel|fxios/i],
    describe(e) {
      const t = {
        name: "Firefox"
      }, r = g.getFirstMatch(/(?:firefox|iceweasel|fxios)[\s/](\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  },
  {
    test: [/electron/i],
    describe(e) {
      const t = {
        name: "Electron"
      }, r = g.getFirstMatch(/(?:electron)\/(\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  },
  {
    test: [/MiuiBrowser/i],
    describe(e) {
      const t = {
        name: "Miui"
      }, r = g.getFirstMatch(/(?:MiuiBrowser)[\s/](\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  },
  {
    test: [/chromium/i],
    describe(e) {
      const t = {
        name: "Chromium"
      }, r = g.getFirstMatch(/(?:chromium)[\s/](\d+(\.?_?\d+)+)/i, e) || g.getFirstMatch(_, e);
      return r && (t.version = r), t;
    }
  },
  {
    test: [/chrome|crios|crmo/i],
    describe(e) {
      const t = {
        name: "Chrome"
      }, r = g.getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  },
  {
    test: [/GSA/i],
    describe(e) {
      const t = {
        name: "Google Search"
      }, r = g.getFirstMatch(/(?:GSA)\/(\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  },
  /* Android Browser */
  {
    test(e) {
      const t = !e.test(/like android/i), r = e.test(/android/i);
      return t && r;
    },
    describe(e) {
      const t = {
        name: "Android Browser"
      }, r = g.getFirstMatch(_, e);
      return r && (t.version = r), t;
    }
  },
  /* PlayStation 4 */
  {
    test: [/playstation 4/i],
    describe(e) {
      const t = {
        name: "PlayStation 4"
      }, r = g.getFirstMatch(_, e);
      return r && (t.version = r), t;
    }
  },
  /* Safari */
  {
    test: [/safari|applewebkit/i],
    describe(e) {
      const t = {
        name: "Safari"
      }, r = g.getFirstMatch(_, e);
      return r && (t.version = r), t;
    }
  },
  /* Something else */
  {
    test: [/.*/i],
    describe(e) {
      const t = /^(.*)\/(.*) /, r = /^(.*)\/(.*)[ \t]\((.*)/, s = e.search("\\(") !== -1 ? r : t;
      return {
        name: g.getFirstMatch(s, e),
        version: g.getSecondMatch(s, e)
      };
    }
  }
], Kl = [
  /* Roku */
  {
    test: [/Roku\/DVP/],
    describe(e) {
      const t = g.getFirstMatch(/Roku\/DVP-(\d+\.\d+)/i, e);
      return {
        name: $.Roku,
        version: t
      };
    }
  },
  /* Windows Phone */
  {
    test: [/windows phone/i],
    describe(e) {
      const t = g.getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i, e);
      return {
        name: $.WindowsPhone,
        version: t
      };
    }
  },
  /* Windows */
  {
    test: [/windows /i],
    describe(e) {
      const t = g.getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i, e), r = g.getWindowsVersionName(t);
      return {
        name: $.Windows,
        version: t,
        versionName: r
      };
    }
  },
  /* Firefox on iPad */
  {
    test: [/Macintosh(.*?) FxiOS(.*?)\//],
    describe(e) {
      const t = {
        name: $.iOS
      }, r = g.getSecondMatch(/(Version\/)(\d[\d.]+)/, e);
      return r && (t.version = r), t;
    }
  },
  /* macOS */
  {
    test: [/macintosh/i],
    describe(e) {
      const t = g.getFirstMatch(/mac os x (\d+(\.?_?\d+)+)/i, e).replace(/[_\s]/g, "."), r = g.getMacOSVersionName(t), n = {
        name: $.MacOS,
        version: t
      };
      return r && (n.versionName = r), n;
    }
  },
  /* iOS */
  {
    test: [/(ipod|iphone|ipad)/i],
    describe(e) {
      const t = g.getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i, e).replace(/[_\s]/g, ".");
      return {
        name: $.iOS,
        version: t
      };
    }
  },
  /* Android */
  {
    test(e) {
      const t = !e.test(/like android/i), r = e.test(/android/i);
      return t && r;
    },
    describe(e) {
      const t = g.getFirstMatch(/android[\s/-](\d+(\.\d+)*)/i, e), r = g.getAndroidVersionName(t), n = {
        name: $.Android,
        version: t
      };
      return r && (n.versionName = r), n;
    }
  },
  /* WebOS */
  {
    test: [/(web|hpw)[o0]s/i],
    describe(e) {
      const t = g.getFirstMatch(/(?:web|hpw)[o0]s\/(\d+(\.\d+)*)/i, e), r = {
        name: $.WebOS
      };
      return t && t.length && (r.version = t), r;
    }
  },
  /* BlackBerry */
  {
    test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
    describe(e) {
      const t = g.getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i, e) || g.getFirstMatch(/blackberry\d+\/(\d+([_\s]\d+)*)/i, e) || g.getFirstMatch(/\bbb(\d+)/i, e);
      return {
        name: $.BlackBerry,
        version: t
      };
    }
  },
  /* Bada */
  {
    test: [/bada/i],
    describe(e) {
      const t = g.getFirstMatch(/bada\/(\d+(\.\d+)*)/i, e);
      return {
        name: $.Bada,
        version: t
      };
    }
  },
  /* Tizen */
  {
    test: [/tizen/i],
    describe(e) {
      const t = g.getFirstMatch(/tizen[/\s](\d+(\.\d+)*)/i, e);
      return {
        name: $.Tizen,
        version: t
      };
    }
  },
  /* Linux */
  {
    test: [/linux/i],
    describe() {
      return {
        name: $.Linux
      };
    }
  },
  /* Chrome OS */
  {
    test: [/CrOS/],
    describe() {
      return {
        name: $.ChromeOS
      };
    }
  },
  /* Playstation 4 */
  {
    test: [/PlayStation 4/],
    describe(e) {
      const t = g.getFirstMatch(/PlayStation 4[/\s](\d+(\.\d+)*)/i, e);
      return {
        name: $.PlayStation4,
        version: t
      };
    }
  }
], Jl = [
  /* Googlebot */
  {
    test: [/googlebot/i],
    describe() {
      return {
        type: "bot",
        vendor: "Google"
      };
    }
  },
  /* Huawei */
  {
    test: [/huawei/i],
    describe(e) {
      const t = g.getFirstMatch(/(can-l01)/i, e) && "Nova", r = {
        type: O.mobile,
        vendor: "Huawei"
      };
      return t && (r.model = t), r;
    }
  },
  /* Nexus Tablet */
  {
    test: [/nexus\s*(?:7|8|9|10).*/i],
    describe() {
      return {
        type: O.tablet,
        vendor: "Nexus"
      };
    }
  },
  /* iPad */
  {
    test: [/ipad/i],
    describe() {
      return {
        type: O.tablet,
        vendor: "Apple",
        model: "iPad"
      };
    }
  },
  /* Firefox on iPad */
  {
    test: [/Macintosh(.*?) FxiOS(.*?)\//],
    describe() {
      return {
        type: O.tablet,
        vendor: "Apple",
        model: "iPad"
      };
    }
  },
  /* Amazon Kindle Fire */
  {
    test: [/kftt build/i],
    describe() {
      return {
        type: O.tablet,
        vendor: "Amazon",
        model: "Kindle Fire HD 7"
      };
    }
  },
  /* Another Amazon Tablet with Silk */
  {
    test: [/silk/i],
    describe() {
      return {
        type: O.tablet,
        vendor: "Amazon"
      };
    }
  },
  /* Tablet */
  {
    test: [/tablet(?! pc)/i],
    describe() {
      return {
        type: O.tablet
      };
    }
  },
  /* iPod/iPhone */
  {
    test(e) {
      const t = e.test(/ipod|iphone/i), r = e.test(/like (ipod|iphone)/i);
      return t && !r;
    },
    describe(e) {
      const t = g.getFirstMatch(/(ipod|iphone)/i, e);
      return {
        type: O.mobile,
        vendor: "Apple",
        model: t
      };
    }
  },
  /* Nexus Mobile */
  {
    test: [/nexus\s*[0-6].*/i, /galaxy nexus/i],
    describe() {
      return {
        type: O.mobile,
        vendor: "Nexus"
      };
    }
  },
  /* Mobile */
  {
    test: [/[^-]mobi/i],
    describe() {
      return {
        type: O.mobile
      };
    }
  },
  /* BlackBerry */
  {
    test(e) {
      return e.getBrowserName(!0) === "blackberry";
    },
    describe() {
      return {
        type: O.mobile,
        vendor: "BlackBerry"
      };
    }
  },
  /* Bada */
  {
    test(e) {
      return e.getBrowserName(!0) === "bada";
    },
    describe() {
      return {
        type: O.mobile
      };
    }
  },
  /* Windows Phone */
  {
    test(e) {
      return e.getBrowserName() === "windows phone";
    },
    describe() {
      return {
        type: O.mobile,
        vendor: "Microsoft"
      };
    }
  },
  /* Android Tablet */
  {
    test(e) {
      const t = Number(String(e.getOSVersion()).split(".")[0]);
      return e.getOSName(!0) === "android" && t >= 3;
    },
    describe() {
      return {
        type: O.tablet
      };
    }
  },
  /* Android Mobile */
  {
    test(e) {
      return e.getOSName(!0) === "android";
    },
    describe() {
      return {
        type: O.mobile
      };
    }
  },
  /* desktop */
  {
    test(e) {
      return e.getOSName(!0) === "macos";
    },
    describe() {
      return {
        type: O.desktop,
        vendor: "Apple"
      };
    }
  },
  /* Windows */
  {
    test(e) {
      return e.getOSName(!0) === "windows";
    },
    describe() {
      return {
        type: O.desktop
      };
    }
  },
  /* Linux */
  {
    test(e) {
      return e.getOSName(!0) === "linux";
    },
    describe() {
      return {
        type: O.desktop
      };
    }
  },
  /* PlayStation 4 */
  {
    test(e) {
      return e.getOSName(!0) === "playstation 4";
    },
    describe() {
      return {
        type: O.tv
      };
    }
  },
  /* Roku */
  {
    test(e) {
      return e.getOSName(!0) === "roku";
    },
    describe() {
      return {
        type: O.tv
      };
    }
  }
], Xl = [
  /* EdgeHTML */
  {
    test(e) {
      return e.getBrowserName(!0) === "microsoft edge";
    },
    describe(e) {
      if (/\sedg\//i.test(e))
        return {
          name: te.Blink
        };
      const r = g.getFirstMatch(/edge\/(\d+(\.?_?\d+)+)/i, e);
      return {
        name: te.EdgeHTML,
        version: r
      };
    }
  },
  /* Trident */
  {
    test: [/trident/i],
    describe(e) {
      const t = {
        name: te.Trident
      }, r = g.getFirstMatch(/trident\/(\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  },
  /* Presto */
  {
    test(e) {
      return e.test(/presto/i);
    },
    describe(e) {
      const t = {
        name: te.Presto
      }, r = g.getFirstMatch(/presto\/(\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  },
  /* Gecko */
  {
    test(e) {
      const t = e.test(/gecko/i), r = e.test(/like gecko/i);
      return t && !r;
    },
    describe(e) {
      const t = {
        name: te.Gecko
      }, r = g.getFirstMatch(/gecko\/(\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  },
  /* Blink */
  {
    test: [/(apple)?webkit\/537\.36/i],
    describe() {
      return {
        name: te.Blink
      };
    }
  },
  /* WebKit */
  {
    test: [/(apple)?webkit/i],
    describe(e) {
      const t = {
        name: te.WebKit
      }, r = g.getFirstMatch(/webkit\/(\d+(\.?_?\d+)+)/i, e);
      return r && (t.version = r), t;
    }
  }
];
class cs {
  /**
   * Create instance of Parser
   *
   * @param {String} UA User-Agent string
   * @param {Boolean} [skipParsing=false] parser can skip parsing in purpose of performance
   * improvements if you need to make a more particular parsing
   * like {@link Parser#parseBrowser} or {@link Parser#parsePlatform}
   *
   * @throw {Error} in case of empty UA String
   *
   * @constructor
   */
  constructor(t, r = !1) {
    if (t == null || t === "")
      throw new Error("UserAgent parameter can't be empty");
    this._ua = t, this.parsedResult = {}, r !== !0 && this.parse();
  }
  /**
   * Get UserAgent string of current Parser instance
   * @return {String} User-Agent String of the current <Parser> object
   *
   * @public
   */
  getUA() {
    return this._ua;
  }
  /**
   * Test a UA string for a regexp
   * @param {RegExp} regex
   * @return {Boolean}
   */
  test(t) {
    return t.test(this._ua);
  }
  /**
   * Get parsed browser object
   * @return {Object}
   */
  parseBrowser() {
    this.parsedResult.browser = {};
    const t = g.find(Gl, (r) => {
      if (typeof r.test == "function")
        return r.test(this);
      if (r.test instanceof Array)
        return r.test.some((n) => this.test(n));
      throw new Error("Browser's test function is not valid");
    });
    return t && (this.parsedResult.browser = t.describe(this.getUA())), this.parsedResult.browser;
  }
  /**
   * Get parsed browser object
   * @return {Object}
   *
   * @public
   */
  getBrowser() {
    return this.parsedResult.browser ? this.parsedResult.browser : this.parseBrowser();
  }
  /**
   * Get browser's name
   * @return {String} Browser's name or an empty string
   *
   * @public
   */
  getBrowserName(t) {
    return t ? String(this.getBrowser().name).toLowerCase() || "" : this.getBrowser().name || "";
  }
  /**
   * Get browser's version
   * @return {String} version of browser
   *
   * @public
   */
  getBrowserVersion() {
    return this.getBrowser().version;
  }
  /**
   * Get OS
   * @return {Object}
   *
   * @example
   * this.getOS();
   * {
   *   name: 'macOS',
   *   version: '10.11.12'
   * }
   */
  getOS() {
    return this.parsedResult.os ? this.parsedResult.os : this.parseOS();
  }
  /**
   * Parse OS and save it to this.parsedResult.os
   * @return {*|{}}
   */
  parseOS() {
    this.parsedResult.os = {};
    const t = g.find(Kl, (r) => {
      if (typeof r.test == "function")
        return r.test(this);
      if (r.test instanceof Array)
        return r.test.some((n) => this.test(n));
      throw new Error("Browser's test function is not valid");
    });
    return t && (this.parsedResult.os = t.describe(this.getUA())), this.parsedResult.os;
  }
  /**
   * Get OS name
   * @param {Boolean} [toLowerCase] return lower-cased value
   * @return {String} name of the OS — macOS, Windows, Linux, etc.
   */
  getOSName(t) {
    const { name: r } = this.getOS();
    return t ? String(r).toLowerCase() || "" : r || "";
  }
  /**
   * Get OS version
   * @return {String} full version with dots ('10.11.12', '5.6', etc)
   */
  getOSVersion() {
    return this.getOS().version;
  }
  /**
   * Get parsed platform
   * @return {{}}
   */
  getPlatform() {
    return this.parsedResult.platform ? this.parsedResult.platform : this.parsePlatform();
  }
  /**
   * Get platform name
   * @param {Boolean} [toLowerCase=false]
   * @return {*}
   */
  getPlatformType(t = !1) {
    const { type: r } = this.getPlatform();
    return t ? String(r).toLowerCase() || "" : r || "";
  }
  /**
   * Get parsed platform
   * @return {{}}
   */
  parsePlatform() {
    this.parsedResult.platform = {};
    const t = g.find(Jl, (r) => {
      if (typeof r.test == "function")
        return r.test(this);
      if (r.test instanceof Array)
        return r.test.some((n) => this.test(n));
      throw new Error("Browser's test function is not valid");
    });
    return t && (this.parsedResult.platform = t.describe(this.getUA())), this.parsedResult.platform;
  }
  /**
   * Get parsed engine
   * @return {{}}
   */
  getEngine() {
    return this.parsedResult.engine ? this.parsedResult.engine : this.parseEngine();
  }
  /**
   * Get engines's name
   * @return {String} Engines's name or an empty string
   *
   * @public
   */
  getEngineName(t) {
    return t ? String(this.getEngine().name).toLowerCase() || "" : this.getEngine().name || "";
  }
  /**
   * Get parsed platform
   * @return {{}}
   */
  parseEngine() {
    this.parsedResult.engine = {};
    const t = g.find(Xl, (r) => {
      if (typeof r.test == "function")
        return r.test(this);
      if (r.test instanceof Array)
        return r.test.some((n) => this.test(n));
      throw new Error("Browser's test function is not valid");
    });
    return t && (this.parsedResult.engine = t.describe(this.getUA())), this.parsedResult.engine;
  }
  /**
   * Parse full information about the browser
   * @returns {Parser}
   */
  parse() {
    return this.parseBrowser(), this.parseOS(), this.parsePlatform(), this.parseEngine(), this;
  }
  /**
   * Get parsed result
   * @return {ParsedResult}
   */
  getResult() {
    return g.assign({}, this.parsedResult);
  }
  /**
   * Check if parsed browser matches certain conditions
   *
   * @param {Object} checkTree It's one or two layered object,
   * which can include a platform or an OS on the first layer
   * and should have browsers specs on the bottom-laying layer
   *
   * @returns {Boolean|undefined} Whether the browser satisfies the set conditions or not.
   * Returns `undefined` when the browser is no described in the checkTree object.
   *
   * @example
   * const browser = Bowser.getParser(window.navigator.userAgent);
   * if (browser.satisfies({chrome: '>118.01.1322' }))
   * // or with os
   * if (browser.satisfies({windows: { chrome: '>118.01.1322' } }))
   * // or with platforms
   * if (browser.satisfies({desktop: { chrome: '>118.01.1322' } }))
   */
  satisfies(t) {
    const r = {};
    let n = 0;
    const s = {};
    let i = 0;
    if (Object.keys(t).forEach((a) => {
      const u = t[a];
      typeof u == "string" ? (s[a] = u, i += 1) : typeof u == "object" && (r[a] = u, n += 1);
    }), n > 0) {
      const a = Object.keys(r), u = g.find(a, (d) => this.isOS(d));
      if (u) {
        const d = this.satisfies(r[u]);
        if (d !== void 0)
          return d;
      }
      const c = g.find(
        a,
        (d) => this.isPlatform(d)
      );
      if (c) {
        const d = this.satisfies(r[c]);
        if (d !== void 0)
          return d;
      }
    }
    if (i > 0) {
      const a = Object.keys(s), u = g.find(a, (c) => this.isBrowser(c, !0));
      if (u !== void 0)
        return this.compareVersion(s[u]);
    }
  }
  /**
   * Check if the browser name equals the passed string
   * @param browserName The string to compare with the browser name
   * @param [includingAlias=false] The flag showing whether alias will be included into comparison
   * @returns {boolean}
   */
  isBrowser(t, r = !1) {
    const n = this.getBrowserName().toLowerCase();
    let s = t.toLowerCase();
    const i = g.getBrowserTypeByAlias(s);
    return r && i && (s = i.toLowerCase()), s === n;
  }
  compareVersion(t) {
    let r = [0], n = t, s = !1;
    const i = this.getBrowserVersion();
    if (typeof i == "string")
      return t[0] === ">" || t[0] === "<" ? (n = t.substr(1), t[1] === "=" ? (s = !0, n = t.substr(2)) : r = [], t[0] === ">" ? r.push(1) : r.push(-1)) : t[0] === "=" ? n = t.substr(1) : t[0] === "~" && (s = !0, n = t.substr(1)), r.indexOf(
        g.compareVersions(i, n, s)
      ) > -1;
  }
  isOS(t) {
    return this.getOSName(!0) === String(t).toLowerCase();
  }
  isPlatform(t) {
    return this.getPlatformType(!0) === String(t).toLowerCase();
  }
  isEngine(t) {
    return this.getEngineName(!0) === String(t).toLowerCase();
  }
  /**
   * Is anything? Check if the browser is called "anything",
   * the OS called "anything" or the platform called "anything"
   * @param {String} anything
   * @param [includingAlias=false] The flag showing whether alias will be included into comparison
   * @returns {Boolean}
   */
  is(t, r = !1) {
    return this.isBrowser(t, r) || this.isOS(t) || this.isPlatform(t);
  }
  /**
   * Check if any of the given values satisfies this.is(anything)
   * @param {String[]} anythings
   * @returns {Boolean}
   */
  some(t = []) {
    return t.some((r) => this.is(r));
  }
}
/*!
 * Bowser - a browser detector
 * https://github.com/lancedikson/bowser
 * MIT License | (c) Dustin Diaz 2012-2015
 * MIT License | (c) Denis Demchenko 2015-2019
 */
class Mi {
  /**
   * Creates a {@link Parser} instance
   *
   * @param {String} UA UserAgent string
   * @param {Boolean} [skipParsing=false] Will make the Parser postpone parsing until you ask it
   * explicitly. Same as `skipParsing` for {@link Parser}.
   * @returns {Parser}
   * @throws {Error} when UA is not a String
   *
   * @example
   * const parser = Bowser.getParser(window.navigator.userAgent);
   * const result = parser.getResult();
   */
  static getParser(t, r = !1) {
    if (typeof t != "string")
      throw new Error("UserAgent should be a string");
    return new cs(t, r);
  }
  /**
   * Creates a {@link Parser} instance and runs {@link Parser.getResult} immediately
   *
   * @param UA
   * @return {ParsedResult}
   *
   * @example
   * const result = Bowser.parse(window.navigator.userAgent);
   */
  static parse(t) {
    return new cs(t).getResult();
  }
  static get BROWSER_MAP() {
    return ki;
  }
  static get ENGINE_MAP() {
    return te;
  }
  static get OS_MAP() {
    return $;
  }
  static get PLATFORMS_MAP() {
    return O;
  }
}
const Ql = ({ serviceId: e, clientVersion: t }) => async (r) => {
  var o, a, u, c, d, l;
  const n = typeof window < "u" && ((o = window == null ? void 0 : window.navigator) != null && o.userAgent) ? Mi.parse(window.navigator.userAgent) : void 0, s = [
    ["aws-sdk-js", t],
    ["ua", "2.1"],
    [`os/${((a = n == null ? void 0 : n.os) == null ? void 0 : a.name) || "other"}`, (u = n == null ? void 0 : n.os) == null ? void 0 : u.version],
    ["lang/js"],
    ["md/browser", `${((c = n == null ? void 0 : n.browser) == null ? void 0 : c.name) ?? "unknown"}_${((d = n == null ? void 0 : n.browser) == null ? void 0 : d.version) ?? "unknown"}`]
  ];
  e && s.push([`api/${e}`, t]);
  const i = await ((l = r == null ? void 0 : r.userAgentAppId) == null ? void 0 : l.call(r));
  return i && s.push([`app/${i}`]), s;
};
function us(e, t) {
  return new Request(e, t);
}
function Yl(e = 0) {
  return new Promise((t, r) => {
    e && setTimeout(() => {
      const n = new Error(`Request did not complete within ${e} ms`);
      n.name = "TimeoutError", r(n);
    }, e);
  });
}
const Xt = {
  supported: void 0
};
class Ar {
  static create(t) {
    return typeof (t == null ? void 0 : t.handle) == "function" ? t : new Ar(t);
  }
  constructor(t) {
    typeof t == "function" ? this.configProvider = t().then((r) => r || {}) : (this.config = t ?? {}, this.configProvider = Promise.resolve(this.config)), Xt.supported === void 0 && (Xt.supported = typeof Request < "u" && "keepalive" in us("https://[::1]"));
  }
  destroy() {
  }
  async handle(t, { abortSignal: r } = {}) {
    var S;
    this.config || (this.config = await this.configProvider);
    const n = this.config.requestTimeout, s = this.config.keepAlive === !0, i = this.config.credentials;
    if (r != null && r.aborted) {
      const b = new Error("Request aborted");
      return b.name = "AbortError", Promise.reject(b);
    }
    let o = t.path;
    const a = Rc(t.query || {});
    a && (o += `?${a}`), t.fragment && (o += `#${t.fragment}`);
    let u = "";
    if (t.username != null || t.password != null) {
      const b = t.username ?? "", T = t.password ?? "";
      u = `${b}:${T}@`;
    }
    const { port: c, method: d } = t, l = `${t.protocol}//${u}${t.hostname}${c ? `:${c}` : ""}${o}`, f = d === "GET" || d === "HEAD" ? void 0 : t.body, h = {
      body: f,
      headers: new Headers(t.headers),
      method: d,
      credentials: i
    };
    (S = this.config) != null && S.cache && (h.cache = this.config.cache), f && (h.duplex = "half"), typeof AbortController < "u" && (h.signal = r), Xt.supported && (h.keepalive = s), typeof this.config.requestInit == "function" && Object.assign(h, this.config.requestInit(t));
    let y = () => {
    };
    const w = us(l, h), m = [
      fetch(w).then((b) => {
        const T = b.headers, v = {};
        for (const D of T.entries())
          v[D[0]] = D[1];
        return b.body != null ? {
          response: new ot({
            headers: v,
            reason: b.statusText,
            statusCode: b.status,
            body: b.body
          })
        } : b.blob().then((D) => ({
          response: new ot({
            headers: v,
            reason: b.statusText,
            statusCode: b.status,
            body: D
          })
        }));
      }),
      Yl(n)
    ];
    return r && m.push(new Promise((b, T) => {
      const v = () => {
        const C = new Error("Request aborted");
        C.name = "AbortError", T(C);
      };
      if (typeof r.addEventListener == "function") {
        const C = r;
        C.addEventListener("abort", v, { once: !0 }), y = () => C.removeEventListener("abort", v);
      } else
        r.onabort = v;
    })), Promise.race(m).finally(y);
  }
  updateHttpClientConfig(t, r) {
    this.config = void 0, this.configProvider = this.configProvider.then((n) => (n[t] = r, n));
  }
  httpHandlerConfigs() {
    return this.config ?? {};
  }
}
const Zl = async (e) => {
  var t;
  return typeof Blob == "function" && e instanceof Blob || ((t = e.constructor) == null ? void 0 : t.name) === "Blob" ? Blob.prototype.arrayBuffer !== void 0 ? new Uint8Array(await e.arrayBuffer()) : ef(e) : tf(e);
};
async function ef(e) {
  const t = await rf(e), r = wr(t);
  return new Uint8Array(r);
}
async function tf(e) {
  const t = [], r = e.getReader();
  let n = !1, s = 0;
  for (; !n; ) {
    const { done: a, value: u } = await r.read();
    u && (t.push(u), s += u.length), n = a;
  }
  const i = new Uint8Array(s);
  let o = 0;
  for (const a of t)
    i.set(a, o), o += a.length;
  return i;
}
function rf(e) {
  return new Promise((t, r) => {
    const n = new FileReader();
    n.onloadend = () => {
      if (n.readyState !== 2)
        return r(new Error("Reader aborted too early"));
      const s = n.result ?? "", i = s.indexOf(","), o = i > -1 ? i + 1 : s.length;
      t(s.substring(o));
    }, n.onabort = () => r(new Error("Read aborted")), n.onerror = () => r(n.error), n.readAsDataURL(e);
  });
}
const nf = (e) => () => Promise.reject(e), ds = typeof TextEncoder == "function" ? new TextEncoder() : null, sf = (e) => {
  if (typeof e == "string") {
    if (ds)
      return ds.encode(e).byteLength;
    let t = e.length;
    for (let r = t - 1; r >= 0; r--) {
      const n = e.charCodeAt(r);
      n > 127 && n <= 2047 ? t++ : n > 2047 && n <= 65535 && (t += 2), n >= 56320 && n <= 57343 && r--;
    }
    return t;
  } else {
    if (typeof e.byteLength == "number")
      return e.byteLength;
    if (typeof e.size == "number")
      return e.size;
  }
  throw new Error(`Body Length computation failed for ${e}`);
}, Ui = "required", W = "fn", G = "argv", _e = "ref", ls = !0, fs = "isSet", Be = "booleanEquals", ge = "error", we = "endpoint", Z = "tree", Tr = "PartitionResult", vr = "getAttr", hs = { [Ui]: !1, type: "String" }, ps = { [Ui]: !0, default: !1, type: "Boolean" }, ms = { [_e]: "Endpoint" }, $i = { [W]: Be, [G]: [{ [_e]: "UseFIPS" }, !0] }, Li = { [W]: Be, [G]: [{ [_e]: "UseDualStack" }, !0] }, z = {}, ys = { [W]: vr, [G]: [{ [_e]: Tr }, "supportsFIPS"] }, Fi = { [_e]: Tr }, gs = { [W]: Be, [G]: [!0, { [W]: vr, [G]: [Fi, "supportsDualStack"] }] }, ws = [$i], Es = [Li], Ss = [{ [_e]: "Region" }], of = { parameters: { Region: hs, UseDualStack: ps, UseFIPS: ps, Endpoint: hs }, rules: [{ conditions: [{ [W]: fs, [G]: [ms] }], rules: [{ conditions: ws, error: "Invalid Configuration: FIPS and custom endpoint are not supported", type: ge }, { conditions: Es, error: "Invalid Configuration: Dualstack and custom endpoint are not supported", type: ge }, { endpoint: { url: ms, properties: z, headers: z }, type: we }], type: Z }, { conditions: [{ [W]: fs, [G]: Ss }], rules: [{ conditions: [{ [W]: "aws.partition", [G]: Ss, assign: Tr }], rules: [{ conditions: [$i, Li], rules: [{ conditions: [{ [W]: Be, [G]: [ls, ys] }, gs], rules: [{ endpoint: { url: "https://oidc-fips.{Region}.{PartitionResult#dualStackDnsSuffix}", properties: z, headers: z }, type: we }], type: Z }, { error: "FIPS and DualStack are enabled, but this partition does not support one or both", type: ge }], type: Z }, { conditions: ws, rules: [{ conditions: [{ [W]: Be, [G]: [ys, ls] }], rules: [{ conditions: [{ [W]: "stringEquals", [G]: [{ [W]: vr, [G]: [Fi, "name"] }, "aws-us-gov"] }], endpoint: { url: "https://oidc.{Region}.amazonaws.com", properties: z, headers: z }, type: we }, { endpoint: { url: "https://oidc-fips.{Region}.{PartitionResult#dnsSuffix}", properties: z, headers: z }, type: we }], type: Z }, { error: "FIPS is enabled but this partition does not support FIPS", type: ge }], type: Z }, { conditions: Es, rules: [{ conditions: [gs], rules: [{ endpoint: { url: "https://oidc.{Region}.{PartitionResult#dualStackDnsSuffix}", properties: z, headers: z }, type: we }], type: Z }, { error: "DualStack is enabled but this partition does not support DualStack", type: ge }], type: Z }, { endpoint: { url: "https://oidc.{Region}.{PartitionResult#dnsSuffix}", properties: z, headers: z }, type: we }], type: Z }], type: Z }, { error: "Invalid Configuration: Missing Region", type: ge }] }, af = of, cf = new Uc({
  size: 50,
  params: ["Endpoint", "Region", "UseDualStack", "UseFIPS"]
}), uf = (e, t = {}) => cf.get(e, () => tu(af, {
  endpointParams: e,
  logger: t.logger
}));
at.aws = mi;
const df = (e) => ({
  apiVersion: "2019-06-10",
  base64Decoder: (e == null ? void 0 : e.base64Decoder) ?? wr,
  base64Encoder: (e == null ? void 0 : e.base64Encoder) ?? ii,
  disableHostPrefix: (e == null ? void 0 : e.disableHostPrefix) ?? !1,
  endpointProvider: (e == null ? void 0 : e.endpointProvider) ?? uf,
  extensions: (e == null ? void 0 : e.extensions) ?? [],
  httpAuthSchemeProvider: (e == null ? void 0 : e.httpAuthSchemeProvider) ?? Sl,
  httpAuthSchemes: (e == null ? void 0 : e.httpAuthSchemes) ?? [
    {
      schemeId: "aws.auth#sigv4",
      identityProvider: (t) => t.getIdentityProvider("aws.auth#sigv4"),
      signer: new lu()
    },
    {
      schemeId: "smithy.api#noAuth",
      identityProvider: (t) => t.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
      signer: new xc()
    }
  ],
  logger: (e == null ? void 0 : e.logger) ?? new Ti(),
  serviceId: (e == null ? void 0 : e.serviceId) ?? "SSO OIDC",
  urlParser: (e == null ? void 0 : e.urlParser) ?? lt,
  utf8Decoder: (e == null ? void 0 : e.utf8Decoder) ?? Re,
  utf8Encoder: (e == null ? void 0 : e.utf8Encoder) ?? si
}), lf = ["in-region", "cross-region", "mobile", "standard", "legacy"], ff = ({ defaultsMode: e } = {}) => fu(async () => {
  const t = typeof e == "function" ? await e() : e;
  switch (t == null ? void 0 : t.toLowerCase()) {
    case "auto":
      return Promise.resolve(hf() ? "mobile" : "standard");
    case "mobile":
    case "in-region":
    case "cross-region":
    case "standard":
    case "legacy":
      return Promise.resolve(t == null ? void 0 : t.toLocaleLowerCase());
    case void 0:
      return Promise.resolve("legacy");
    default:
      throw new Error(`Invalid parameter for "defaultsMode", expect ${lf.join(", ")}, got ${t}`);
  }
}), hf = () => {
  var r, n;
  const e = typeof window < "u" && ((r = window == null ? void 0 : window.navigator) != null && r.userAgent) ? Mi.parse(window.navigator.userAgent) : void 0, t = (n = e == null ? void 0 : e.platform) == null ? void 0 : n.type;
  return t === "tablet" || t === "mobile";
}, pf = (e) => {
  const t = ff(e), r = () => t().then(Xu), n = df(e);
  return {
    ...n,
    ...e,
    runtime: "browser",
    defaultsMode: t,
    bodyLengthChecker: (e == null ? void 0 : e.bodyLengthChecker) ?? sf,
    credentialDefaultProvider: (e == null ? void 0 : e.credentialDefaultProvider) ?? ((s) => () => Promise.reject(new Error("Credential is missing"))),
    defaultUserAgentProvider: (e == null ? void 0 : e.defaultUserAgentProvider) ?? Ql({ serviceId: n.serviceId, clientVersion: Tl.version }),
    maxAttempts: (e == null ? void 0 : e.maxAttempts) ?? ft,
    region: (e == null ? void 0 : e.region) ?? nf("Region is missing"),
    requestHandler: Ar.create((e == null ? void 0 : e.requestHandler) ?? r),
    retryMode: (e == null ? void 0 : e.retryMode) ?? (async () => (await r()).retryMode || Fd),
    sha256: (e == null ? void 0 : e.sha256) ?? Vl,
    streamCollector: (e == null ? void 0 : e.streamCollector) ?? Zl,
    useDualstackEndpoint: (e == null ? void 0 : e.useDualstackEndpoint) ?? (() => Promise.resolve(gd)),
    useFipsEndpoint: (e == null ? void 0 : e.useFipsEndpoint) ?? (() => Promise.resolve(wd))
  };
}, mf = (e) => {
  let t = async () => {
    if (e.region === void 0)
      throw new Error("Region is missing from runtimeConfig");
    const r = e.region;
    return typeof r == "string" ? r : r();
  };
  return {
    setRegion(r) {
      t = r;
    },
    region() {
      return t;
    }
  };
}, yf = (e) => ({
  region: e.region()
}), gf = (e) => {
  const t = e.httpAuthSchemes;
  let r = e.httpAuthSchemeProvider, n = e.credentials;
  return {
    setHttpAuthScheme(s) {
      const i = t.findIndex((o) => o.schemeId === s.schemeId);
      i === -1 ? t.push(s) : t.splice(i, 1, s);
    },
    httpAuthSchemes() {
      return t;
    },
    setHttpAuthSchemeProvider(s) {
      r = s;
    },
    httpAuthSchemeProvider() {
      return r;
    },
    setCredentials(s) {
      n = s;
    },
    credentials() {
      return n;
    }
  };
}, wf = (e) => ({
  httpAuthSchemes: e.httpAuthSchemes(),
  httpAuthSchemeProvider: e.httpAuthSchemeProvider(),
  credentials: e.credentials()
}), Qe = (e) => e, Ef = (e, t) => {
  const r = {
    ...Qe(mf(e)),
    ...Qe(td(e)),
    ...Qe(Ga(e)),
    ...Qe(gf(e))
  };
  return t.forEach((n) => n.configure(r)), {
    ...e,
    ...yf(r),
    ...rd(r),
    ...Ka(r),
    ...wf(r)
  };
};
let Sf = class extends Fu {
  constructor(...[r]) {
    const n = pf(r || {}), s = Rl(n), i = Mc(s), o = ul(i), a = Ed(o), u = a, c = Ld(u), d = bl(c), l = Ef(d, (r == null ? void 0 : r.extensions) || []);
    super(l);
    E(this, "config");
    this.config = l, this.middlewareStack.use(yd(this.config)), this.middlewareStack.use(yl(this.config)), this.middlewareStack.use(Rd(this.config)), this.middlewareStack.use(Ya(this.config)), this.middlewareStack.use(tc(this.config)), this.middlewareStack.use(oc(this.config)), this.middlewareStack.use(lc(this.config, {
      httpAuthSchemeParametersProvider: wl,
      identityProviderConfigProvider: async (f) => new _c({
        "aws.auth#sigv4": f.credentials
      })
    })), this.middlewareStack.use(gc(this.config));
  }
  destroy() {
    super.destroy();
  }
};
class N extends Se {
  constructor(t) {
    super(t), Object.setPrototypeOf(this, N.prototype);
  }
}
class Ot extends N {
  constructor(r) {
    super({
      name: "AccessDeniedException",
      $fault: "client",
      ...r
    });
    E(this, "name", "AccessDeniedException");
    E(this, "$fault", "client");
    E(this, "error");
    E(this, "error_description");
    Object.setPrototypeOf(this, Ot.prototype), this.error = r.error, this.error_description = r.error_description;
  }
}
class Cr extends N {
  constructor(r) {
    super({
      name: "AuthorizationPendingException",
      $fault: "client",
      ...r
    });
    E(this, "name", "AuthorizationPendingException");
    E(this, "$fault", "client");
    E(this, "error");
    E(this, "error_description");
    Object.setPrototypeOf(this, Cr.prototype), this.error = r.error, this.error_description = r.error_description;
  }
}
class It extends N {
  constructor(r) {
    super({
      name: "ExpiredTokenException",
      $fault: "client",
      ...r
    });
    E(this, "name", "ExpiredTokenException");
    E(this, "$fault", "client");
    E(this, "error");
    E(this, "error_description");
    Object.setPrototypeOf(this, It.prototype), this.error = r.error, this.error_description = r.error_description;
  }
}
class Dt extends N {
  constructor(r) {
    super({
      name: "InternalServerException",
      $fault: "server",
      ...r
    });
    E(this, "name", "InternalServerException");
    E(this, "$fault", "server");
    E(this, "error");
    E(this, "error_description");
    Object.setPrototypeOf(this, Dt.prototype), this.error = r.error, this.error_description = r.error_description;
  }
}
class Pt extends N {
  constructor(r) {
    super({
      name: "InvalidClientException",
      $fault: "client",
      ...r
    });
    E(this, "name", "InvalidClientException");
    E(this, "$fault", "client");
    E(this, "error");
    E(this, "error_description");
    Object.setPrototypeOf(this, Pt.prototype), this.error = r.error, this.error_description = r.error_description;
  }
}
class Nt extends N {
  constructor(r) {
    super({
      name: "InvalidGrantException",
      $fault: "client",
      ...r
    });
    E(this, "name", "InvalidGrantException");
    E(this, "$fault", "client");
    E(this, "error");
    E(this, "error_description");
    Object.setPrototypeOf(this, Nt.prototype), this.error = r.error, this.error_description = r.error_description;
  }
}
class kt extends N {
  constructor(r) {
    super({
      name: "InvalidRequestException",
      $fault: "client",
      ...r
    });
    E(this, "name", "InvalidRequestException");
    E(this, "$fault", "client");
    E(this, "error");
    E(this, "error_description");
    Object.setPrototypeOf(this, kt.prototype), this.error = r.error, this.error_description = r.error_description;
  }
}
class _r extends N {
  constructor(r) {
    super({
      name: "InvalidScopeException",
      $fault: "client",
      ...r
    });
    E(this, "name", "InvalidScopeException");
    E(this, "$fault", "client");
    E(this, "error");
    E(this, "error_description");
    Object.setPrototypeOf(this, _r.prototype), this.error = r.error, this.error_description = r.error_description;
  }
}
class Mt extends N {
  constructor(r) {
    super({
      name: "SlowDownException",
      $fault: "client",
      ...r
    });
    E(this, "name", "SlowDownException");
    E(this, "$fault", "client");
    E(this, "error");
    E(this, "error_description");
    Object.setPrototypeOf(this, Mt.prototype), this.error = r.error, this.error_description = r.error_description;
  }
}
class Ut extends N {
  constructor(r) {
    super({
      name: "UnauthorizedClientException",
      $fault: "client",
      ...r
    });
    E(this, "name", "UnauthorizedClientException");
    E(this, "$fault", "client");
    E(this, "error");
    E(this, "error_description");
    Object.setPrototypeOf(this, Ut.prototype), this.error = r.error, this.error_description = r.error_description;
  }
}
class xr extends N {
  constructor(r) {
    super({
      name: "UnsupportedGrantTypeException",
      $fault: "client",
      ...r
    });
    E(this, "name", "UnsupportedGrantTypeException");
    E(this, "$fault", "client");
    E(this, "error");
    E(this, "error_description");
    Object.setPrototypeOf(this, xr.prototype), this.error = r.error, this.error_description = r.error_description;
  }
}
class Or extends N {
  constructor(r) {
    super({
      name: "InvalidRequestRegionException",
      $fault: "client",
      ...r
    });
    E(this, "name", "InvalidRequestRegionException");
    E(this, "$fault", "client");
    E(this, "error");
    E(this, "error_description");
    E(this, "endpoint");
    E(this, "region");
    Object.setPrototypeOf(this, Or.prototype), this.error = r.error, this.error_description = r.error_description, this.endpoint = r.endpoint, this.region = r.region;
  }
}
class Ir extends N {
  constructor(r) {
    super({
      name: "InvalidClientMetadataException",
      $fault: "client",
      ...r
    });
    E(this, "name", "InvalidClientMetadataException");
    E(this, "$fault", "client");
    E(this, "error");
    E(this, "error_description");
    Object.setPrototypeOf(this, Ir.prototype), this.error = r.error, this.error_description = r.error_description;
  }
}
class Dr extends N {
  constructor(r) {
    super({
      name: "InvalidRedirectUriException",
      $fault: "client",
      ...r
    });
    E(this, "name", "InvalidRedirectUriException");
    E(this, "$fault", "client");
    E(this, "error");
    E(this, "error_description");
    Object.setPrototypeOf(this, Dr.prototype), this.error = r.error, this.error_description = r.error_description;
  }
}
const bf = (e) => ({
  ...e,
  ...e.clientSecret && { clientSecret: L },
  ...e.refreshToken && { refreshToken: L },
  ...e.codeVerifier && { codeVerifier: L }
}), Rf = (e) => ({
  ...e,
  ...e.accessToken && { accessToken: L },
  ...e.refreshToken && { refreshToken: L },
  ...e.idToken && { idToken: L }
}), Af = (e) => ({
  ...e,
  ...e.refreshToken && { refreshToken: L },
  ...e.assertion && { assertion: L },
  ...e.subjectToken && { subjectToken: L },
  ...e.codeVerifier && { codeVerifier: L }
}), Tf = (e) => ({
  ...e,
  ...e.accessToken && { accessToken: L },
  ...e.refreshToken && { refreshToken: L },
  ...e.idToken && { idToken: L }
}), vf = (e) => ({
  ...e,
  ...e.clientSecret && { clientSecret: L }
}), Cf = (e) => ({
  ...e,
  ...e.clientSecret && { clientSecret: L }
}), _f = async (e, t) => {
  const r = bt(e, t), n = {
    "content-type": "application/json"
  };
  r.bp("/token");
  let s;
  return s = JSON.stringify(x(e, {
    clientId: [],
    clientSecret: [],
    code: [],
    codeVerifier: [],
    deviceCode: [],
    grantType: [],
    redirectUri: [],
    refreshToken: [],
    scope: (i) => ne(i)
  })), r.m("POST").h(n).b(s), r.build();
}, xf = async (e, t) => {
  const r = bt(e, t), n = {
    "content-type": "application/json"
  };
  r.bp("/token");
  const s = P({
    [Xf]: [, "t"]
  });
  let i;
  return i = JSON.stringify(x(e, {
    assertion: [],
    clientId: [],
    code: [],
    codeVerifier: [],
    grantType: [],
    redirectUri: [],
    refreshToken: [],
    requestedTokenType: [],
    scope: (o) => ne(o),
    subjectToken: [],
    subjectTokenType: []
  })), r.m("POST").h(n).q(s).b(i), r.build();
}, Of = async (e, t) => {
  const r = bt(e, t), n = {
    "content-type": "application/json"
  };
  r.bp("/client/register");
  let s;
  return s = JSON.stringify(x(e, {
    clientName: [],
    clientType: [],
    entitledApplicationArn: [],
    grantTypes: (i) => ne(i),
    issuerUrl: [],
    redirectUris: (i) => ne(i),
    scopes: (i) => ne(i)
  })), r.m("POST").h(n).b(s), r.build();
}, If = async (e, t) => {
  const r = bt(e, t), n = {
    "content-type": "application/json"
  };
  r.bp("/device_authorization");
  let s;
  return s = JSON.stringify(x(e, {
    clientId: [],
    clientSecret: [],
    startUrl: []
  })), r.m("POST").h(n).b(s), r.build();
}, Df = async (e, t) => {
  if (e.statusCode !== 200 && e.statusCode >= 300)
    return $t(e, t);
  const r = P({
    $metadata: k(e)
  }), n = At(Tt(await ze(e.body, t)), "body"), s = x(n, {
    accessToken: R,
    expiresIn: dt,
    idToken: R,
    refreshToken: R,
    tokenType: R
  });
  return Object.assign(r, s), r;
}, Pf = async (e, t) => {
  if (e.statusCode !== 200 && e.statusCode >= 300)
    return $t(e, t);
  const r = P({
    $metadata: k(e)
  }), n = At(Tt(await ze(e.body, t)), "body"), s = x(n, {
    accessToken: R,
    expiresIn: dt,
    idToken: R,
    issuedTokenType: R,
    refreshToken: R,
    scope: ne,
    tokenType: R
  });
  return Object.assign(r, s), r;
}, Nf = async (e, t) => {
  if (e.statusCode !== 200 && e.statusCode >= 300)
    return $t(e, t);
  const r = P({
    $metadata: k(e)
  }), n = At(Tt(await ze(e.body, t)), "body"), s = x(n, {
    authorizationEndpoint: R,
    clientId: R,
    clientIdIssuedAt: ar,
    clientSecret: R,
    clientSecretExpiresAt: ar,
    tokenEndpoint: R
  });
  return Object.assign(r, s), r;
}, kf = async (e, t) => {
  if (e.statusCode !== 200 && e.statusCode >= 300)
    return $t(e, t);
  const r = P({
    $metadata: k(e)
  }), n = At(Tt(await ze(e.body, t)), "body"), s = x(n, {
    deviceCode: R,
    expiresIn: dt,
    interval: dt,
    userCode: R,
    verificationUri: R,
    verificationUriComplete: R
  });
  return Object.assign(r, s), r;
}, $t = async (e, t) => {
  const r = {
    ...e,
    body: await od(e.body, t)
  }, n = ad(e, r.body);
  switch (n) {
    case "AccessDeniedException":
    case "com.amazonaws.ssooidc#AccessDeniedException":
      throw await Uf(r);
    case "AuthorizationPendingException":
    case "com.amazonaws.ssooidc#AuthorizationPendingException":
      throw await $f(r);
    case "ExpiredTokenException":
    case "com.amazonaws.ssooidc#ExpiredTokenException":
      throw await Lf(r);
    case "InternalServerException":
    case "com.amazonaws.ssooidc#InternalServerException":
      throw await Ff(r);
    case "InvalidClientException":
    case "com.amazonaws.ssooidc#InvalidClientException":
      throw await Bf(r);
    case "InvalidGrantException":
    case "com.amazonaws.ssooidc#InvalidGrantException":
      throw await qf(r);
    case "InvalidRequestException":
    case "com.amazonaws.ssooidc#InvalidRequestException":
      throw await zf(r);
    case "InvalidScopeException":
    case "com.amazonaws.ssooidc#InvalidScopeException":
      throw await Wf(r);
    case "SlowDownException":
    case "com.amazonaws.ssooidc#SlowDownException":
      throw await Gf(r);
    case "UnauthorizedClientException":
    case "com.amazonaws.ssooidc#UnauthorizedClientException":
      throw await Kf(r);
    case "UnsupportedGrantTypeException":
    case "com.amazonaws.ssooidc#UnsupportedGrantTypeException":
      throw await Jf(r);
    case "InvalidRequestRegionException":
    case "com.amazonaws.ssooidc#InvalidRequestRegionException":
      throw await Vf(r);
    case "InvalidClientMetadataException":
    case "com.amazonaws.ssooidc#InvalidClientMetadataException":
      throw await Hf(r);
    case "InvalidRedirectUriException":
    case "com.amazonaws.ssooidc#InvalidRedirectUriException":
      throw await jf(r);
    default:
      const s = r.body;
      return Mf({
        output: e,
        parsedBody: s,
        errorCode: n
      });
  }
}, Mf = Ku(N), Uf = async (e, t) => {
  const r = P({}), n = e.body, s = x(n, {
    error: R,
    error_description: R
  });
  Object.assign(r, s);
  const i = new Ot({
    $metadata: k(e),
    ...r
  });
  return F(i, e.body);
}, $f = async (e, t) => {
  const r = P({}), n = e.body, s = x(n, {
    error: R,
    error_description: R
  });
  Object.assign(r, s);
  const i = new Cr({
    $metadata: k(e),
    ...r
  });
  return F(i, e.body);
}, Lf = async (e, t) => {
  const r = P({}), n = e.body, s = x(n, {
    error: R,
    error_description: R
  });
  Object.assign(r, s);
  const i = new It({
    $metadata: k(e),
    ...r
  });
  return F(i, e.body);
}, Ff = async (e, t) => {
  const r = P({}), n = e.body, s = x(n, {
    error: R,
    error_description: R
  });
  Object.assign(r, s);
  const i = new Dt({
    $metadata: k(e),
    ...r
  });
  return F(i, e.body);
}, Bf = async (e, t) => {
  const r = P({}), n = e.body, s = x(n, {
    error: R,
    error_description: R
  });
  Object.assign(r, s);
  const i = new Pt({
    $metadata: k(e),
    ...r
  });
  return F(i, e.body);
}, Hf = async (e, t) => {
  const r = P({}), n = e.body, s = x(n, {
    error: R,
    error_description: R
  });
  Object.assign(r, s);
  const i = new Ir({
    $metadata: k(e),
    ...r
  });
  return F(i, e.body);
}, qf = async (e, t) => {
  const r = P({}), n = e.body, s = x(n, {
    error: R,
    error_description: R
  });
  Object.assign(r, s);
  const i = new Nt({
    $metadata: k(e),
    ...r
  });
  return F(i, e.body);
}, jf = async (e, t) => {
  const r = P({}), n = e.body, s = x(n, {
    error: R,
    error_description: R
  });
  Object.assign(r, s);
  const i = new Dr({
    $metadata: k(e),
    ...r
  });
  return F(i, e.body);
}, zf = async (e, t) => {
  const r = P({}), n = e.body, s = x(n, {
    error: R,
    error_description: R
  });
  Object.assign(r, s);
  const i = new kt({
    $metadata: k(e),
    ...r
  });
  return F(i, e.body);
}, Vf = async (e, t) => {
  const r = P({}), n = e.body, s = x(n, {
    endpoint: R,
    error: R,
    error_description: R,
    region: R
  });
  Object.assign(r, s);
  const i = new Or({
    $metadata: k(e),
    ...r
  });
  return F(i, e.body);
}, Wf = async (e, t) => {
  const r = P({}), n = e.body, s = x(n, {
    error: R,
    error_description: R
  });
  Object.assign(r, s);
  const i = new _r({
    $metadata: k(e),
    ...r
  });
  return F(i, e.body);
}, Gf = async (e, t) => {
  const r = P({}), n = e.body, s = x(n, {
    error: R,
    error_description: R
  });
  Object.assign(r, s);
  const i = new Mt({
    $metadata: k(e),
    ...r
  });
  return F(i, e.body);
}, Kf = async (e, t) => {
  const r = P({}), n = e.body, s = x(n, {
    error: R,
    error_description: R
  });
  Object.assign(r, s);
  const i = new Ut({
    $metadata: k(e),
    ...r
  });
  return F(i, e.body);
}, Jf = async (e, t) => {
  const r = P({}), n = e.body, s = x(n, {
    error: R,
    error_description: R
  });
  Object.assign(r, s);
  const i = new xr({
    $metadata: k(e),
    ...r
  });
  return F(i, e.body);
}, k = (e) => ({
  httpStatusCode: e.statusCode,
  requestId: e.headers["x-amzn-requestid"] ?? e.headers["x-amzn-request-id"] ?? e.headers["x-amz-request-id"],
  extendedRequestId: e.headers["x-amz-id-2"],
  cfId: e.headers["x-amz-cf-id"]
}), Xf = "aws_iam";
class Qf extends je.classBuilder().ep(xt).m(function(t, r, n, s) {
  return [
    vt(n, this.serialize, this.deserialize),
    Ct(n, t.getEndpointParameterInstructions())
  ];
}).s("AWSSSOOIDCService", "CreateToken", {}).n("SSOOIDCClient", "CreateTokenCommand").f(bf, Rf).ser(_f).de(Df).build() {
}
class Yf extends je.classBuilder().ep(xt).m(function(t, r, n, s) {
  return [
    vt(n, this.serialize, this.deserialize),
    Ct(n, t.getEndpointParameterInstructions())
  ];
}).s("AWSSSOOIDCService", "CreateTokenWithIAM", {}).n("SSOOIDCClient", "CreateTokenWithIAMCommand").f(Af, Tf).ser(xf).de(Pf).build() {
}
class Zf extends je.classBuilder().ep(xt).m(function(t, r, n, s) {
  return [
    vt(n, this.serialize, this.deserialize),
    Ct(n, t.getEndpointParameterInstructions())
  ];
}).s("AWSSSOOIDCService", "RegisterClient", {}).n("SSOOIDCClient", "RegisterClientCommand").f(void 0, vf).ser(Of).de(Nf).build() {
}
class eh extends je.classBuilder().ep(xt).m(function(t, r, n, s) {
  return [
    vt(n, this.serialize, this.deserialize),
    Ct(n, t.getEndpointParameterInstructions())
  ];
}).s("AWSSSOOIDCService", "StartDeviceAuthorization", {}).n("SSOOIDCClient", "StartDeviceAuthorizationCommand").f(Cf, void 0).ser(If).de(kf).build() {
}
const th = {
  CreateTokenCommand: Qf,
  CreateTokenWithIAMCommand: Yf,
  RegisterClientCommand: Zf,
  StartDeviceAuthorizationCommand: eh
};
class Bi extends Sf {
}
qu(th, Bi);
const bs = new vs(dr.Auth, "sso-oidc-client"), rh = (e) => e instanceof Cs ? {
  badInput: 1
} : e instanceof ht ? {
  environmentIssue: 1
} : Os(e) ? {
  unauthorized: 1
} : {
  failure: 1
};
function Rs(e) {
  return {
    traceName: e,
    errorMapper: rh
  };
}
function As(e, t) {
  if (e instanceof Nt)
    return new Ee("SSOOIDC client: Invalid grant");
  if (e instanceof Ot)
    return new Ee("SSOOIDC client: Access denied");
  if (e instanceof It)
    return new Ee("SSOOIDC client: Expired token");
  if (e instanceof Pt)
    return new Ee("SSOOIDC client: Invalid client");
  if (e instanceof Ut)
    return new Ee("SSOOIDC client: Unauthorized client");
  if (e instanceof Dt)
    return new Qt("SSOOIDC client: Internal server error");
  if (e instanceof Mt)
    return new Qt("SSOOIDC client: Throttling");
  if (e instanceof kt)
    return t && "error_description" in e && typeof e.error_description == "string" && e.error_description.toLowerCase().indexOf("invalid start url provided") > -1 ? new Qi() : new le("SSOOIDC client: Unexpected InvalidRequestException");
  if (e instanceof TypeError && e.message === "fetch failed") {
    const r = String(e.cause);
    return new xs(r);
  } else
    return new le("SSOOIDC client: Unexpected issue");
}
function Ts(e, t) {
  try {
    if (e instanceof N) {
      const { requestId: r, cfId: n, extendedRequestId: s } = e.$metadata;
      t.setAttribute("requestId", r || ""), t.setAttribute("cfId", n || ""), t.setAttribute("extendedRequestId", s || ""), "error_description" in e && typeof e.error_description == "string" && t.setAttribute("errorDescription", e.error_description), "error" in e && typeof e.error == "string" && t.setAttribute("error", e.error);
    }
  } catch (r) {
    Wi.error("SSOOIDC client: Failed to log error details:", r);
  }
}
class Vh {
  constructor(t = "us-east-1") {
    E(this, "ssoClient");
    E(this, "region");
    this.region = t, this.ssoClient = new Bi({
      region: this.region,
      customUserAgent: "KiroIDE",
      maxAttempts: 4,
      retryMode: "standard"
    });
  }
  /**
   * Get the region used by this client
   */
  getRegion() {
    return this.region;
  }
  /**
   * Registers a new client using SSOOIDC
   */
  registerClient(t, r = !1) {
    return bs.withTrace(Rs("registerClient"), async (n) => {
      try {
        return await this.ssoClient.registerClient(t);
      } catch (s) {
        throw Ts(s, n), As(s, r);
      }
    });
  }
  /**
   * Creates a new token using SSOOIDC
   */
  createToken(t) {
    return bs.withTrace(Rs("createToken"), async (r) => {
      r.setAttribute("grantType", t.grantType || "");
      try {
        return await this.ssoClient.createToken(t);
      } catch (n) {
        throw Ts(n, r), As(n, !1);
      }
    });
  }
}
export {
  jh as A,
  ph as C,
  hh as F,
  bh as I,
  wh as M,
  lr as N,
  Vh as S,
  le as U,
  vh as a,
  Th as b,
  Rh as c,
  Ah as d,
  Eh as e,
  Sh as f,
  yh as g,
  Xi as h,
  Os as i,
  Ki as j,
  Ji as k,
  ye as l,
  _s as m,
  Cs as n,
  gh as o,
  Ee as p,
  j as q,
  ht as r,
  Gi as s,
  Qt as t,
  Qi as u,
  xs as v
};
