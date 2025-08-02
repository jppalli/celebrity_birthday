var sn = Object.defineProperty;
var an = (c, e, r) => e in c ? sn(c, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : c[e] = r;
var Me = (c, e, r) => an(c, typeof e != "symbol" ? e + "" : e, r);
import { m as de } from "./errors-ExctlPQy.js";
import Rr from "path";
import "os";
import * as vi from "fs";
import Pr from "fs";
import * as Ct from "vscode";
import "node-machine-id";
import { c as on, g as un } from "./_commonjsHelpers-DaMA6jEr.js";
import cn from "child_process";
import Wt from "node:process";
import { PassThrough as ln } from "node:stream";
import { j as hn, f as dn } from "./initialize-C-lPoOET.js";
import "@opentelemetry/api";
import { b as gi } from "./paths-CA0scYz8.js";
var oe;
(function(c) {
  c.assertEqual = (u) => u;
  function e(u) {
  }
  c.assertIs = e;
  function r(u) {
    throw new Error();
  }
  c.assertNever = r, c.arrayToEnum = (u) => {
    const a = {};
    for (const p of u)
      a[p] = p;
    return a;
  }, c.getValidEnumValues = (u) => {
    const a = c.objectKeys(u).filter((h) => typeof u[u[h]] != "number"), p = {};
    for (const h of a)
      p[h] = u[h];
    return c.objectValues(p);
  }, c.objectValues = (u) => c.objectKeys(u).map(function(a) {
    return u[a];
  }), c.objectKeys = typeof Object.keys == "function" ? (u) => Object.keys(u) : (u) => {
    const a = [];
    for (const p in u)
      Object.prototype.hasOwnProperty.call(u, p) && a.push(p);
    return a;
  }, c.find = (u, a) => {
    for (const p of u)
      if (a(p))
        return p;
  }, c.isInteger = typeof Number.isInteger == "function" ? (u) => Number.isInteger(u) : (u) => typeof u == "number" && isFinite(u) && Math.floor(u) === u;
  function i(u, a = " | ") {
    return u.map((p) => typeof p == "string" ? `'${p}'` : p).join(a);
  }
  c.joinValues = i, c.jsonStringifyReplacer = (u, a) => typeof a == "bigint" ? a.toString() : a;
})(oe || (oe = {}));
var Tr;
(function(c) {
  c.mergeShapes = (e, r) => ({
    ...e,
    ...r
    // second overwrites first
  });
})(Tr || (Tr = {}));
const z = oe.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]), Ye = (c) => {
  switch (typeof c) {
    case "undefined":
      return z.undefined;
    case "string":
      return z.string;
    case "number":
      return isNaN(c) ? z.nan : z.number;
    case "boolean":
      return z.boolean;
    case "function":
      return z.function;
    case "bigint":
      return z.bigint;
    case "symbol":
      return z.symbol;
    case "object":
      return Array.isArray(c) ? z.array : c === null ? z.null : c.then && typeof c.then == "function" && c.catch && typeof c.catch == "function" ? z.promise : typeof Map < "u" && c instanceof Map ? z.map : typeof Set < "u" && c instanceof Set ? z.set : typeof Date < "u" && c instanceof Date ? z.date : z.object;
    default:
      return z.unknown;
  }
}, O = oe.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]), pn = (c) => JSON.stringify(c, null, 2).replace(/"([^"]+)":/g, "$1:");
class Re extends Error {
  get errors() {
    return this.issues;
  }
  constructor(e) {
    super(), this.issues = [], this.addIssue = (i) => {
      this.issues = [...this.issues, i];
    }, this.addIssues = (i = []) => {
      this.issues = [...this.issues, ...i];
    };
    const r = new.target.prototype;
    Object.setPrototypeOf ? Object.setPrototypeOf(this, r) : this.__proto__ = r, this.name = "ZodError", this.issues = e;
  }
  format(e) {
    const r = e || function(a) {
      return a.message;
    }, i = { _errors: [] }, u = (a) => {
      for (const p of a.issues)
        if (p.code === "invalid_union")
          p.unionErrors.map(u);
        else if (p.code === "invalid_return_type")
          u(p.returnTypeError);
        else if (p.code === "invalid_arguments")
          u(p.argumentsError);
        else if (p.path.length === 0)
          i._errors.push(r(p));
        else {
          let h = i, m = 0;
          for (; m < p.path.length; ) {
            const w = p.path[m];
            m === p.path.length - 1 ? (h[w] = h[w] || { _errors: [] }, h[w]._errors.push(r(p))) : h[w] = h[w] || { _errors: [] }, h = h[w], m++;
          }
        }
    };
    return u(this), i;
  }
  static assert(e) {
    if (!(e instanceof Re))
      throw new Error(`Not a ZodError: ${e}`);
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, oe.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(e = (r) => r.message) {
    const r = {}, i = [];
    for (const u of this.issues)
      u.path.length > 0 ? (r[u.path[0]] = r[u.path[0]] || [], r[u.path[0]].push(e(u))) : i.push(e(u));
    return { formErrors: i, fieldErrors: r };
  }
  get formErrors() {
    return this.flatten();
  }
}
Re.create = (c) => new Re(c);
const mt = (c, e) => {
  let r;
  switch (c.code) {
    case O.invalid_type:
      c.received === z.undefined ? r = "Required" : r = `Expected ${c.expected}, received ${c.received}`;
      break;
    case O.invalid_literal:
      r = `Invalid literal value, expected ${JSON.stringify(c.expected, oe.jsonStringifyReplacer)}`;
      break;
    case O.unrecognized_keys:
      r = `Unrecognized key(s) in object: ${oe.joinValues(c.keys, ", ")}`;
      break;
    case O.invalid_union:
      r = "Invalid input";
      break;
    case O.invalid_union_discriminator:
      r = `Invalid discriminator value. Expected ${oe.joinValues(c.options)}`;
      break;
    case O.invalid_enum_value:
      r = `Invalid enum value. Expected ${oe.joinValues(c.options)}, received '${c.received}'`;
      break;
    case O.invalid_arguments:
      r = "Invalid function arguments";
      break;
    case O.invalid_return_type:
      r = "Invalid function return type";
      break;
    case O.invalid_date:
      r = "Invalid date";
      break;
    case O.invalid_string:
      typeof c.validation == "object" ? "includes" in c.validation ? (r = `Invalid input: must include "${c.validation.includes}"`, typeof c.validation.position == "number" && (r = `${r} at one or more positions greater than or equal to ${c.validation.position}`)) : "startsWith" in c.validation ? r = `Invalid input: must start with "${c.validation.startsWith}"` : "endsWith" in c.validation ? r = `Invalid input: must end with "${c.validation.endsWith}"` : oe.assertNever(c.validation) : c.validation !== "regex" ? r = `Invalid ${c.validation}` : r = "Invalid";
      break;
    case O.too_small:
      c.type === "array" ? r = `Array must contain ${c.exact ? "exactly" : c.inclusive ? "at least" : "more than"} ${c.minimum} element(s)` : c.type === "string" ? r = `String must contain ${c.exact ? "exactly" : c.inclusive ? "at least" : "over"} ${c.minimum} character(s)` : c.type === "number" ? r = `Number must be ${c.exact ? "exactly equal to " : c.inclusive ? "greater than or equal to " : "greater than "}${c.minimum}` : c.type === "date" ? r = `Date must be ${c.exact ? "exactly equal to " : c.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(c.minimum))}` : r = "Invalid input";
      break;
    case O.too_big:
      c.type === "array" ? r = `Array must contain ${c.exact ? "exactly" : c.inclusive ? "at most" : "less than"} ${c.maximum} element(s)` : c.type === "string" ? r = `String must contain ${c.exact ? "exactly" : c.inclusive ? "at most" : "under"} ${c.maximum} character(s)` : c.type === "number" ? r = `Number must be ${c.exact ? "exactly" : c.inclusive ? "less than or equal to" : "less than"} ${c.maximum}` : c.type === "bigint" ? r = `BigInt must be ${c.exact ? "exactly" : c.inclusive ? "less than or equal to" : "less than"} ${c.maximum}` : c.type === "date" ? r = `Date must be ${c.exact ? "exactly" : c.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(c.maximum))}` : r = "Invalid input";
      break;
    case O.custom:
      r = "Invalid input";
      break;
    case O.invalid_intersection_types:
      r = "Intersection results could not be merged";
      break;
    case O.not_multiple_of:
      r = `Number must be a multiple of ${c.multipleOf}`;
      break;
    case O.not_finite:
      r = "Number must be finite";
      break;
    default:
      r = e.defaultError, oe.assertNever(c);
  }
  return { message: r };
};
let Ei = mt;
function fn(c) {
  Ei = c;
}
function Xt() {
  return Ei;
}
const zt = (c) => {
  const { data: e, path: r, errorMaps: i, issueData: u } = c, a = [...r, ...u.path || []], p = {
    ...u,
    path: a
  };
  if (u.message !== void 0)
    return {
      ...u,
      path: a,
      message: u.message
    };
  let h = "";
  const m = i.filter((w) => !!w).slice().reverse();
  for (const w of m)
    h = w(p, { data: e, defaultError: h }).message;
  return {
    ...u,
    path: a,
    message: h
  };
}, mn = [];
function X(c, e) {
  const r = Xt(), i = zt({
    issueData: e,
    data: c.data,
    path: c.path,
    errorMaps: [
      c.common.contextualErrorMap,
      // contextual error map is first priority
      c.schemaErrorMap,
      // then schema-bound map if available
      r,
      // then global override map
      r === mt ? void 0 : mt
      // then global default map
    ].filter((u) => !!u)
  });
  c.common.issues.push(i);
}
class be {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    this.value === "valid" && (this.value = "dirty");
  }
  abort() {
    this.value !== "aborted" && (this.value = "aborted");
  }
  static mergeArray(e, r) {
    const i = [];
    for (const u of r) {
      if (u.status === "aborted")
        return G;
      u.status === "dirty" && e.dirty(), i.push(u.value);
    }
    return { status: e.value, value: i };
  }
  static async mergeObjectAsync(e, r) {
    const i = [];
    for (const u of r) {
      const a = await u.key, p = await u.value;
      i.push({
        key: a,
        value: p
      });
    }
    return be.mergeObjectSync(e, i);
  }
  static mergeObjectSync(e, r) {
    const i = {};
    for (const u of r) {
      const { key: a, value: p } = u;
      if (a.status === "aborted" || p.status === "aborted")
        return G;
      a.status === "dirty" && e.dirty(), p.status === "dirty" && e.dirty(), a.value !== "__proto__" && (typeof p.value < "u" || u.alwaysSet) && (i[a.value] = p.value);
    }
    return { status: e.value, value: i };
  }
}
const G = Object.freeze({
  status: "aborted"
}), ht = (c) => ({ status: "dirty", value: c }), _e = (c) => ({ status: "valid", value: c }), Br = (c) => c.status === "aborted", Ir = (c) => c.status === "dirty", ot = (c) => c.status === "valid", St = (c) => typeof Promise < "u" && c instanceof Promise;
function $t(c, e, r, i) {
  if (typeof e == "function" ? c !== e || !0 : !e.has(c)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return e.get(c);
}
function Di(c, e, r, i, u) {
  if (typeof e == "function" ? c !== e || !0 : !e.has(c)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return e.set(c, r), r;
}
var q;
(function(c) {
  c.errToObj = (e) => typeof e == "string" ? { message: e } : e || {}, c.toString = (e) => typeof e == "string" ? e : e == null ? void 0 : e.message;
})(q || (q = {}));
var Et, Dt;
class Ve {
  constructor(e, r, i, u) {
    this._cachedPath = [], this.parent = e, this.data = r, this._path = i, this._key = u;
  }
  get path() {
    return this._cachedPath.length || (this._key instanceof Array ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
  }
}
const Xr = (c, e) => {
  if (ot(e))
    return { success: !0, data: e.value };
  if (!c.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error)
        return this._error;
      const r = new Re(c.common.issues);
      return this._error = r, this._error;
    }
  };
};
function Q(c) {
  if (!c)
    return {};
  const { errorMap: e, invalid_type_error: r, required_error: i, description: u } = c;
  if (e && (r || i))
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  return e ? { errorMap: e, description: u } : { errorMap: (p, h) => {
    var m, w;
    const { message: g } = c;
    return p.code === "invalid_enum_value" ? { message: g ?? h.defaultError } : typeof h.data > "u" ? { message: (m = g ?? i) !== null && m !== void 0 ? m : h.defaultError } : p.code !== "invalid_type" ? { message: h.defaultError } : { message: (w = g ?? r) !== null && w !== void 0 ? w : h.defaultError };
  }, description: u };
}
class re {
  get description() {
    return this._def.description;
  }
  _getType(e) {
    return Ye(e.data);
  }
  _getOrReturnCtx(e, r) {
    return r || {
      common: e.parent.common,
      data: e.data,
      parsedType: Ye(e.data),
      schemaErrorMap: this._def.errorMap,
      path: e.path,
      parent: e.parent
    };
  }
  _processInputParams(e) {
    return {
      status: new be(),
      ctx: {
        common: e.parent.common,
        data: e.data,
        parsedType: Ye(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent
      }
    };
  }
  _parseSync(e) {
    const r = this._parse(e);
    if (St(r))
      throw new Error("Synchronous parse encountered promise.");
    return r;
  }
  _parseAsync(e) {
    const r = this._parse(e);
    return Promise.resolve(r);
  }
  parse(e, r) {
    const i = this.safeParse(e, r);
    if (i.success)
      return i.data;
    throw i.error;
  }
  safeParse(e, r) {
    var i;
    const u = {
      common: {
        issues: [],
        async: (i = r == null ? void 0 : r.async) !== null && i !== void 0 ? i : !1,
        contextualErrorMap: r == null ? void 0 : r.errorMap
      },
      path: (r == null ? void 0 : r.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: Ye(e)
    }, a = this._parseSync({ data: e, path: u.path, parent: u });
    return Xr(u, a);
  }
  "~validate"(e) {
    var r, i;
    const u = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: Ye(e)
    };
    if (!this["~standard"].async)
      try {
        const a = this._parseSync({ data: e, path: [], parent: u });
        return ot(a) ? {
          value: a.value
        } : {
          issues: u.common.issues
        };
      } catch (a) {
        !((i = (r = a == null ? void 0 : a.message) === null || r === void 0 ? void 0 : r.toLowerCase()) === null || i === void 0) && i.includes("encountered") && (this["~standard"].async = !0), u.common = {
          issues: [],
          async: !0
        };
      }
    return this._parseAsync({ data: e, path: [], parent: u }).then((a) => ot(a) ? {
      value: a.value
    } : {
      issues: u.common.issues
    });
  }
  async parseAsync(e, r) {
    const i = await this.safeParseAsync(e, r);
    if (i.success)
      return i.data;
    throw i.error;
  }
  async safeParseAsync(e, r) {
    const i = {
      common: {
        issues: [],
        contextualErrorMap: r == null ? void 0 : r.errorMap,
        async: !0
      },
      path: (r == null ? void 0 : r.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: Ye(e)
    }, u = this._parse({ data: e, path: i.path, parent: i }), a = await (St(u) ? u : Promise.resolve(u));
    return Xr(i, a);
  }
  refine(e, r) {
    const i = (u) => typeof r == "string" || typeof r > "u" ? { message: r } : typeof r == "function" ? r(u) : r;
    return this._refinement((u, a) => {
      const p = e(u), h = () => a.addIssue({
        code: O.custom,
        ...i(u)
      });
      return typeof Promise < "u" && p instanceof Promise ? p.then((m) => m ? !0 : (h(), !1)) : p ? !0 : (h(), !1);
    });
  }
  refinement(e, r) {
    return this._refinement((i, u) => e(i) ? !0 : (u.addIssue(typeof r == "function" ? r(i, u) : r), !1));
  }
  _refinement(e) {
    return new Ue({
      schema: this,
      typeName: W.ZodEffects,
      effect: { type: "refinement", refinement: e }
    });
  }
  superRefine(e) {
    return this._refinement(e);
  }
  constructor(e) {
    this.spa = this.safeParseAsync, this._def = e, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this), this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: (r) => this["~validate"](r)
    };
  }
  optional() {
    return He.create(this, this._def);
  }
  nullable() {
    return nt.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return Le.create(this);
  }
  promise() {
    return yt.create(this, this._def);
  }
  or(e) {
    return bt.create([this, e], this._def);
  }
  and(e) {
    return kt.create(this, e, this._def);
  }
  transform(e) {
    return new Ue({
      ...Q(this._def),
      schema: this,
      typeName: W.ZodEffects,
      effect: { type: "transform", transform: e }
    });
  }
  default(e) {
    const r = typeof e == "function" ? e : () => e;
    return new Nt({
      ...Q(this._def),
      innerType: this,
      defaultValue: r,
      typeName: W.ZodDefault
    });
  }
  brand() {
    return new Mr({
      typeName: W.ZodBranded,
      type: this,
      ...Q(this._def)
    });
  }
  catch(e) {
    const r = typeof e == "function" ? e : () => e;
    return new Rt({
      ...Q(this._def),
      innerType: this,
      catchValue: r,
      typeName: W.ZodCatch
    });
  }
  describe(e) {
    const r = this.constructor;
    return new r({
      ...this._def,
      description: e
    });
  }
  pipe(e) {
    return Mt.create(this, e);
  }
  readonly() {
    return Pt.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const xn = /^c[^\s-]{8,}$/i, yn = /^[0-9a-z]+$/, vn = /^[0-9A-HJKMNP-TV-Z]{26}$/i, gn = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, En = /^[a-z0-9_-]{21}$/i, Dn = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/, Cn = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, Sn = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, wn = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
let cr;
const An = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, Fn = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/, bn = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/, kn = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, _n = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, Tn = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/, Ci = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))", Bn = new RegExp(`^${Ci}$`);
function Si(c) {
  let e = "([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d";
  return c.precision ? e = `${e}\\.\\d{${c.precision}}` : c.precision == null && (e = `${e}(\\.\\d+)?`), e;
}
function In(c) {
  return new RegExp(`^${Si(c)}$`);
}
function wi(c) {
  let e = `${Ci}T${Si(c)}`;
  const r = [];
  return r.push(c.local ? "Z?" : "Z"), c.offset && r.push("([+-]\\d{2}:?\\d{2})"), e = `${e}(${r.join("|")})`, new RegExp(`^${e}$`);
}
function Nn(c, e) {
  return !!((e === "v4" || !e) && An.test(c) || (e === "v6" || !e) && bn.test(c));
}
function Rn(c, e) {
  if (!Dn.test(c))
    return !1;
  try {
    const [r] = c.split("."), i = r.replace(/-/g, "+").replace(/_/g, "/").padEnd(r.length + (4 - r.length % 4) % 4, "="), u = JSON.parse(atob(i));
    return !(typeof u != "object" || u === null || !u.typ || !u.alg || e && u.alg !== e);
  } catch {
    return !1;
  }
}
function Pn(c, e) {
  return !!((e === "v4" || !e) && Fn.test(c) || (e === "v6" || !e) && kn.test(c));
}
class Oe extends re {
  _parse(e) {
    if (this._def.coerce && (e.data = String(e.data)), this._getType(e) !== z.string) {
      const a = this._getOrReturnCtx(e);
      return X(a, {
        code: O.invalid_type,
        expected: z.string,
        received: a.parsedType
      }), G;
    }
    const i = new be();
    let u;
    for (const a of this._def.checks)
      if (a.kind === "min")
        e.data.length < a.value && (u = this._getOrReturnCtx(e, u), X(u, {
          code: O.too_small,
          minimum: a.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: a.message
        }), i.dirty());
      else if (a.kind === "max")
        e.data.length > a.value && (u = this._getOrReturnCtx(e, u), X(u, {
          code: O.too_big,
          maximum: a.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: a.message
        }), i.dirty());
      else if (a.kind === "length") {
        const p = e.data.length > a.value, h = e.data.length < a.value;
        (p || h) && (u = this._getOrReturnCtx(e, u), p ? X(u, {
          code: O.too_big,
          maximum: a.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: a.message
        }) : h && X(u, {
          code: O.too_small,
          minimum: a.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: a.message
        }), i.dirty());
      } else if (a.kind === "email")
        Sn.test(e.data) || (u = this._getOrReturnCtx(e, u), X(u, {
          validation: "email",
          code: O.invalid_string,
          message: a.message
        }), i.dirty());
      else if (a.kind === "emoji")
        cr || (cr = new RegExp(wn, "u")), cr.test(e.data) || (u = this._getOrReturnCtx(e, u), X(u, {
          validation: "emoji",
          code: O.invalid_string,
          message: a.message
        }), i.dirty());
      else if (a.kind === "uuid")
        gn.test(e.data) || (u = this._getOrReturnCtx(e, u), X(u, {
          validation: "uuid",
          code: O.invalid_string,
          message: a.message
        }), i.dirty());
      else if (a.kind === "nanoid")
        En.test(e.data) || (u = this._getOrReturnCtx(e, u), X(u, {
          validation: "nanoid",
          code: O.invalid_string,
          message: a.message
        }), i.dirty());
      else if (a.kind === "cuid")
        xn.test(e.data) || (u = this._getOrReturnCtx(e, u), X(u, {
          validation: "cuid",
          code: O.invalid_string,
          message: a.message
        }), i.dirty());
      else if (a.kind === "cuid2")
        yn.test(e.data) || (u = this._getOrReturnCtx(e, u), X(u, {
          validation: "cuid2",
          code: O.invalid_string,
          message: a.message
        }), i.dirty());
      else if (a.kind === "ulid")
        vn.test(e.data) || (u = this._getOrReturnCtx(e, u), X(u, {
          validation: "ulid",
          code: O.invalid_string,
          message: a.message
        }), i.dirty());
      else if (a.kind === "url")
        try {
          new URL(e.data);
        } catch {
          u = this._getOrReturnCtx(e, u), X(u, {
            validation: "url",
            code: O.invalid_string,
            message: a.message
          }), i.dirty();
        }
      else a.kind === "regex" ? (a.regex.lastIndex = 0, a.regex.test(e.data) || (u = this._getOrReturnCtx(e, u), X(u, {
        validation: "regex",
        code: O.invalid_string,
        message: a.message
      }), i.dirty())) : a.kind === "trim" ? e.data = e.data.trim() : a.kind === "includes" ? e.data.includes(a.value, a.position) || (u = this._getOrReturnCtx(e, u), X(u, {
        code: O.invalid_string,
        validation: { includes: a.value, position: a.position },
        message: a.message
      }), i.dirty()) : a.kind === "toLowerCase" ? e.data = e.data.toLowerCase() : a.kind === "toUpperCase" ? e.data = e.data.toUpperCase() : a.kind === "startsWith" ? e.data.startsWith(a.value) || (u = this._getOrReturnCtx(e, u), X(u, {
        code: O.invalid_string,
        validation: { startsWith: a.value },
        message: a.message
      }), i.dirty()) : a.kind === "endsWith" ? e.data.endsWith(a.value) || (u = this._getOrReturnCtx(e, u), X(u, {
        code: O.invalid_string,
        validation: { endsWith: a.value },
        message: a.message
      }), i.dirty()) : a.kind === "datetime" ? wi(a).test(e.data) || (u = this._getOrReturnCtx(e, u), X(u, {
        code: O.invalid_string,
        validation: "datetime",
        message: a.message
      }), i.dirty()) : a.kind === "date" ? Bn.test(e.data) || (u = this._getOrReturnCtx(e, u), X(u, {
        code: O.invalid_string,
        validation: "date",
        message: a.message
      }), i.dirty()) : a.kind === "time" ? In(a).test(e.data) || (u = this._getOrReturnCtx(e, u), X(u, {
        code: O.invalid_string,
        validation: "time",
        message: a.message
      }), i.dirty()) : a.kind === "duration" ? Cn.test(e.data) || (u = this._getOrReturnCtx(e, u), X(u, {
        validation: "duration",
        code: O.invalid_string,
        message: a.message
      }), i.dirty()) : a.kind === "ip" ? Nn(e.data, a.version) || (u = this._getOrReturnCtx(e, u), X(u, {
        validation: "ip",
        code: O.invalid_string,
        message: a.message
      }), i.dirty()) : a.kind === "jwt" ? Rn(e.data, a.alg) || (u = this._getOrReturnCtx(e, u), X(u, {
        validation: "jwt",
        code: O.invalid_string,
        message: a.message
      }), i.dirty()) : a.kind === "cidr" ? Pn(e.data, a.version) || (u = this._getOrReturnCtx(e, u), X(u, {
        validation: "cidr",
        code: O.invalid_string,
        message: a.message
      }), i.dirty()) : a.kind === "base64" ? _n.test(e.data) || (u = this._getOrReturnCtx(e, u), X(u, {
        validation: "base64",
        code: O.invalid_string,
        message: a.message
      }), i.dirty()) : a.kind === "base64url" ? Tn.test(e.data) || (u = this._getOrReturnCtx(e, u), X(u, {
        validation: "base64url",
        code: O.invalid_string,
        message: a.message
      }), i.dirty()) : oe.assertNever(a);
    return { status: i.value, value: e.data };
  }
  _regex(e, r, i) {
    return this.refinement((u) => e.test(u), {
      validation: r,
      code: O.invalid_string,
      ...q.errToObj(i)
    });
  }
  _addCheck(e) {
    return new Oe({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  email(e) {
    return this._addCheck({ kind: "email", ...q.errToObj(e) });
  }
  url(e) {
    return this._addCheck({ kind: "url", ...q.errToObj(e) });
  }
  emoji(e) {
    return this._addCheck({ kind: "emoji", ...q.errToObj(e) });
  }
  uuid(e) {
    return this._addCheck({ kind: "uuid", ...q.errToObj(e) });
  }
  nanoid(e) {
    return this._addCheck({ kind: "nanoid", ...q.errToObj(e) });
  }
  cuid(e) {
    return this._addCheck({ kind: "cuid", ...q.errToObj(e) });
  }
  cuid2(e) {
    return this._addCheck({ kind: "cuid2", ...q.errToObj(e) });
  }
  ulid(e) {
    return this._addCheck({ kind: "ulid", ...q.errToObj(e) });
  }
  base64(e) {
    return this._addCheck({ kind: "base64", ...q.errToObj(e) });
  }
  base64url(e) {
    return this._addCheck({
      kind: "base64url",
      ...q.errToObj(e)
    });
  }
  jwt(e) {
    return this._addCheck({ kind: "jwt", ...q.errToObj(e) });
  }
  ip(e) {
    return this._addCheck({ kind: "ip", ...q.errToObj(e) });
  }
  cidr(e) {
    return this._addCheck({ kind: "cidr", ...q.errToObj(e) });
  }
  datetime(e) {
    var r, i;
    return typeof e == "string" ? this._addCheck({
      kind: "datetime",
      precision: null,
      offset: !1,
      local: !1,
      message: e
    }) : this._addCheck({
      kind: "datetime",
      precision: typeof (e == null ? void 0 : e.precision) > "u" ? null : e == null ? void 0 : e.precision,
      offset: (r = e == null ? void 0 : e.offset) !== null && r !== void 0 ? r : !1,
      local: (i = e == null ? void 0 : e.local) !== null && i !== void 0 ? i : !1,
      ...q.errToObj(e == null ? void 0 : e.message)
    });
  }
  date(e) {
    return this._addCheck({ kind: "date", message: e });
  }
  time(e) {
    return typeof e == "string" ? this._addCheck({
      kind: "time",
      precision: null,
      message: e
    }) : this._addCheck({
      kind: "time",
      precision: typeof (e == null ? void 0 : e.precision) > "u" ? null : e == null ? void 0 : e.precision,
      ...q.errToObj(e == null ? void 0 : e.message)
    });
  }
  duration(e) {
    return this._addCheck({ kind: "duration", ...q.errToObj(e) });
  }
  regex(e, r) {
    return this._addCheck({
      kind: "regex",
      regex: e,
      ...q.errToObj(r)
    });
  }
  includes(e, r) {
    return this._addCheck({
      kind: "includes",
      value: e,
      position: r == null ? void 0 : r.position,
      ...q.errToObj(r == null ? void 0 : r.message)
    });
  }
  startsWith(e, r) {
    return this._addCheck({
      kind: "startsWith",
      value: e,
      ...q.errToObj(r)
    });
  }
  endsWith(e, r) {
    return this._addCheck({
      kind: "endsWith",
      value: e,
      ...q.errToObj(r)
    });
  }
  min(e, r) {
    return this._addCheck({
      kind: "min",
      value: e,
      ...q.errToObj(r)
    });
  }
  max(e, r) {
    return this._addCheck({
      kind: "max",
      value: e,
      ...q.errToObj(r)
    });
  }
  length(e, r) {
    return this._addCheck({
      kind: "length",
      value: e,
      ...q.errToObj(r)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(e) {
    return this.min(1, q.errToObj(e));
  }
  trim() {
    return new Oe({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new Oe({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new Oe({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((e) => e.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((e) => e.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((e) => e.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((e) => e.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((e) => e.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((e) => e.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((e) => e.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((e) => e.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((e) => e.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((e) => e.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((e) => e.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((e) => e.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((e) => e.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((e) => e.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((e) => e.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((e) => e.kind === "base64url");
  }
  get minLength() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "min" && (e === null || r.value > e) && (e = r.value);
    return e;
  }
  get maxLength() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "max" && (e === null || r.value < e) && (e = r.value);
    return e;
  }
}
Oe.create = (c) => {
  var e;
  return new Oe({
    checks: [],
    typeName: W.ZodString,
    coerce: (e = c == null ? void 0 : c.coerce) !== null && e !== void 0 ? e : !1,
    ...Q(c)
  });
};
function Mn(c, e) {
  const r = (c.toString().split(".")[1] || "").length, i = (e.toString().split(".")[1] || "").length, u = r > i ? r : i, a = parseInt(c.toFixed(u).replace(".", "")), p = parseInt(e.toFixed(u).replace(".", ""));
  return a % p / Math.pow(10, u);
}
class tt extends re {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== z.number) {
      const a = this._getOrReturnCtx(e);
      return X(a, {
        code: O.invalid_type,
        expected: z.number,
        received: a.parsedType
      }), G;
    }
    let i;
    const u = new be();
    for (const a of this._def.checks)
      a.kind === "int" ? oe.isInteger(e.data) || (i = this._getOrReturnCtx(e, i), X(i, {
        code: O.invalid_type,
        expected: "integer",
        received: "float",
        message: a.message
      }), u.dirty()) : a.kind === "min" ? (a.inclusive ? e.data < a.value : e.data <= a.value) && (i = this._getOrReturnCtx(e, i), X(i, {
        code: O.too_small,
        minimum: a.value,
        type: "number",
        inclusive: a.inclusive,
        exact: !1,
        message: a.message
      }), u.dirty()) : a.kind === "max" ? (a.inclusive ? e.data > a.value : e.data >= a.value) && (i = this._getOrReturnCtx(e, i), X(i, {
        code: O.too_big,
        maximum: a.value,
        type: "number",
        inclusive: a.inclusive,
        exact: !1,
        message: a.message
      }), u.dirty()) : a.kind === "multipleOf" ? Mn(e.data, a.value) !== 0 && (i = this._getOrReturnCtx(e, i), X(i, {
        code: O.not_multiple_of,
        multipleOf: a.value,
        message: a.message
      }), u.dirty()) : a.kind === "finite" ? Number.isFinite(e.data) || (i = this._getOrReturnCtx(e, i), X(i, {
        code: O.not_finite,
        message: a.message
      }), u.dirty()) : oe.assertNever(a);
    return { status: u.value, value: e.data };
  }
  gte(e, r) {
    return this.setLimit("min", e, !0, q.toString(r));
  }
  gt(e, r) {
    return this.setLimit("min", e, !1, q.toString(r));
  }
  lte(e, r) {
    return this.setLimit("max", e, !0, q.toString(r));
  }
  lt(e, r) {
    return this.setLimit("max", e, !1, q.toString(r));
  }
  setLimit(e, r, i, u) {
    return new tt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: r,
          inclusive: i,
          message: q.toString(u)
        }
      ]
    });
  }
  _addCheck(e) {
    return new tt({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  int(e) {
    return this._addCheck({
      kind: "int",
      message: q.toString(e)
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: q.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: q.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: q.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: q.toString(e)
    });
  }
  multipleOf(e, r) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: q.toString(r)
    });
  }
  finite(e) {
    return this._addCheck({
      kind: "finite",
      message: q.toString(e)
    });
  }
  safe(e) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: q.toString(e)
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: q.toString(e)
    });
  }
  get minValue() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "min" && (e === null || r.value > e) && (e = r.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "max" && (e === null || r.value < e) && (e = r.value);
    return e;
  }
  get isInt() {
    return !!this._def.checks.find((e) => e.kind === "int" || e.kind === "multipleOf" && oe.isInteger(e.value));
  }
  get isFinite() {
    let e = null, r = null;
    for (const i of this._def.checks) {
      if (i.kind === "finite" || i.kind === "int" || i.kind === "multipleOf")
        return !0;
      i.kind === "min" ? (r === null || i.value > r) && (r = i.value) : i.kind === "max" && (e === null || i.value < e) && (e = i.value);
    }
    return Number.isFinite(r) && Number.isFinite(e);
  }
}
tt.create = (c) => new tt({
  checks: [],
  typeName: W.ZodNumber,
  coerce: (c == null ? void 0 : c.coerce) || !1,
  ...Q(c)
});
class rt extends re {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte;
  }
  _parse(e) {
    if (this._def.coerce)
      try {
        e.data = BigInt(e.data);
      } catch {
        return this._getInvalidInput(e);
      }
    if (this._getType(e) !== z.bigint)
      return this._getInvalidInput(e);
    let i;
    const u = new be();
    for (const a of this._def.checks)
      a.kind === "min" ? (a.inclusive ? e.data < a.value : e.data <= a.value) && (i = this._getOrReturnCtx(e, i), X(i, {
        code: O.too_small,
        type: "bigint",
        minimum: a.value,
        inclusive: a.inclusive,
        message: a.message
      }), u.dirty()) : a.kind === "max" ? (a.inclusive ? e.data > a.value : e.data >= a.value) && (i = this._getOrReturnCtx(e, i), X(i, {
        code: O.too_big,
        type: "bigint",
        maximum: a.value,
        inclusive: a.inclusive,
        message: a.message
      }), u.dirty()) : a.kind === "multipleOf" ? e.data % a.value !== BigInt(0) && (i = this._getOrReturnCtx(e, i), X(i, {
        code: O.not_multiple_of,
        multipleOf: a.value,
        message: a.message
      }), u.dirty()) : oe.assertNever(a);
    return { status: u.value, value: e.data };
  }
  _getInvalidInput(e) {
    const r = this._getOrReturnCtx(e);
    return X(r, {
      code: O.invalid_type,
      expected: z.bigint,
      received: r.parsedType
    }), G;
  }
  gte(e, r) {
    return this.setLimit("min", e, !0, q.toString(r));
  }
  gt(e, r) {
    return this.setLimit("min", e, !1, q.toString(r));
  }
  lte(e, r) {
    return this.setLimit("max", e, !0, q.toString(r));
  }
  lt(e, r) {
    return this.setLimit("max", e, !1, q.toString(r));
  }
  setLimit(e, r, i, u) {
    return new rt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: r,
          inclusive: i,
          message: q.toString(u)
        }
      ]
    });
  }
  _addCheck(e) {
    return new rt({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: q.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: q.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: q.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: q.toString(e)
    });
  }
  multipleOf(e, r) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: q.toString(r)
    });
  }
  get minValue() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "min" && (e === null || r.value > e) && (e = r.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "max" && (e === null || r.value < e) && (e = r.value);
    return e;
  }
}
rt.create = (c) => {
  var e;
  return new rt({
    checks: [],
    typeName: W.ZodBigInt,
    coerce: (e = c == null ? void 0 : c.coerce) !== null && e !== void 0 ? e : !1,
    ...Q(c)
  });
};
class wt extends re {
  _parse(e) {
    if (this._def.coerce && (e.data = !!e.data), this._getType(e) !== z.boolean) {
      const i = this._getOrReturnCtx(e);
      return X(i, {
        code: O.invalid_type,
        expected: z.boolean,
        received: i.parsedType
      }), G;
    }
    return _e(e.data);
  }
}
wt.create = (c) => new wt({
  typeName: W.ZodBoolean,
  coerce: (c == null ? void 0 : c.coerce) || !1,
  ...Q(c)
});
class ut extends re {
  _parse(e) {
    if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== z.date) {
      const a = this._getOrReturnCtx(e);
      return X(a, {
        code: O.invalid_type,
        expected: z.date,
        received: a.parsedType
      }), G;
    }
    if (isNaN(e.data.getTime())) {
      const a = this._getOrReturnCtx(e);
      return X(a, {
        code: O.invalid_date
      }), G;
    }
    const i = new be();
    let u;
    for (const a of this._def.checks)
      a.kind === "min" ? e.data.getTime() < a.value && (u = this._getOrReturnCtx(e, u), X(u, {
        code: O.too_small,
        message: a.message,
        inclusive: !0,
        exact: !1,
        minimum: a.value,
        type: "date"
      }), i.dirty()) : a.kind === "max" ? e.data.getTime() > a.value && (u = this._getOrReturnCtx(e, u), X(u, {
        code: O.too_big,
        message: a.message,
        inclusive: !0,
        exact: !1,
        maximum: a.value,
        type: "date"
      }), i.dirty()) : oe.assertNever(a);
    return {
      status: i.value,
      value: new Date(e.data.getTime())
    };
  }
  _addCheck(e) {
    return new ut({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  min(e, r) {
    return this._addCheck({
      kind: "min",
      value: e.getTime(),
      message: q.toString(r)
    });
  }
  max(e, r) {
    return this._addCheck({
      kind: "max",
      value: e.getTime(),
      message: q.toString(r)
    });
  }
  get minDate() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "min" && (e === null || r.value > e) && (e = r.value);
    return e != null ? new Date(e) : null;
  }
  get maxDate() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "max" && (e === null || r.value < e) && (e = r.value);
    return e != null ? new Date(e) : null;
  }
}
ut.create = (c) => new ut({
  checks: [],
  coerce: (c == null ? void 0 : c.coerce) || !1,
  typeName: W.ZodDate,
  ...Q(c)
});
class qt extends re {
  _parse(e) {
    if (this._getType(e) !== z.symbol) {
      const i = this._getOrReturnCtx(e);
      return X(i, {
        code: O.invalid_type,
        expected: z.symbol,
        received: i.parsedType
      }), G;
    }
    return _e(e.data);
  }
}
qt.create = (c) => new qt({
  typeName: W.ZodSymbol,
  ...Q(c)
});
class At extends re {
  _parse(e) {
    if (this._getType(e) !== z.undefined) {
      const i = this._getOrReturnCtx(e);
      return X(i, {
        code: O.invalid_type,
        expected: z.undefined,
        received: i.parsedType
      }), G;
    }
    return _e(e.data);
  }
}
At.create = (c) => new At({
  typeName: W.ZodUndefined,
  ...Q(c)
});
class Ft extends re {
  _parse(e) {
    if (this._getType(e) !== z.null) {
      const i = this._getOrReturnCtx(e);
      return X(i, {
        code: O.invalid_type,
        expected: z.null,
        received: i.parsedType
      }), G;
    }
    return _e(e.data);
  }
}
Ft.create = (c) => new Ft({
  typeName: W.ZodNull,
  ...Q(c)
});
class xt extends re {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(e) {
    return _e(e.data);
  }
}
xt.create = (c) => new xt({
  typeName: W.ZodAny,
  ...Q(c)
});
class at extends re {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(e) {
    return _e(e.data);
  }
}
at.create = (c) => new at({
  typeName: W.ZodUnknown,
  ...Q(c)
});
class et extends re {
  _parse(e) {
    const r = this._getOrReturnCtx(e);
    return X(r, {
      code: O.invalid_type,
      expected: z.never,
      received: r.parsedType
    }), G;
  }
}
et.create = (c) => new et({
  typeName: W.ZodNever,
  ...Q(c)
});
class Zt extends re {
  _parse(e) {
    if (this._getType(e) !== z.undefined) {
      const i = this._getOrReturnCtx(e);
      return X(i, {
        code: O.invalid_type,
        expected: z.void,
        received: i.parsedType
      }), G;
    }
    return _e(e.data);
  }
}
Zt.create = (c) => new Zt({
  typeName: W.ZodVoid,
  ...Q(c)
});
class Le extends re {
  _parse(e) {
    const { ctx: r, status: i } = this._processInputParams(e), u = this._def;
    if (r.parsedType !== z.array)
      return X(r, {
        code: O.invalid_type,
        expected: z.array,
        received: r.parsedType
      }), G;
    if (u.exactLength !== null) {
      const p = r.data.length > u.exactLength.value, h = r.data.length < u.exactLength.value;
      (p || h) && (X(r, {
        code: p ? O.too_big : O.too_small,
        minimum: h ? u.exactLength.value : void 0,
        maximum: p ? u.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: u.exactLength.message
      }), i.dirty());
    }
    if (u.minLength !== null && r.data.length < u.minLength.value && (X(r, {
      code: O.too_small,
      minimum: u.minLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: u.minLength.message
    }), i.dirty()), u.maxLength !== null && r.data.length > u.maxLength.value && (X(r, {
      code: O.too_big,
      maximum: u.maxLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: u.maxLength.message
    }), i.dirty()), r.common.async)
      return Promise.all([...r.data].map((p, h) => u.type._parseAsync(new Ve(r, p, r.path, h)))).then((p) => be.mergeArray(i, p));
    const a = [...r.data].map((p, h) => u.type._parseSync(new Ve(r, p, r.path, h)));
    return be.mergeArray(i, a);
  }
  get element() {
    return this._def.type;
  }
  min(e, r) {
    return new Le({
      ...this._def,
      minLength: { value: e, message: q.toString(r) }
    });
  }
  max(e, r) {
    return new Le({
      ...this._def,
      maxLength: { value: e, message: q.toString(r) }
    });
  }
  length(e, r) {
    return new Le({
      ...this._def,
      exactLength: { value: e, message: q.toString(r) }
    });
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
Le.create = (c, e) => new Le({
  type: c,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: W.ZodArray,
  ...Q(e)
});
function lt(c) {
  if (c instanceof ge) {
    const e = {};
    for (const r in c.shape) {
      const i = c.shape[r];
      e[r] = He.create(lt(i));
    }
    return new ge({
      ...c._def,
      shape: () => e
    });
  } else return c instanceof Le ? new Le({
    ...c._def,
    type: lt(c.element)
  }) : c instanceof He ? He.create(lt(c.unwrap())) : c instanceof nt ? nt.create(lt(c.unwrap())) : c instanceof Ke ? Ke.create(c.items.map((e) => lt(e))) : c;
}
class ge extends re {
  constructor() {
    super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const e = this._def.shape(), r = oe.objectKeys(e);
    return this._cached = { shape: e, keys: r };
  }
  _parse(e) {
    if (this._getType(e) !== z.object) {
      const w = this._getOrReturnCtx(e);
      return X(w, {
        code: O.invalid_type,
        expected: z.object,
        received: w.parsedType
      }), G;
    }
    const { status: i, ctx: u } = this._processInputParams(e), { shape: a, keys: p } = this._getCached(), h = [];
    if (!(this._def.catchall instanceof et && this._def.unknownKeys === "strip"))
      for (const w in u.data)
        p.includes(w) || h.push(w);
    const m = [];
    for (const w of p) {
      const g = a[w], F = u.data[w];
      m.push({
        key: { status: "valid", value: w },
        value: g._parse(new Ve(u, F, u.path, w)),
        alwaysSet: w in u.data
      });
    }
    if (this._def.catchall instanceof et) {
      const w = this._def.unknownKeys;
      if (w === "passthrough")
        for (const g of h)
          m.push({
            key: { status: "valid", value: g },
            value: { status: "valid", value: u.data[g] }
          });
      else if (w === "strict")
        h.length > 0 && (X(u, {
          code: O.unrecognized_keys,
          keys: h
        }), i.dirty());
      else if (w !== "strip") throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const w = this._def.catchall;
      for (const g of h) {
        const F = u.data[g];
        m.push({
          key: { status: "valid", value: g },
          value: w._parse(
            new Ve(u, F, u.path, g)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: g in u.data
        });
      }
    }
    return u.common.async ? Promise.resolve().then(async () => {
      const w = [];
      for (const g of m) {
        const F = await g.key, v = await g.value;
        w.push({
          key: F,
          value: v,
          alwaysSet: g.alwaysSet
        });
      }
      return w;
    }).then((w) => be.mergeObjectSync(i, w)) : be.mergeObjectSync(i, m);
  }
  get shape() {
    return this._def.shape();
  }
  strict(e) {
    return q.errToObj, new ge({
      ...this._def,
      unknownKeys: "strict",
      ...e !== void 0 ? {
        errorMap: (r, i) => {
          var u, a, p, h;
          const m = (p = (a = (u = this._def).errorMap) === null || a === void 0 ? void 0 : a.call(u, r, i).message) !== null && p !== void 0 ? p : i.defaultError;
          return r.code === "unrecognized_keys" ? {
            message: (h = q.errToObj(e).message) !== null && h !== void 0 ? h : m
          } : {
            message: m
          };
        }
      } : {}
    });
  }
  strip() {
    return new ge({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new ge({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(e) {
    return new ge({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...e
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(e) {
    return new ge({
      unknownKeys: e._def.unknownKeys,
      catchall: e._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...e._def.shape()
      }),
      typeName: W.ZodObject
    });
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(e, r) {
    return this.augment({ [e]: r });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(e) {
    return new ge({
      ...this._def,
      catchall: e
    });
  }
  pick(e) {
    const r = {};
    return oe.objectKeys(e).forEach((i) => {
      e[i] && this.shape[i] && (r[i] = this.shape[i]);
    }), new ge({
      ...this._def,
      shape: () => r
    });
  }
  omit(e) {
    const r = {};
    return oe.objectKeys(this.shape).forEach((i) => {
      e[i] || (r[i] = this.shape[i]);
    }), new ge({
      ...this._def,
      shape: () => r
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return lt(this);
  }
  partial(e) {
    const r = {};
    return oe.objectKeys(this.shape).forEach((i) => {
      const u = this.shape[i];
      e && !e[i] ? r[i] = u : r[i] = u.optional();
    }), new ge({
      ...this._def,
      shape: () => r
    });
  }
  required(e) {
    const r = {};
    return oe.objectKeys(this.shape).forEach((i) => {
      if (e && !e[i])
        r[i] = this.shape[i];
      else {
        let a = this.shape[i];
        for (; a instanceof He; )
          a = a._def.innerType;
        r[i] = a;
      }
    }), new ge({
      ...this._def,
      shape: () => r
    });
  }
  keyof() {
    return Ai(oe.objectKeys(this.shape));
  }
}
ge.create = (c, e) => new ge({
  shape: () => c,
  unknownKeys: "strip",
  catchall: et.create(),
  typeName: W.ZodObject,
  ...Q(e)
});
ge.strictCreate = (c, e) => new ge({
  shape: () => c,
  unknownKeys: "strict",
  catchall: et.create(),
  typeName: W.ZodObject,
  ...Q(e)
});
ge.lazycreate = (c, e) => new ge({
  shape: c,
  unknownKeys: "strip",
  catchall: et.create(),
  typeName: W.ZodObject,
  ...Q(e)
});
class bt extends re {
  _parse(e) {
    const { ctx: r } = this._processInputParams(e), i = this._def.options;
    function u(a) {
      for (const h of a)
        if (h.result.status === "valid")
          return h.result;
      for (const h of a)
        if (h.result.status === "dirty")
          return r.common.issues.push(...h.ctx.common.issues), h.result;
      const p = a.map((h) => new Re(h.ctx.common.issues));
      return X(r, {
        code: O.invalid_union,
        unionErrors: p
      }), G;
    }
    if (r.common.async)
      return Promise.all(i.map(async (a) => {
        const p = {
          ...r,
          common: {
            ...r.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await a._parseAsync({
            data: r.data,
            path: r.path,
            parent: p
          }),
          ctx: p
        };
      })).then(u);
    {
      let a;
      const p = [];
      for (const m of i) {
        const w = {
          ...r,
          common: {
            ...r.common,
            issues: []
          },
          parent: null
        }, g = m._parseSync({
          data: r.data,
          path: r.path,
          parent: w
        });
        if (g.status === "valid")
          return g;
        g.status === "dirty" && !a && (a = { result: g, ctx: w }), w.common.issues.length && p.push(w.common.issues);
      }
      if (a)
        return r.common.issues.push(...a.ctx.common.issues), a.result;
      const h = p.map((m) => new Re(m));
      return X(r, {
        code: O.invalid_union,
        unionErrors: h
      }), G;
    }
  }
  get options() {
    return this._def.options;
  }
}
bt.create = (c, e) => new bt({
  options: c,
  typeName: W.ZodUnion,
  ...Q(e)
});
const Ge = (c) => c instanceof Tt ? Ge(c.schema) : c instanceof Ue ? Ge(c.innerType()) : c instanceof Bt ? [c.value] : c instanceof it ? c.options : c instanceof It ? oe.objectValues(c.enum) : c instanceof Nt ? Ge(c._def.innerType) : c instanceof At ? [void 0] : c instanceof Ft ? [null] : c instanceof He ? [void 0, ...Ge(c.unwrap())] : c instanceof nt ? [null, ...Ge(c.unwrap())] : c instanceof Mr || c instanceof Pt ? Ge(c.unwrap()) : c instanceof Rt ? Ge(c._def.innerType) : [];
class Gt extends re {
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    if (r.parsedType !== z.object)
      return X(r, {
        code: O.invalid_type,
        expected: z.object,
        received: r.parsedType
      }), G;
    const i = this.discriminator, u = r.data[i], a = this.optionsMap.get(u);
    return a ? r.common.async ? a._parseAsync({
      data: r.data,
      path: r.path,
      parent: r
    }) : a._parseSync({
      data: r.data,
      path: r.path,
      parent: r
    }) : (X(r, {
      code: O.invalid_union_discriminator,
      options: Array.from(this.optionsMap.keys()),
      path: [i]
    }), G);
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */
  static create(e, r, i) {
    const u = /* @__PURE__ */ new Map();
    for (const a of r) {
      const p = Ge(a.shape[e]);
      if (!p.length)
        throw new Error(`A discriminator value for key \`${e}\` could not be extracted from all schema options`);
      for (const h of p) {
        if (u.has(h))
          throw new Error(`Discriminator property ${String(e)} has duplicate value ${String(h)}`);
        u.set(h, a);
      }
    }
    return new Gt({
      typeName: W.ZodDiscriminatedUnion,
      discriminator: e,
      options: r,
      optionsMap: u,
      ...Q(i)
    });
  }
}
function Nr(c, e) {
  const r = Ye(c), i = Ye(e);
  if (c === e)
    return { valid: !0, data: c };
  if (r === z.object && i === z.object) {
    const u = oe.objectKeys(e), a = oe.objectKeys(c).filter((h) => u.indexOf(h) !== -1), p = { ...c, ...e };
    for (const h of a) {
      const m = Nr(c[h], e[h]);
      if (!m.valid)
        return { valid: !1 };
      p[h] = m.data;
    }
    return { valid: !0, data: p };
  } else if (r === z.array && i === z.array) {
    if (c.length !== e.length)
      return { valid: !1 };
    const u = [];
    for (let a = 0; a < c.length; a++) {
      const p = c[a], h = e[a], m = Nr(p, h);
      if (!m.valid)
        return { valid: !1 };
      u.push(m.data);
    }
    return { valid: !0, data: u };
  } else return r === z.date && i === z.date && +c == +e ? { valid: !0, data: c } : { valid: !1 };
}
class kt extends re {
  _parse(e) {
    const { status: r, ctx: i } = this._processInputParams(e), u = (a, p) => {
      if (Br(a) || Br(p))
        return G;
      const h = Nr(a.value, p.value);
      return h.valid ? ((Ir(a) || Ir(p)) && r.dirty(), { status: r.value, value: h.data }) : (X(i, {
        code: O.invalid_intersection_types
      }), G);
    };
    return i.common.async ? Promise.all([
      this._def.left._parseAsync({
        data: i.data,
        path: i.path,
        parent: i
      }),
      this._def.right._parseAsync({
        data: i.data,
        path: i.path,
        parent: i
      })
    ]).then(([a, p]) => u(a, p)) : u(this._def.left._parseSync({
      data: i.data,
      path: i.path,
      parent: i
    }), this._def.right._parseSync({
      data: i.data,
      path: i.path,
      parent: i
    }));
  }
}
kt.create = (c, e, r) => new kt({
  left: c,
  right: e,
  typeName: W.ZodIntersection,
  ...Q(r)
});
class Ke extends re {
  _parse(e) {
    const { status: r, ctx: i } = this._processInputParams(e);
    if (i.parsedType !== z.array)
      return X(i, {
        code: O.invalid_type,
        expected: z.array,
        received: i.parsedType
      }), G;
    if (i.data.length < this._def.items.length)
      return X(i, {
        code: O.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), G;
    !this._def.rest && i.data.length > this._def.items.length && (X(i, {
      code: O.too_big,
      maximum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), r.dirty());
    const a = [...i.data].map((p, h) => {
      const m = this._def.items[h] || this._def.rest;
      return m ? m._parse(new Ve(i, p, i.path, h)) : null;
    }).filter((p) => !!p);
    return i.common.async ? Promise.all(a).then((p) => be.mergeArray(r, p)) : be.mergeArray(r, a);
  }
  get items() {
    return this._def.items;
  }
  rest(e) {
    return new Ke({
      ...this._def,
      rest: e
    });
  }
}
Ke.create = (c, e) => {
  if (!Array.isArray(c))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new Ke({
    items: c,
    typeName: W.ZodTuple,
    rest: null,
    ...Q(e)
  });
};
class _t extends re {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: r, ctx: i } = this._processInputParams(e);
    if (i.parsedType !== z.object)
      return X(i, {
        code: O.invalid_type,
        expected: z.object,
        received: i.parsedType
      }), G;
    const u = [], a = this._def.keyType, p = this._def.valueType;
    for (const h in i.data)
      u.push({
        key: a._parse(new Ve(i, h, i.path, h)),
        value: p._parse(new Ve(i, i.data[h], i.path, h)),
        alwaysSet: h in i.data
      });
    return i.common.async ? be.mergeObjectAsync(r, u) : be.mergeObjectSync(r, u);
  }
  get element() {
    return this._def.valueType;
  }
  static create(e, r, i) {
    return r instanceof re ? new _t({
      keyType: e,
      valueType: r,
      typeName: W.ZodRecord,
      ...Q(i)
    }) : new _t({
      keyType: Oe.create(),
      valueType: e,
      typeName: W.ZodRecord,
      ...Q(r)
    });
  }
}
class Ht extends re {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: r, ctx: i } = this._processInputParams(e);
    if (i.parsedType !== z.map)
      return X(i, {
        code: O.invalid_type,
        expected: z.map,
        received: i.parsedType
      }), G;
    const u = this._def.keyType, a = this._def.valueType, p = [...i.data.entries()].map(([h, m], w) => ({
      key: u._parse(new Ve(i, h, i.path, [w, "key"])),
      value: a._parse(new Ve(i, m, i.path, [w, "value"]))
    }));
    if (i.common.async) {
      const h = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const m of p) {
          const w = await m.key, g = await m.value;
          if (w.status === "aborted" || g.status === "aborted")
            return G;
          (w.status === "dirty" || g.status === "dirty") && r.dirty(), h.set(w.value, g.value);
        }
        return { status: r.value, value: h };
      });
    } else {
      const h = /* @__PURE__ */ new Map();
      for (const m of p) {
        const w = m.key, g = m.value;
        if (w.status === "aborted" || g.status === "aborted")
          return G;
        (w.status === "dirty" || g.status === "dirty") && r.dirty(), h.set(w.value, g.value);
      }
      return { status: r.value, value: h };
    }
  }
}
Ht.create = (c, e, r) => new Ht({
  valueType: e,
  keyType: c,
  typeName: W.ZodMap,
  ...Q(r)
});
class ct extends re {
  _parse(e) {
    const { status: r, ctx: i } = this._processInputParams(e);
    if (i.parsedType !== z.set)
      return X(i, {
        code: O.invalid_type,
        expected: z.set,
        received: i.parsedType
      }), G;
    const u = this._def;
    u.minSize !== null && i.data.size < u.minSize.value && (X(i, {
      code: O.too_small,
      minimum: u.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: u.minSize.message
    }), r.dirty()), u.maxSize !== null && i.data.size > u.maxSize.value && (X(i, {
      code: O.too_big,
      maximum: u.maxSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: u.maxSize.message
    }), r.dirty());
    const a = this._def.valueType;
    function p(m) {
      const w = /* @__PURE__ */ new Set();
      for (const g of m) {
        if (g.status === "aborted")
          return G;
        g.status === "dirty" && r.dirty(), w.add(g.value);
      }
      return { status: r.value, value: w };
    }
    const h = [...i.data.values()].map((m, w) => a._parse(new Ve(i, m, i.path, w)));
    return i.common.async ? Promise.all(h).then((m) => p(m)) : p(h);
  }
  min(e, r) {
    return new ct({
      ...this._def,
      minSize: { value: e, message: q.toString(r) }
    });
  }
  max(e, r) {
    return new ct({
      ...this._def,
      maxSize: { value: e, message: q.toString(r) }
    });
  }
  size(e, r) {
    return this.min(e, r).max(e, r);
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
ct.create = (c, e) => new ct({
  valueType: c,
  minSize: null,
  maxSize: null,
  typeName: W.ZodSet,
  ...Q(e)
});
class ft extends re {
  constructor() {
    super(...arguments), this.validate = this.implement;
  }
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    if (r.parsedType !== z.function)
      return X(r, {
        code: O.invalid_type,
        expected: z.function,
        received: r.parsedType
      }), G;
    function i(h, m) {
      return zt({
        data: h,
        path: r.path,
        errorMaps: [
          r.common.contextualErrorMap,
          r.schemaErrorMap,
          Xt(),
          mt
        ].filter((w) => !!w),
        issueData: {
          code: O.invalid_arguments,
          argumentsError: m
        }
      });
    }
    function u(h, m) {
      return zt({
        data: h,
        path: r.path,
        errorMaps: [
          r.common.contextualErrorMap,
          r.schemaErrorMap,
          Xt(),
          mt
        ].filter((w) => !!w),
        issueData: {
          code: O.invalid_return_type,
          returnTypeError: m
        }
      });
    }
    const a = { errorMap: r.common.contextualErrorMap }, p = r.data;
    if (this._def.returns instanceof yt) {
      const h = this;
      return _e(async function(...m) {
        const w = new Re([]), g = await h._def.args.parseAsync(m, a).catch((E) => {
          throw w.addIssue(i(m, E)), w;
        }), F = await Reflect.apply(p, this, g);
        return await h._def.returns._def.type.parseAsync(F, a).catch((E) => {
          throw w.addIssue(u(F, E)), w;
        });
      });
    } else {
      const h = this;
      return _e(function(...m) {
        const w = h._def.args.safeParse(m, a);
        if (!w.success)
          throw new Re([i(m, w.error)]);
        const g = Reflect.apply(p, this, w.data), F = h._def.returns.safeParse(g, a);
        if (!F.success)
          throw new Re([u(g, F.error)]);
        return F.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...e) {
    return new ft({
      ...this._def,
      args: Ke.create(e).rest(at.create())
    });
  }
  returns(e) {
    return new ft({
      ...this._def,
      returns: e
    });
  }
  implement(e) {
    return this.parse(e);
  }
  strictImplement(e) {
    return this.parse(e);
  }
  static create(e, r, i) {
    return new ft({
      args: e || Ke.create([]).rest(at.create()),
      returns: r || at.create(),
      typeName: W.ZodFunction,
      ...Q(i)
    });
  }
}
class Tt extends re {
  get schema() {
    return this._def.getter();
  }
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    return this._def.getter()._parse({ data: r.data, path: r.path, parent: r });
  }
}
Tt.create = (c, e) => new Tt({
  getter: c,
  typeName: W.ZodLazy,
  ...Q(e)
});
class Bt extends re {
  _parse(e) {
    if (e.data !== this._def.value) {
      const r = this._getOrReturnCtx(e);
      return X(r, {
        received: r.data,
        code: O.invalid_literal,
        expected: this._def.value
      }), G;
    }
    return { status: "valid", value: e.data };
  }
  get value() {
    return this._def.value;
  }
}
Bt.create = (c, e) => new Bt({
  value: c,
  typeName: W.ZodLiteral,
  ...Q(e)
});
function Ai(c, e) {
  return new it({
    values: c,
    typeName: W.ZodEnum,
    ...Q(e)
  });
}
class it extends re {
  constructor() {
    super(...arguments), Et.set(this, void 0);
  }
  _parse(e) {
    if (typeof e.data != "string") {
      const r = this._getOrReturnCtx(e), i = this._def.values;
      return X(r, {
        expected: oe.joinValues(i),
        received: r.parsedType,
        code: O.invalid_type
      }), G;
    }
    if ($t(this, Et) || Di(this, Et, new Set(this._def.values)), !$t(this, Et).has(e.data)) {
      const r = this._getOrReturnCtx(e), i = this._def.values;
      return X(r, {
        received: r.data,
        code: O.invalid_enum_value,
        options: i
      }), G;
    }
    return _e(e.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const e = {};
    for (const r of this._def.values)
      e[r] = r;
    return e;
  }
  get Values() {
    const e = {};
    for (const r of this._def.values)
      e[r] = r;
    return e;
  }
  get Enum() {
    const e = {};
    for (const r of this._def.values)
      e[r] = r;
    return e;
  }
  extract(e, r = this._def) {
    return it.create(e, {
      ...this._def,
      ...r
    });
  }
  exclude(e, r = this._def) {
    return it.create(this.options.filter((i) => !e.includes(i)), {
      ...this._def,
      ...r
    });
  }
}
Et = /* @__PURE__ */ new WeakMap();
it.create = Ai;
class It extends re {
  constructor() {
    super(...arguments), Dt.set(this, void 0);
  }
  _parse(e) {
    const r = oe.getValidEnumValues(this._def.values), i = this._getOrReturnCtx(e);
    if (i.parsedType !== z.string && i.parsedType !== z.number) {
      const u = oe.objectValues(r);
      return X(i, {
        expected: oe.joinValues(u),
        received: i.parsedType,
        code: O.invalid_type
      }), G;
    }
    if ($t(this, Dt) || Di(this, Dt, new Set(oe.getValidEnumValues(this._def.values))), !$t(this, Dt).has(e.data)) {
      const u = oe.objectValues(r);
      return X(i, {
        received: i.data,
        code: O.invalid_enum_value,
        options: u
      }), G;
    }
    return _e(e.data);
  }
  get enum() {
    return this._def.values;
  }
}
Dt = /* @__PURE__ */ new WeakMap();
It.create = (c, e) => new It({
  values: c,
  typeName: W.ZodNativeEnum,
  ...Q(e)
});
class yt extends re {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    if (r.parsedType !== z.promise && r.common.async === !1)
      return X(r, {
        code: O.invalid_type,
        expected: z.promise,
        received: r.parsedType
      }), G;
    const i = r.parsedType === z.promise ? r.data : Promise.resolve(r.data);
    return _e(i.then((u) => this._def.type.parseAsync(u, {
      path: r.path,
      errorMap: r.common.contextualErrorMap
    })));
  }
}
yt.create = (c, e) => new yt({
  type: c,
  typeName: W.ZodPromise,
  ...Q(e)
});
class Ue extends re {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === W.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(e) {
    const { status: r, ctx: i } = this._processInputParams(e), u = this._def.effect || null, a = {
      addIssue: (p) => {
        X(i, p), p.fatal ? r.abort() : r.dirty();
      },
      get path() {
        return i.path;
      }
    };
    if (a.addIssue = a.addIssue.bind(a), u.type === "preprocess") {
      const p = u.transform(i.data, a);
      if (i.common.async)
        return Promise.resolve(p).then(async (h) => {
          if (r.value === "aborted")
            return G;
          const m = await this._def.schema._parseAsync({
            data: h,
            path: i.path,
            parent: i
          });
          return m.status === "aborted" ? G : m.status === "dirty" || r.value === "dirty" ? ht(m.value) : m;
        });
      {
        if (r.value === "aborted")
          return G;
        const h = this._def.schema._parseSync({
          data: p,
          path: i.path,
          parent: i
        });
        return h.status === "aborted" ? G : h.status === "dirty" || r.value === "dirty" ? ht(h.value) : h;
      }
    }
    if (u.type === "refinement") {
      const p = (h) => {
        const m = u.refinement(h, a);
        if (i.common.async)
          return Promise.resolve(m);
        if (m instanceof Promise)
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        return h;
      };
      if (i.common.async === !1) {
        const h = this._def.schema._parseSync({
          data: i.data,
          path: i.path,
          parent: i
        });
        return h.status === "aborted" ? G : (h.status === "dirty" && r.dirty(), p(h.value), { status: r.value, value: h.value });
      } else
        return this._def.schema._parseAsync({ data: i.data, path: i.path, parent: i }).then((h) => h.status === "aborted" ? G : (h.status === "dirty" && r.dirty(), p(h.value).then(() => ({ status: r.value, value: h.value }))));
    }
    if (u.type === "transform")
      if (i.common.async === !1) {
        const p = this._def.schema._parseSync({
          data: i.data,
          path: i.path,
          parent: i
        });
        if (!ot(p))
          return p;
        const h = u.transform(p.value, a);
        if (h instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: r.value, value: h };
      } else
        return this._def.schema._parseAsync({ data: i.data, path: i.path, parent: i }).then((p) => ot(p) ? Promise.resolve(u.transform(p.value, a)).then((h) => ({ status: r.value, value: h })) : p);
    oe.assertNever(u);
  }
}
Ue.create = (c, e, r) => new Ue({
  schema: c,
  typeName: W.ZodEffects,
  effect: e,
  ...Q(r)
});
Ue.createWithPreprocess = (c, e, r) => new Ue({
  schema: e,
  effect: { type: "preprocess", transform: c },
  typeName: W.ZodEffects,
  ...Q(r)
});
class He extends re {
  _parse(e) {
    return this._getType(e) === z.undefined ? _e(void 0) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
He.create = (c, e) => new He({
  innerType: c,
  typeName: W.ZodOptional,
  ...Q(e)
});
class nt extends re {
  _parse(e) {
    return this._getType(e) === z.null ? _e(null) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
nt.create = (c, e) => new nt({
  innerType: c,
  typeName: W.ZodNullable,
  ...Q(e)
});
class Nt extends re {
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    let i = r.data;
    return r.parsedType === z.undefined && (i = this._def.defaultValue()), this._def.innerType._parse({
      data: i,
      path: r.path,
      parent: r
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
Nt.create = (c, e) => new Nt({
  innerType: c,
  typeName: W.ZodDefault,
  defaultValue: typeof e.default == "function" ? e.default : () => e.default,
  ...Q(e)
});
class Rt extends re {
  _parse(e) {
    const { ctx: r } = this._processInputParams(e), i = {
      ...r,
      common: {
        ...r.common,
        issues: []
      }
    }, u = this._def.innerType._parse({
      data: i.data,
      path: i.path,
      parent: {
        ...i
      }
    });
    return St(u) ? u.then((a) => ({
      status: "valid",
      value: a.status === "valid" ? a.value : this._def.catchValue({
        get error() {
          return new Re(i.common.issues);
        },
        input: i.data
      })
    })) : {
      status: "valid",
      value: u.status === "valid" ? u.value : this._def.catchValue({
        get error() {
          return new Re(i.common.issues);
        },
        input: i.data
      })
    };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
Rt.create = (c, e) => new Rt({
  innerType: c,
  typeName: W.ZodCatch,
  catchValue: typeof e.catch == "function" ? e.catch : () => e.catch,
  ...Q(e)
});
class Vt extends re {
  _parse(e) {
    if (this._getType(e) !== z.nan) {
      const i = this._getOrReturnCtx(e);
      return X(i, {
        code: O.invalid_type,
        expected: z.nan,
        received: i.parsedType
      }), G;
    }
    return { status: "valid", value: e.data };
  }
}
Vt.create = (c) => new Vt({
  typeName: W.ZodNaN,
  ...Q(c)
});
const On = Symbol("zod_brand");
class Mr extends re {
  _parse(e) {
    const { ctx: r } = this._processInputParams(e), i = r.data;
    return this._def.type._parse({
      data: i,
      path: r.path,
      parent: r
    });
  }
  unwrap() {
    return this._def.type;
  }
}
class Mt extends re {
  _parse(e) {
    const { status: r, ctx: i } = this._processInputParams(e);
    if (i.common.async)
      return (async () => {
        const a = await this._def.in._parseAsync({
          data: i.data,
          path: i.path,
          parent: i
        });
        return a.status === "aborted" ? G : a.status === "dirty" ? (r.dirty(), ht(a.value)) : this._def.out._parseAsync({
          data: a.value,
          path: i.path,
          parent: i
        });
      })();
    {
      const u = this._def.in._parseSync({
        data: i.data,
        path: i.path,
        parent: i
      });
      return u.status === "aborted" ? G : u.status === "dirty" ? (r.dirty(), {
        status: "dirty",
        value: u.value
      }) : this._def.out._parseSync({
        data: u.value,
        path: i.path,
        parent: i
      });
    }
  }
  static create(e, r) {
    return new Mt({
      in: e,
      out: r,
      typeName: W.ZodPipeline
    });
  }
}
class Pt extends re {
  _parse(e) {
    const r = this._def.innerType._parse(e), i = (u) => (ot(u) && (u.value = Object.freeze(u.value)), u);
    return St(r) ? r.then((u) => i(u)) : i(r);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Pt.create = (c, e) => new Pt({
  innerType: c,
  typeName: W.ZodReadonly,
  ...Q(e)
});
function Fi(c, e = {}, r) {
  return c ? xt.create().superRefine((i, u) => {
    var a, p;
    if (!c(i)) {
      const h = typeof e == "function" ? e(i) : typeof e == "string" ? { message: e } : e, m = (p = (a = h.fatal) !== null && a !== void 0 ? a : r) !== null && p !== void 0 ? p : !0, w = typeof h == "string" ? { message: h } : h;
      u.addIssue({ code: "custom", ...w, fatal: m });
    }
  }) : xt.create();
}
const Ln = {
  object: ge.lazycreate
};
var W;
(function(c) {
  c.ZodString = "ZodString", c.ZodNumber = "ZodNumber", c.ZodNaN = "ZodNaN", c.ZodBigInt = "ZodBigInt", c.ZodBoolean = "ZodBoolean", c.ZodDate = "ZodDate", c.ZodSymbol = "ZodSymbol", c.ZodUndefined = "ZodUndefined", c.ZodNull = "ZodNull", c.ZodAny = "ZodAny", c.ZodUnknown = "ZodUnknown", c.ZodNever = "ZodNever", c.ZodVoid = "ZodVoid", c.ZodArray = "ZodArray", c.ZodObject = "ZodObject", c.ZodUnion = "ZodUnion", c.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", c.ZodIntersection = "ZodIntersection", c.ZodTuple = "ZodTuple", c.ZodRecord = "ZodRecord", c.ZodMap = "ZodMap", c.ZodSet = "ZodSet", c.ZodFunction = "ZodFunction", c.ZodLazy = "ZodLazy", c.ZodLiteral = "ZodLiteral", c.ZodEnum = "ZodEnum", c.ZodEffects = "ZodEffects", c.ZodNativeEnum = "ZodNativeEnum", c.ZodOptional = "ZodOptional", c.ZodNullable = "ZodNullable", c.ZodDefault = "ZodDefault", c.ZodCatch = "ZodCatch", c.ZodPromise = "ZodPromise", c.ZodBranded = "ZodBranded", c.ZodPipeline = "ZodPipeline", c.ZodReadonly = "ZodReadonly";
})(W || (W = {}));
const Un = (c, e = {
  message: `Input not instance of ${c.name}`
}) => Fi((r) => r instanceof c, e), bi = Oe.create, ki = tt.create, jn = Vt.create, Jn = rt.create, _i = wt.create, Xn = ut.create, zn = qt.create, $n = At.create, qn = Ft.create, Zn = xt.create, Hn = at.create, Vn = et.create, Kn = Zt.create, Wn = Le.create, Gn = ge.create, Yn = ge.strictCreate, Qn = bt.create, es = Gt.create, ts = kt.create, rs = Ke.create, is = _t.create, ns = Ht.create, ss = ct.create, as = ft.create, os = Tt.create, us = Bt.create, cs = it.create, ls = It.create, hs = yt.create, zr = Ue.create, ds = He.create, ps = nt.create, fs = Ue.createWithPreprocess, ms = Mt.create, xs = () => bi().optional(), ys = () => ki().optional(), vs = () => _i().optional(), gs = {
  string: (c) => Oe.create({ ...c, coerce: !0 }),
  number: (c) => tt.create({ ...c, coerce: !0 }),
  boolean: (c) => wt.create({
    ...c,
    coerce: !0
  }),
  bigint: (c) => rt.create({ ...c, coerce: !0 }),
  date: (c) => ut.create({ ...c, coerce: !0 })
}, Es = G;
var D = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  defaultErrorMap: mt,
  setErrorMap: fn,
  getErrorMap: Xt,
  makeIssue: zt,
  EMPTY_PATH: mn,
  addIssueToContext: X,
  ParseStatus: be,
  INVALID: G,
  DIRTY: ht,
  OK: _e,
  isAborted: Br,
  isDirty: Ir,
  isValid: ot,
  isAsync: St,
  get util() {
    return oe;
  },
  get objectUtil() {
    return Tr;
  },
  ZodParsedType: z,
  getParsedType: Ye,
  ZodType: re,
  datetimeRegex: wi,
  ZodString: Oe,
  ZodNumber: tt,
  ZodBigInt: rt,
  ZodBoolean: wt,
  ZodDate: ut,
  ZodSymbol: qt,
  ZodUndefined: At,
  ZodNull: Ft,
  ZodAny: xt,
  ZodUnknown: at,
  ZodNever: et,
  ZodVoid: Zt,
  ZodArray: Le,
  ZodObject: ge,
  ZodUnion: bt,
  ZodDiscriminatedUnion: Gt,
  ZodIntersection: kt,
  ZodTuple: Ke,
  ZodRecord: _t,
  ZodMap: Ht,
  ZodSet: ct,
  ZodFunction: ft,
  ZodLazy: Tt,
  ZodLiteral: Bt,
  ZodEnum: it,
  ZodNativeEnum: It,
  ZodPromise: yt,
  ZodEffects: Ue,
  ZodTransformer: Ue,
  ZodOptional: He,
  ZodNullable: nt,
  ZodDefault: Nt,
  ZodCatch: Rt,
  ZodNaN: Vt,
  BRAND: On,
  ZodBranded: Mr,
  ZodPipeline: Mt,
  ZodReadonly: Pt,
  custom: Fi,
  Schema: re,
  ZodSchema: re,
  late: Ln,
  get ZodFirstPartyTypeKind() {
    return W;
  },
  coerce: gs,
  any: Zn,
  array: Wn,
  bigint: Jn,
  boolean: _i,
  date: Xn,
  discriminatedUnion: es,
  effect: zr,
  enum: cs,
  function: as,
  instanceof: Un,
  intersection: ts,
  lazy: os,
  literal: us,
  map: ns,
  nan: jn,
  nativeEnum: ls,
  never: Vn,
  null: qn,
  nullable: ps,
  number: ki,
  object: Gn,
  oboolean: vs,
  onumber: ys,
  optional: ds,
  ostring: xs,
  pipeline: ms,
  preprocess: fs,
  promise: hs,
  record: is,
  set: ss,
  strictObject: Yn,
  string: bi,
  symbol: zn,
  transformer: zr,
  tuple: rs,
  undefined: $n,
  union: Qn,
  unknown: Hn,
  void: Kn,
  NEVER: Es,
  ZodIssueCode: O,
  quotelessJson: pn,
  ZodError: Re
});
const Ds = D.object({
  command: D.string().optional().nullable(),
  args: D.array(D.string()).default([]),
  env: D.record(D.string()).optional().nullable(),
  disabled: D.boolean().default(!1),
  autoApprove: D.array(D.string()).default([])
}), Cs = D.object({
  mcpServers: D.record(Ds)
}), Ti = "2025-03-26", Ss = [
  Ti,
  "2024-11-05",
  "2024-10-07"
], Yt = "2.0", Bi = D.union([D.string(), D.number().int()]), Ii = D.string(), ws = D.object({
  /**
   * If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.
   */
  progressToken: D.optional(Bi)
}).passthrough(), je = D.object({
  _meta: D.optional(ws)
}).passthrough(), Pe = D.object({
  method: D.string(),
  params: D.optional(je)
}), Ot = D.object({
  /**
   * This parameter name is reserved by MCP to allow clients and servers to attach additional metadata to their notifications.
   */
  _meta: D.optional(D.object({}).passthrough())
}).passthrough(), We = D.object({
  method: D.string(),
  params: D.optional(Ot)
}), Je = D.object({
  /**
   * This result property is reserved by the protocol to allow clients and servers to attach additional metadata to their responses.
   */
  _meta: D.optional(D.object({}).passthrough())
}).passthrough(), Qt = D.union([D.string(), D.number().int()]), Ni = D.object({
  jsonrpc: D.literal(Yt),
  id: Qt
}).merge(Pe).strict(), As = (c) => Ni.safeParse(c).success, Ri = D.object({
  jsonrpc: D.literal(Yt)
}).merge(We).strict(), Fs = (c) => Ri.safeParse(c).success, Pi = D.object({
  jsonrpc: D.literal(Yt),
  id: Qt,
  result: Je
}).strict(), $r = (c) => Pi.safeParse(c).success;
var Qe;
(function(c) {
  c[c.ConnectionClosed = -32e3] = "ConnectionClosed", c[c.RequestTimeout = -32001] = "RequestTimeout", c[c.ParseError = -32700] = "ParseError", c[c.InvalidRequest = -32600] = "InvalidRequest", c[c.MethodNotFound = -32601] = "MethodNotFound", c[c.InvalidParams = -32602] = "InvalidParams", c[c.InternalError = -32603] = "InternalError";
})(Qe || (Qe = {}));
const Mi = D.object({
  jsonrpc: D.literal(Yt),
  id: Qt,
  error: D.object({
    /**
     * The error type that occurred.
     */
    code: D.number().int(),
    /**
     * A short description of the error. The message SHOULD be limited to a concise single sentence.
     */
    message: D.string(),
    /**
     * Additional information about the error. The value of this member is defined by the sender (e.g. detailed error information, nested errors etc.).
     */
    data: D.optional(D.unknown())
  })
}).strict(), bs = (c) => Mi.safeParse(c).success, ks = D.union([
  Ni,
  Ri,
  Pi,
  Mi
]), dt = Je.strict(), Or = We.extend({
  method: D.literal("notifications/cancelled"),
  params: Ot.extend({
    /**
     * The ID of the request to cancel.
     *
     * This MUST correspond to the ID of a request previously issued in the same direction.
     */
    requestId: Qt,
    /**
     * An optional string describing the reason for the cancellation. This MAY be logged or presented to the user.
     */
    reason: D.string().optional()
  })
}), Oi = D.object({
  name: D.string(),
  version: D.string()
}).passthrough(), _s = D.object({
  /**
   * Experimental, non-standard capabilities that the client supports.
   */
  experimental: D.optional(D.object({}).passthrough()),
  /**
   * Present if the client supports sampling from an LLM.
   */
  sampling: D.optional(D.object({}).passthrough()),
  /**
   * Present if the client supports listing roots.
   */
  roots: D.optional(D.object({
    /**
     * Whether the client supports issuing notifications for changes to the roots list.
     */
    listChanged: D.optional(D.boolean())
  }).passthrough())
}).passthrough(), Ts = Pe.extend({
  method: D.literal("initialize"),
  params: je.extend({
    /**
     * The latest version of the Model Context Protocol that the client supports. The client MAY decide to support older versions as well.
     */
    protocolVersion: D.string(),
    capabilities: _s,
    clientInfo: Oi
  })
}), Bs = D.object({
  /**
   * Experimental, non-standard capabilities that the server supports.
   */
  experimental: D.optional(D.object({}).passthrough()),
  /**
   * Present if the server supports sending log messages to the client.
   */
  logging: D.optional(D.object({}).passthrough()),
  /**
   * Present if the server supports sending completions to the client.
   */
  completions: D.optional(D.object({}).passthrough()),
  /**
   * Present if the server offers any prompt templates.
   */
  prompts: D.optional(D.object({
    /**
     * Whether this server supports issuing notifications for changes to the prompt list.
     */
    listChanged: D.optional(D.boolean())
  }).passthrough()),
  /**
   * Present if the server offers any resources to read.
   */
  resources: D.optional(D.object({
    /**
     * Whether this server supports clients subscribing to resource updates.
     */
    subscribe: D.optional(D.boolean()),
    /**
     * Whether this server supports issuing notifications for changes to the resource list.
     */
    listChanged: D.optional(D.boolean())
  }).passthrough()),
  /**
   * Present if the server offers any tools to call.
   */
  tools: D.optional(D.object({
    /**
     * Whether this server supports issuing notifications for changes to the tool list.
     */
    listChanged: D.optional(D.boolean())
  }).passthrough())
}).passthrough(), Li = Je.extend({
  /**
   * The version of the Model Context Protocol that the server wants to use. This may not match the version that the client requested. If the client cannot support this version, it MUST disconnect.
   */
  protocolVersion: D.string(),
  capabilities: Bs,
  serverInfo: Oi,
  /**
   * Instructions describing how to use the server and its features.
   *
   * This can be used by clients to improve the LLM's understanding of available tools, resources, etc. It can be thought of like a "hint" to the model. For example, this information MAY be added to the system prompt.
   */
  instructions: D.optional(D.string())
}), Is = We.extend({
  method: D.literal("notifications/initialized")
}), Lr = Pe.extend({
  method: D.literal("ping")
}), Ns = D.object({
  /**
   * The progress thus far. This should increase every time progress is made, even if the total is unknown.
   */
  progress: D.number(),
  /**
   * Total number of items to process (or total progress required), if known.
   */
  total: D.optional(D.number())
}).passthrough(), Ur = We.extend({
  method: D.literal("notifications/progress"),
  params: Ot.merge(Ns).extend({
    /**
     * The progress token which was given in the initial request, used to associate this notification with the request that is proceeding.
     */
    progressToken: Bi
  })
}), er = Pe.extend({
  params: je.extend({
    /**
     * An opaque token representing the current pagination position.
     * If provided, the server should return results starting after this cursor.
     */
    cursor: D.optional(Ii)
  }).optional()
}), tr = Je.extend({
  /**
   * An opaque token representing the pagination position after the last returned result.
   * If present, there may be more results available.
   */
  nextCursor: D.optional(Ii)
}), Ui = D.object({
  /**
   * The URI of this resource.
   */
  uri: D.string(),
  /**
   * The MIME type of this resource, if known.
   */
  mimeType: D.optional(D.string())
}).passthrough(), ji = Ui.extend({
  /**
   * The text of the item. This must only be set if the item can actually be represented as text (not binary data).
   */
  text: D.string()
}), Ji = Ui.extend({
  /**
   * A base64-encoded string representing the binary data of the item.
   */
  blob: D.string().base64()
}), Rs = D.object({
  /**
   * The URI of this resource.
   */
  uri: D.string(),
  /**
   * A human-readable name for this resource.
   *
   * This can be used by clients to populate UI elements.
   */
  name: D.string(),
  /**
   * A description of what this resource represents.
   *
   * This can be used by clients to improve the LLM's understanding of available resources. It can be thought of like a "hint" to the model.
   */
  description: D.optional(D.string()),
  /**
   * The MIME type of this resource, if known.
   */
  mimeType: D.optional(D.string())
}).passthrough(), Ps = D.object({
  /**
   * A URI template (according to RFC 6570) that can be used to construct resource URIs.
   */
  uriTemplate: D.string(),
  /**
   * A human-readable name for the type of resource this template refers to.
   *
   * This can be used by clients to populate UI elements.
   */
  name: D.string(),
  /**
   * A description of what this template is for.
   *
   * This can be used by clients to improve the LLM's understanding of available resources. It can be thought of like a "hint" to the model.
   */
  description: D.optional(D.string()),
  /**
   * The MIME type for all resources that match this template. This should only be included if all resources matching this template have the same type.
   */
  mimeType: D.optional(D.string())
}).passthrough(), Ms = er.extend({
  method: D.literal("resources/list")
}), Xi = tr.extend({
  resources: D.array(Rs)
}), Os = er.extend({
  method: D.literal("resources/templates/list")
}), zi = tr.extend({
  resourceTemplates: D.array(Ps)
}), Ls = Pe.extend({
  method: D.literal("resources/read"),
  params: je.extend({
    /**
     * The URI of the resource to read. The URI can use any protocol; it is up to the server how to interpret it.
     */
    uri: D.string()
  })
}), $i = Je.extend({
  contents: D.array(D.union([ji, Ji]))
}), Us = We.extend({
  method: D.literal("notifications/resources/list_changed")
}), js = Pe.extend({
  method: D.literal("resources/subscribe"),
  params: je.extend({
    /**
     * The URI of the resource to subscribe to. The URI can use any protocol; it is up to the server how to interpret it.
     */
    uri: D.string()
  })
}), Js = Pe.extend({
  method: D.literal("resources/unsubscribe"),
  params: je.extend({
    /**
     * The URI of the resource to unsubscribe from.
     */
    uri: D.string()
  })
}), Xs = We.extend({
  method: D.literal("notifications/resources/updated"),
  params: Ot.extend({
    /**
     * The URI of the resource that has been updated. This might be a sub-resource of the one that the client actually subscribed to.
     */
    uri: D.string()
  })
}), zs = D.object({
  /**
   * The name of the argument.
   */
  name: D.string(),
  /**
   * A human-readable description of the argument.
   */
  description: D.optional(D.string()),
  /**
   * Whether this argument must be provided.
   */
  required: D.optional(D.boolean())
}).passthrough(), $s = D.object({
  /**
   * The name of the prompt or prompt template.
   */
  name: D.string(),
  /**
   * An optional description of what this prompt provides
   */
  description: D.optional(D.string()),
  /**
   * A list of arguments to use for templating the prompt.
   */
  arguments: D.optional(D.array(zs))
}).passthrough(), qs = er.extend({
  method: D.literal("prompts/list")
}), qi = tr.extend({
  prompts: D.array($s)
}), Zs = Pe.extend({
  method: D.literal("prompts/get"),
  params: je.extend({
    /**
     * The name of the prompt or prompt template.
     */
    name: D.string(),
    /**
     * Arguments to use for templating the prompt.
     */
    arguments: D.optional(D.record(D.string()))
  })
}), rr = D.object({
  type: D.literal("text"),
  /**
   * The text content of the message.
   */
  text: D.string()
}).passthrough(), ir = D.object({
  type: D.literal("image"),
  /**
   * The base64-encoded image data.
   */
  data: D.string().base64(),
  /**
   * The MIME type of the image. Different providers may support different image types.
   */
  mimeType: D.string()
}).passthrough(), nr = D.object({
  type: D.literal("audio"),
  /**
   * The base64-encoded audio data.
   */
  data: D.string().base64(),
  /**
   * The MIME type of the audio. Different providers may support different audio types.
   */
  mimeType: D.string()
}).passthrough(), Zi = D.object({
  type: D.literal("resource"),
  resource: D.union([ji, Ji])
}).passthrough(), Hs = D.object({
  role: D.enum(["user", "assistant"]),
  content: D.union([
    rr,
    ir,
    nr,
    Zi
  ])
}).passthrough(), Hi = Je.extend({
  /**
   * An optional description for the prompt.
   */
  description: D.optional(D.string()),
  messages: D.array(Hs)
}), Vs = We.extend({
  method: D.literal("notifications/prompts/list_changed")
}), Ks = D.object({
  /**
   * A human-readable title for the tool.
   */
  title: D.optional(D.string()),
  /**
   * If true, the tool does not modify its environment.
   *
   * Default: false
   */
  readOnlyHint: D.optional(D.boolean()),
  /**
   * If true, the tool may perform destructive updates to its environment.
   * If false, the tool performs only additive updates.
   *
   * (This property is meaningful only when `readOnlyHint == false`)
   *
   * Default: true
   */
  destructiveHint: D.optional(D.boolean()),
  /**
   * If true, calling the tool repeatedly with the same arguments
   * will have no additional effect on the its environment.
   *
   * (This property is meaningful only when `readOnlyHint == false`)
   *
   * Default: false
   */
  idempotentHint: D.optional(D.boolean()),
  /**
   * If true, this tool may interact with an "open world" of external
   * entities. If false, the tool's domain of interaction is closed.
   * For example, the world of a web search tool is open, whereas that
   * of a memory tool is not.
   *
   * Default: true
   */
  openWorldHint: D.optional(D.boolean())
}).passthrough(), Ws = D.object({
  /**
   * The name of the tool.
   */
  name: D.string(),
  /**
   * A human-readable description of the tool.
   */
  description: D.optional(D.string()),
  /**
   * A JSON Schema object defining the expected parameters for the tool.
   */
  inputSchema: D.object({
    type: D.literal("object"),
    properties: D.optional(D.object({}).passthrough())
  }).passthrough(),
  /**
   * Optional additional tool information.
   */
  annotations: D.optional(Ks)
}).passthrough(), Gs = er.extend({
  method: D.literal("tools/list")
}), Vi = tr.extend({
  tools: D.array(Ws)
}), jr = Je.extend({
  content: D.array(D.union([rr, ir, nr, Zi])),
  isError: D.boolean().default(!1).optional()
});
jr.or(Je.extend({
  toolResult: D.unknown()
}));
const Ys = Pe.extend({
  method: D.literal("tools/call"),
  params: je.extend({
    name: D.string(),
    arguments: D.optional(D.record(D.unknown()))
  })
}), Qs = We.extend({
  method: D.literal("notifications/tools/list_changed")
}), Ki = D.enum([
  "debug",
  "info",
  "notice",
  "warning",
  "error",
  "critical",
  "alert",
  "emergency"
]), ea = Pe.extend({
  method: D.literal("logging/setLevel"),
  params: je.extend({
    /**
     * The level of logging that the client wants to receive from the server. The server should send all logs at this level and higher (i.e., more severe) to the client as notifications/logging/message.
     */
    level: Ki
  })
}), ta = We.extend({
  method: D.literal("notifications/message"),
  params: Ot.extend({
    /**
     * The severity of this log message.
     */
    level: Ki,
    /**
     * An optional name of the logger issuing this message.
     */
    logger: D.optional(D.string()),
    /**
     * The data to be logged, such as a string message or an object. Any JSON serializable type is allowed here.
     */
    data: D.unknown()
  })
}), ra = D.object({
  /**
   * A hint for a model name.
   */
  name: D.string().optional()
}).passthrough(), ia = D.object({
  /**
   * Optional hints to use for model selection.
   */
  hints: D.optional(D.array(ra)),
  /**
   * How much to prioritize cost when selecting a model.
   */
  costPriority: D.optional(D.number().min(0).max(1)),
  /**
   * How much to prioritize sampling speed (latency) when selecting a model.
   */
  speedPriority: D.optional(D.number().min(0).max(1)),
  /**
   * How much to prioritize intelligence and capabilities when selecting a model.
   */
  intelligencePriority: D.optional(D.number().min(0).max(1))
}).passthrough(), na = D.object({
  role: D.enum(["user", "assistant"]),
  content: D.union([rr, ir, nr])
}).passthrough(), sa = Pe.extend({
  method: D.literal("sampling/createMessage"),
  params: je.extend({
    messages: D.array(na),
    /**
     * An optional system prompt the server wants to use for sampling. The client MAY modify or omit this prompt.
     */
    systemPrompt: D.optional(D.string()),
    /**
     * A request to include context from one or more MCP servers (including the caller), to be attached to the prompt. The client MAY ignore this request.
     */
    includeContext: D.optional(D.enum(["none", "thisServer", "allServers"])),
    temperature: D.optional(D.number()),
    /**
     * The maximum number of tokens to sample, as requested by the server. The client MAY choose to sample fewer tokens than requested.
     */
    maxTokens: D.number().int(),
    stopSequences: D.optional(D.array(D.string())),
    /**
     * Optional metadata to pass through to the LLM provider. The format of this metadata is provider-specific.
     */
    metadata: D.optional(D.object({}).passthrough()),
    /**
     * The server's preferences for which model to select.
     */
    modelPreferences: D.optional(ia)
  })
}), aa = Je.extend({
  /**
   * The name of the model that generated the message.
   */
  model: D.string(),
  /**
   * The reason why sampling stopped.
   */
  stopReason: D.optional(D.enum(["endTurn", "stopSequence", "maxTokens"]).or(D.string())),
  role: D.enum(["user", "assistant"]),
  content: D.discriminatedUnion("type", [
    rr,
    ir,
    nr
  ])
}), oa = D.object({
  type: D.literal("ref/resource"),
  /**
   * The URI or URI template of the resource.
   */
  uri: D.string()
}).passthrough(), ua = D.object({
  type: D.literal("ref/prompt"),
  /**
   * The name of the prompt or prompt template
   */
  name: D.string()
}).passthrough(), ca = Pe.extend({
  method: D.literal("completion/complete"),
  params: je.extend({
    ref: D.union([ua, oa]),
    /**
     * The argument's information
     */
    argument: D.object({
      /**
       * The name of the argument
       */
      name: D.string(),
      /**
       * The value of the argument to use for completion matching.
       */
      value: D.string()
    }).passthrough()
  })
}), Wi = Je.extend({
  completion: D.object({
    /**
     * An array of completion values. Must not exceed 100 items.
     */
    values: D.array(D.string()).max(100),
    /**
     * The total number of completion options available. This can exceed the number of values actually sent in the response.
     */
    total: D.optional(D.number().int()),
    /**
     * Indicates whether there are additional completion options beyond those provided in the current response, even if the exact total is unknown.
     */
    hasMore: D.optional(D.boolean())
  }).passthrough()
}), la = D.object({
  /**
   * The URI identifying the root. This *must* start with file:// for now.
   */
  uri: D.string().startsWith("file://"),
  /**
   * An optional name for the root.
   */
  name: D.optional(D.string())
}).passthrough(), ha = Pe.extend({
  method: D.literal("roots/list")
}), da = Je.extend({
  roots: D.array(la)
}), pa = We.extend({
  method: D.literal("notifications/roots/list_changed")
});
D.union([
  Lr,
  Ts,
  ca,
  ea,
  Zs,
  qs,
  Ms,
  Os,
  Ls,
  js,
  Js,
  Ys,
  Gs
]);
D.union([
  Or,
  Ur,
  Is,
  pa
]);
D.union([
  dt,
  aa,
  da
]);
D.union([
  Lr,
  sa,
  ha
]);
D.union([
  Or,
  Ur,
  ta,
  Xs,
  Us,
  Qs,
  Vs
]);
D.union([
  dt,
  Li,
  Wi,
  Hi,
  qi,
  Xi,
  zi,
  $i,
  jr,
  Vi
]);
class pt extends Error {
  constructor(e, r, i) {
    super(`MCP error ${e}: ${r}`), this.code = e, this.data = i, this.name = "McpError";
  }
}
const fa = 6e4;
class ma {
  constructor(e) {
    this._options = e, this._requestMessageId = 0, this._requestHandlers = /* @__PURE__ */ new Map(), this._requestHandlerAbortControllers = /* @__PURE__ */ new Map(), this._notificationHandlers = /* @__PURE__ */ new Map(), this._responseHandlers = /* @__PURE__ */ new Map(), this._progressHandlers = /* @__PURE__ */ new Map(), this._timeoutInfo = /* @__PURE__ */ new Map(), this.setNotificationHandler(Or, (r) => {
      const i = this._requestHandlerAbortControllers.get(r.params.requestId);
      i == null || i.abort(r.params.reason);
    }), this.setNotificationHandler(Ur, (r) => {
      this._onprogress(r);
    }), this.setRequestHandler(
      Lr,
      // Automatic pong by default.
      (r) => ({})
    );
  }
  _setupTimeout(e, r, i, u, a = !1) {
    this._timeoutInfo.set(e, {
      timeoutId: setTimeout(u, r),
      startTime: Date.now(),
      timeout: r,
      maxTotalTimeout: i,
      resetTimeoutOnProgress: a,
      onTimeout: u
    });
  }
  _resetTimeout(e) {
    const r = this._timeoutInfo.get(e);
    if (!r)
      return !1;
    const i = Date.now() - r.startTime;
    if (r.maxTotalTimeout && i >= r.maxTotalTimeout)
      throw this._timeoutInfo.delete(e), new pt(Qe.RequestTimeout, "Maximum total timeout exceeded", { maxTotalTimeout: r.maxTotalTimeout, totalElapsed: i });
    return clearTimeout(r.timeoutId), r.timeoutId = setTimeout(r.onTimeout, r.timeout), !0;
  }
  _cleanupTimeout(e) {
    const r = this._timeoutInfo.get(e);
    r && (clearTimeout(r.timeoutId), this._timeoutInfo.delete(e));
  }
  /**
   * Attaches to the given transport, starts it, and starts listening for messages.
   *
   * The Protocol object assumes ownership of the Transport, replacing any callbacks that have already been set, and expects that it is the only user of the Transport instance going forward.
   */
  async connect(e) {
    this._transport = e, this._transport.onclose = () => {
      this._onclose();
    }, this._transport.onerror = (r) => {
      this._onerror(r);
    }, this._transport.onmessage = (r, i) => {
      $r(r) || bs(r) ? this._onresponse(r) : As(r) ? this._onrequest(r, i) : Fs(r) ? this._onnotification(r) : this._onerror(new Error(`Unknown message type: ${JSON.stringify(r)}`));
    }, await this._transport.start();
  }
  _onclose() {
    var e;
    const r = this._responseHandlers;
    this._responseHandlers = /* @__PURE__ */ new Map(), this._progressHandlers.clear(), this._transport = void 0, (e = this.onclose) === null || e === void 0 || e.call(this);
    const i = new pt(Qe.ConnectionClosed, "Connection closed");
    for (const u of r.values())
      u(i);
  }
  _onerror(e) {
    var r;
    (r = this.onerror) === null || r === void 0 || r.call(this, e);
  }
  _onnotification(e) {
    var r;
    const i = (r = this._notificationHandlers.get(e.method)) !== null && r !== void 0 ? r : this.fallbackNotificationHandler;
    i !== void 0 && Promise.resolve().then(() => i(e)).catch((u) => this._onerror(new Error(`Uncaught error in notification handler: ${u}`)));
  }
  _onrequest(e, r) {
    var i, u, a, p;
    const h = (i = this._requestHandlers.get(e.method)) !== null && i !== void 0 ? i : this.fallbackRequestHandler;
    if (h === void 0) {
      (u = this._transport) === null || u === void 0 || u.send({
        jsonrpc: "2.0",
        id: e.id,
        error: {
          code: Qe.MethodNotFound,
          message: "Method not found"
        }
      }).catch((g) => this._onerror(new Error(`Failed to send an error response: ${g}`)));
      return;
    }
    const m = new AbortController();
    this._requestHandlerAbortControllers.set(e.id, m);
    const w = {
      signal: m.signal,
      sessionId: (a = this._transport) === null || a === void 0 ? void 0 : a.sessionId,
      _meta: (p = e.params) === null || p === void 0 ? void 0 : p._meta,
      sendNotification: (g) => this.notification(g, { relatedRequestId: e.id }),
      sendRequest: (g, F, v) => this.request(g, F, { ...v, relatedRequestId: e.id }),
      authInfo: r == null ? void 0 : r.authInfo,
      requestId: e.id
    };
    Promise.resolve().then(() => h(e, w)).then((g) => {
      var F;
      if (!m.signal.aborted)
        return (F = this._transport) === null || F === void 0 ? void 0 : F.send({
          result: g,
          jsonrpc: "2.0",
          id: e.id
        });
    }, (g) => {
      var F, v;
      if (!m.signal.aborted)
        return (F = this._transport) === null || F === void 0 ? void 0 : F.send({
          jsonrpc: "2.0",
          id: e.id,
          error: {
            code: Number.isSafeInteger(g.code) ? g.code : Qe.InternalError,
            message: (v = g.message) !== null && v !== void 0 ? v : "Internal error"
          }
        });
    }).catch((g) => this._onerror(new Error(`Failed to send response: ${g}`))).finally(() => {
      this._requestHandlerAbortControllers.delete(e.id);
    });
  }
  _onprogress(e) {
    const { progressToken: r, ...i } = e.params, u = Number(r), a = this._progressHandlers.get(u);
    if (!a) {
      this._onerror(new Error(`Received a progress notification for an unknown token: ${JSON.stringify(e)}`));
      return;
    }
    const p = this._responseHandlers.get(u), h = this._timeoutInfo.get(u);
    if (h && p && h.resetTimeoutOnProgress)
      try {
        this._resetTimeout(u);
      } catch (m) {
        p(m);
        return;
      }
    a(i);
  }
  _onresponse(e) {
    const r = Number(e.id), i = this._responseHandlers.get(r);
    if (i === void 0) {
      this._onerror(new Error(`Received a response for an unknown message ID: ${JSON.stringify(e)}`));
      return;
    }
    if (this._responseHandlers.delete(r), this._progressHandlers.delete(r), this._cleanupTimeout(r), $r(e))
      i(e);
    else {
      const u = new pt(e.error.code, e.error.message, e.error.data);
      i(u);
    }
  }
  get transport() {
    return this._transport;
  }
  /**
   * Closes the connection.
   */
  async close() {
    var e;
    await ((e = this._transport) === null || e === void 0 ? void 0 : e.close());
  }
  /**
   * Sends a request and wait for a response.
   *
   * Do not use this method to emit notifications! Use notification() instead.
   */
  request(e, r, i) {
    const { relatedRequestId: u, resumptionToken: a, onresumptiontoken: p } = i ?? {};
    return new Promise((h, m) => {
      var w, g, F, v, E;
      if (!this._transport) {
        m(new Error("Not connected"));
        return;
      }
      ((w = this._options) === null || w === void 0 ? void 0 : w.enforceStrictCapabilities) === !0 && this.assertCapabilityForMethod(e.method), (g = i == null ? void 0 : i.signal) === null || g === void 0 || g.throwIfAborted();
      const x = this._requestMessageId++, t = {
        ...e,
        jsonrpc: "2.0",
        id: x
      };
      i != null && i.onprogress && (this._progressHandlers.set(x, i.onprogress), t.params = {
        ...e.params,
        _meta: { progressToken: x }
      });
      const n = (f) => {
        var S;
        this._responseHandlers.delete(x), this._progressHandlers.delete(x), this._cleanupTimeout(x), (S = this._transport) === null || S === void 0 || S.send({
          jsonrpc: "2.0",
          method: "notifications/cancelled",
          params: {
            requestId: x,
            reason: String(f)
          }
        }, { relatedRequestId: u, resumptionToken: a, onresumptiontoken: p }).catch((A) => this._onerror(new Error(`Failed to send cancellation: ${A}`))), m(f);
      };
      this._responseHandlers.set(x, (f) => {
        var S;
        if (!(!((S = i == null ? void 0 : i.signal) === null || S === void 0) && S.aborted)) {
          if (f instanceof Error)
            return m(f);
          try {
            const A = r.parse(f.result);
            h(A);
          } catch (A) {
            m(A);
          }
        }
      }), (F = i == null ? void 0 : i.signal) === null || F === void 0 || F.addEventListener("abort", () => {
        var f;
        n((f = i == null ? void 0 : i.signal) === null || f === void 0 ? void 0 : f.reason);
      });
      const s = (v = i == null ? void 0 : i.timeout) !== null && v !== void 0 ? v : fa, d = () => n(new pt(Qe.RequestTimeout, "Request timed out", { timeout: s }));
      this._setupTimeout(x, s, i == null ? void 0 : i.maxTotalTimeout, d, (E = i == null ? void 0 : i.resetTimeoutOnProgress) !== null && E !== void 0 ? E : !1), this._transport.send(t, { relatedRequestId: u, resumptionToken: a, onresumptiontoken: p }).catch((f) => {
        this._cleanupTimeout(x), m(f);
      });
    });
  }
  /**
   * Emits a notification, which is a one-way message that does not expect a response.
   */
  async notification(e, r) {
    if (!this._transport)
      throw new Error("Not connected");
    this.assertNotificationCapability(e.method);
    const i = {
      ...e,
      jsonrpc: "2.0"
    };
    await this._transport.send(i, r);
  }
  /**
   * Registers a handler to invoke when this protocol object receives a request with the given method.
   *
   * Note that this will replace any previous request handler for the same method.
   */
  setRequestHandler(e, r) {
    const i = e.shape.method.value;
    this.assertRequestHandlerCapability(i), this._requestHandlers.set(i, (u, a) => Promise.resolve(r(e.parse(u), a)));
  }
  /**
   * Removes the request handler for the given method.
   */
  removeRequestHandler(e) {
    this._requestHandlers.delete(e);
  }
  /**
   * Asserts that a request handler has not already been set for the given method, in preparation for a new one being automatically installed.
   */
  assertCanSetRequestHandler(e) {
    if (this._requestHandlers.has(e))
      throw new Error(`A request handler for ${e} already exists, which would be overridden`);
  }
  /**
   * Registers a handler to invoke when this protocol object receives a notification with the given method.
   *
   * Note that this will replace any previous notification handler for the same method.
   */
  setNotificationHandler(e, r) {
    this._notificationHandlers.set(e.shape.method.value, (i) => Promise.resolve(r(e.parse(i))));
  }
  /**
   * Removes the notification handler for the given method.
   */
  removeNotificationHandler(e) {
    this._notificationHandlers.delete(e);
  }
}
function xa(c, e) {
  return Object.entries(e).reduce((r, [i, u]) => (u && typeof u == "object" ? r[i] = r[i] ? { ...r[i], ...u } : u : r[i] = u, r), { ...c });
}
class ya extends ma {
  /**
   * Initializes this client with the given name and version information.
   */
  constructor(e, r) {
    var i;
    super(r), this._clientInfo = e, this._capabilities = (i = r == null ? void 0 : r.capabilities) !== null && i !== void 0 ? i : {};
  }
  /**
   * Registers new capabilities. This can only be called before connecting to a transport.
   *
   * The new capabilities will be merged with any existing capabilities previously given (e.g., at initialization).
   */
  registerCapabilities(e) {
    if (this.transport)
      throw new Error("Cannot register capabilities after connecting to transport");
    this._capabilities = xa(this._capabilities, e);
  }
  assertCapability(e, r) {
    var i;
    if (!(!((i = this._serverCapabilities) === null || i === void 0) && i[e]))
      throw new Error(`Server does not support ${e} (required for ${r})`);
  }
  async connect(e, r) {
    if (await super.connect(e), e.sessionId === void 0)
      try {
        const i = await this.request({
          method: "initialize",
          params: {
            protocolVersion: Ti,
            capabilities: this._capabilities,
            clientInfo: this._clientInfo
          }
        }, Li, r);
        if (i === void 0)
          throw new Error(`Server sent invalid initialize result: ${i}`);
        if (!Ss.includes(i.protocolVersion))
          throw new Error(`Server's protocol version is not supported: ${i.protocolVersion}`);
        this._serverCapabilities = i.capabilities, this._serverVersion = i.serverInfo, this._instructions = i.instructions, await this.notification({
          method: "notifications/initialized"
        });
      } catch (i) {
        throw this.close(), i;
      }
  }
  /**
   * After initialization has completed, this will be populated with the server's reported capabilities.
   */
  getServerCapabilities() {
    return this._serverCapabilities;
  }
  /**
   * After initialization has completed, this will be populated with information about the server's name and version.
   */
  getServerVersion() {
    return this._serverVersion;
  }
  /**
   * After initialization has completed, this may be populated with information about the server's instructions.
   */
  getInstructions() {
    return this._instructions;
  }
  assertCapabilityForMethod(e) {
    var r, i, u, a, p;
    switch (e) {
      case "logging/setLevel":
        if (!(!((r = this._serverCapabilities) === null || r === void 0) && r.logging))
          throw new Error(`Server does not support logging (required for ${e})`);
        break;
      case "prompts/get":
      case "prompts/list":
        if (!(!((i = this._serverCapabilities) === null || i === void 0) && i.prompts))
          throw new Error(`Server does not support prompts (required for ${e})`);
        break;
      case "resources/list":
      case "resources/templates/list":
      case "resources/read":
      case "resources/subscribe":
      case "resources/unsubscribe":
        if (!(!((u = this._serverCapabilities) === null || u === void 0) && u.resources))
          throw new Error(`Server does not support resources (required for ${e})`);
        if (e === "resources/subscribe" && !this._serverCapabilities.resources.subscribe)
          throw new Error(`Server does not support resource subscriptions (required for ${e})`);
        break;
      case "tools/call":
      case "tools/list":
        if (!(!((a = this._serverCapabilities) === null || a === void 0) && a.tools))
          throw new Error(`Server does not support tools (required for ${e})`);
        break;
      case "completion/complete":
        if (!(!((p = this._serverCapabilities) === null || p === void 0) && p.completions))
          throw new Error(`Server does not support completions (required for ${e})`);
        break;
    }
  }
  assertNotificationCapability(e) {
    var r;
    switch (e) {
      case "notifications/roots/list_changed":
        if (!(!((r = this._capabilities.roots) === null || r === void 0) && r.listChanged))
          throw new Error(`Client does not support roots list changed notifications (required for ${e})`);
        break;
    }
  }
  assertRequestHandlerCapability(e) {
    switch (e) {
      case "sampling/createMessage":
        if (!this._capabilities.sampling)
          throw new Error(`Client does not support sampling capability (required for ${e})`);
        break;
      case "roots/list":
        if (!this._capabilities.roots)
          throw new Error(`Client does not support roots capability (required for ${e})`);
        break;
    }
  }
  async ping(e) {
    return this.request({ method: "ping" }, dt, e);
  }
  async complete(e, r) {
    return this.request({ method: "completion/complete", params: e }, Wi, r);
  }
  async setLoggingLevel(e, r) {
    return this.request({ method: "logging/setLevel", params: { level: e } }, dt, r);
  }
  async getPrompt(e, r) {
    return this.request({ method: "prompts/get", params: e }, Hi, r);
  }
  async listPrompts(e, r) {
    return this.request({ method: "prompts/list", params: e }, qi, r);
  }
  async listResources(e, r) {
    return this.request({ method: "resources/list", params: e }, Xi, r);
  }
  async listResourceTemplates(e, r) {
    return this.request({ method: "resources/templates/list", params: e }, zi, r);
  }
  async readResource(e, r) {
    return this.request({ method: "resources/read", params: e }, $i, r);
  }
  async subscribeResource(e, r) {
    return this.request({ method: "resources/subscribe", params: e }, dt, r);
  }
  async unsubscribeResource(e, r) {
    return this.request({ method: "resources/unsubscribe", params: e }, dt, r);
  }
  async callTool(e, r = jr, i) {
    return this.request({ method: "tools/call", params: e }, r, i);
  }
  async listTools(e, r) {
    return this.request({ method: "tools/list", params: e }, Vi, r);
  }
  async sendRootsListChanged() {
    return this.notification({ method: "notifications/roots/list_changed" });
  }
}
var st = { exports: {} }, lr, qr;
function va() {
  if (qr) return lr;
  qr = 1, lr = i, i.sync = u;
  var c = Pr;
  function e(a, p) {
    var h = p.pathExt !== void 0 ? p.pathExt : process.env.PATHEXT;
    if (!h || (h = h.split(";"), h.indexOf("") !== -1))
      return !0;
    for (var m = 0; m < h.length; m++) {
      var w = h[m].toLowerCase();
      if (w && a.substr(-w.length).toLowerCase() === w)
        return !0;
    }
    return !1;
  }
  function r(a, p, h) {
    return !a.isSymbolicLink() && !a.isFile() ? !1 : e(p, h);
  }
  function i(a, p, h) {
    c.stat(a, function(m, w) {
      h(m, m ? !1 : r(w, a, p));
    });
  }
  function u(a, p) {
    return r(c.statSync(a), a, p);
  }
  return lr;
}
var hr, Zr;
function ga() {
  if (Zr) return hr;
  Zr = 1, hr = e, e.sync = r;
  var c = Pr;
  function e(a, p, h) {
    c.stat(a, function(m, w) {
      h(m, m ? !1 : i(w, p));
    });
  }
  function r(a, p) {
    return i(c.statSync(a), p);
  }
  function i(a, p) {
    return a.isFile() && u(a, p);
  }
  function u(a, p) {
    var h = a.mode, m = a.uid, w = a.gid, g = p.uid !== void 0 ? p.uid : process.getuid && process.getuid(), F = p.gid !== void 0 ? p.gid : process.getgid && process.getgid(), v = parseInt("100", 8), E = parseInt("010", 8), x = parseInt("001", 8), t = v | E, n = h & x || h & E && w === F || h & v && m === g || h & t && g === 0;
    return n;
  }
  return hr;
}
var dr, Hr;
function Ea() {
  if (Hr) return dr;
  Hr = 1;
  var c;
  process.platform === "win32" || on.TESTING_WINDOWS ? c = va() : c = ga(), dr = e, e.sync = r;
  function e(i, u, a) {
    if (typeof u == "function" && (a = u, u = {}), !a) {
      if (typeof Promise != "function")
        throw new TypeError("callback not provided");
      return new Promise(function(p, h) {
        e(i, u || {}, function(m, w) {
          m ? h(m) : p(w);
        });
      });
    }
    c(i, u || {}, function(p, h) {
      p && (p.code === "EACCES" || u && u.ignoreErrors) && (p = null, h = !1), a(p, h);
    });
  }
  function r(i, u) {
    try {
      return c.sync(i, u || {});
    } catch (a) {
      if (u && u.ignoreErrors || a.code === "EACCES")
        return !1;
      throw a;
    }
  }
  return dr;
}
var pr, Vr;
function Da() {
  if (Vr) return pr;
  Vr = 1;
  const c = process.platform === "win32" || process.env.OSTYPE === "cygwin" || process.env.OSTYPE === "msys", e = Rr, r = c ? ";" : ":", i = Ea(), u = (m) => Object.assign(new Error(`not found: ${m}`), { code: "ENOENT" }), a = (m, w) => {
    const g = w.colon || r, F = m.match(/\//) || c && m.match(/\\/) ? [""] : [
      // windows always checks the cwd first
      ...c ? [process.cwd()] : [],
      ...(w.path || process.env.PATH || /* istanbul ignore next: very unusual */
      "").split(g)
    ], v = c ? w.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM" : "", E = c ? v.split(g) : [""];
    return c && m.indexOf(".") !== -1 && E[0] !== "" && E.unshift(""), {
      pathEnv: F,
      pathExt: E,
      pathExtExe: v
    };
  }, p = (m, w, g) => {
    typeof w == "function" && (g = w, w = {}), w || (w = {});
    const { pathEnv: F, pathExt: v, pathExtExe: E } = a(m, w), x = [], t = (s) => new Promise((d, f) => {
      if (s === F.length)
        return w.all && x.length ? d(x) : f(u(m));
      const S = F[s], A = /^".*"$/.test(S) ? S.slice(1, -1) : S, b = e.join(A, m), k = !A && /^\.[\\\/]/.test(m) ? m.slice(0, 2) + b : b;
      d(n(k, s, 0));
    }), n = (s, d, f) => new Promise((S, A) => {
      if (f === v.length)
        return S(t(d + 1));
      const b = v[f];
      i(s + b, { pathExt: E }, (k, T) => {
        if (!k && T)
          if (w.all)
            x.push(s + b);
          else
            return S(s + b);
        return S(n(s, d, f + 1));
      });
    });
    return g ? t(0).then((s) => g(null, s), g) : t(0);
  }, h = (m, w) => {
    w = w || {};
    const { pathEnv: g, pathExt: F, pathExtExe: v } = a(m, w), E = [];
    for (let x = 0; x < g.length; x++) {
      const t = g[x], n = /^".*"$/.test(t) ? t.slice(1, -1) : t, s = e.join(n, m), d = !n && /^\.[\\\/]/.test(m) ? m.slice(0, 2) + s : s;
      for (let f = 0; f < F.length; f++) {
        const S = d + F[f];
        try {
          if (i.sync(S, { pathExt: v }))
            if (w.all)
              E.push(S);
            else
              return S;
        } catch {
        }
      }
    }
    if (w.all && E.length)
      return E;
    if (w.nothrow)
      return null;
    throw u(m);
  };
  return pr = p, p.sync = h, pr;
}
var Lt = { exports: {} }, Kr;
function Ca() {
  if (Kr) return Lt.exports;
  Kr = 1;
  const c = (e = {}) => {
    const r = e.env || process.env;
    return (e.platform || process.platform) !== "win32" ? "PATH" : Object.keys(r).reverse().find((u) => u.toUpperCase() === "PATH") || "Path";
  };
  return Lt.exports = c, Lt.exports.default = c, Lt.exports;
}
var fr, Wr;
function Sa() {
  if (Wr) return fr;
  Wr = 1;
  const c = Rr, e = Da(), r = Ca();
  function i(a, p) {
    const h = a.options.env || process.env, m = process.cwd(), w = a.options.cwd != null, g = w && process.chdir !== void 0 && !process.chdir.disabled;
    if (g)
      try {
        process.chdir(a.options.cwd);
      } catch {
      }
    let F;
    try {
      F = e.sync(a.command, {
        path: h[r({ env: h })],
        pathExt: p ? c.delimiter : void 0
      });
    } catch {
    } finally {
      g && process.chdir(m);
    }
    return F && (F = c.resolve(w ? a.options.cwd : "", F)), F;
  }
  function u(a) {
    return i(a) || i(a, !0);
  }
  return fr = u, fr;
}
var Ut = {}, Gr;
function wa() {
  if (Gr) return Ut;
  Gr = 1;
  const c = /([()\][%!^"`<>&|;, *?])/g;
  function e(i) {
    return i = i.replace(c, "^$1"), i;
  }
  function r(i, u) {
    return i = `${i}`, i = i.replace(/(?=(\\+?)?)\1"/g, '$1$1\\"'), i = i.replace(/(?=(\\+?)?)\1$/, "$1$1"), i = `"${i}"`, i = i.replace(c, "^$1"), u && (i = i.replace(c, "^$1")), i;
  }
  return Ut.command = e, Ut.argument = r, Ut;
}
var mr, Yr;
function Aa() {
  return Yr || (Yr = 1, mr = /^#!(.*)/), mr;
}
var xr, Qr;
function Fa() {
  if (Qr) return xr;
  Qr = 1;
  const c = Aa();
  return xr = (e = "") => {
    const r = e.match(c);
    if (!r)
      return null;
    const [i, u] = r[0].replace(/#! ?/, "").split(" "), a = i.split("/").pop();
    return a === "env" ? u : u ? `${a} ${u}` : a;
  }, xr;
}
var yr, ei;
function ba() {
  if (ei) return yr;
  ei = 1;
  const c = Pr, e = Fa();
  function r(i) {
    const a = Buffer.alloc(150);
    let p;
    try {
      p = c.openSync(i, "r"), c.readSync(p, a, 0, 150, 0), c.closeSync(p);
    } catch {
    }
    return e(a.toString());
  }
  return yr = r, yr;
}
var vr, ti;
function ka() {
  if (ti) return vr;
  ti = 1;
  const c = Rr, e = Sa(), r = wa(), i = ba(), u = process.platform === "win32", a = /\.(?:com|exe)$/i, p = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
  function h(g) {
    g.file = e(g);
    const F = g.file && i(g.file);
    return F ? (g.args.unshift(g.file), g.command = F, e(g)) : g.file;
  }
  function m(g) {
    if (!u)
      return g;
    const F = h(g), v = !a.test(F);
    if (g.options.forceShell || v) {
      const E = p.test(F);
      g.command = c.normalize(g.command), g.command = r.command(g.command), g.args = g.args.map((t) => r.argument(t, E));
      const x = [g.command].concat(g.args).join(" ");
      g.args = ["/d", "/s", "/c", `"${x}"`], g.command = process.env.comspec || "cmd.exe", g.options.windowsVerbatimArguments = !0;
    }
    return g;
  }
  function w(g, F, v) {
    F && !Array.isArray(F) && (v = F, F = null), F = F ? F.slice(0) : [], v = Object.assign({}, v);
    const E = {
      command: g,
      args: F,
      options: v,
      file: void 0,
      original: {
        command: g,
        args: F
      }
    };
    return v.shell ? E : m(E);
  }
  return vr = w, vr;
}
var gr, ri;
function _a() {
  if (ri) return gr;
  ri = 1;
  const c = process.platform === "win32";
  function e(a, p) {
    return Object.assign(new Error(`${p} ${a.command} ENOENT`), {
      code: "ENOENT",
      errno: "ENOENT",
      syscall: `${p} ${a.command}`,
      path: a.command,
      spawnargs: a.args
    });
  }
  function r(a, p) {
    if (!c)
      return;
    const h = a.emit;
    a.emit = function(m, w) {
      if (m === "exit") {
        const g = i(w, p);
        if (g)
          return h.call(a, "error", g);
      }
      return h.apply(a, arguments);
    };
  }
  function i(a, p) {
    return c && a === 1 && !p.file ? e(p.original, "spawn") : null;
  }
  function u(a, p) {
    return c && a === 1 && !p.file ? e(p.original, "spawnSync") : null;
  }
  return gr = {
    hookChildProcess: r,
    verifyENOENT: i,
    verifyENOENTSync: u,
    notFoundError: e
  }, gr;
}
var ii;
function Ta() {
  if (ii) return st.exports;
  ii = 1;
  const c = cn, e = ka(), r = _a();
  function i(a, p, h) {
    const m = e(a, p, h), w = c.spawn(m.command, m.args, m.options);
    return r.hookChildProcess(w, m), w;
  }
  function u(a, p, h) {
    const m = e(a, p, h), w = c.spawnSync(m.command, m.args, m.options);
    return w.error = w.error || r.verifyENOENTSync(w.status, m), w;
  }
  return st.exports = i, st.exports.spawn = i, st.exports.sync = u, st.exports._parse = e, st.exports._enoent = r, st.exports;
}
var Ba = Ta();
const Ia = /* @__PURE__ */ un(Ba);
class Na {
  append(e) {
    this._buffer = this._buffer ? Buffer.concat([this._buffer, e]) : e;
  }
  readMessage() {
    if (!this._buffer)
      return null;
    const e = this._buffer.indexOf(`
`);
    if (e === -1)
      return null;
    const r = this._buffer.toString("utf8", 0, e).replace(/\r$/, "");
    return this._buffer = this._buffer.subarray(e + 1), Ra(r);
  }
  clear() {
    this._buffer = void 0;
  }
}
function Ra(c) {
  return ks.parse(JSON.parse(c));
}
function Pa(c) {
  return JSON.stringify(c) + `
`;
}
const Ma = Wt.platform === "win32" ? [
  "APPDATA",
  "HOMEDRIVE",
  "HOMEPATH",
  "LOCALAPPDATA",
  "PATH",
  "PROCESSOR_ARCHITECTURE",
  "SYSTEMDRIVE",
  "SYSTEMROOT",
  "TEMP",
  "USERNAME",
  "USERPROFILE"
] : (
  /* list inspired by the default env inheritance of sudo */
  ["HOME", "LOGNAME", "PATH", "SHELL", "TERM", "USER"]
);
function Gi() {
  const c = {};
  for (const e of Ma) {
    const r = Wt.env[e];
    r !== void 0 && (r.startsWith("()") || (c[e] = r));
  }
  return c;
}
class Oa {
  constructor(e) {
    this._abortController = new AbortController(), this._readBuffer = new Na(), this._stderrStream = null, this._serverParams = e, (e.stderr === "pipe" || e.stderr === "overlapped") && (this._stderrStream = new ln());
  }
  /**
   * Starts the server process and prepares to communicate with it.
   */
  async start() {
    if (this._process)
      throw new Error("StdioClientTransport already started! If using Client class, note that connect() calls start() automatically.");
    return new Promise((e, r) => {
      var i, u, a, p, h, m;
      this._process = Ia(this._serverParams.command, (i = this._serverParams.args) !== null && i !== void 0 ? i : [], {
        env: (u = this._serverParams.env) !== null && u !== void 0 ? u : Gi(),
        stdio: ["pipe", "pipe", (a = this._serverParams.stderr) !== null && a !== void 0 ? a : "inherit"],
        shell: !1,
        signal: this._abortController.signal,
        windowsHide: Wt.platform === "win32" && La(),
        cwd: this._serverParams.cwd
      }), this._process.on("error", (w) => {
        var g, F;
        if (w.name === "AbortError") {
          (g = this.onclose) === null || g === void 0 || g.call(this);
          return;
        }
        r(w), (F = this.onerror) === null || F === void 0 || F.call(this, w);
      }), this._process.on("spawn", () => {
        e();
      }), this._process.on("close", (w) => {
        var g;
        this._process = void 0, (g = this.onclose) === null || g === void 0 || g.call(this);
      }), (p = this._process.stdin) === null || p === void 0 || p.on("error", (w) => {
        var g;
        (g = this.onerror) === null || g === void 0 || g.call(this, w);
      }), (h = this._process.stdout) === null || h === void 0 || h.on("data", (w) => {
        this._readBuffer.append(w), this.processReadBuffer();
      }), (m = this._process.stdout) === null || m === void 0 || m.on("error", (w) => {
        var g;
        (g = this.onerror) === null || g === void 0 || g.call(this, w);
      }), this._stderrStream && this._process.stderr && this._process.stderr.pipe(this._stderrStream);
    });
  }
  /**
   * The stderr stream of the child process, if `StdioServerParameters.stderr` was set to "pipe" or "overlapped".
   *
   * If stderr piping was requested, a PassThrough stream is returned _immediately_, allowing callers to
   * attach listeners before the start method is invoked. This prevents loss of any early
   * error output emitted by the child process.
   */
  get stderr() {
    var e, r;
    return this._stderrStream ? this._stderrStream : (r = (e = this._process) === null || e === void 0 ? void 0 : e.stderr) !== null && r !== void 0 ? r : null;
  }
  processReadBuffer() {
    for (var e, r; ; )
      try {
        const i = this._readBuffer.readMessage();
        if (i === null)
          break;
        (e = this.onmessage) === null || e === void 0 || e.call(this, i);
      } catch (i) {
        (r = this.onerror) === null || r === void 0 || r.call(this, i);
      }
  }
  async close() {
    this._abortController.abort(), this._process = void 0, this._readBuffer.clear();
  }
  send(e) {
    return new Promise((r) => {
      var i;
      if (!(!((i = this._process) === null || i === void 0) && i.stdin))
        throw new Error("Not connected");
      const u = Pa(e);
      this._process.stdin.write(u) ? r() : this._process.stdin.once("drain", r);
    });
  }
}
function La() {
  return "type" in Wt;
}
const Er = 64;
function Ua(c, e, r) {
  let i = `mcp_${c}_${e}`;
  if (i = i.replace(/[\s-]/g, "_"), i = i.replace(/[^a-zA-Z0-9_]/g, ""), i.length > Er && (i = i.slice(0, Er)), r.has(i)) {
    const u = `_${Math.floor(100 * Math.random())}`;
    i = i.slice(0, Er - u.length) + u;
  }
  return i;
}
class ja {
  constructor(e, r, i) {
    Me(this, "mcpClient");
    Me(this, "transport");
    Me(this, "serverName");
    Me(this, "isConnected", !1);
    Me(this, "connectPromise", null);
    if (this.options = e, e.disabled)
      throw new Error("Cannot connect to disabled server");
    this.serverName = r, this.transport = this.constructTransport(e, i), this.mcpClient = new ya(
      {
        name: "kiro",
        version: "0.0.0"
      },
      {
        capabilities: {}
      }
    );
  }
  constructTransport(e, r) {
    const i = {
      ...Gi(),
      ...e.env
    };
    if (!e.command)
      throw new Error("Cannot connect to server without a command set");
    const u = new Oa({
      command: e.command,
      args: e.args,
      env: i,
      stderr: "overlapped",
      cwd: r
    });
    return u.stderr !== null && u.stderr.on("data", (a) => {
      de.warn(`Log from MCP Server: ${a}`, this.serverName);
    }), u;
  }
  async connectClient(e) {
    if (!this.isConnected) {
      if (this.connectPromise) {
        await this.connectPromise;
        return;
      }
      this.connectPromise = this.mcpClient.connect(this.transport, { signal: e });
      try {
        await this.connectPromise, this.isConnected = !0;
      } finally {
        this.connectPromise = null;
      }
    }
  }
  /**
   * Closes the connection, clearing resources. Log but not throw on error.
   */
  async close() {
    try {
      await this.mcpClient.close(), de.info("MCP connection closed successfully", this.serverName);
    } catch (e) {
      de.warn(
        `Error closing MCP connection: ${e instanceof Error ? e.message : String(e)}`,
        this.serverName
      );
    }
  }
  /**
   * Connects to MCP server and initializes available tools and resources.
   */
  async syncResourcesAndTools(e, r) {
    try {
      await this.connectClient(r);
    } catch (p) {
      const h = p instanceof Error ? p.message : String(p);
      throw de.error(`Failed to connect to MCP server: ${h}`, e), p;
    }
    const i = /* @__PURE__ */ new Set(), u = [];
    let a;
    try {
      const p = this.mcpClient.getServerCapabilities();
      if (p != null && p.tools)
        try {
          const { tools: h } = await this.mcpClient.listTools({}, { signal: r });
          a = h.map((w) => {
            const g = Ua(e, w.name, i);
            return i.add(g), {
              sanitizedUniqueName: g,
              serverName: e,
              toolName: w.name,
              description: w.description,
              inputSchema: w.inputSchema,
              requireConsent: !0
              // caller updates with configured autoApproved tools
            };
          });
          const m = h.map((w) => ({
            serverName: e,
            type: "tool",
            name: w.name,
            description: w.description || "",
            uri: w.name
          }));
          u.push(...m);
        } catch (h) {
          if (h instanceof pt && h.code === Qe.MethodNotFound.valueOf())
            de.warn("MCP server does not support listing tools. Skipping...", e);
          else
            throw h;
        }
      if (p != null && p.resources)
        try {
          const { resources: h } = await this.mcpClient.listResources({}, { signal: r }), m = h.map((w) => ({
            serverName: e,
            type: "resource",
            name: w.name || "",
            description: w.description || "",
            uri: w.uri || ""
          }));
          u.push(...m);
        } catch (h) {
          if (h instanceof pt && h.code === Qe.MethodNotFound.valueOf())
            de.warn("MCP server does not support listing resources. Skipping...", e);
          else
            throw h;
        }
      return {
        tools: a,
        contextReferences: u
      };
    } catch (p) {
      const h = p instanceof Error ? p.message : String(p);
      throw de.error(`Error getting tools and resources from MCP server: ${h}`, e), p;
    }
  }
}
const Fe = class Fe {
  constructor() {
    Me(this, "metricReporter");
    // Track connection states with different statuses
    Me(this, "connectionStates");
    this.connectionStates = /* @__PURE__ */ new Map(), this.metricReporter = new hn(dn.Application, "mcp"), this.metricReporter.periodicallyCaptureMetrics(() => this.metrics());
  }
  /**
   * Get MCPManagerSingleton instance.
   */
  static getInstance() {
    return Fe.instance || (Fe.instance = new Fe()), Fe.instance;
  }
  /**
   * Sets configured tools for an MCP server connection.
   */
  static setConfiguredTools(e, r) {
    if (!r) {
      this.configuredMCPTools.delete(e);
      return;
    }
    this.configuredMCPTools.set(e, r);
  }
  /**
   * Gets configured tools for all MCP server connections.
   * Returns immediately with the currently available tools.
   */
  static getConfiguredTools() {
    return Array.from(this.configuredMCPTools.values()).flatMap((e) => e);
  }
  /**
   * Sets context references for an MCP server connection.
   */
  static setContextReferences(e, r) {
    if (!r) {
      this.mcpContextReferences.delete(e);
      return;
    }
    this.mcpContextReferences.set(e, r);
  }
  /**
   * Gets context references for all MCP server connections.
   * Returns immediately with the currently available context references.
   */
  static getContextReferences() {
    return Array.from(this.mcpContextReferences.values()).flatMap((e) => e);
  }
  /**
   * Returns the connection states for MCP connections.
   */
  getConnectionStates() {
    return Array.from(this.connectionStates.values());
  }
  setConnectionState(e, r) {
    r ? this.connectionStates.set(e, r) : this.connectionStates.delete(e), Ct.commands.executeCommand("kiroAgent.views.mcpServerStatus.refresh");
  }
  /**
   * Register an MCP server and immediately start connecting to it in the background.
   * Avoids duplicate connection attempts for the same server
   */
  registerServer(e, r, i, u, a, p) {
    const h = this.connectionStates.get(e);
    if (h && (h.status === "connecting" || h.status === "connected")) {
      de.info(`MCP server is already ${h.status}`, e);
      return;
    }
    de.info("Registering MCP server and starting connection", e);
    const m = this.connectToServer(e, r, i, u, a, p);
    this.setConnectionState(e, {
      status: "connecting",
      serverName: e,
      connectionPromise: m,
      options: r,
      configuredIndex: i,
      onConnect: u,
      onDisconnect: a
    });
  }
  /**
   * Show VSCode error message for MCP connection failure with option to view logs
   */
  async showConnectionErrorMessage(e, r) {
    const i = `Failed to connect to MCP server "${e}": ${r}`;
    await Ct.window.showErrorMessage(i, "Show Logs") === "Show Logs" && de.show();
  }
  async connectToServer(e, r, i, u, a, p) {
    return this.metricReporter.callWithTrace("connectToServer", async () => {
      await this.startConnection(e, r, i, u, a, p);
    });
  }
  updateToolRequireConsent(e, r) {
    if (r)
      return r.map((i) => ({ ...i, requireConsent: !e.includes(i.toolName) }));
  }
  /**
   * Start a connection to an MCP server.
   */
  async startConnection(e, r, i, u, a, p) {
    let h;
    const m = new AbortController(), w = setTimeout(() => {
      de.error("MCP server connection + listTools timed out after 60 seconds", e), m.abort("MCP server connection + listTools timed out after 60 seconds");
    }, 6e4);
    try {
      h = new ja(r, e, p);
      const g = await h.syncResourcesAndTools(e, m.signal), F = this.connectionStates.get(e);
      if (!F || F.status === "disabled") {
        de.warn("Connection disabled or removed during connection, removing...", e), await h.close();
        return;
      }
      const v = this.updateToolRequireConsent(r.autoApprove, g.tools);
      de.info("Successfully connected to MCP server", e), this.setConnectionState(e, {
        status: "connected",
        connection: h,
        serverName: e,
        options: r,
        configuredIndex: i,
        availableTools: v,
        onConnect: u,
        onDisconnect: a
      }), Fe.setConfiguredTools(e, v), Fe.setContextReferences(e, g.contextReferences), u && u(e, h);
    } catch (g) {
      h && await h.close();
      const F = this.connectionStates.get(e);
      if (!F || F.status === "disabled")
        return;
      this.setConnectionState(e, {
        status: "failed",
        serverName: e,
        options: r,
        configuredIndex: i,
        onConnect: u,
        onDisconnect: a
      });
      const v = g instanceof Error ? g.message : String(g);
      throw de.error(`Error connecting to MCP server: ${v}`, e), await this.showConnectionErrorMessage(e, v), g;
    } finally {
      clearTimeout(w);
    }
  }
  /**
   * Get connection to MCP server.
   * Only returns already established connections.
   */
  getConnection(e) {
    const r = this.connectionStates.get(e);
    return (r == null ? void 0 : r.status) === "connected" ? r.connection : void 0;
  }
  /**
   * Remove connection to MCP server.
   * If options provided as disabled, keep the connection state as disabled, else remove entirely.
   */
  async removeConnection(e, r, i, u) {
    const a = this.connectionStates.get(e);
    if (Fe.configuredMCPTools.delete(e), Fe.mcpContextReferences.delete(e), r != null && r.disabled ? this.setConnectionState(e, {
      status: "disabled",
      serverName: e,
      options: r,
      configuredIndex: i || 0
    }) : this.setConnectionState(e, void 0), a != null && a.connection && await a.connection.close(), u)
      try {
        u(e);
      } catch (p) {
        de.warn(
          `Error in onDisconnect callback: ${p instanceof Error ? p.message : String(p)}`,
          e
        );
      }
  }
  /**
   * Reload MCP configuration by comparing current connections with provided config.
   * - Keeps existing connections for servers still in the config
   * - Closes connections for servers no longer in the config
   * - Creates new connections for servers newly added to the config
   * @param mcpConfig The current MCP configuration with server definitions
   * @param onConnect Optional callback function that's executed after a connection is established
   */
  async reloadMcpConfig(e, r, i, u) {
    if (!e) {
      de.info("No MCP servers configured, closing all existing connections");
      const g = Array.from(this.connectionStates.keys());
      for (const F of g)
        await this.removeConnection(F, void 0, void 0, i);
      return;
    }
    const a = new Set(this.connectionStates.keys()), p = new Set(Object.keys(e.mcpServers)), h = Array.from(a).filter(
      (g) => !p.has(g)
    ), m = Array.from(p).map((g, F) => ({ serverName: g, index: F })).filter(({ serverName: g }) => !a.has(g)), w = Array.from(p).map((g, F) => ({ serverName: g, index: F })).filter(({ serverName: g }) => a.has(g));
    for (const g of h)
      de.info("Removing MCP server as it is no longer in the configuration", g), await this.removeConnection(g, void 0, void 0, i);
    for (const { serverName: g, index: F } of m) {
      const v = e.mcpServers[g];
      v.disabled ? (de.info("New MCP server from updated configuration is disabled", g), await this.removeConnection(g, v, F, i)) : (de.info("Adding new MCP server from updated configuration", g), this.registerServer(g, v, F, r, i, u));
    }
    for (const { serverName: g, index: F } of w) {
      const v = this.connectionStates.get(g), E = e.mcpServers[g], x = JSON.stringify({ ...v == null ? void 0 : v.options, autoApprove: [] }) !== JSON.stringify({ ...E, autoApprove: [] }), t = (v == null ? void 0 : v.options.autoApprove) !== E.autoApprove;
      if (x)
        E.disabled ? (de.info("Configuration disabled for MCP server, disconnecting", g), await this.removeConnection(g, E, F, i)) : (de.info("Configuration changed for MCP server, reconnecting", g), await this.removeConnection(g, E, F, i), this.registerServer(g, E, F, r, i, u));
      else if (v) {
        if (v.configuredIndex = F, t) {
          const n = this.updateToolRequireConsent(
            E.autoApprove,
            v.availableTools
          );
          Fe.setConfiguredTools(g, n), v.availableTools = n;
        }
        this.setConnectionState(g, v);
      }
    }
  }
  /**
   * Resets the connection for the server name based on existing connection status.
   */
  async resetConnection(e) {
    const r = this.connectionStates.get(e);
    if (!r) {
      de.warn("No connection found", e);
      return;
    }
    de.info("Reconnecting to server", e), await this.removeConnection(
      e,
      r.options,
      r.configuredIndex,
      r.onDisconnect
    ), this.registerServer(
      e,
      r.options,
      r.configuredIndex,
      r.onConnect,
      r.onDisconnect
    );
  }
  /**
   * Resets the singleton, removing connections and clearing static state.
   */
  static async reset() {
    const e = Fe.instance;
    if (!e)
      return;
    const r = e.getConnectionStates();
    try {
      await Promise.all(r.map((i) => e.removeConnection(i.serverName)));
    } catch (i) {
      de.error(`Error removing connection for MCP server: ${i instanceof Error ? i.message : String(i)}`);
    }
    Fe.instance = void 0;
  }
  metrics() {
    const e = this.getConnectionStates(), r = e.filter((p) => p.status === "disabled"), i = e.filter((p) => p.status === "failed"), u = e.flatMap((p) => p.availableTools || []), a = u.filter((p) => !p.requireConsent);
    return {
      enabledMCPServers: e.length - r.length,
      disabledMCPServers: r.length,
      failedMCPServers: i.length,
      availableMCPTools: u.length,
      autoApprovedMCPTools: a.length
    };
  }
};
Me(Fe, "instance"), Me(Fe, "configuredMCPTools", /* @__PURE__ */ new Map()), Me(Fe, "mcpContextReferences", /* @__PURE__ */ new Map());
let ni = Fe;
var Jt = { exports: {} }, Ja = Jt.exports, si;
function Xa() {
  return si || (si = 1, function(c, e) {
    (function(i, u) {
      c.exports = u();
    })(Ja, function() {
      return (
        /******/
        function(r) {
          var i = {};
          function u(a) {
            if (i[a])
              return i[a].exports;
            var p = i[a] = {
              /******/
              exports: {},
              /******/
              id: a,
              /******/
              loaded: !1
              /******/
            };
            return r[a].call(p.exports, p, p.exports, u), p.loaded = !0, p.exports;
          }
          return u.m = r, u.c = i, u.p = "", u(0);
        }([
          /* 0 */
          /***/
          function(r, i, u) {
            Object.defineProperty(i, "__esModule", { value: !0 });
            var a = u(1), p = u(3), h = u(8), m = u(15);
            function w(x, t, n) {
              var s = null, d = function(j, M) {
                n && n(j, M), s && s.visit(j, M);
              }, f = typeof n == "function" ? d : null, S = !1;
              if (t) {
                S = typeof t.comment == "boolean" && t.comment;
                var A = typeof t.attachComment == "boolean" && t.attachComment;
                (S || A) && (s = new a.CommentHandler(), s.attach = A, t.comment = !0, f = d);
              }
              var b = !1;
              t && typeof t.sourceType == "string" && (b = t.sourceType === "module");
              var k;
              t && typeof t.jsx == "boolean" && t.jsx ? k = new p.JSXParser(x, t, f) : k = new h.Parser(x, t, f);
              var T = b ? k.parseModule() : k.parseScript(), P = T;
              return S && s && (P.comments = s.comments), k.config.tokens && (P.tokens = k.tokens), k.config.tolerant && (P.errors = k.errorHandler.errors), P;
            }
            i.parse = w;
            function g(x, t, n) {
              var s = t || {};
              return s.sourceType = "module", w(x, s, n);
            }
            i.parseModule = g;
            function F(x, t, n) {
              var s = t || {};
              return s.sourceType = "script", w(x, s, n);
            }
            i.parseScript = F;
            function v(x, t, n) {
              var s = new m.Tokenizer(x, t), d;
              d = [];
              try {
                for (; ; ) {
                  var f = s.getNextToken();
                  if (!f)
                    break;
                  n && (f = n(f)), d.push(f);
                }
              } catch (S) {
                s.errorHandler.tolerate(S);
              }
              return s.errorHandler.tolerant && (d.errors = s.errors()), d;
            }
            i.tokenize = v;
            var E = u(2);
            i.Syntax = E.Syntax, i.version = "4.0.1";
          },
          /* 1 */
          /***/
          function(r, i, u) {
            Object.defineProperty(i, "__esModule", { value: !0 });
            var a = u(2), p = function() {
              function h() {
                this.attach = !1, this.comments = [], this.stack = [], this.leading = [], this.trailing = [];
              }
              return h.prototype.insertInnerComments = function(m, w) {
                if (m.type === a.Syntax.BlockStatement && m.body.length === 0) {
                  for (var g = [], F = this.leading.length - 1; F >= 0; --F) {
                    var v = this.leading[F];
                    w.end.offset >= v.start && (g.unshift(v.comment), this.leading.splice(F, 1), this.trailing.splice(F, 1));
                  }
                  g.length && (m.innerComments = g);
                }
              }, h.prototype.findTrailingComments = function(m) {
                var w = [];
                if (this.trailing.length > 0) {
                  for (var g = this.trailing.length - 1; g >= 0; --g) {
                    var F = this.trailing[g];
                    F.start >= m.end.offset && w.unshift(F.comment);
                  }
                  return this.trailing.length = 0, w;
                }
                var v = this.stack[this.stack.length - 1];
                if (v && v.node.trailingComments) {
                  var E = v.node.trailingComments[0];
                  E && E.range[0] >= m.end.offset && (w = v.node.trailingComments, delete v.node.trailingComments);
                }
                return w;
              }, h.prototype.findLeadingComments = function(m) {
                for (var w = [], g; this.stack.length > 0; ) {
                  var F = this.stack[this.stack.length - 1];
                  if (F && F.start >= m.start.offset)
                    g = F.node, this.stack.pop();
                  else
                    break;
                }
                if (g) {
                  for (var v = g.leadingComments ? g.leadingComments.length : 0, E = v - 1; E >= 0; --E) {
                    var x = g.leadingComments[E];
                    x.range[1] <= m.start.offset && (w.unshift(x), g.leadingComments.splice(E, 1));
                  }
                  return g.leadingComments && g.leadingComments.length === 0 && delete g.leadingComments, w;
                }
                for (var E = this.leading.length - 1; E >= 0; --E) {
                  var F = this.leading[E];
                  F.start <= m.start.offset && (w.unshift(F.comment), this.leading.splice(E, 1));
                }
                return w;
              }, h.prototype.visitNode = function(m, w) {
                if (!(m.type === a.Syntax.Program && m.body.length > 0)) {
                  this.insertInnerComments(m, w);
                  var g = this.findTrailingComments(w), F = this.findLeadingComments(w);
                  F.length > 0 && (m.leadingComments = F), g.length > 0 && (m.trailingComments = g), this.stack.push({
                    node: m,
                    start: w.start.offset
                  });
                }
              }, h.prototype.visitComment = function(m, w) {
                var g = m.type[0] === "L" ? "Line" : "Block", F = {
                  type: g,
                  value: m.value
                };
                if (m.range && (F.range = m.range), m.loc && (F.loc = m.loc), this.comments.push(F), this.attach) {
                  var v = {
                    comment: {
                      type: g,
                      value: m.value,
                      range: [w.start.offset, w.end.offset]
                    },
                    start: w.start.offset
                  };
                  m.loc && (v.comment.loc = m.loc), m.type = g, this.leading.push(v), this.trailing.push(v);
                }
              }, h.prototype.visit = function(m, w) {
                m.type === "LineComment" ? this.visitComment(m, w) : m.type === "BlockComment" ? this.visitComment(m, w) : this.attach && this.visitNode(m, w);
              }, h;
            }();
            i.CommentHandler = p;
          },
          /* 2 */
          /***/
          function(r, i) {
            Object.defineProperty(i, "__esModule", { value: !0 }), i.Syntax = {
              AssignmentExpression: "AssignmentExpression",
              AssignmentPattern: "AssignmentPattern",
              ArrayExpression: "ArrayExpression",
              ArrayPattern: "ArrayPattern",
              ArrowFunctionExpression: "ArrowFunctionExpression",
              AwaitExpression: "AwaitExpression",
              BlockStatement: "BlockStatement",
              BinaryExpression: "BinaryExpression",
              BreakStatement: "BreakStatement",
              CallExpression: "CallExpression",
              CatchClause: "CatchClause",
              ClassBody: "ClassBody",
              ClassDeclaration: "ClassDeclaration",
              ClassExpression: "ClassExpression",
              ConditionalExpression: "ConditionalExpression",
              ContinueStatement: "ContinueStatement",
              DoWhileStatement: "DoWhileStatement",
              DebuggerStatement: "DebuggerStatement",
              EmptyStatement: "EmptyStatement",
              ExportAllDeclaration: "ExportAllDeclaration",
              ExportDefaultDeclaration: "ExportDefaultDeclaration",
              ExportNamedDeclaration: "ExportNamedDeclaration",
              ExportSpecifier: "ExportSpecifier",
              ExpressionStatement: "ExpressionStatement",
              ForStatement: "ForStatement",
              ForOfStatement: "ForOfStatement",
              ForInStatement: "ForInStatement",
              FunctionDeclaration: "FunctionDeclaration",
              FunctionExpression: "FunctionExpression",
              Identifier: "Identifier",
              IfStatement: "IfStatement",
              ImportDeclaration: "ImportDeclaration",
              ImportDefaultSpecifier: "ImportDefaultSpecifier",
              ImportNamespaceSpecifier: "ImportNamespaceSpecifier",
              ImportSpecifier: "ImportSpecifier",
              Literal: "Literal",
              LabeledStatement: "LabeledStatement",
              LogicalExpression: "LogicalExpression",
              MemberExpression: "MemberExpression",
              MetaProperty: "MetaProperty",
              MethodDefinition: "MethodDefinition",
              NewExpression: "NewExpression",
              ObjectExpression: "ObjectExpression",
              ObjectPattern: "ObjectPattern",
              Program: "Program",
              Property: "Property",
              RestElement: "RestElement",
              ReturnStatement: "ReturnStatement",
              SequenceExpression: "SequenceExpression",
              SpreadElement: "SpreadElement",
              Super: "Super",
              SwitchCase: "SwitchCase",
              SwitchStatement: "SwitchStatement",
              TaggedTemplateExpression: "TaggedTemplateExpression",
              TemplateElement: "TemplateElement",
              TemplateLiteral: "TemplateLiteral",
              ThisExpression: "ThisExpression",
              ThrowStatement: "ThrowStatement",
              TryStatement: "TryStatement",
              UnaryExpression: "UnaryExpression",
              UpdateExpression: "UpdateExpression",
              VariableDeclaration: "VariableDeclaration",
              VariableDeclarator: "VariableDeclarator",
              WhileStatement: "WhileStatement",
              WithStatement: "WithStatement",
              YieldExpression: "YieldExpression"
            };
          },
          /* 3 */
          /***/
          function(r, i, u) {
            var a = this && this.__extends || function() {
              var t = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, s) {
                n.__proto__ = s;
              } || function(n, s) {
                for (var d in s) s.hasOwnProperty(d) && (n[d] = s[d]);
              };
              return function(n, s) {
                t(n, s);
                function d() {
                  this.constructor = n;
                }
                n.prototype = s === null ? Object.create(s) : (d.prototype = s.prototype, new d());
              };
            }();
            Object.defineProperty(i, "__esModule", { value: !0 });
            var p = u(4), h = u(5), m = u(6), w = u(7), g = u(8), F = u(13), v = u(14);
            F.TokenName[
              100
              /* Identifier */
            ] = "JSXIdentifier", F.TokenName[
              101
              /* Text */
            ] = "JSXText";
            function E(t) {
              var n;
              switch (t.type) {
                case m.JSXSyntax.JSXIdentifier:
                  var s = t;
                  n = s.name;
                  break;
                case m.JSXSyntax.JSXNamespacedName:
                  var d = t;
                  n = E(d.namespace) + ":" + E(d.name);
                  break;
                case m.JSXSyntax.JSXMemberExpression:
                  var f = t;
                  n = E(f.object) + "." + E(f.property);
                  break;
              }
              return n;
            }
            var x = function(t) {
              a(n, t);
              function n(s, d, f) {
                return t.call(this, s, d, f) || this;
              }
              return n.prototype.parsePrimaryExpression = function() {
                return this.match("<") ? this.parseJSXRoot() : t.prototype.parsePrimaryExpression.call(this);
              }, n.prototype.startJSX = function() {
                this.scanner.index = this.startMarker.index, this.scanner.lineNumber = this.startMarker.line, this.scanner.lineStart = this.startMarker.index - this.startMarker.column;
              }, n.prototype.finishJSX = function() {
                this.nextToken();
              }, n.prototype.reenterJSX = function() {
                this.startJSX(), this.expectJSX("}"), this.config.tokens && this.tokens.pop();
              }, n.prototype.createJSXNode = function() {
                return this.collectComments(), {
                  index: this.scanner.index,
                  line: this.scanner.lineNumber,
                  column: this.scanner.index - this.scanner.lineStart
                };
              }, n.prototype.createJSXChildNode = function() {
                return {
                  index: this.scanner.index,
                  line: this.scanner.lineNumber,
                  column: this.scanner.index - this.scanner.lineStart
                };
              }, n.prototype.scanXHTMLEntity = function(s) {
                for (var d = "&", f = !0, S = !1, A = !1, b = !1; !this.scanner.eof() && f && !S; ) {
                  var k = this.scanner.source[this.scanner.index];
                  if (k === s)
                    break;
                  if (S = k === ";", d += k, ++this.scanner.index, !S)
                    switch (d.length) {
                      case 2:
                        A = k === "#";
                        break;
                      case 3:
                        A && (b = k === "x", f = b || p.Character.isDecimalDigit(k.charCodeAt(0)), A = A && !b);
                        break;
                      default:
                        f = f && !(A && !p.Character.isDecimalDigit(k.charCodeAt(0))), f = f && !(b && !p.Character.isHexDigit(k.charCodeAt(0)));
                        break;
                    }
                }
                if (f && S && d.length > 2) {
                  var T = d.substr(1, d.length - 2);
                  A && T.length > 1 ? d = String.fromCharCode(parseInt(T.substr(1), 10)) : b && T.length > 2 ? d = String.fromCharCode(parseInt("0" + T.substr(1), 16)) : !A && !b && v.XHTMLEntities[T] && (d = v.XHTMLEntities[T]);
                }
                return d;
              }, n.prototype.lexJSX = function() {
                var s = this.scanner.source.charCodeAt(this.scanner.index);
                if (s === 60 || s === 62 || s === 47 || s === 58 || s === 61 || s === 123 || s === 125) {
                  var d = this.scanner.source[this.scanner.index++];
                  return {
                    type: 7,
                    value: d,
                    lineNumber: this.scanner.lineNumber,
                    lineStart: this.scanner.lineStart,
                    start: this.scanner.index - 1,
                    end: this.scanner.index
                  };
                }
                if (s === 34 || s === 39) {
                  for (var f = this.scanner.index, S = this.scanner.source[this.scanner.index++], A = ""; !this.scanner.eof(); ) {
                    var b = this.scanner.source[this.scanner.index++];
                    if (b === S)
                      break;
                    b === "&" ? A += this.scanXHTMLEntity(S) : A += b;
                  }
                  return {
                    type: 8,
                    value: A,
                    lineNumber: this.scanner.lineNumber,
                    lineStart: this.scanner.lineStart,
                    start: f,
                    end: this.scanner.index
                  };
                }
                if (s === 46) {
                  var k = this.scanner.source.charCodeAt(this.scanner.index + 1), T = this.scanner.source.charCodeAt(this.scanner.index + 2), d = k === 46 && T === 46 ? "..." : ".", f = this.scanner.index;
                  return this.scanner.index += d.length, {
                    type: 7,
                    value: d,
                    lineNumber: this.scanner.lineNumber,
                    lineStart: this.scanner.lineStart,
                    start: f,
                    end: this.scanner.index
                  };
                }
                if (s === 96)
                  return {
                    type: 10,
                    value: "",
                    lineNumber: this.scanner.lineNumber,
                    lineStart: this.scanner.lineStart,
                    start: this.scanner.index,
                    end: this.scanner.index
                  };
                if (p.Character.isIdentifierStart(s) && s !== 92) {
                  var f = this.scanner.index;
                  for (++this.scanner.index; !this.scanner.eof(); ) {
                    var b = this.scanner.source.charCodeAt(this.scanner.index);
                    if (p.Character.isIdentifierPart(b) && b !== 92)
                      ++this.scanner.index;
                    else if (b === 45)
                      ++this.scanner.index;
                    else
                      break;
                  }
                  var P = this.scanner.source.slice(f, this.scanner.index);
                  return {
                    type: 100,
                    value: P,
                    lineNumber: this.scanner.lineNumber,
                    lineStart: this.scanner.lineStart,
                    start: f,
                    end: this.scanner.index
                  };
                }
                return this.scanner.lex();
              }, n.prototype.nextJSXToken = function() {
                this.collectComments(), this.startMarker.index = this.scanner.index, this.startMarker.line = this.scanner.lineNumber, this.startMarker.column = this.scanner.index - this.scanner.lineStart;
                var s = this.lexJSX();
                return this.lastMarker.index = this.scanner.index, this.lastMarker.line = this.scanner.lineNumber, this.lastMarker.column = this.scanner.index - this.scanner.lineStart, this.config.tokens && this.tokens.push(this.convertToken(s)), s;
              }, n.prototype.nextJSXText = function() {
                this.startMarker.index = this.scanner.index, this.startMarker.line = this.scanner.lineNumber, this.startMarker.column = this.scanner.index - this.scanner.lineStart;
                for (var s = this.scanner.index, d = ""; !this.scanner.eof(); ) {
                  var f = this.scanner.source[this.scanner.index];
                  if (f === "{" || f === "<")
                    break;
                  ++this.scanner.index, d += f, p.Character.isLineTerminator(f.charCodeAt(0)) && (++this.scanner.lineNumber, f === "\r" && this.scanner.source[this.scanner.index] === `
` && ++this.scanner.index, this.scanner.lineStart = this.scanner.index);
                }
                this.lastMarker.index = this.scanner.index, this.lastMarker.line = this.scanner.lineNumber, this.lastMarker.column = this.scanner.index - this.scanner.lineStart;
                var S = {
                  type: 101,
                  value: d,
                  lineNumber: this.scanner.lineNumber,
                  lineStart: this.scanner.lineStart,
                  start: s,
                  end: this.scanner.index
                };
                return d.length > 0 && this.config.tokens && this.tokens.push(this.convertToken(S)), S;
              }, n.prototype.peekJSXToken = function() {
                var s = this.scanner.saveState();
                this.scanner.scanComments();
                var d = this.lexJSX();
                return this.scanner.restoreState(s), d;
              }, n.prototype.expectJSX = function(s) {
                var d = this.nextJSXToken();
                (d.type !== 7 || d.value !== s) && this.throwUnexpectedToken(d);
              }, n.prototype.matchJSX = function(s) {
                var d = this.peekJSXToken();
                return d.type === 7 && d.value === s;
              }, n.prototype.parseJSXIdentifier = function() {
                var s = this.createJSXNode(), d = this.nextJSXToken();
                return d.type !== 100 && this.throwUnexpectedToken(d), this.finalize(s, new h.JSXIdentifier(d.value));
              }, n.prototype.parseJSXElementName = function() {
                var s = this.createJSXNode(), d = this.parseJSXIdentifier();
                if (this.matchJSX(":")) {
                  var f = d;
                  this.expectJSX(":");
                  var S = this.parseJSXIdentifier();
                  d = this.finalize(s, new h.JSXNamespacedName(f, S));
                } else if (this.matchJSX("."))
                  for (; this.matchJSX("."); ) {
                    var A = d;
                    this.expectJSX(".");
                    var b = this.parseJSXIdentifier();
                    d = this.finalize(s, new h.JSXMemberExpression(A, b));
                  }
                return d;
              }, n.prototype.parseJSXAttributeName = function() {
                var s = this.createJSXNode(), d, f = this.parseJSXIdentifier();
                if (this.matchJSX(":")) {
                  var S = f;
                  this.expectJSX(":");
                  var A = this.parseJSXIdentifier();
                  d = this.finalize(s, new h.JSXNamespacedName(S, A));
                } else
                  d = f;
                return d;
              }, n.prototype.parseJSXStringLiteralAttribute = function() {
                var s = this.createJSXNode(), d = this.nextJSXToken();
                d.type !== 8 && this.throwUnexpectedToken(d);
                var f = this.getTokenRaw(d);
                return this.finalize(s, new w.Literal(d.value, f));
              }, n.prototype.parseJSXExpressionAttribute = function() {
                var s = this.createJSXNode();
                this.expectJSX("{"), this.finishJSX(), this.match("}") && this.tolerateError("JSX attributes must only be assigned a non-empty expression");
                var d = this.parseAssignmentExpression();
                return this.reenterJSX(), this.finalize(s, new h.JSXExpressionContainer(d));
              }, n.prototype.parseJSXAttributeValue = function() {
                return this.matchJSX("{") ? this.parseJSXExpressionAttribute() : this.matchJSX("<") ? this.parseJSXElement() : this.parseJSXStringLiteralAttribute();
              }, n.prototype.parseJSXNameValueAttribute = function() {
                var s = this.createJSXNode(), d = this.parseJSXAttributeName(), f = null;
                return this.matchJSX("=") && (this.expectJSX("="), f = this.parseJSXAttributeValue()), this.finalize(s, new h.JSXAttribute(d, f));
              }, n.prototype.parseJSXSpreadAttribute = function() {
                var s = this.createJSXNode();
                this.expectJSX("{"), this.expectJSX("..."), this.finishJSX();
                var d = this.parseAssignmentExpression();
                return this.reenterJSX(), this.finalize(s, new h.JSXSpreadAttribute(d));
              }, n.prototype.parseJSXAttributes = function() {
                for (var s = []; !this.matchJSX("/") && !this.matchJSX(">"); ) {
                  var d = this.matchJSX("{") ? this.parseJSXSpreadAttribute() : this.parseJSXNameValueAttribute();
                  s.push(d);
                }
                return s;
              }, n.prototype.parseJSXOpeningElement = function() {
                var s = this.createJSXNode();
                this.expectJSX("<");
                var d = this.parseJSXElementName(), f = this.parseJSXAttributes(), S = this.matchJSX("/");
                return S && this.expectJSX("/"), this.expectJSX(">"), this.finalize(s, new h.JSXOpeningElement(d, S, f));
              }, n.prototype.parseJSXBoundaryElement = function() {
                var s = this.createJSXNode();
                if (this.expectJSX("<"), this.matchJSX("/")) {
                  this.expectJSX("/");
                  var d = this.parseJSXElementName();
                  return this.expectJSX(">"), this.finalize(s, new h.JSXClosingElement(d));
                }
                var f = this.parseJSXElementName(), S = this.parseJSXAttributes(), A = this.matchJSX("/");
                return A && this.expectJSX("/"), this.expectJSX(">"), this.finalize(s, new h.JSXOpeningElement(f, A, S));
              }, n.prototype.parseJSXEmptyExpression = function() {
                var s = this.createJSXChildNode();
                return this.collectComments(), this.lastMarker.index = this.scanner.index, this.lastMarker.line = this.scanner.lineNumber, this.lastMarker.column = this.scanner.index - this.scanner.lineStart, this.finalize(s, new h.JSXEmptyExpression());
              }, n.prototype.parseJSXExpressionContainer = function() {
                var s = this.createJSXNode();
                this.expectJSX("{");
                var d;
                return this.matchJSX("}") ? (d = this.parseJSXEmptyExpression(), this.expectJSX("}")) : (this.finishJSX(), d = this.parseAssignmentExpression(), this.reenterJSX()), this.finalize(s, new h.JSXExpressionContainer(d));
              }, n.prototype.parseJSXChildren = function() {
                for (var s = []; !this.scanner.eof(); ) {
                  var d = this.createJSXChildNode(), f = this.nextJSXText();
                  if (f.start < f.end) {
                    var S = this.getTokenRaw(f), A = this.finalize(d, new h.JSXText(f.value, S));
                    s.push(A);
                  }
                  if (this.scanner.source[this.scanner.index] === "{") {
                    var b = this.parseJSXExpressionContainer();
                    s.push(b);
                  } else
                    break;
                }
                return s;
              }, n.prototype.parseComplexJSXElement = function(s) {
                for (var d = []; !this.scanner.eof(); ) {
                  s.children = s.children.concat(this.parseJSXChildren());
                  var f = this.createJSXChildNode(), S = this.parseJSXBoundaryElement();
                  if (S.type === m.JSXSyntax.JSXOpeningElement) {
                    var A = S;
                    if (A.selfClosing) {
                      var b = this.finalize(f, new h.JSXElement(A, [], null));
                      s.children.push(b);
                    } else
                      d.push(s), s = { node: f, opening: A, closing: null, children: [] };
                  }
                  if (S.type === m.JSXSyntax.JSXClosingElement) {
                    s.closing = S;
                    var k = E(s.opening.name), T = E(s.closing.name);
                    if (k !== T && this.tolerateError("Expected corresponding JSX closing tag for %0", k), d.length > 0) {
                      var b = this.finalize(s.node, new h.JSXElement(s.opening, s.children, s.closing));
                      s = d[d.length - 1], s.children.push(b), d.pop();
                    } else
                      break;
                  }
                }
                return s;
              }, n.prototype.parseJSXElement = function() {
                var s = this.createJSXNode(), d = this.parseJSXOpeningElement(), f = [], S = null;
                if (!d.selfClosing) {
                  var A = this.parseComplexJSXElement({ node: s, opening: d, closing: S, children: f });
                  f = A.children, S = A.closing;
                }
                return this.finalize(s, new h.JSXElement(d, f, S));
              }, n.prototype.parseJSXRoot = function() {
                this.config.tokens && this.tokens.pop(), this.startJSX();
                var s = this.parseJSXElement();
                return this.finishJSX(), s;
              }, n.prototype.isStartOfExpression = function() {
                return t.prototype.isStartOfExpression.call(this) || this.match("<");
              }, n;
            }(g.Parser);
            i.JSXParser = x;
          },
          /* 4 */
          /***/
          function(r, i) {
            Object.defineProperty(i, "__esModule", { value: !0 });
            var u = {
              // Unicode v8.0.0 NonAsciiIdentifierStart:
              NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/,
              // Unicode v8.0.0 NonAsciiIdentifierPart:
              NonAsciiIdentifierPart: /[\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/
            };
            i.Character = {
              /* tslint:disable:no-bitwise */
              fromCodePoint: function(a) {
                return a < 65536 ? String.fromCharCode(a) : String.fromCharCode(55296 + (a - 65536 >> 10)) + String.fromCharCode(56320 + (a - 65536 & 1023));
              },
              // https://tc39.github.io/ecma262/#sec-white-space
              isWhiteSpace: function(a) {
                return a === 32 || a === 9 || a === 11 || a === 12 || a === 160 || a >= 5760 && [5760, 8192, 8193, 8194, 8195, 8196, 8197, 8198, 8199, 8200, 8201, 8202, 8239, 8287, 12288, 65279].indexOf(a) >= 0;
              },
              // https://tc39.github.io/ecma262/#sec-line-terminators
              isLineTerminator: function(a) {
                return a === 10 || a === 13 || a === 8232 || a === 8233;
              },
              // https://tc39.github.io/ecma262/#sec-names-and-keywords
              isIdentifierStart: function(a) {
                return a === 36 || a === 95 || a >= 65 && a <= 90 || a >= 97 && a <= 122 || a === 92 || a >= 128 && u.NonAsciiIdentifierStart.test(i.Character.fromCodePoint(a));
              },
              isIdentifierPart: function(a) {
                return a === 36 || a === 95 || a >= 65 && a <= 90 || a >= 97 && a <= 122 || a >= 48 && a <= 57 || a === 92 || a >= 128 && u.NonAsciiIdentifierPart.test(i.Character.fromCodePoint(a));
              },
              // https://tc39.github.io/ecma262/#sec-literals-numeric-literals
              isDecimalDigit: function(a) {
                return a >= 48 && a <= 57;
              },
              isHexDigit: function(a) {
                return a >= 48 && a <= 57 || a >= 65 && a <= 70 || a >= 97 && a <= 102;
              },
              isOctalDigit: function(a) {
                return a >= 48 && a <= 55;
              }
            };
          },
          /* 5 */
          /***/
          function(r, i, u) {
            Object.defineProperty(i, "__esModule", { value: !0 });
            var a = u(6), p = /* @__PURE__ */ function() {
              function s(d) {
                this.type = a.JSXSyntax.JSXClosingElement, this.name = d;
              }
              return s;
            }();
            i.JSXClosingElement = p;
            var h = /* @__PURE__ */ function() {
              function s(d, f, S) {
                this.type = a.JSXSyntax.JSXElement, this.openingElement = d, this.children = f, this.closingElement = S;
              }
              return s;
            }();
            i.JSXElement = h;
            var m = /* @__PURE__ */ function() {
              function s() {
                this.type = a.JSXSyntax.JSXEmptyExpression;
              }
              return s;
            }();
            i.JSXEmptyExpression = m;
            var w = /* @__PURE__ */ function() {
              function s(d) {
                this.type = a.JSXSyntax.JSXExpressionContainer, this.expression = d;
              }
              return s;
            }();
            i.JSXExpressionContainer = w;
            var g = /* @__PURE__ */ function() {
              function s(d) {
                this.type = a.JSXSyntax.JSXIdentifier, this.name = d;
              }
              return s;
            }();
            i.JSXIdentifier = g;
            var F = /* @__PURE__ */ function() {
              function s(d, f) {
                this.type = a.JSXSyntax.JSXMemberExpression, this.object = d, this.property = f;
              }
              return s;
            }();
            i.JSXMemberExpression = F;
            var v = /* @__PURE__ */ function() {
              function s(d, f) {
                this.type = a.JSXSyntax.JSXAttribute, this.name = d, this.value = f;
              }
              return s;
            }();
            i.JSXAttribute = v;
            var E = /* @__PURE__ */ function() {
              function s(d, f) {
                this.type = a.JSXSyntax.JSXNamespacedName, this.namespace = d, this.name = f;
              }
              return s;
            }();
            i.JSXNamespacedName = E;
            var x = /* @__PURE__ */ function() {
              function s(d, f, S) {
                this.type = a.JSXSyntax.JSXOpeningElement, this.name = d, this.selfClosing = f, this.attributes = S;
              }
              return s;
            }();
            i.JSXOpeningElement = x;
            var t = /* @__PURE__ */ function() {
              function s(d) {
                this.type = a.JSXSyntax.JSXSpreadAttribute, this.argument = d;
              }
              return s;
            }();
            i.JSXSpreadAttribute = t;
            var n = /* @__PURE__ */ function() {
              function s(d, f) {
                this.type = a.JSXSyntax.JSXText, this.value = d, this.raw = f;
              }
              return s;
            }();
            i.JSXText = n;
          },
          /* 6 */
          /***/
          function(r, i) {
            Object.defineProperty(i, "__esModule", { value: !0 }), i.JSXSyntax = {
              JSXAttribute: "JSXAttribute",
              JSXClosingElement: "JSXClosingElement",
              JSXElement: "JSXElement",
              JSXEmptyExpression: "JSXEmptyExpression",
              JSXExpressionContainer: "JSXExpressionContainer",
              JSXIdentifier: "JSXIdentifier",
              JSXMemberExpression: "JSXMemberExpression",
              JSXNamespacedName: "JSXNamespacedName",
              JSXOpeningElement: "JSXOpeningElement",
              JSXSpreadAttribute: "JSXSpreadAttribute",
              JSXText: "JSXText"
            };
          },
          /* 7 */
          /***/
          function(r, i, u) {
            Object.defineProperty(i, "__esModule", { value: !0 });
            var a = u(2), p = /* @__PURE__ */ function() {
              function I(N) {
                this.type = a.Syntax.ArrayExpression, this.elements = N;
              }
              return I;
            }();
            i.ArrayExpression = p;
            var h = /* @__PURE__ */ function() {
              function I(N) {
                this.type = a.Syntax.ArrayPattern, this.elements = N;
              }
              return I;
            }();
            i.ArrayPattern = h;
            var m = /* @__PURE__ */ function() {
              function I(N, L, ee) {
                this.type = a.Syntax.ArrowFunctionExpression, this.id = null, this.params = N, this.body = L, this.generator = !1, this.expression = ee, this.async = !1;
              }
              return I;
            }();
            i.ArrowFunctionExpression = m;
            var w = /* @__PURE__ */ function() {
              function I(N, L, ee) {
                this.type = a.Syntax.AssignmentExpression, this.operator = N, this.left = L, this.right = ee;
              }
              return I;
            }();
            i.AssignmentExpression = w;
            var g = /* @__PURE__ */ function() {
              function I(N, L) {
                this.type = a.Syntax.AssignmentPattern, this.left = N, this.right = L;
              }
              return I;
            }();
            i.AssignmentPattern = g;
            var F = /* @__PURE__ */ function() {
              function I(N, L, ee) {
                this.type = a.Syntax.ArrowFunctionExpression, this.id = null, this.params = N, this.body = L, this.generator = !1, this.expression = ee, this.async = !0;
              }
              return I;
            }();
            i.AsyncArrowFunctionExpression = F;
            var v = /* @__PURE__ */ function() {
              function I(N, L, ee) {
                this.type = a.Syntax.FunctionDeclaration, this.id = N, this.params = L, this.body = ee, this.generator = !1, this.expression = !1, this.async = !0;
              }
              return I;
            }();
            i.AsyncFunctionDeclaration = v;
            var E = /* @__PURE__ */ function() {
              function I(N, L, ee) {
                this.type = a.Syntax.FunctionExpression, this.id = N, this.params = L, this.body = ee, this.generator = !1, this.expression = !1, this.async = !0;
              }
              return I;
            }();
            i.AsyncFunctionExpression = E;
            var x = /* @__PURE__ */ function() {
              function I(N) {
                this.type = a.Syntax.AwaitExpression, this.argument = N;
              }
              return I;
            }();
            i.AwaitExpression = x;
            var t = /* @__PURE__ */ function() {
              function I(N, L, ee) {
                var Ne = N === "||" || N === "&&";
                this.type = Ne ? a.Syntax.LogicalExpression : a.Syntax.BinaryExpression, this.operator = N, this.left = L, this.right = ee;
              }
              return I;
            }();
            i.BinaryExpression = t;
            var n = /* @__PURE__ */ function() {
              function I(N) {
                this.type = a.Syntax.BlockStatement, this.body = N;
              }
              return I;
            }();
            i.BlockStatement = n;
            var s = /* @__PURE__ */ function() {
              function I(N) {
                this.type = a.Syntax.BreakStatement, this.label = N;
              }
              return I;
            }();
            i.BreakStatement = s;
            var d = /* @__PURE__ */ function() {
              function I(N, L) {
                this.type = a.Syntax.CallExpression, this.callee = N, this.arguments = L;
              }
              return I;
            }();
            i.CallExpression = d;
            var f = /* @__PURE__ */ function() {
              function I(N, L) {
                this.type = a.Syntax.CatchClause, this.param = N, this.body = L;
              }
              return I;
            }();
            i.CatchClause = f;
            var S = /* @__PURE__ */ function() {
              function I(N) {
                this.type = a.Syntax.ClassBody, this.body = N;
              }
              return I;
            }();
            i.ClassBody = S;
            var A = /* @__PURE__ */ function() {
              function I(N, L, ee) {
                this.type = a.Syntax.ClassDeclaration, this.id = N, this.superClass = L, this.body = ee;
              }
              return I;
            }();
            i.ClassDeclaration = A;
            var b = /* @__PURE__ */ function() {
              function I(N, L, ee) {
                this.type = a.Syntax.ClassExpression, this.id = N, this.superClass = L, this.body = ee;
              }
              return I;
            }();
            i.ClassExpression = b;
            var k = /* @__PURE__ */ function() {
              function I(N, L) {
                this.type = a.Syntax.MemberExpression, this.computed = !0, this.object = N, this.property = L;
              }
              return I;
            }();
            i.ComputedMemberExpression = k;
            var T = /* @__PURE__ */ function() {
              function I(N, L, ee) {
                this.type = a.Syntax.ConditionalExpression, this.test = N, this.consequent = L, this.alternate = ee;
              }
              return I;
            }();
            i.ConditionalExpression = T;
            var P = /* @__PURE__ */ function() {
              function I(N) {
                this.type = a.Syntax.ContinueStatement, this.label = N;
              }
              return I;
            }();
            i.ContinueStatement = P;
            var j = /* @__PURE__ */ function() {
              function I() {
                this.type = a.Syntax.DebuggerStatement;
              }
              return I;
            }();
            i.DebuggerStatement = j;
            var M = /* @__PURE__ */ function() {
              function I(N, L) {
                this.type = a.Syntax.ExpressionStatement, this.expression = N, this.directive = L;
              }
              return I;
            }();
            i.Directive = M;
            var Z = /* @__PURE__ */ function() {
              function I(N, L) {
                this.type = a.Syntax.DoWhileStatement, this.body = N, this.test = L;
              }
              return I;
            }();
            i.DoWhileStatement = Z;
            var V = /* @__PURE__ */ function() {
              function I() {
                this.type = a.Syntax.EmptyStatement;
              }
              return I;
            }();
            i.EmptyStatement = V;
            var J = /* @__PURE__ */ function() {
              function I(N) {
                this.type = a.Syntax.ExportAllDeclaration, this.source = N;
              }
              return I;
            }();
            i.ExportAllDeclaration = J;
            var H = /* @__PURE__ */ function() {
              function I(N) {
                this.type = a.Syntax.ExportDefaultDeclaration, this.declaration = N;
              }
              return I;
            }();
            i.ExportDefaultDeclaration = H;
            var Y = /* @__PURE__ */ function() {
              function I(N, L, ee) {
                this.type = a.Syntax.ExportNamedDeclaration, this.declaration = N, this.specifiers = L, this.source = ee;
              }
              return I;
            }();
            i.ExportNamedDeclaration = Y;
            var se = /* @__PURE__ */ function() {
              function I(N, L) {
                this.type = a.Syntax.ExportSpecifier, this.exported = L, this.local = N;
              }
              return I;
            }();
            i.ExportSpecifier = se;
            var le = /* @__PURE__ */ function() {
              function I(N) {
                this.type = a.Syntax.ExpressionStatement, this.expression = N;
              }
              return I;
            }();
            i.ExpressionStatement = le;
            var Ee = /* @__PURE__ */ function() {
              function I(N, L, ee) {
                this.type = a.Syntax.ForInStatement, this.left = N, this.right = L, this.body = ee, this.each = !1;
              }
              return I;
            }();
            i.ForInStatement = Ee;
            var Se = /* @__PURE__ */ function() {
              function I(N, L, ee) {
                this.type = a.Syntax.ForOfStatement, this.left = N, this.right = L, this.body = ee;
              }
              return I;
            }();
            i.ForOfStatement = Se;
            var he = /* @__PURE__ */ function() {
              function I(N, L, ee, Ne) {
                this.type = a.Syntax.ForStatement, this.init = N, this.test = L, this.update = ee, this.body = Ne;
              }
              return I;
            }();
            i.ForStatement = he;
            var fe = /* @__PURE__ */ function() {
              function I(N, L, ee, Ne) {
                this.type = a.Syntax.FunctionDeclaration, this.id = N, this.params = L, this.body = ee, this.generator = Ne, this.expression = !1, this.async = !1;
              }
              return I;
            }();
            i.FunctionDeclaration = fe;
            var De = /* @__PURE__ */ function() {
              function I(N, L, ee, Ne) {
                this.type = a.Syntax.FunctionExpression, this.id = N, this.params = L, this.body = ee, this.generator = Ne, this.expression = !1, this.async = !1;
              }
              return I;
            }();
            i.FunctionExpression = De;
            var Xe = /* @__PURE__ */ function() {
              function I(N) {
                this.type = a.Syntax.Identifier, this.name = N;
              }
              return I;
            }();
            i.Identifier = Xe;
            var Te = /* @__PURE__ */ function() {
              function I(N, L, ee) {
                this.type = a.Syntax.IfStatement, this.test = N, this.consequent = L, this.alternate = ee;
              }
              return I;
            }();
            i.IfStatement = Te;
            var Ie = /* @__PURE__ */ function() {
              function I(N, L) {
                this.type = a.Syntax.ImportDeclaration, this.specifiers = N, this.source = L;
              }
              return I;
            }();
            i.ImportDeclaration = Ie;
            var ze = /* @__PURE__ */ function() {
              function I(N) {
                this.type = a.Syntax.ImportDefaultSpecifier, this.local = N;
              }
              return I;
            }();
            i.ImportDefaultSpecifier = ze;
            var Be = /* @__PURE__ */ function() {
              function I(N) {
                this.type = a.Syntax.ImportNamespaceSpecifier, this.local = N;
              }
              return I;
            }();
            i.ImportNamespaceSpecifier = Be;
            var $e = /* @__PURE__ */ function() {
              function I(N, L) {
                this.type = a.Syntax.ImportSpecifier, this.local = N, this.imported = L;
              }
              return I;
            }();
            i.ImportSpecifier = $e;
            var ke = /* @__PURE__ */ function() {
              function I(N, L) {
                this.type = a.Syntax.LabeledStatement, this.label = N, this.body = L;
              }
              return I;
            }();
            i.LabeledStatement = ke;
            var U = /* @__PURE__ */ function() {
              function I(N, L) {
                this.type = a.Syntax.Literal, this.value = N, this.raw = L;
              }
              return I;
            }();
            i.Literal = U;
            var te = /* @__PURE__ */ function() {
              function I(N, L) {
                this.type = a.Syntax.MetaProperty, this.meta = N, this.property = L;
              }
              return I;
            }();
            i.MetaProperty = te;
            var K = /* @__PURE__ */ function() {
              function I(N, L, ee, Ne, ur) {
                this.type = a.Syntax.MethodDefinition, this.key = N, this.computed = L, this.value = ee, this.kind = Ne, this.static = ur;
              }
              return I;
            }();
            i.MethodDefinition = K;
            var ie = /* @__PURE__ */ function() {
              function I(N) {
                this.type = a.Syntax.Program, this.body = N, this.sourceType = "module";
              }
              return I;
            }();
            i.Module = ie;
            var ye = /* @__PURE__ */ function() {
              function I(N, L) {
                this.type = a.Syntax.NewExpression, this.callee = N, this.arguments = L;
              }
              return I;
            }();
            i.NewExpression = ye;
            var we = /* @__PURE__ */ function() {
              function I(N) {
                this.type = a.Syntax.ObjectExpression, this.properties = N;
              }
              return I;
            }();
            i.ObjectExpression = we;
            var Ce = /* @__PURE__ */ function() {
              function I(N) {
                this.type = a.Syntax.ObjectPattern, this.properties = N;
              }
              return I;
            }();
            i.ObjectPattern = Ce;
            var qe = /* @__PURE__ */ function() {
              function I(N, L, ee, Ne, ur, nn) {
                this.type = a.Syntax.Property, this.key = L, this.computed = ee, this.value = Ne, this.kind = N, this.method = ur, this.shorthand = nn;
              }
              return I;
            }();
            i.Property = qe;
            var $ = /* @__PURE__ */ function() {
              function I(N, L, ee, Ne) {
                this.type = a.Syntax.Literal, this.value = N, this.raw = L, this.regex = { pattern: ee, flags: Ne };
              }
              return I;
            }();
            i.RegexLiteral = $;
            var ae = /* @__PURE__ */ function() {
              function I(N) {
                this.type = a.Syntax.RestElement, this.argument = N;
              }
              return I;
            }();
            i.RestElement = ae;
            var ue = /* @__PURE__ */ function() {
              function I(N) {
                this.type = a.Syntax.ReturnStatement, this.argument = N;
              }
              return I;
            }();
            i.ReturnStatement = ue;
            var ve = /* @__PURE__ */ function() {
              function I(N) {
                this.type = a.Syntax.Program, this.body = N, this.sourceType = "script";
              }
              return I;
            }();
            i.Script = ve;
            var vt = /* @__PURE__ */ function() {
              function I(N) {
                this.type = a.Syntax.SequenceExpression, this.expressions = N;
              }
              return I;
            }();
            i.SequenceExpression = vt;
            var ar = /* @__PURE__ */ function() {
              function I(N) {
                this.type = a.Syntax.SpreadElement, this.argument = N;
              }
              return I;
            }();
            i.SpreadElement = ar;
            var Ze = /* @__PURE__ */ function() {
              function I(N, L) {
                this.type = a.Syntax.MemberExpression, this.computed = !1, this.object = N, this.property = L;
              }
              return I;
            }();
            i.StaticMemberExpression = Ze;
            var or = /* @__PURE__ */ function() {
              function I() {
                this.type = a.Syntax.Super;
              }
              return I;
            }();
            i.Super = or;
            var y = /* @__PURE__ */ function() {
              function I(N, L) {
                this.type = a.Syntax.SwitchCase, this.test = N, this.consequent = L;
              }
              return I;
            }();
            i.SwitchCase = y;
            var o = /* @__PURE__ */ function() {
              function I(N, L) {
                this.type = a.Syntax.SwitchStatement, this.discriminant = N, this.cases = L;
              }
              return I;
            }();
            i.SwitchStatement = o;
            var l = /* @__PURE__ */ function() {
              function I(N, L) {
                this.type = a.Syntax.TaggedTemplateExpression, this.tag = N, this.quasi = L;
              }
              return I;
            }();
            i.TaggedTemplateExpression = l;
            var C = /* @__PURE__ */ function() {
              function I(N, L) {
                this.type = a.Syntax.TemplateElement, this.value = N, this.tail = L;
              }
              return I;
            }();
            i.TemplateElement = C;
            var _ = /* @__PURE__ */ function() {
              function I(N, L) {
                this.type = a.Syntax.TemplateLiteral, this.quasis = N, this.expressions = L;
              }
              return I;
            }();
            i.TemplateLiteral = _;
            var B = /* @__PURE__ */ function() {
              function I() {
                this.type = a.Syntax.ThisExpression;
              }
              return I;
            }();
            i.ThisExpression = B;
            var R = /* @__PURE__ */ function() {
              function I(N) {
                this.type = a.Syntax.ThrowStatement, this.argument = N;
              }
              return I;
            }();
            i.ThrowStatement = R;
            var ne = /* @__PURE__ */ function() {
              function I(N, L, ee) {
                this.type = a.Syntax.TryStatement, this.block = N, this.handler = L, this.finalizer = ee;
              }
              return I;
            }();
            i.TryStatement = ne;
            var me = /* @__PURE__ */ function() {
              function I(N, L) {
                this.type = a.Syntax.UnaryExpression, this.operator = N, this.argument = L, this.prefix = !0;
              }
              return I;
            }();
            i.UnaryExpression = me;
            var pe = /* @__PURE__ */ function() {
              function I(N, L, ee) {
                this.type = a.Syntax.UpdateExpression, this.operator = N, this.argument = L, this.prefix = ee;
              }
              return I;
            }();
            i.UpdateExpression = pe;
            var xe = /* @__PURE__ */ function() {
              function I(N, L) {
                this.type = a.Syntax.VariableDeclaration, this.declarations = N, this.kind = L;
              }
              return I;
            }();
            i.VariableDeclaration = xe;
            var ce = /* @__PURE__ */ function() {
              function I(N, L) {
                this.type = a.Syntax.VariableDeclarator, this.id = N, this.init = L;
              }
              return I;
            }();
            i.VariableDeclarator = ce;
            var en = /* @__PURE__ */ function() {
              function I(N, L) {
                this.type = a.Syntax.WhileStatement, this.test = N, this.body = L;
              }
              return I;
            }();
            i.WhileStatement = en;
            var tn = /* @__PURE__ */ function() {
              function I(N, L) {
                this.type = a.Syntax.WithStatement, this.object = N, this.body = L;
              }
              return I;
            }();
            i.WithStatement = tn;
            var rn = /* @__PURE__ */ function() {
              function I(N, L) {
                this.type = a.Syntax.YieldExpression, this.argument = N, this.delegate = L;
              }
              return I;
            }();
            i.YieldExpression = rn;
          },
          /* 8 */
          /***/
          function(r, i, u) {
            Object.defineProperty(i, "__esModule", { value: !0 });
            var a = u(9), p = u(10), h = u(11), m = u(7), w = u(12), g = u(2), F = u(13), v = "ArrowParameterPlaceHolder", E = function() {
              function x(t, n, s) {
                n === void 0 && (n = {}), this.config = {
                  range: typeof n.range == "boolean" && n.range,
                  loc: typeof n.loc == "boolean" && n.loc,
                  source: null,
                  tokens: typeof n.tokens == "boolean" && n.tokens,
                  comment: typeof n.comment == "boolean" && n.comment,
                  tolerant: typeof n.tolerant == "boolean" && n.tolerant
                }, this.config.loc && n.source && n.source !== null && (this.config.source = String(n.source)), this.delegate = s, this.errorHandler = new p.ErrorHandler(), this.errorHandler.tolerant = this.config.tolerant, this.scanner = new w.Scanner(t, this.errorHandler), this.scanner.trackComment = this.config.comment, this.operatorPrecedence = {
                  ")": 0,
                  ";": 0,
                  ",": 0,
                  "=": 0,
                  "]": 0,
                  "||": 1,
                  "&&": 2,
                  "|": 3,
                  "^": 4,
                  "&": 5,
                  "==": 6,
                  "!=": 6,
                  "===": 6,
                  "!==": 6,
                  "<": 7,
                  ">": 7,
                  "<=": 7,
                  ">=": 7,
                  "<<": 8,
                  ">>": 8,
                  ">>>": 8,
                  "+": 9,
                  "-": 9,
                  "*": 11,
                  "/": 11,
                  "%": 11
                }, this.lookahead = {
                  type: 2,
                  value: "",
                  lineNumber: this.scanner.lineNumber,
                  lineStart: 0,
                  start: 0,
                  end: 0
                }, this.hasLineTerminator = !1, this.context = {
                  isModule: !1,
                  await: !1,
                  allowIn: !0,
                  allowStrictDirective: !0,
                  allowYield: !0,
                  firstCoverInitializedNameError: null,
                  isAssignmentTarget: !1,
                  isBindingElement: !1,
                  inFunctionBody: !1,
                  inIteration: !1,
                  inSwitch: !1,
                  labelSet: {},
                  strict: !1
                }, this.tokens = [], this.startMarker = {
                  index: 0,
                  line: this.scanner.lineNumber,
                  column: 0
                }, this.lastMarker = {
                  index: 0,
                  line: this.scanner.lineNumber,
                  column: 0
                }, this.nextToken(), this.lastMarker = {
                  index: this.scanner.index,
                  line: this.scanner.lineNumber,
                  column: this.scanner.index - this.scanner.lineStart
                };
              }
              return x.prototype.throwError = function(t) {
                var n = Array.prototype.slice.call(arguments, 1), s = t.replace(/%(\d)/g, function(A, b) {
                  return a.assert(b < n.length, "Message reference must be in range"), n[b];
                }), d = this.lastMarker.index, f = this.lastMarker.line, S = this.lastMarker.column + 1;
                throw this.errorHandler.createError(d, f, S, s);
              }, x.prototype.tolerateError = function(t) {
                var n = Array.prototype.slice.call(arguments, 1), s = t.replace(/%(\d)/g, function(A, b) {
                  return a.assert(b < n.length, "Message reference must be in range"), n[b];
                }), d = this.lastMarker.index, f = this.scanner.lineNumber, S = this.lastMarker.column + 1;
                this.errorHandler.tolerateError(d, f, S, s);
              }, x.prototype.unexpectedTokenError = function(t, n) {
                var s = n || h.Messages.UnexpectedToken, d;
                if (t ? (n || (s = t.type === 2 ? h.Messages.UnexpectedEOS : t.type === 3 ? h.Messages.UnexpectedIdentifier : t.type === 6 ? h.Messages.UnexpectedNumber : t.type === 8 ? h.Messages.UnexpectedString : t.type === 10 ? h.Messages.UnexpectedTemplate : h.Messages.UnexpectedToken, t.type === 4 && (this.scanner.isFutureReservedWord(t.value) ? s = h.Messages.UnexpectedReserved : this.context.strict && this.scanner.isStrictModeReservedWord(t.value) && (s = h.Messages.StrictReservedWord))), d = t.value) : d = "ILLEGAL", s = s.replace("%0", d), t && typeof t.lineNumber == "number") {
                  var f = t.start, S = t.lineNumber, A = this.lastMarker.index - this.lastMarker.column, b = t.start - A + 1;
                  return this.errorHandler.createError(f, S, b, s);
                } else {
                  var f = this.lastMarker.index, S = this.lastMarker.line, b = this.lastMarker.column + 1;
                  return this.errorHandler.createError(f, S, b, s);
                }
              }, x.prototype.throwUnexpectedToken = function(t, n) {
                throw this.unexpectedTokenError(t, n);
              }, x.prototype.tolerateUnexpectedToken = function(t, n) {
                this.errorHandler.tolerate(this.unexpectedTokenError(t, n));
              }, x.prototype.collectComments = function() {
                if (!this.config.comment)
                  this.scanner.scanComments();
                else {
                  var t = this.scanner.scanComments();
                  if (t.length > 0 && this.delegate)
                    for (var n = 0; n < t.length; ++n) {
                      var s = t[n], d = void 0;
                      d = {
                        type: s.multiLine ? "BlockComment" : "LineComment",
                        value: this.scanner.source.slice(s.slice[0], s.slice[1])
                      }, this.config.range && (d.range = s.range), this.config.loc && (d.loc = s.loc);
                      var f = {
                        start: {
                          line: s.loc.start.line,
                          column: s.loc.start.column,
                          offset: s.range[0]
                        },
                        end: {
                          line: s.loc.end.line,
                          column: s.loc.end.column,
                          offset: s.range[1]
                        }
                      };
                      this.delegate(d, f);
                    }
                }
              }, x.prototype.getTokenRaw = function(t) {
                return this.scanner.source.slice(t.start, t.end);
              }, x.prototype.convertToken = function(t) {
                var n = {
                  type: F.TokenName[t.type],
                  value: this.getTokenRaw(t)
                };
                if (this.config.range && (n.range = [t.start, t.end]), this.config.loc && (n.loc = {
                  start: {
                    line: this.startMarker.line,
                    column: this.startMarker.column
                  },
                  end: {
                    line: this.scanner.lineNumber,
                    column: this.scanner.index - this.scanner.lineStart
                  }
                }), t.type === 9) {
                  var s = t.pattern, d = t.flags;
                  n.regex = { pattern: s, flags: d };
                }
                return n;
              }, x.prototype.nextToken = function() {
                var t = this.lookahead;
                this.lastMarker.index = this.scanner.index, this.lastMarker.line = this.scanner.lineNumber, this.lastMarker.column = this.scanner.index - this.scanner.lineStart, this.collectComments(), this.scanner.index !== this.startMarker.index && (this.startMarker.index = this.scanner.index, this.startMarker.line = this.scanner.lineNumber, this.startMarker.column = this.scanner.index - this.scanner.lineStart);
                var n = this.scanner.lex();
                return this.hasLineTerminator = t.lineNumber !== n.lineNumber, n && this.context.strict && n.type === 3 && this.scanner.isStrictModeReservedWord(n.value) && (n.type = 4), this.lookahead = n, this.config.tokens && n.type !== 2 && this.tokens.push(this.convertToken(n)), t;
              }, x.prototype.nextRegexToken = function() {
                this.collectComments();
                var t = this.scanner.scanRegExp();
                return this.config.tokens && (this.tokens.pop(), this.tokens.push(this.convertToken(t))), this.lookahead = t, this.nextToken(), t;
              }, x.prototype.createNode = function() {
                return {
                  index: this.startMarker.index,
                  line: this.startMarker.line,
                  column: this.startMarker.column
                };
              }, x.prototype.startNode = function(t, n) {
                n === void 0 && (n = 0);
                var s = t.start - t.lineStart, d = t.lineNumber;
                return s < 0 && (s += n, d--), {
                  index: t.start,
                  line: d,
                  column: s
                };
              }, x.prototype.finalize = function(t, n) {
                if (this.config.range && (n.range = [t.index, this.lastMarker.index]), this.config.loc && (n.loc = {
                  start: {
                    line: t.line,
                    column: t.column
                  },
                  end: {
                    line: this.lastMarker.line,
                    column: this.lastMarker.column
                  }
                }, this.config.source && (n.loc.source = this.config.source)), this.delegate) {
                  var s = {
                    start: {
                      line: t.line,
                      column: t.column,
                      offset: t.index
                    },
                    end: {
                      line: this.lastMarker.line,
                      column: this.lastMarker.column,
                      offset: this.lastMarker.index
                    }
                  };
                  this.delegate(n, s);
                }
                return n;
              }, x.prototype.expect = function(t) {
                var n = this.nextToken();
                (n.type !== 7 || n.value !== t) && this.throwUnexpectedToken(n);
              }, x.prototype.expectCommaSeparator = function() {
                if (this.config.tolerant) {
                  var t = this.lookahead;
                  t.type === 7 && t.value === "," ? this.nextToken() : t.type === 7 && t.value === ";" ? (this.nextToken(), this.tolerateUnexpectedToken(t)) : this.tolerateUnexpectedToken(t, h.Messages.UnexpectedToken);
                } else
                  this.expect(",");
              }, x.prototype.expectKeyword = function(t) {
                var n = this.nextToken();
                (n.type !== 4 || n.value !== t) && this.throwUnexpectedToken(n);
              }, x.prototype.match = function(t) {
                return this.lookahead.type === 7 && this.lookahead.value === t;
              }, x.prototype.matchKeyword = function(t) {
                return this.lookahead.type === 4 && this.lookahead.value === t;
              }, x.prototype.matchContextualKeyword = function(t) {
                return this.lookahead.type === 3 && this.lookahead.value === t;
              }, x.prototype.matchAssign = function() {
                if (this.lookahead.type !== 7)
                  return !1;
                var t = this.lookahead.value;
                return t === "=" || t === "*=" || t === "**=" || t === "/=" || t === "%=" || t === "+=" || t === "-=" || t === "<<=" || t === ">>=" || t === ">>>=" || t === "&=" || t === "^=" || t === "|=";
              }, x.prototype.isolateCoverGrammar = function(t) {
                var n = this.context.isBindingElement, s = this.context.isAssignmentTarget, d = this.context.firstCoverInitializedNameError;
                this.context.isBindingElement = !0, this.context.isAssignmentTarget = !0, this.context.firstCoverInitializedNameError = null;
                var f = t.call(this);
                return this.context.firstCoverInitializedNameError !== null && this.throwUnexpectedToken(this.context.firstCoverInitializedNameError), this.context.isBindingElement = n, this.context.isAssignmentTarget = s, this.context.firstCoverInitializedNameError = d, f;
              }, x.prototype.inheritCoverGrammar = function(t) {
                var n = this.context.isBindingElement, s = this.context.isAssignmentTarget, d = this.context.firstCoverInitializedNameError;
                this.context.isBindingElement = !0, this.context.isAssignmentTarget = !0, this.context.firstCoverInitializedNameError = null;
                var f = t.call(this);
                return this.context.isBindingElement = this.context.isBindingElement && n, this.context.isAssignmentTarget = this.context.isAssignmentTarget && s, this.context.firstCoverInitializedNameError = d || this.context.firstCoverInitializedNameError, f;
              }, x.prototype.consumeSemicolon = function() {
                this.match(";") ? this.nextToken() : this.hasLineTerminator || (this.lookahead.type !== 2 && !this.match("}") && this.throwUnexpectedToken(this.lookahead), this.lastMarker.index = this.startMarker.index, this.lastMarker.line = this.startMarker.line, this.lastMarker.column = this.startMarker.column);
              }, x.prototype.parsePrimaryExpression = function() {
                var t = this.createNode(), n, s, d;
                switch (this.lookahead.type) {
                  case 3:
                    (this.context.isModule || this.context.await) && this.lookahead.value === "await" && this.tolerateUnexpectedToken(this.lookahead), n = this.matchAsyncFunction() ? this.parseFunctionExpression() : this.finalize(t, new m.Identifier(this.nextToken().value));
                    break;
                  case 6:
                  case 8:
                    this.context.strict && this.lookahead.octal && this.tolerateUnexpectedToken(this.lookahead, h.Messages.StrictOctalLiteral), this.context.isAssignmentTarget = !1, this.context.isBindingElement = !1, s = this.nextToken(), d = this.getTokenRaw(s), n = this.finalize(t, new m.Literal(s.value, d));
                    break;
                  case 1:
                    this.context.isAssignmentTarget = !1, this.context.isBindingElement = !1, s = this.nextToken(), d = this.getTokenRaw(s), n = this.finalize(t, new m.Literal(s.value === "true", d));
                    break;
                  case 5:
                    this.context.isAssignmentTarget = !1, this.context.isBindingElement = !1, s = this.nextToken(), d = this.getTokenRaw(s), n = this.finalize(t, new m.Literal(null, d));
                    break;
                  case 10:
                    n = this.parseTemplateLiteral();
                    break;
                  case 7:
                    switch (this.lookahead.value) {
                      case "(":
                        this.context.isBindingElement = !1, n = this.inheritCoverGrammar(this.parseGroupExpression);
                        break;
                      case "[":
                        n = this.inheritCoverGrammar(this.parseArrayInitializer);
                        break;
                      case "{":
                        n = this.inheritCoverGrammar(this.parseObjectInitializer);
                        break;
                      case "/":
                      case "/=":
                        this.context.isAssignmentTarget = !1, this.context.isBindingElement = !1, this.scanner.index = this.startMarker.index, s = this.nextRegexToken(), d = this.getTokenRaw(s), n = this.finalize(t, new m.RegexLiteral(s.regex, d, s.pattern, s.flags));
                        break;
                      default:
                        n = this.throwUnexpectedToken(this.nextToken());
                    }
                    break;
                  case 4:
                    !this.context.strict && this.context.allowYield && this.matchKeyword("yield") ? n = this.parseIdentifierName() : !this.context.strict && this.matchKeyword("let") ? n = this.finalize(t, new m.Identifier(this.nextToken().value)) : (this.context.isAssignmentTarget = !1, this.context.isBindingElement = !1, this.matchKeyword("function") ? n = this.parseFunctionExpression() : this.matchKeyword("this") ? (this.nextToken(), n = this.finalize(t, new m.ThisExpression())) : this.matchKeyword("class") ? n = this.parseClassExpression() : n = this.throwUnexpectedToken(this.nextToken()));
                    break;
                  default:
                    n = this.throwUnexpectedToken(this.nextToken());
                }
                return n;
              }, x.prototype.parseSpreadElement = function() {
                var t = this.createNode();
                this.expect("...");
                var n = this.inheritCoverGrammar(this.parseAssignmentExpression);
                return this.finalize(t, new m.SpreadElement(n));
              }, x.prototype.parseArrayInitializer = function() {
                var t = this.createNode(), n = [];
                for (this.expect("["); !this.match("]"); )
                  if (this.match(","))
                    this.nextToken(), n.push(null);
                  else if (this.match("...")) {
                    var s = this.parseSpreadElement();
                    this.match("]") || (this.context.isAssignmentTarget = !1, this.context.isBindingElement = !1, this.expect(",")), n.push(s);
                  } else
                    n.push(this.inheritCoverGrammar(this.parseAssignmentExpression)), this.match("]") || this.expect(",");
                return this.expect("]"), this.finalize(t, new m.ArrayExpression(n));
              }, x.prototype.parsePropertyMethod = function(t) {
                this.context.isAssignmentTarget = !1, this.context.isBindingElement = !1;
                var n = this.context.strict, s = this.context.allowStrictDirective;
                this.context.allowStrictDirective = t.simple;
                var d = this.isolateCoverGrammar(this.parseFunctionSourceElements);
                return this.context.strict && t.firstRestricted && this.tolerateUnexpectedToken(t.firstRestricted, t.message), this.context.strict && t.stricted && this.tolerateUnexpectedToken(t.stricted, t.message), this.context.strict = n, this.context.allowStrictDirective = s, d;
              }, x.prototype.parsePropertyMethodFunction = function() {
                var t = !1, n = this.createNode(), s = this.context.allowYield;
                this.context.allowYield = !0;
                var d = this.parseFormalParameters(), f = this.parsePropertyMethod(d);
                return this.context.allowYield = s, this.finalize(n, new m.FunctionExpression(null, d.params, f, t));
              }, x.prototype.parsePropertyMethodAsyncFunction = function() {
                var t = this.createNode(), n = this.context.allowYield, s = this.context.await;
                this.context.allowYield = !1, this.context.await = !0;
                var d = this.parseFormalParameters(), f = this.parsePropertyMethod(d);
                return this.context.allowYield = n, this.context.await = s, this.finalize(t, new m.AsyncFunctionExpression(null, d.params, f));
              }, x.prototype.parseObjectPropertyKey = function() {
                var t = this.createNode(), n = this.nextToken(), s;
                switch (n.type) {
                  case 8:
                  case 6:
                    this.context.strict && n.octal && this.tolerateUnexpectedToken(n, h.Messages.StrictOctalLiteral);
                    var d = this.getTokenRaw(n);
                    s = this.finalize(t, new m.Literal(n.value, d));
                    break;
                  case 3:
                  case 1:
                  case 5:
                  case 4:
                    s = this.finalize(t, new m.Identifier(n.value));
                    break;
                  case 7:
                    n.value === "[" ? (s = this.isolateCoverGrammar(this.parseAssignmentExpression), this.expect("]")) : s = this.throwUnexpectedToken(n);
                    break;
                  default:
                    s = this.throwUnexpectedToken(n);
                }
                return s;
              }, x.prototype.isPropertyKey = function(t, n) {
                return t.type === g.Syntax.Identifier && t.name === n || t.type === g.Syntax.Literal && t.value === n;
              }, x.prototype.parseObjectProperty = function(t) {
                var n = this.createNode(), s = this.lookahead, d, f = null, S = null, A = !1, b = !1, k = !1, T = !1;
                if (s.type === 3) {
                  var P = s.value;
                  this.nextToken(), A = this.match("["), T = !this.hasLineTerminator && P === "async" && !this.match(":") && !this.match("(") && !this.match("*") && !this.match(","), f = T ? this.parseObjectPropertyKey() : this.finalize(n, new m.Identifier(P));
                } else this.match("*") ? this.nextToken() : (A = this.match("["), f = this.parseObjectPropertyKey());
                var j = this.qualifiedPropertyName(this.lookahead);
                if (s.type === 3 && !T && s.value === "get" && j)
                  d = "get", A = this.match("["), f = this.parseObjectPropertyKey(), this.context.allowYield = !1, S = this.parseGetterMethod();
                else if (s.type === 3 && !T && s.value === "set" && j)
                  d = "set", A = this.match("["), f = this.parseObjectPropertyKey(), S = this.parseSetterMethod();
                else if (s.type === 7 && s.value === "*" && j)
                  d = "init", A = this.match("["), f = this.parseObjectPropertyKey(), S = this.parseGeneratorMethod(), b = !0;
                else if (f || this.throwUnexpectedToken(this.lookahead), d = "init", this.match(":") && !T)
                  !A && this.isPropertyKey(f, "__proto__") && (t.value && this.tolerateError(h.Messages.DuplicateProtoProperty), t.value = !0), this.nextToken(), S = this.inheritCoverGrammar(this.parseAssignmentExpression);
                else if (this.match("("))
                  S = T ? this.parsePropertyMethodAsyncFunction() : this.parsePropertyMethodFunction(), b = !0;
                else if (s.type === 3) {
                  var P = this.finalize(n, new m.Identifier(s.value));
                  if (this.match("=")) {
                    this.context.firstCoverInitializedNameError = this.lookahead, this.nextToken(), k = !0;
                    var M = this.isolateCoverGrammar(this.parseAssignmentExpression);
                    S = this.finalize(n, new m.AssignmentPattern(P, M));
                  } else
                    k = !0, S = P;
                } else
                  this.throwUnexpectedToken(this.nextToken());
                return this.finalize(n, new m.Property(d, f, A, S, b, k));
              }, x.prototype.parseObjectInitializer = function() {
                var t = this.createNode();
                this.expect("{");
                for (var n = [], s = { value: !1 }; !this.match("}"); )
                  n.push(this.parseObjectProperty(s)), this.match("}") || this.expectCommaSeparator();
                return this.expect("}"), this.finalize(t, new m.ObjectExpression(n));
              }, x.prototype.parseTemplateHead = function() {
                a.assert(this.lookahead.head, "Template literal must start with a template head");
                var t = this.createNode(), n = this.nextToken(), s = n.value, d = n.cooked;
                return this.finalize(t, new m.TemplateElement({ raw: s, cooked: d }, n.tail));
              }, x.prototype.parseTemplateElement = function() {
                this.lookahead.type !== 10 && this.throwUnexpectedToken();
                var t = this.createNode(), n = this.nextToken(), s = n.value, d = n.cooked;
                return this.finalize(t, new m.TemplateElement({ raw: s, cooked: d }, n.tail));
              }, x.prototype.parseTemplateLiteral = function() {
                var t = this.createNode(), n = [], s = [], d = this.parseTemplateHead();
                for (s.push(d); !d.tail; )
                  n.push(this.parseExpression()), d = this.parseTemplateElement(), s.push(d);
                return this.finalize(t, new m.TemplateLiteral(s, n));
              }, x.prototype.reinterpretExpressionAsPattern = function(t) {
                switch (t.type) {
                  case g.Syntax.Identifier:
                  case g.Syntax.MemberExpression:
                  case g.Syntax.RestElement:
                  case g.Syntax.AssignmentPattern:
                    break;
                  case g.Syntax.SpreadElement:
                    t.type = g.Syntax.RestElement, this.reinterpretExpressionAsPattern(t.argument);
                    break;
                  case g.Syntax.ArrayExpression:
                    t.type = g.Syntax.ArrayPattern;
                    for (var n = 0; n < t.elements.length; n++)
                      t.elements[n] !== null && this.reinterpretExpressionAsPattern(t.elements[n]);
                    break;
                  case g.Syntax.ObjectExpression:
                    t.type = g.Syntax.ObjectPattern;
                    for (var n = 0; n < t.properties.length; n++)
                      this.reinterpretExpressionAsPattern(t.properties[n].value);
                    break;
                  case g.Syntax.AssignmentExpression:
                    t.type = g.Syntax.AssignmentPattern, delete t.operator, this.reinterpretExpressionAsPattern(t.left);
                    break;
                }
              }, x.prototype.parseGroupExpression = function() {
                var t;
                if (this.expect("("), this.match(")"))
                  this.nextToken(), this.match("=>") || this.expect("=>"), t = {
                    type: v,
                    params: [],
                    async: !1
                  };
                else {
                  var n = this.lookahead, s = [];
                  if (this.match("..."))
                    t = this.parseRestElement(s), this.expect(")"), this.match("=>") || this.expect("=>"), t = {
                      type: v,
                      params: [t],
                      async: !1
                    };
                  else {
                    var d = !1;
                    if (this.context.isBindingElement = !0, t = this.inheritCoverGrammar(this.parseAssignmentExpression), this.match(",")) {
                      var f = [];
                      for (this.context.isAssignmentTarget = !1, f.push(t); this.lookahead.type !== 2 && this.match(","); ) {
                        if (this.nextToken(), this.match(")")) {
                          this.nextToken();
                          for (var S = 0; S < f.length; S++)
                            this.reinterpretExpressionAsPattern(f[S]);
                          d = !0, t = {
                            type: v,
                            params: f,
                            async: !1
                          };
                        } else if (this.match("...")) {
                          this.context.isBindingElement || this.throwUnexpectedToken(this.lookahead), f.push(this.parseRestElement(s)), this.expect(")"), this.match("=>") || this.expect("=>"), this.context.isBindingElement = !1;
                          for (var S = 0; S < f.length; S++)
                            this.reinterpretExpressionAsPattern(f[S]);
                          d = !0, t = {
                            type: v,
                            params: f,
                            async: !1
                          };
                        } else
                          f.push(this.inheritCoverGrammar(this.parseAssignmentExpression));
                        if (d)
                          break;
                      }
                      d || (t = this.finalize(this.startNode(n), new m.SequenceExpression(f)));
                    }
                    if (!d) {
                      if (this.expect(")"), this.match("=>") && (t.type === g.Syntax.Identifier && t.name === "yield" && (d = !0, t = {
                        type: v,
                        params: [t],
                        async: !1
                      }), !d)) {
                        if (this.context.isBindingElement || this.throwUnexpectedToken(this.lookahead), t.type === g.Syntax.SequenceExpression)
                          for (var S = 0; S < t.expressions.length; S++)
                            this.reinterpretExpressionAsPattern(t.expressions[S]);
                        else
                          this.reinterpretExpressionAsPattern(t);
                        var A = t.type === g.Syntax.SequenceExpression ? t.expressions : [t];
                        t = {
                          type: v,
                          params: A,
                          async: !1
                        };
                      }
                      this.context.isBindingElement = !1;
                    }
                  }
                }
                return t;
              }, x.prototype.parseArguments = function() {
                this.expect("(");
                var t = [];
                if (!this.match(")"))
                  for (; ; ) {
                    var n = this.match("...") ? this.parseSpreadElement() : this.isolateCoverGrammar(this.parseAssignmentExpression);
                    if (t.push(n), this.match(")") || (this.expectCommaSeparator(), this.match(")")))
                      break;
                  }
                return this.expect(")"), t;
              }, x.prototype.isIdentifierName = function(t) {
                return t.type === 3 || t.type === 4 || t.type === 1 || t.type === 5;
              }, x.prototype.parseIdentifierName = function() {
                var t = this.createNode(), n = this.nextToken();
                return this.isIdentifierName(n) || this.throwUnexpectedToken(n), this.finalize(t, new m.Identifier(n.value));
              }, x.prototype.parseNewExpression = function() {
                var t = this.createNode(), n = this.parseIdentifierName();
                a.assert(n.name === "new", "New expression must start with `new`");
                var s;
                if (this.match("."))
                  if (this.nextToken(), this.lookahead.type === 3 && this.context.inFunctionBody && this.lookahead.value === "target") {
                    var d = this.parseIdentifierName();
                    s = new m.MetaProperty(n, d);
                  } else
                    this.throwUnexpectedToken(this.lookahead);
                else {
                  var f = this.isolateCoverGrammar(this.parseLeftHandSideExpression), S = this.match("(") ? this.parseArguments() : [];
                  s = new m.NewExpression(f, S), this.context.isAssignmentTarget = !1, this.context.isBindingElement = !1;
                }
                return this.finalize(t, s);
              }, x.prototype.parseAsyncArgument = function() {
                var t = this.parseAssignmentExpression();
                return this.context.firstCoverInitializedNameError = null, t;
              }, x.prototype.parseAsyncArguments = function() {
                this.expect("(");
                var t = [];
                if (!this.match(")"))
                  for (; ; ) {
                    var n = this.match("...") ? this.parseSpreadElement() : this.isolateCoverGrammar(this.parseAsyncArgument);
                    if (t.push(n), this.match(")") || (this.expectCommaSeparator(), this.match(")")))
                      break;
                  }
                return this.expect(")"), t;
              }, x.prototype.parseLeftHandSideExpressionAllowCall = function() {
                var t = this.lookahead, n = this.matchContextualKeyword("async"), s = this.context.allowIn;
                this.context.allowIn = !0;
                var d;
                for (this.matchKeyword("super") && this.context.inFunctionBody ? (d = this.createNode(), this.nextToken(), d = this.finalize(d, new m.Super()), !this.match("(") && !this.match(".") && !this.match("[") && this.throwUnexpectedToken(this.lookahead)) : d = this.inheritCoverGrammar(this.matchKeyword("new") ? this.parseNewExpression : this.parsePrimaryExpression); ; )
                  if (this.match(".")) {
                    this.context.isBindingElement = !1, this.context.isAssignmentTarget = !0, this.expect(".");
                    var f = this.parseIdentifierName();
                    d = this.finalize(this.startNode(t), new m.StaticMemberExpression(d, f));
                  } else if (this.match("(")) {
                    var S = n && t.lineNumber === this.lookahead.lineNumber;
                    this.context.isBindingElement = !1, this.context.isAssignmentTarget = !1;
                    var A = S ? this.parseAsyncArguments() : this.parseArguments();
                    if (d = this.finalize(this.startNode(t), new m.CallExpression(d, A)), S && this.match("=>")) {
                      for (var b = 0; b < A.length; ++b)
                        this.reinterpretExpressionAsPattern(A[b]);
                      d = {
                        type: v,
                        params: A,
                        async: !0
                      };
                    }
                  } else if (this.match("[")) {
                    this.context.isBindingElement = !1, this.context.isAssignmentTarget = !0, this.expect("[");
                    var f = this.isolateCoverGrammar(this.parseExpression);
                    this.expect("]"), d = this.finalize(this.startNode(t), new m.ComputedMemberExpression(d, f));
                  } else if (this.lookahead.type === 10 && this.lookahead.head) {
                    var k = this.parseTemplateLiteral();
                    d = this.finalize(this.startNode(t), new m.TaggedTemplateExpression(d, k));
                  } else
                    break;
                return this.context.allowIn = s, d;
              }, x.prototype.parseSuper = function() {
                var t = this.createNode();
                return this.expectKeyword("super"), !this.match("[") && !this.match(".") && this.throwUnexpectedToken(this.lookahead), this.finalize(t, new m.Super());
              }, x.prototype.parseLeftHandSideExpression = function() {
                a.assert(this.context.allowIn, "callee of new expression always allow in keyword.");
                for (var t = this.startNode(this.lookahead), n = this.matchKeyword("super") && this.context.inFunctionBody ? this.parseSuper() : this.inheritCoverGrammar(this.matchKeyword("new") ? this.parseNewExpression : this.parsePrimaryExpression); ; )
                  if (this.match("[")) {
                    this.context.isBindingElement = !1, this.context.isAssignmentTarget = !0, this.expect("[");
                    var s = this.isolateCoverGrammar(this.parseExpression);
                    this.expect("]"), n = this.finalize(t, new m.ComputedMemberExpression(n, s));
                  } else if (this.match(".")) {
                    this.context.isBindingElement = !1, this.context.isAssignmentTarget = !0, this.expect(".");
                    var s = this.parseIdentifierName();
                    n = this.finalize(t, new m.StaticMemberExpression(n, s));
                  } else if (this.lookahead.type === 10 && this.lookahead.head) {
                    var d = this.parseTemplateLiteral();
                    n = this.finalize(t, new m.TaggedTemplateExpression(n, d));
                  } else
                    break;
                return n;
              }, x.prototype.parseUpdateExpression = function() {
                var t, n = this.lookahead;
                if (this.match("++") || this.match("--")) {
                  var s = this.startNode(n), d = this.nextToken();
                  t = this.inheritCoverGrammar(this.parseUnaryExpression), this.context.strict && t.type === g.Syntax.Identifier && this.scanner.isRestrictedWord(t.name) && this.tolerateError(h.Messages.StrictLHSPrefix), this.context.isAssignmentTarget || this.tolerateError(h.Messages.InvalidLHSInAssignment);
                  var f = !0;
                  t = this.finalize(s, new m.UpdateExpression(d.value, t, f)), this.context.isAssignmentTarget = !1, this.context.isBindingElement = !1;
                } else if (t = this.inheritCoverGrammar(this.parseLeftHandSideExpressionAllowCall), !this.hasLineTerminator && this.lookahead.type === 7 && (this.match("++") || this.match("--"))) {
                  this.context.strict && t.type === g.Syntax.Identifier && this.scanner.isRestrictedWord(t.name) && this.tolerateError(h.Messages.StrictLHSPostfix), this.context.isAssignmentTarget || this.tolerateError(h.Messages.InvalidLHSInAssignment), this.context.isAssignmentTarget = !1, this.context.isBindingElement = !1;
                  var S = this.nextToken().value, f = !1;
                  t = this.finalize(this.startNode(n), new m.UpdateExpression(S, t, f));
                }
                return t;
              }, x.prototype.parseAwaitExpression = function() {
                var t = this.createNode();
                this.nextToken();
                var n = this.parseUnaryExpression();
                return this.finalize(t, new m.AwaitExpression(n));
              }, x.prototype.parseUnaryExpression = function() {
                var t;
                if (this.match("+") || this.match("-") || this.match("~") || this.match("!") || this.matchKeyword("delete") || this.matchKeyword("void") || this.matchKeyword("typeof")) {
                  var n = this.startNode(this.lookahead), s = this.nextToken();
                  t = this.inheritCoverGrammar(this.parseUnaryExpression), t = this.finalize(n, new m.UnaryExpression(s.value, t)), this.context.strict && t.operator === "delete" && t.argument.type === g.Syntax.Identifier && this.tolerateError(h.Messages.StrictDelete), this.context.isAssignmentTarget = !1, this.context.isBindingElement = !1;
                } else this.context.await && this.matchContextualKeyword("await") ? t = this.parseAwaitExpression() : t = this.parseUpdateExpression();
                return t;
              }, x.prototype.parseExponentiationExpression = function() {
                var t = this.lookahead, n = this.inheritCoverGrammar(this.parseUnaryExpression);
                if (n.type !== g.Syntax.UnaryExpression && this.match("**")) {
                  this.nextToken(), this.context.isAssignmentTarget = !1, this.context.isBindingElement = !1;
                  var s = n, d = this.isolateCoverGrammar(this.parseExponentiationExpression);
                  n = this.finalize(this.startNode(t), new m.BinaryExpression("**", s, d));
                }
                return n;
              }, x.prototype.binaryPrecedence = function(t) {
                var n = t.value, s;
                return t.type === 7 ? s = this.operatorPrecedence[n] || 0 : t.type === 4 ? s = n === "instanceof" || this.context.allowIn && n === "in" ? 7 : 0 : s = 0, s;
              }, x.prototype.parseBinaryExpression = function() {
                var t = this.lookahead, n = this.inheritCoverGrammar(this.parseExponentiationExpression), s = this.lookahead, d = this.binaryPrecedence(s);
                if (d > 0) {
                  this.nextToken(), this.context.isAssignmentTarget = !1, this.context.isBindingElement = !1;
                  for (var f = [t, this.lookahead], S = n, A = this.isolateCoverGrammar(this.parseExponentiationExpression), b = [S, s.value, A], k = [d]; d = this.binaryPrecedence(this.lookahead), !(d <= 0); ) {
                    for (; b.length > 2 && d <= k[k.length - 1]; ) {
                      A = b.pop();
                      var T = b.pop();
                      k.pop(), S = b.pop(), f.pop();
                      var P = this.startNode(f[f.length - 1]);
                      b.push(this.finalize(P, new m.BinaryExpression(T, S, A)));
                    }
                    b.push(this.nextToken().value), k.push(d), f.push(this.lookahead), b.push(this.isolateCoverGrammar(this.parseExponentiationExpression));
                  }
                  var j = b.length - 1;
                  n = b[j];
                  for (var M = f.pop(); j > 1; ) {
                    var Z = f.pop(), V = M && M.lineStart, P = this.startNode(Z, V), T = b[j - 1];
                    n = this.finalize(P, new m.BinaryExpression(T, b[j - 2], n)), j -= 2, M = Z;
                  }
                }
                return n;
              }, x.prototype.parseConditionalExpression = function() {
                var t = this.lookahead, n = this.inheritCoverGrammar(this.parseBinaryExpression);
                if (this.match("?")) {
                  this.nextToken();
                  var s = this.context.allowIn;
                  this.context.allowIn = !0;
                  var d = this.isolateCoverGrammar(this.parseAssignmentExpression);
                  this.context.allowIn = s, this.expect(":");
                  var f = this.isolateCoverGrammar(this.parseAssignmentExpression);
                  n = this.finalize(this.startNode(t), new m.ConditionalExpression(n, d, f)), this.context.isAssignmentTarget = !1, this.context.isBindingElement = !1;
                }
                return n;
              }, x.prototype.checkPatternParam = function(t, n) {
                switch (n.type) {
                  case g.Syntax.Identifier:
                    this.validateParam(t, n, n.name);
                    break;
                  case g.Syntax.RestElement:
                    this.checkPatternParam(t, n.argument);
                    break;
                  case g.Syntax.AssignmentPattern:
                    this.checkPatternParam(t, n.left);
                    break;
                  case g.Syntax.ArrayPattern:
                    for (var s = 0; s < n.elements.length; s++)
                      n.elements[s] !== null && this.checkPatternParam(t, n.elements[s]);
                    break;
                  case g.Syntax.ObjectPattern:
                    for (var s = 0; s < n.properties.length; s++)
                      this.checkPatternParam(t, n.properties[s].value);
                    break;
                }
                t.simple = t.simple && n instanceof m.Identifier;
              }, x.prototype.reinterpretAsCoverFormalsList = function(t) {
                var n = [t], s, d = !1;
                switch (t.type) {
                  case g.Syntax.Identifier:
                    break;
                  case v:
                    n = t.params, d = t.async;
                    break;
                  default:
                    return null;
                }
                s = {
                  simple: !0,
                  paramSet: {}
                };
                for (var f = 0; f < n.length; ++f) {
                  var S = n[f];
                  S.type === g.Syntax.AssignmentPattern ? S.right.type === g.Syntax.YieldExpression && (S.right.argument && this.throwUnexpectedToken(this.lookahead), S.right.type = g.Syntax.Identifier, S.right.name = "yield", delete S.right.argument, delete S.right.delegate) : d && S.type === g.Syntax.Identifier && S.name === "await" && this.throwUnexpectedToken(this.lookahead), this.checkPatternParam(s, S), n[f] = S;
                }
                if (this.context.strict || !this.context.allowYield)
                  for (var f = 0; f < n.length; ++f) {
                    var S = n[f];
                    S.type === g.Syntax.YieldExpression && this.throwUnexpectedToken(this.lookahead);
                  }
                if (s.message === h.Messages.StrictParamDupe) {
                  var A = this.context.strict ? s.stricted : s.firstRestricted;
                  this.throwUnexpectedToken(A, s.message);
                }
                return {
                  simple: s.simple,
                  params: n,
                  stricted: s.stricted,
                  firstRestricted: s.firstRestricted,
                  message: s.message
                };
              }, x.prototype.parseAssignmentExpression = function() {
                var t;
                if (!this.context.allowYield && this.matchKeyword("yield"))
                  t = this.parseYieldExpression();
                else {
                  var n = this.lookahead, s = n;
                  if (t = this.parseConditionalExpression(), s.type === 3 && s.lineNumber === this.lookahead.lineNumber && s.value === "async" && (this.lookahead.type === 3 || this.matchKeyword("yield"))) {
                    var d = this.parsePrimaryExpression();
                    this.reinterpretExpressionAsPattern(d), t = {
                      type: v,
                      params: [d],
                      async: !0
                    };
                  }
                  if (t.type === v || this.match("=>")) {
                    this.context.isAssignmentTarget = !1, this.context.isBindingElement = !1;
                    var f = t.async, S = this.reinterpretAsCoverFormalsList(t);
                    if (S) {
                      this.hasLineTerminator && this.tolerateUnexpectedToken(this.lookahead), this.context.firstCoverInitializedNameError = null;
                      var A = this.context.strict, b = this.context.allowStrictDirective;
                      this.context.allowStrictDirective = S.simple;
                      var k = this.context.allowYield, T = this.context.await;
                      this.context.allowYield = !0, this.context.await = f;
                      var P = this.startNode(n);
                      this.expect("=>");
                      var j = void 0;
                      if (this.match("{")) {
                        var M = this.context.allowIn;
                        this.context.allowIn = !0, j = this.parseFunctionSourceElements(), this.context.allowIn = M;
                      } else
                        j = this.isolateCoverGrammar(this.parseAssignmentExpression);
                      var Z = j.type !== g.Syntax.BlockStatement;
                      this.context.strict && S.firstRestricted && this.throwUnexpectedToken(S.firstRestricted, S.message), this.context.strict && S.stricted && this.tolerateUnexpectedToken(S.stricted, S.message), t = f ? this.finalize(P, new m.AsyncArrowFunctionExpression(S.params, j, Z)) : this.finalize(P, new m.ArrowFunctionExpression(S.params, j, Z)), this.context.strict = A, this.context.allowStrictDirective = b, this.context.allowYield = k, this.context.await = T;
                    }
                  } else if (this.matchAssign()) {
                    if (this.context.isAssignmentTarget || this.tolerateError(h.Messages.InvalidLHSInAssignment), this.context.strict && t.type === g.Syntax.Identifier) {
                      var V = t;
                      this.scanner.isRestrictedWord(V.name) && this.tolerateUnexpectedToken(s, h.Messages.StrictLHSAssignment), this.scanner.isStrictModeReservedWord(V.name) && this.tolerateUnexpectedToken(s, h.Messages.StrictReservedWord);
                    }
                    this.match("=") ? this.reinterpretExpressionAsPattern(t) : (this.context.isAssignmentTarget = !1, this.context.isBindingElement = !1), s = this.nextToken();
                    var J = s.value, H = this.isolateCoverGrammar(this.parseAssignmentExpression);
                    t = this.finalize(this.startNode(n), new m.AssignmentExpression(J, t, H)), this.context.firstCoverInitializedNameError = null;
                  }
                }
                return t;
              }, x.prototype.parseExpression = function() {
                var t = this.lookahead, n = this.isolateCoverGrammar(this.parseAssignmentExpression);
                if (this.match(",")) {
                  var s = [];
                  for (s.push(n); this.lookahead.type !== 2 && this.match(","); )
                    this.nextToken(), s.push(this.isolateCoverGrammar(this.parseAssignmentExpression));
                  n = this.finalize(this.startNode(t), new m.SequenceExpression(s));
                }
                return n;
              }, x.prototype.parseStatementListItem = function() {
                var t;
                if (this.context.isAssignmentTarget = !0, this.context.isBindingElement = !0, this.lookahead.type === 4)
                  switch (this.lookahead.value) {
                    case "export":
                      this.context.isModule || this.tolerateUnexpectedToken(this.lookahead, h.Messages.IllegalExportDeclaration), t = this.parseExportDeclaration();
                      break;
                    case "import":
                      this.context.isModule || this.tolerateUnexpectedToken(this.lookahead, h.Messages.IllegalImportDeclaration), t = this.parseImportDeclaration();
                      break;
                    case "const":
                      t = this.parseLexicalDeclaration({ inFor: !1 });
                      break;
                    case "function":
                      t = this.parseFunctionDeclaration();
                      break;
                    case "class":
                      t = this.parseClassDeclaration();
                      break;
                    case "let":
                      t = this.isLexicalDeclaration() ? this.parseLexicalDeclaration({ inFor: !1 }) : this.parseStatement();
                      break;
                    default:
                      t = this.parseStatement();
                      break;
                  }
                else
                  t = this.parseStatement();
                return t;
              }, x.prototype.parseBlock = function() {
                var t = this.createNode();
                this.expect("{");
                for (var n = []; !this.match("}"); )
                  n.push(this.parseStatementListItem());
                return this.expect("}"), this.finalize(t, new m.BlockStatement(n));
              }, x.prototype.parseLexicalBinding = function(t, n) {
                var s = this.createNode(), d = [], f = this.parsePattern(d, t);
                this.context.strict && f.type === g.Syntax.Identifier && this.scanner.isRestrictedWord(f.name) && this.tolerateError(h.Messages.StrictVarName);
                var S = null;
                return t === "const" ? !this.matchKeyword("in") && !this.matchContextualKeyword("of") && (this.match("=") ? (this.nextToken(), S = this.isolateCoverGrammar(this.parseAssignmentExpression)) : this.throwError(h.Messages.DeclarationMissingInitializer, "const")) : (!n.inFor && f.type !== g.Syntax.Identifier || this.match("=")) && (this.expect("="), S = this.isolateCoverGrammar(this.parseAssignmentExpression)), this.finalize(s, new m.VariableDeclarator(f, S));
              }, x.prototype.parseBindingList = function(t, n) {
                for (var s = [this.parseLexicalBinding(t, n)]; this.match(","); )
                  this.nextToken(), s.push(this.parseLexicalBinding(t, n));
                return s;
              }, x.prototype.isLexicalDeclaration = function() {
                var t = this.scanner.saveState();
                this.scanner.scanComments();
                var n = this.scanner.lex();
                return this.scanner.restoreState(t), n.type === 3 || n.type === 7 && n.value === "[" || n.type === 7 && n.value === "{" || n.type === 4 && n.value === "let" || n.type === 4 && n.value === "yield";
              }, x.prototype.parseLexicalDeclaration = function(t) {
                var n = this.createNode(), s = this.nextToken().value;
                a.assert(s === "let" || s === "const", "Lexical declaration must be either let or const");
                var d = this.parseBindingList(s, t);
                return this.consumeSemicolon(), this.finalize(n, new m.VariableDeclaration(d, s));
              }, x.prototype.parseBindingRestElement = function(t, n) {
                var s = this.createNode();
                this.expect("...");
                var d = this.parsePattern(t, n);
                return this.finalize(s, new m.RestElement(d));
              }, x.prototype.parseArrayPattern = function(t, n) {
                var s = this.createNode();
                this.expect("[");
                for (var d = []; !this.match("]"); )
                  if (this.match(","))
                    this.nextToken(), d.push(null);
                  else {
                    if (this.match("...")) {
                      d.push(this.parseBindingRestElement(t, n));
                      break;
                    } else
                      d.push(this.parsePatternWithDefault(t, n));
                    this.match("]") || this.expect(",");
                  }
                return this.expect("]"), this.finalize(s, new m.ArrayPattern(d));
              }, x.prototype.parsePropertyPattern = function(t, n) {
                var s = this.createNode(), d = !1, f = !1, S = !1, A, b;
                if (this.lookahead.type === 3) {
                  var k = this.lookahead;
                  A = this.parseVariableIdentifier();
                  var T = this.finalize(s, new m.Identifier(k.value));
                  if (this.match("=")) {
                    t.push(k), f = !0, this.nextToken();
                    var P = this.parseAssignmentExpression();
                    b = this.finalize(this.startNode(k), new m.AssignmentPattern(T, P));
                  } else this.match(":") ? (this.expect(":"), b = this.parsePatternWithDefault(t, n)) : (t.push(k), f = !0, b = T);
                } else
                  d = this.match("["), A = this.parseObjectPropertyKey(), this.expect(":"), b = this.parsePatternWithDefault(t, n);
                return this.finalize(s, new m.Property("init", A, d, b, S, f));
              }, x.prototype.parseObjectPattern = function(t, n) {
                var s = this.createNode(), d = [];
                for (this.expect("{"); !this.match("}"); )
                  d.push(this.parsePropertyPattern(t, n)), this.match("}") || this.expect(",");
                return this.expect("}"), this.finalize(s, new m.ObjectPattern(d));
              }, x.prototype.parsePattern = function(t, n) {
                var s;
                return this.match("[") ? s = this.parseArrayPattern(t, n) : this.match("{") ? s = this.parseObjectPattern(t, n) : (this.matchKeyword("let") && (n === "const" || n === "let") && this.tolerateUnexpectedToken(this.lookahead, h.Messages.LetInLexicalBinding), t.push(this.lookahead), s = this.parseVariableIdentifier(n)), s;
              }, x.prototype.parsePatternWithDefault = function(t, n) {
                var s = this.lookahead, d = this.parsePattern(t, n);
                if (this.match("=")) {
                  this.nextToken();
                  var f = this.context.allowYield;
                  this.context.allowYield = !0;
                  var S = this.isolateCoverGrammar(this.parseAssignmentExpression);
                  this.context.allowYield = f, d = this.finalize(this.startNode(s), new m.AssignmentPattern(d, S));
                }
                return d;
              }, x.prototype.parseVariableIdentifier = function(t) {
                var n = this.createNode(), s = this.nextToken();
                return s.type === 4 && s.value === "yield" ? this.context.strict ? this.tolerateUnexpectedToken(s, h.Messages.StrictReservedWord) : this.context.allowYield || this.throwUnexpectedToken(s) : s.type !== 3 ? this.context.strict && s.type === 4 && this.scanner.isStrictModeReservedWord(s.value) ? this.tolerateUnexpectedToken(s, h.Messages.StrictReservedWord) : (this.context.strict || s.value !== "let" || t !== "var") && this.throwUnexpectedToken(s) : (this.context.isModule || this.context.await) && s.type === 3 && s.value === "await" && this.tolerateUnexpectedToken(s), this.finalize(n, new m.Identifier(s.value));
              }, x.prototype.parseVariableDeclaration = function(t) {
                var n = this.createNode(), s = [], d = this.parsePattern(s, "var");
                this.context.strict && d.type === g.Syntax.Identifier && this.scanner.isRestrictedWord(d.name) && this.tolerateError(h.Messages.StrictVarName);
                var f = null;
                return this.match("=") ? (this.nextToken(), f = this.isolateCoverGrammar(this.parseAssignmentExpression)) : d.type !== g.Syntax.Identifier && !t.inFor && this.expect("="), this.finalize(n, new m.VariableDeclarator(d, f));
              }, x.prototype.parseVariableDeclarationList = function(t) {
                var n = { inFor: t.inFor }, s = [];
                for (s.push(this.parseVariableDeclaration(n)); this.match(","); )
                  this.nextToken(), s.push(this.parseVariableDeclaration(n));
                return s;
              }, x.prototype.parseVariableStatement = function() {
                var t = this.createNode();
                this.expectKeyword("var");
                var n = this.parseVariableDeclarationList({ inFor: !1 });
                return this.consumeSemicolon(), this.finalize(t, new m.VariableDeclaration(n, "var"));
              }, x.prototype.parseEmptyStatement = function() {
                var t = this.createNode();
                return this.expect(";"), this.finalize(t, new m.EmptyStatement());
              }, x.prototype.parseExpressionStatement = function() {
                var t = this.createNode(), n = this.parseExpression();
                return this.consumeSemicolon(), this.finalize(t, new m.ExpressionStatement(n));
              }, x.prototype.parseIfClause = function() {
                return this.context.strict && this.matchKeyword("function") && this.tolerateError(h.Messages.StrictFunction), this.parseStatement();
              }, x.prototype.parseIfStatement = function() {
                var t = this.createNode(), n, s = null;
                this.expectKeyword("if"), this.expect("(");
                var d = this.parseExpression();
                return !this.match(")") && this.config.tolerant ? (this.tolerateUnexpectedToken(this.nextToken()), n = this.finalize(this.createNode(), new m.EmptyStatement())) : (this.expect(")"), n = this.parseIfClause(), this.matchKeyword("else") && (this.nextToken(), s = this.parseIfClause())), this.finalize(t, new m.IfStatement(d, n, s));
              }, x.prototype.parseDoWhileStatement = function() {
                var t = this.createNode();
                this.expectKeyword("do");
                var n = this.context.inIteration;
                this.context.inIteration = !0;
                var s = this.parseStatement();
                this.context.inIteration = n, this.expectKeyword("while"), this.expect("(");
                var d = this.parseExpression();
                return !this.match(")") && this.config.tolerant ? this.tolerateUnexpectedToken(this.nextToken()) : (this.expect(")"), this.match(";") && this.nextToken()), this.finalize(t, new m.DoWhileStatement(s, d));
              }, x.prototype.parseWhileStatement = function() {
                var t = this.createNode(), n;
                this.expectKeyword("while"), this.expect("(");
                var s = this.parseExpression();
                if (!this.match(")") && this.config.tolerant)
                  this.tolerateUnexpectedToken(this.nextToken()), n = this.finalize(this.createNode(), new m.EmptyStatement());
                else {
                  this.expect(")");
                  var d = this.context.inIteration;
                  this.context.inIteration = !0, n = this.parseStatement(), this.context.inIteration = d;
                }
                return this.finalize(t, new m.WhileStatement(s, n));
              }, x.prototype.parseForStatement = function() {
                var t = null, n = null, s = null, d = !0, f, S, A = this.createNode();
                if (this.expectKeyword("for"), this.expect("("), this.match(";"))
                  this.nextToken();
                else if (this.matchKeyword("var")) {
                  t = this.createNode(), this.nextToken();
                  var b = this.context.allowIn;
                  this.context.allowIn = !1;
                  var k = this.parseVariableDeclarationList({ inFor: !0 });
                  if (this.context.allowIn = b, k.length === 1 && this.matchKeyword("in")) {
                    var T = k[0];
                    T.init && (T.id.type === g.Syntax.ArrayPattern || T.id.type === g.Syntax.ObjectPattern || this.context.strict) && this.tolerateError(h.Messages.ForInOfLoopInitializer, "for-in"), t = this.finalize(t, new m.VariableDeclaration(k, "var")), this.nextToken(), f = t, S = this.parseExpression(), t = null;
                  } else k.length === 1 && k[0].init === null && this.matchContextualKeyword("of") ? (t = this.finalize(t, new m.VariableDeclaration(k, "var")), this.nextToken(), f = t, S = this.parseAssignmentExpression(), t = null, d = !1) : (t = this.finalize(t, new m.VariableDeclaration(k, "var")), this.expect(";"));
                } else if (this.matchKeyword("const") || this.matchKeyword("let")) {
                  t = this.createNode();
                  var P = this.nextToken().value;
                  if (!this.context.strict && this.lookahead.value === "in")
                    t = this.finalize(t, new m.Identifier(P)), this.nextToken(), f = t, S = this.parseExpression(), t = null;
                  else {
                    var b = this.context.allowIn;
                    this.context.allowIn = !1;
                    var k = this.parseBindingList(P, { inFor: !0 });
                    this.context.allowIn = b, k.length === 1 && k[0].init === null && this.matchKeyword("in") ? (t = this.finalize(t, new m.VariableDeclaration(k, P)), this.nextToken(), f = t, S = this.parseExpression(), t = null) : k.length === 1 && k[0].init === null && this.matchContextualKeyword("of") ? (t = this.finalize(t, new m.VariableDeclaration(k, P)), this.nextToken(), f = t, S = this.parseAssignmentExpression(), t = null, d = !1) : (this.consumeSemicolon(), t = this.finalize(t, new m.VariableDeclaration(k, P)));
                  }
                } else {
                  var j = this.lookahead, b = this.context.allowIn;
                  if (this.context.allowIn = !1, t = this.inheritCoverGrammar(this.parseAssignmentExpression), this.context.allowIn = b, this.matchKeyword("in"))
                    (!this.context.isAssignmentTarget || t.type === g.Syntax.AssignmentExpression) && this.tolerateError(h.Messages.InvalidLHSInForIn), this.nextToken(), this.reinterpretExpressionAsPattern(t), f = t, S = this.parseExpression(), t = null;
                  else if (this.matchContextualKeyword("of"))
                    (!this.context.isAssignmentTarget || t.type === g.Syntax.AssignmentExpression) && this.tolerateError(h.Messages.InvalidLHSInForLoop), this.nextToken(), this.reinterpretExpressionAsPattern(t), f = t, S = this.parseAssignmentExpression(), t = null, d = !1;
                  else {
                    if (this.match(",")) {
                      for (var M = [t]; this.match(","); )
                        this.nextToken(), M.push(this.isolateCoverGrammar(this.parseAssignmentExpression));
                      t = this.finalize(this.startNode(j), new m.SequenceExpression(M));
                    }
                    this.expect(";");
                  }
                }
                typeof f > "u" && (this.match(";") || (n = this.parseExpression()), this.expect(";"), this.match(")") || (s = this.parseExpression()));
                var Z;
                if (!this.match(")") && this.config.tolerant)
                  this.tolerateUnexpectedToken(this.nextToken()), Z = this.finalize(this.createNode(), new m.EmptyStatement());
                else {
                  this.expect(")");
                  var V = this.context.inIteration;
                  this.context.inIteration = !0, Z = this.isolateCoverGrammar(this.parseStatement), this.context.inIteration = V;
                }
                return typeof f > "u" ? this.finalize(A, new m.ForStatement(t, n, s, Z)) : d ? this.finalize(A, new m.ForInStatement(f, S, Z)) : this.finalize(A, new m.ForOfStatement(f, S, Z));
              }, x.prototype.parseContinueStatement = function() {
                var t = this.createNode();
                this.expectKeyword("continue");
                var n = null;
                if (this.lookahead.type === 3 && !this.hasLineTerminator) {
                  var s = this.parseVariableIdentifier();
                  n = s;
                  var d = "$" + s.name;
                  Object.prototype.hasOwnProperty.call(this.context.labelSet, d) || this.throwError(h.Messages.UnknownLabel, s.name);
                }
                return this.consumeSemicolon(), n === null && !this.context.inIteration && this.throwError(h.Messages.IllegalContinue), this.finalize(t, new m.ContinueStatement(n));
              }, x.prototype.parseBreakStatement = function() {
                var t = this.createNode();
                this.expectKeyword("break");
                var n = null;
                if (this.lookahead.type === 3 && !this.hasLineTerminator) {
                  var s = this.parseVariableIdentifier(), d = "$" + s.name;
                  Object.prototype.hasOwnProperty.call(this.context.labelSet, d) || this.throwError(h.Messages.UnknownLabel, s.name), n = s;
                }
                return this.consumeSemicolon(), n === null && !this.context.inIteration && !this.context.inSwitch && this.throwError(h.Messages.IllegalBreak), this.finalize(t, new m.BreakStatement(n));
              }, x.prototype.parseReturnStatement = function() {
                this.context.inFunctionBody || this.tolerateError(h.Messages.IllegalReturn);
                var t = this.createNode();
                this.expectKeyword("return");
                var n = !this.match(";") && !this.match("}") && !this.hasLineTerminator && this.lookahead.type !== 2 || this.lookahead.type === 8 || this.lookahead.type === 10, s = n ? this.parseExpression() : null;
                return this.consumeSemicolon(), this.finalize(t, new m.ReturnStatement(s));
              }, x.prototype.parseWithStatement = function() {
                this.context.strict && this.tolerateError(h.Messages.StrictModeWith);
                var t = this.createNode(), n;
                this.expectKeyword("with"), this.expect("(");
                var s = this.parseExpression();
                return !this.match(")") && this.config.tolerant ? (this.tolerateUnexpectedToken(this.nextToken()), n = this.finalize(this.createNode(), new m.EmptyStatement())) : (this.expect(")"), n = this.parseStatement()), this.finalize(t, new m.WithStatement(s, n));
              }, x.prototype.parseSwitchCase = function() {
                var t = this.createNode(), n;
                this.matchKeyword("default") ? (this.nextToken(), n = null) : (this.expectKeyword("case"), n = this.parseExpression()), this.expect(":");
                for (var s = []; !(this.match("}") || this.matchKeyword("default") || this.matchKeyword("case")); )
                  s.push(this.parseStatementListItem());
                return this.finalize(t, new m.SwitchCase(n, s));
              }, x.prototype.parseSwitchStatement = function() {
                var t = this.createNode();
                this.expectKeyword("switch"), this.expect("(");
                var n = this.parseExpression();
                this.expect(")");
                var s = this.context.inSwitch;
                this.context.inSwitch = !0;
                var d = [], f = !1;
                for (this.expect("{"); !this.match("}"); ) {
                  var S = this.parseSwitchCase();
                  S.test === null && (f && this.throwError(h.Messages.MultipleDefaultsInSwitch), f = !0), d.push(S);
                }
                return this.expect("}"), this.context.inSwitch = s, this.finalize(t, new m.SwitchStatement(n, d));
              }, x.prototype.parseLabelledStatement = function() {
                var t = this.createNode(), n = this.parseExpression(), s;
                if (n.type === g.Syntax.Identifier && this.match(":")) {
                  this.nextToken();
                  var d = n, f = "$" + d.name;
                  Object.prototype.hasOwnProperty.call(this.context.labelSet, f) && this.throwError(h.Messages.Redeclaration, "Label", d.name), this.context.labelSet[f] = !0;
                  var S = void 0;
                  if (this.matchKeyword("class"))
                    this.tolerateUnexpectedToken(this.lookahead), S = this.parseClassDeclaration();
                  else if (this.matchKeyword("function")) {
                    var A = this.lookahead, b = this.parseFunctionDeclaration();
                    this.context.strict ? this.tolerateUnexpectedToken(A, h.Messages.StrictFunction) : b.generator && this.tolerateUnexpectedToken(A, h.Messages.GeneratorInLegacyContext), S = b;
                  } else
                    S = this.parseStatement();
                  delete this.context.labelSet[f], s = new m.LabeledStatement(d, S);
                } else
                  this.consumeSemicolon(), s = new m.ExpressionStatement(n);
                return this.finalize(t, s);
              }, x.prototype.parseThrowStatement = function() {
                var t = this.createNode();
                this.expectKeyword("throw"), this.hasLineTerminator && this.throwError(h.Messages.NewlineAfterThrow);
                var n = this.parseExpression();
                return this.consumeSemicolon(), this.finalize(t, new m.ThrowStatement(n));
              }, x.prototype.parseCatchClause = function() {
                var t = this.createNode();
                this.expectKeyword("catch"), this.expect("("), this.match(")") && this.throwUnexpectedToken(this.lookahead);
                for (var n = [], s = this.parsePattern(n), d = {}, f = 0; f < n.length; f++) {
                  var S = "$" + n[f].value;
                  Object.prototype.hasOwnProperty.call(d, S) && this.tolerateError(h.Messages.DuplicateBinding, n[f].value), d[S] = !0;
                }
                this.context.strict && s.type === g.Syntax.Identifier && this.scanner.isRestrictedWord(s.name) && this.tolerateError(h.Messages.StrictCatchVariable), this.expect(")");
                var A = this.parseBlock();
                return this.finalize(t, new m.CatchClause(s, A));
              }, x.prototype.parseFinallyClause = function() {
                return this.expectKeyword("finally"), this.parseBlock();
              }, x.prototype.parseTryStatement = function() {
                var t = this.createNode();
                this.expectKeyword("try");
                var n = this.parseBlock(), s = this.matchKeyword("catch") ? this.parseCatchClause() : null, d = this.matchKeyword("finally") ? this.parseFinallyClause() : null;
                return !s && !d && this.throwError(h.Messages.NoCatchOrFinally), this.finalize(t, new m.TryStatement(n, s, d));
              }, x.prototype.parseDebuggerStatement = function() {
                var t = this.createNode();
                return this.expectKeyword("debugger"), this.consumeSemicolon(), this.finalize(t, new m.DebuggerStatement());
              }, x.prototype.parseStatement = function() {
                var t;
                switch (this.lookahead.type) {
                  case 1:
                  case 5:
                  case 6:
                  case 8:
                  case 10:
                  case 9:
                    t = this.parseExpressionStatement();
                    break;
                  case 7:
                    var n = this.lookahead.value;
                    n === "{" ? t = this.parseBlock() : n === "(" ? t = this.parseExpressionStatement() : n === ";" ? t = this.parseEmptyStatement() : t = this.parseExpressionStatement();
                    break;
                  case 3:
                    t = this.matchAsyncFunction() ? this.parseFunctionDeclaration() : this.parseLabelledStatement();
                    break;
                  case 4:
                    switch (this.lookahead.value) {
                      case "break":
                        t = this.parseBreakStatement();
                        break;
                      case "continue":
                        t = this.parseContinueStatement();
                        break;
                      case "debugger":
                        t = this.parseDebuggerStatement();
                        break;
                      case "do":
                        t = this.parseDoWhileStatement();
                        break;
                      case "for":
                        t = this.parseForStatement();
                        break;
                      case "function":
                        t = this.parseFunctionDeclaration();
                        break;
                      case "if":
                        t = this.parseIfStatement();
                        break;
                      case "return":
                        t = this.parseReturnStatement();
                        break;
                      case "switch":
                        t = this.parseSwitchStatement();
                        break;
                      case "throw":
                        t = this.parseThrowStatement();
                        break;
                      case "try":
                        t = this.parseTryStatement();
                        break;
                      case "var":
                        t = this.parseVariableStatement();
                        break;
                      case "while":
                        t = this.parseWhileStatement();
                        break;
                      case "with":
                        t = this.parseWithStatement();
                        break;
                      default:
                        t = this.parseExpressionStatement();
                        break;
                    }
                    break;
                  default:
                    t = this.throwUnexpectedToken(this.lookahead);
                }
                return t;
              }, x.prototype.parseFunctionSourceElements = function() {
                var t = this.createNode();
                this.expect("{");
                var n = this.parseDirectivePrologues(), s = this.context.labelSet, d = this.context.inIteration, f = this.context.inSwitch, S = this.context.inFunctionBody;
                for (this.context.labelSet = {}, this.context.inIteration = !1, this.context.inSwitch = !1, this.context.inFunctionBody = !0; this.lookahead.type !== 2 && !this.match("}"); )
                  n.push(this.parseStatementListItem());
                return this.expect("}"), this.context.labelSet = s, this.context.inIteration = d, this.context.inSwitch = f, this.context.inFunctionBody = S, this.finalize(t, new m.BlockStatement(n));
              }, x.prototype.validateParam = function(t, n, s) {
                var d = "$" + s;
                this.context.strict ? (this.scanner.isRestrictedWord(s) && (t.stricted = n, t.message = h.Messages.StrictParamName), Object.prototype.hasOwnProperty.call(t.paramSet, d) && (t.stricted = n, t.message = h.Messages.StrictParamDupe)) : t.firstRestricted || (this.scanner.isRestrictedWord(s) ? (t.firstRestricted = n, t.message = h.Messages.StrictParamName) : this.scanner.isStrictModeReservedWord(s) ? (t.firstRestricted = n, t.message = h.Messages.StrictReservedWord) : Object.prototype.hasOwnProperty.call(t.paramSet, d) && (t.stricted = n, t.message = h.Messages.StrictParamDupe)), typeof Object.defineProperty == "function" ? Object.defineProperty(t.paramSet, d, { value: !0, enumerable: !0, writable: !0, configurable: !0 }) : t.paramSet[d] = !0;
              }, x.prototype.parseRestElement = function(t) {
                var n = this.createNode();
                this.expect("...");
                var s = this.parsePattern(t);
                return this.match("=") && this.throwError(h.Messages.DefaultRestParameter), this.match(")") || this.throwError(h.Messages.ParameterAfterRestParameter), this.finalize(n, new m.RestElement(s));
              }, x.prototype.parseFormalParameter = function(t) {
                for (var n = [], s = this.match("...") ? this.parseRestElement(n) : this.parsePatternWithDefault(n), d = 0; d < n.length; d++)
                  this.validateParam(t, n[d], n[d].value);
                t.simple = t.simple && s instanceof m.Identifier, t.params.push(s);
              }, x.prototype.parseFormalParameters = function(t) {
                var n;
                if (n = {
                  simple: !0,
                  params: [],
                  firstRestricted: t
                }, this.expect("("), !this.match(")"))
                  for (n.paramSet = {}; this.lookahead.type !== 2 && (this.parseFormalParameter(n), !(this.match(")") || (this.expect(","), this.match(")")))); )
                    ;
                return this.expect(")"), {
                  simple: n.simple,
                  params: n.params,
                  stricted: n.stricted,
                  firstRestricted: n.firstRestricted,
                  message: n.message
                };
              }, x.prototype.matchAsyncFunction = function() {
                var t = this.matchContextualKeyword("async");
                if (t) {
                  var n = this.scanner.saveState();
                  this.scanner.scanComments();
                  var s = this.scanner.lex();
                  this.scanner.restoreState(n), t = n.lineNumber === s.lineNumber && s.type === 4 && s.value === "function";
                }
                return t;
              }, x.prototype.parseFunctionDeclaration = function(t) {
                var n = this.createNode(), s = this.matchContextualKeyword("async");
                s && this.nextToken(), this.expectKeyword("function");
                var d = s ? !1 : this.match("*");
                d && this.nextToken();
                var f, S = null, A = null;
                if (!t || !this.match("(")) {
                  var b = this.lookahead;
                  S = this.parseVariableIdentifier(), this.context.strict ? this.scanner.isRestrictedWord(b.value) && this.tolerateUnexpectedToken(b, h.Messages.StrictFunctionName) : this.scanner.isRestrictedWord(b.value) ? (A = b, f = h.Messages.StrictFunctionName) : this.scanner.isStrictModeReservedWord(b.value) && (A = b, f = h.Messages.StrictReservedWord);
                }
                var k = this.context.await, T = this.context.allowYield;
                this.context.await = s, this.context.allowYield = !d;
                var P = this.parseFormalParameters(A), j = P.params, M = P.stricted;
                A = P.firstRestricted, P.message && (f = P.message);
                var Z = this.context.strict, V = this.context.allowStrictDirective;
                this.context.allowStrictDirective = P.simple;
                var J = this.parseFunctionSourceElements();
                return this.context.strict && A && this.throwUnexpectedToken(A, f), this.context.strict && M && this.tolerateUnexpectedToken(M, f), this.context.strict = Z, this.context.allowStrictDirective = V, this.context.await = k, this.context.allowYield = T, s ? this.finalize(n, new m.AsyncFunctionDeclaration(S, j, J)) : this.finalize(n, new m.FunctionDeclaration(S, j, J, d));
              }, x.prototype.parseFunctionExpression = function() {
                var t = this.createNode(), n = this.matchContextualKeyword("async");
                n && this.nextToken(), this.expectKeyword("function");
                var s = n ? !1 : this.match("*");
                s && this.nextToken();
                var d, f = null, S, A = this.context.await, b = this.context.allowYield;
                if (this.context.await = n, this.context.allowYield = !s, !this.match("(")) {
                  var k = this.lookahead;
                  f = !this.context.strict && !s && this.matchKeyword("yield") ? this.parseIdentifierName() : this.parseVariableIdentifier(), this.context.strict ? this.scanner.isRestrictedWord(k.value) && this.tolerateUnexpectedToken(k, h.Messages.StrictFunctionName) : this.scanner.isRestrictedWord(k.value) ? (S = k, d = h.Messages.StrictFunctionName) : this.scanner.isStrictModeReservedWord(k.value) && (S = k, d = h.Messages.StrictReservedWord);
                }
                var T = this.parseFormalParameters(S), P = T.params, j = T.stricted;
                S = T.firstRestricted, T.message && (d = T.message);
                var M = this.context.strict, Z = this.context.allowStrictDirective;
                this.context.allowStrictDirective = T.simple;
                var V = this.parseFunctionSourceElements();
                return this.context.strict && S && this.throwUnexpectedToken(S, d), this.context.strict && j && this.tolerateUnexpectedToken(j, d), this.context.strict = M, this.context.allowStrictDirective = Z, this.context.await = A, this.context.allowYield = b, n ? this.finalize(t, new m.AsyncFunctionExpression(f, P, V)) : this.finalize(t, new m.FunctionExpression(f, P, V, s));
              }, x.prototype.parseDirective = function() {
                var t = this.lookahead, n = this.createNode(), s = this.parseExpression(), d = s.type === g.Syntax.Literal ? this.getTokenRaw(t).slice(1, -1) : null;
                return this.consumeSemicolon(), this.finalize(n, d ? new m.Directive(s, d) : new m.ExpressionStatement(s));
              }, x.prototype.parseDirectivePrologues = function() {
                for (var t = null, n = []; ; ) {
                  var s = this.lookahead;
                  if (s.type !== 8)
                    break;
                  var d = this.parseDirective();
                  n.push(d);
                  var f = d.directive;
                  if (typeof f != "string")
                    break;
                  f === "use strict" ? (this.context.strict = !0, t && this.tolerateUnexpectedToken(t, h.Messages.StrictOctalLiteral), this.context.allowStrictDirective || this.tolerateUnexpectedToken(s, h.Messages.IllegalLanguageModeDirective)) : !t && s.octal && (t = s);
                }
                return n;
              }, x.prototype.qualifiedPropertyName = function(t) {
                switch (t.type) {
                  case 3:
                  case 8:
                  case 1:
                  case 5:
                  case 6:
                  case 4:
                    return !0;
                  case 7:
                    return t.value === "[";
                }
                return !1;
              }, x.prototype.parseGetterMethod = function() {
                var t = this.createNode(), n = !1, s = this.context.allowYield;
                this.context.allowYield = !0;
                var d = this.parseFormalParameters();
                d.params.length > 0 && this.tolerateError(h.Messages.BadGetterArity);
                var f = this.parsePropertyMethod(d);
                return this.context.allowYield = s, this.finalize(t, new m.FunctionExpression(null, d.params, f, n));
              }, x.prototype.parseSetterMethod = function() {
                var t = this.createNode(), n = !1, s = this.context.allowYield;
                this.context.allowYield = !0;
                var d = this.parseFormalParameters();
                d.params.length !== 1 ? this.tolerateError(h.Messages.BadSetterArity) : d.params[0] instanceof m.RestElement && this.tolerateError(h.Messages.BadSetterRestParameter);
                var f = this.parsePropertyMethod(d);
                return this.context.allowYield = s, this.finalize(t, new m.FunctionExpression(null, d.params, f, n));
              }, x.prototype.parseGeneratorMethod = function() {
                var t = this.createNode(), n = !0, s = this.context.allowYield;
                this.context.allowYield = !0;
                var d = this.parseFormalParameters();
                this.context.allowYield = !1;
                var f = this.parsePropertyMethod(d);
                return this.context.allowYield = s, this.finalize(t, new m.FunctionExpression(null, d.params, f, n));
              }, x.prototype.isStartOfExpression = function() {
                var t = !0, n = this.lookahead.value;
                switch (this.lookahead.type) {
                  case 7:
                    t = n === "[" || n === "(" || n === "{" || n === "+" || n === "-" || n === "!" || n === "~" || n === "++" || n === "--" || n === "/" || n === "/=";
                    break;
                  case 4:
                    t = n === "class" || n === "delete" || n === "function" || n === "let" || n === "new" || n === "super" || n === "this" || n === "typeof" || n === "void" || n === "yield";
                    break;
                }
                return t;
              }, x.prototype.parseYieldExpression = function() {
                var t = this.createNode();
                this.expectKeyword("yield");
                var n = null, s = !1;
                if (!this.hasLineTerminator) {
                  var d = this.context.allowYield;
                  this.context.allowYield = !1, s = this.match("*"), s ? (this.nextToken(), n = this.parseAssignmentExpression()) : this.isStartOfExpression() && (n = this.parseAssignmentExpression()), this.context.allowYield = d;
                }
                return this.finalize(t, new m.YieldExpression(n, s));
              }, x.prototype.parseClassElement = function(t) {
                var n = this.lookahead, s = this.createNode(), d = "", f = null, S = null, A = !1, b = !1, k = !1, T = !1;
                if (this.match("*"))
                  this.nextToken();
                else {
                  A = this.match("["), f = this.parseObjectPropertyKey();
                  var P = f;
                  if (P.name === "static" && (this.qualifiedPropertyName(this.lookahead) || this.match("*")) && (n = this.lookahead, k = !0, A = this.match("["), this.match("*") ? this.nextToken() : f = this.parseObjectPropertyKey()), n.type === 3 && !this.hasLineTerminator && n.value === "async") {
                    var j = this.lookahead.value;
                    j !== ":" && j !== "(" && j !== "*" && (T = !0, n = this.lookahead, f = this.parseObjectPropertyKey(), n.type === 3 && n.value === "constructor" && this.tolerateUnexpectedToken(n, h.Messages.ConstructorIsAsync));
                  }
                }
                var M = this.qualifiedPropertyName(this.lookahead);
                return n.type === 3 ? n.value === "get" && M ? (d = "get", A = this.match("["), f = this.parseObjectPropertyKey(), this.context.allowYield = !1, S = this.parseGetterMethod()) : n.value === "set" && M && (d = "set", A = this.match("["), f = this.parseObjectPropertyKey(), S = this.parseSetterMethod()) : n.type === 7 && n.value === "*" && M && (d = "init", A = this.match("["), f = this.parseObjectPropertyKey(), S = this.parseGeneratorMethod(), b = !0), !d && f && this.match("(") && (d = "init", S = T ? this.parsePropertyMethodAsyncFunction() : this.parsePropertyMethodFunction(), b = !0), d || this.throwUnexpectedToken(this.lookahead), d === "init" && (d = "method"), A || (k && this.isPropertyKey(f, "prototype") && this.throwUnexpectedToken(n, h.Messages.StaticPrototype), !k && this.isPropertyKey(f, "constructor") && ((d !== "method" || !b || S && S.generator) && this.throwUnexpectedToken(n, h.Messages.ConstructorSpecialMethod), t.value ? this.throwUnexpectedToken(n, h.Messages.DuplicateConstructor) : t.value = !0, d = "constructor")), this.finalize(s, new m.MethodDefinition(f, A, S, d, k));
              }, x.prototype.parseClassElementList = function() {
                var t = [], n = { value: !1 };
                for (this.expect("{"); !this.match("}"); )
                  this.match(";") ? this.nextToken() : t.push(this.parseClassElement(n));
                return this.expect("}"), t;
              }, x.prototype.parseClassBody = function() {
                var t = this.createNode(), n = this.parseClassElementList();
                return this.finalize(t, new m.ClassBody(n));
              }, x.prototype.parseClassDeclaration = function(t) {
                var n = this.createNode(), s = this.context.strict;
                this.context.strict = !0, this.expectKeyword("class");
                var d = t && this.lookahead.type !== 3 ? null : this.parseVariableIdentifier(), f = null;
                this.matchKeyword("extends") && (this.nextToken(), f = this.isolateCoverGrammar(this.parseLeftHandSideExpressionAllowCall));
                var S = this.parseClassBody();
                return this.context.strict = s, this.finalize(n, new m.ClassDeclaration(d, f, S));
              }, x.prototype.parseClassExpression = function() {
                var t = this.createNode(), n = this.context.strict;
                this.context.strict = !0, this.expectKeyword("class");
                var s = this.lookahead.type === 3 ? this.parseVariableIdentifier() : null, d = null;
                this.matchKeyword("extends") && (this.nextToken(), d = this.isolateCoverGrammar(this.parseLeftHandSideExpressionAllowCall));
                var f = this.parseClassBody();
                return this.context.strict = n, this.finalize(t, new m.ClassExpression(s, d, f));
              }, x.prototype.parseModule = function() {
                this.context.strict = !0, this.context.isModule = !0, this.scanner.isModule = !0;
                for (var t = this.createNode(), n = this.parseDirectivePrologues(); this.lookahead.type !== 2; )
                  n.push(this.parseStatementListItem());
                return this.finalize(t, new m.Module(n));
              }, x.prototype.parseScript = function() {
                for (var t = this.createNode(), n = this.parseDirectivePrologues(); this.lookahead.type !== 2; )
                  n.push(this.parseStatementListItem());
                return this.finalize(t, new m.Script(n));
              }, x.prototype.parseModuleSpecifier = function() {
                var t = this.createNode();
                this.lookahead.type !== 8 && this.throwError(h.Messages.InvalidModuleSpecifier);
                var n = this.nextToken(), s = this.getTokenRaw(n);
                return this.finalize(t, new m.Literal(n.value, s));
              }, x.prototype.parseImportSpecifier = function() {
                var t = this.createNode(), n, s;
                return this.lookahead.type === 3 ? (n = this.parseVariableIdentifier(), s = n, this.matchContextualKeyword("as") && (this.nextToken(), s = this.parseVariableIdentifier())) : (n = this.parseIdentifierName(), s = n, this.matchContextualKeyword("as") ? (this.nextToken(), s = this.parseVariableIdentifier()) : this.throwUnexpectedToken(this.nextToken())), this.finalize(t, new m.ImportSpecifier(s, n));
              }, x.prototype.parseNamedImports = function() {
                this.expect("{");
                for (var t = []; !this.match("}"); )
                  t.push(this.parseImportSpecifier()), this.match("}") || this.expect(",");
                return this.expect("}"), t;
              }, x.prototype.parseImportDefaultSpecifier = function() {
                var t = this.createNode(), n = this.parseIdentifierName();
                return this.finalize(t, new m.ImportDefaultSpecifier(n));
              }, x.prototype.parseImportNamespaceSpecifier = function() {
                var t = this.createNode();
                this.expect("*"), this.matchContextualKeyword("as") || this.throwError(h.Messages.NoAsAfterImportNamespace), this.nextToken();
                var n = this.parseIdentifierName();
                return this.finalize(t, new m.ImportNamespaceSpecifier(n));
              }, x.prototype.parseImportDeclaration = function() {
                this.context.inFunctionBody && this.throwError(h.Messages.IllegalImportDeclaration);
                var t = this.createNode();
                this.expectKeyword("import");
                var n, s = [];
                if (this.lookahead.type === 8)
                  n = this.parseModuleSpecifier();
                else {
                  if (this.match("{") ? s = s.concat(this.parseNamedImports()) : this.match("*") ? s.push(this.parseImportNamespaceSpecifier()) : this.isIdentifierName(this.lookahead) && !this.matchKeyword("default") ? (s.push(this.parseImportDefaultSpecifier()), this.match(",") && (this.nextToken(), this.match("*") ? s.push(this.parseImportNamespaceSpecifier()) : this.match("{") ? s = s.concat(this.parseNamedImports()) : this.throwUnexpectedToken(this.lookahead))) : this.throwUnexpectedToken(this.nextToken()), !this.matchContextualKeyword("from")) {
                    var d = this.lookahead.value ? h.Messages.UnexpectedToken : h.Messages.MissingFromClause;
                    this.throwError(d, this.lookahead.value);
                  }
                  this.nextToken(), n = this.parseModuleSpecifier();
                }
                return this.consumeSemicolon(), this.finalize(t, new m.ImportDeclaration(s, n));
              }, x.prototype.parseExportSpecifier = function() {
                var t = this.createNode(), n = this.parseIdentifierName(), s = n;
                return this.matchContextualKeyword("as") && (this.nextToken(), s = this.parseIdentifierName()), this.finalize(t, new m.ExportSpecifier(n, s));
              }, x.prototype.parseExportDeclaration = function() {
                this.context.inFunctionBody && this.throwError(h.Messages.IllegalExportDeclaration);
                var t = this.createNode();
                this.expectKeyword("export");
                var n;
                if (this.matchKeyword("default"))
                  if (this.nextToken(), this.matchKeyword("function")) {
                    var s = this.parseFunctionDeclaration(!0);
                    n = this.finalize(t, new m.ExportDefaultDeclaration(s));
                  } else if (this.matchKeyword("class")) {
                    var s = this.parseClassDeclaration(!0);
                    n = this.finalize(t, new m.ExportDefaultDeclaration(s));
                  } else if (this.matchContextualKeyword("async")) {
                    var s = this.matchAsyncFunction() ? this.parseFunctionDeclaration(!0) : this.parseAssignmentExpression();
                    n = this.finalize(t, new m.ExportDefaultDeclaration(s));
                  } else {
                    this.matchContextualKeyword("from") && this.throwError(h.Messages.UnexpectedToken, this.lookahead.value);
                    var s = this.match("{") ? this.parseObjectInitializer() : this.match("[") ? this.parseArrayInitializer() : this.parseAssignmentExpression();
                    this.consumeSemicolon(), n = this.finalize(t, new m.ExportDefaultDeclaration(s));
                  }
                else if (this.match("*")) {
                  if (this.nextToken(), !this.matchContextualKeyword("from")) {
                    var d = this.lookahead.value ? h.Messages.UnexpectedToken : h.Messages.MissingFromClause;
                    this.throwError(d, this.lookahead.value);
                  }
                  this.nextToken();
                  var f = this.parseModuleSpecifier();
                  this.consumeSemicolon(), n = this.finalize(t, new m.ExportAllDeclaration(f));
                } else if (this.lookahead.type === 4) {
                  var s = void 0;
                  switch (this.lookahead.value) {
                    case "let":
                    case "const":
                      s = this.parseLexicalDeclaration({ inFor: !1 });
                      break;
                    case "var":
                    case "class":
                    case "function":
                      s = this.parseStatementListItem();
                      break;
                    default:
                      this.throwUnexpectedToken(this.lookahead);
                  }
                  n = this.finalize(t, new m.ExportNamedDeclaration(s, [], null));
                } else if (this.matchAsyncFunction()) {
                  var s = this.parseFunctionDeclaration();
                  n = this.finalize(t, new m.ExportNamedDeclaration(s, [], null));
                } else {
                  var S = [], A = null, b = !1;
                  for (this.expect("{"); !this.match("}"); )
                    b = b || this.matchKeyword("default"), S.push(this.parseExportSpecifier()), this.match("}") || this.expect(",");
                  if (this.expect("}"), this.matchContextualKeyword("from"))
                    this.nextToken(), A = this.parseModuleSpecifier(), this.consumeSemicolon();
                  else if (b) {
                    var d = this.lookahead.value ? h.Messages.UnexpectedToken : h.Messages.MissingFromClause;
                    this.throwError(d, this.lookahead.value);
                  } else
                    this.consumeSemicolon();
                  n = this.finalize(t, new m.ExportNamedDeclaration(null, S, A));
                }
                return n;
              }, x;
            }();
            i.Parser = E;
          },
          /* 9 */
          /***/
          function(r, i) {
            Object.defineProperty(i, "__esModule", { value: !0 });
            function u(a, p) {
              if (!a)
                throw new Error("ASSERT: " + p);
            }
            i.assert = u;
          },
          /* 10 */
          /***/
          function(r, i) {
            Object.defineProperty(i, "__esModule", { value: !0 });
            var u = function() {
              function a() {
                this.errors = [], this.tolerant = !1;
              }
              return a.prototype.recordError = function(p) {
                this.errors.push(p);
              }, a.prototype.tolerate = function(p) {
                if (this.tolerant)
                  this.recordError(p);
                else
                  throw p;
              }, a.prototype.constructError = function(p, h) {
                var m = new Error(p);
                try {
                  throw m;
                } catch (w) {
                  Object.create && Object.defineProperty && (m = Object.create(w), Object.defineProperty(m, "column", { value: h }));
                }
                return m;
              }, a.prototype.createError = function(p, h, m, w) {
                var g = "Line " + h + ": " + w, F = this.constructError(g, m);
                return F.index = p, F.lineNumber = h, F.description = w, F;
              }, a.prototype.throwError = function(p, h, m, w) {
                throw this.createError(p, h, m, w);
              }, a.prototype.tolerateError = function(p, h, m, w) {
                var g = this.createError(p, h, m, w);
                if (this.tolerant)
                  this.recordError(g);
                else
                  throw g;
              }, a;
            }();
            i.ErrorHandler = u;
          },
          /* 11 */
          /***/
          function(r, i) {
            Object.defineProperty(i, "__esModule", { value: !0 }), i.Messages = {
              BadGetterArity: "Getter must not have any formal parameters",
              BadSetterArity: "Setter must have exactly one formal parameter",
              BadSetterRestParameter: "Setter function argument must not be a rest parameter",
              ConstructorIsAsync: "Class constructor may not be an async method",
              ConstructorSpecialMethod: "Class constructor may not be an accessor",
              DeclarationMissingInitializer: "Missing initializer in %0 declaration",
              DefaultRestParameter: "Unexpected token =",
              DuplicateBinding: "Duplicate binding %0",
              DuplicateConstructor: "A class may only have one constructor",
              DuplicateProtoProperty: "Duplicate __proto__ fields are not allowed in object literals",
              ForInOfLoopInitializer: "%0 loop variable declaration may not have an initializer",
              GeneratorInLegacyContext: "Generator declarations are not allowed in legacy contexts",
              IllegalBreak: "Illegal break statement",
              IllegalContinue: "Illegal continue statement",
              IllegalExportDeclaration: "Unexpected token",
              IllegalImportDeclaration: "Unexpected token",
              IllegalLanguageModeDirective: "Illegal 'use strict' directive in function with non-simple parameter list",
              IllegalReturn: "Illegal return statement",
              InvalidEscapedReservedWord: "Keyword must not contain escaped characters",
              InvalidHexEscapeSequence: "Invalid hexadecimal escape sequence",
              InvalidLHSInAssignment: "Invalid left-hand side in assignment",
              InvalidLHSInForIn: "Invalid left-hand side in for-in",
              InvalidLHSInForLoop: "Invalid left-hand side in for-loop",
              InvalidModuleSpecifier: "Unexpected token",
              InvalidRegExp: "Invalid regular expression",
              LetInLexicalBinding: "let is disallowed as a lexically bound name",
              MissingFromClause: "Unexpected token",
              MultipleDefaultsInSwitch: "More than one default clause in switch statement",
              NewlineAfterThrow: "Illegal newline after throw",
              NoAsAfterImportNamespace: "Unexpected token",
              NoCatchOrFinally: "Missing catch or finally after try",
              ParameterAfterRestParameter: "Rest parameter must be last formal parameter",
              Redeclaration: "%0 '%1' has already been declared",
              StaticPrototype: "Classes may not have static property named prototype",
              StrictCatchVariable: "Catch variable may not be eval or arguments in strict mode",
              StrictDelete: "Delete of an unqualified identifier in strict mode.",
              StrictFunction: "In strict mode code, functions can only be declared at top level or inside a block",
              StrictFunctionName: "Function name may not be eval or arguments in strict mode",
              StrictLHSAssignment: "Assignment to eval or arguments is not allowed in strict mode",
              StrictLHSPostfix: "Postfix increment/decrement may not have eval or arguments operand in strict mode",
              StrictLHSPrefix: "Prefix increment/decrement may not have eval or arguments operand in strict mode",
              StrictModeWith: "Strict mode code may not include a with statement",
              StrictOctalLiteral: "Octal literals are not allowed in strict mode.",
              StrictParamDupe: "Strict mode function may not have duplicate parameter names",
              StrictParamName: "Parameter name eval or arguments is not allowed in strict mode",
              StrictReservedWord: "Use of future reserved word in strict mode",
              StrictVarName: "Variable name may not be eval or arguments in strict mode",
              TemplateOctalLiteral: "Octal literals are not allowed in template strings.",
              UnexpectedEOS: "Unexpected end of input",
              UnexpectedIdentifier: "Unexpected identifier",
              UnexpectedNumber: "Unexpected number",
              UnexpectedReserved: "Unexpected reserved word",
              UnexpectedString: "Unexpected string",
              UnexpectedTemplate: "Unexpected quasi %0",
              UnexpectedToken: "Unexpected token %0",
              UnexpectedTokenIllegal: "Unexpected token ILLEGAL",
              UnknownLabel: "Undefined label '%0'",
              UnterminatedRegExp: "Invalid regular expression: missing /"
            };
          },
          /* 12 */
          /***/
          function(r, i, u) {
            Object.defineProperty(i, "__esModule", { value: !0 });
            var a = u(9), p = u(4), h = u(11);
            function m(F) {
              return "0123456789abcdef".indexOf(F.toLowerCase());
            }
            function w(F) {
              return "01234567".indexOf(F);
            }
            var g = function() {
              function F(v, E) {
                this.source = v, this.errorHandler = E, this.trackComment = !1, this.isModule = !1, this.length = v.length, this.index = 0, this.lineNumber = v.length > 0 ? 1 : 0, this.lineStart = 0, this.curlyStack = [];
              }
              return F.prototype.saveState = function() {
                return {
                  index: this.index,
                  lineNumber: this.lineNumber,
                  lineStart: this.lineStart
                };
              }, F.prototype.restoreState = function(v) {
                this.index = v.index, this.lineNumber = v.lineNumber, this.lineStart = v.lineStart;
              }, F.prototype.eof = function() {
                return this.index >= this.length;
              }, F.prototype.throwUnexpectedToken = function(v) {
                return v === void 0 && (v = h.Messages.UnexpectedTokenIllegal), this.errorHandler.throwError(this.index, this.lineNumber, this.index - this.lineStart + 1, v);
              }, F.prototype.tolerateUnexpectedToken = function(v) {
                v === void 0 && (v = h.Messages.UnexpectedTokenIllegal), this.errorHandler.tolerateError(this.index, this.lineNumber, this.index - this.lineStart + 1, v);
              }, F.prototype.skipSingleLineComment = function(v) {
                var E = [], x, t;
                for (this.trackComment && (E = [], x = this.index - v, t = {
                  start: {
                    line: this.lineNumber,
                    column: this.index - this.lineStart - v
                  },
                  end: {}
                }); !this.eof(); ) {
                  var n = this.source.charCodeAt(this.index);
                  if (++this.index, p.Character.isLineTerminator(n)) {
                    if (this.trackComment) {
                      t.end = {
                        line: this.lineNumber,
                        column: this.index - this.lineStart - 1
                      };
                      var s = {
                        multiLine: !1,
                        slice: [x + v, this.index - 1],
                        range: [x, this.index - 1],
                        loc: t
                      };
                      E.push(s);
                    }
                    return n === 13 && this.source.charCodeAt(this.index) === 10 && ++this.index, ++this.lineNumber, this.lineStart = this.index, E;
                  }
                }
                if (this.trackComment) {
                  t.end = {
                    line: this.lineNumber,
                    column: this.index - this.lineStart
                  };
                  var s = {
                    multiLine: !1,
                    slice: [x + v, this.index],
                    range: [x, this.index],
                    loc: t
                  };
                  E.push(s);
                }
                return E;
              }, F.prototype.skipMultiLineComment = function() {
                var v = [], E, x;
                for (this.trackComment && (v = [], E = this.index - 2, x = {
                  start: {
                    line: this.lineNumber,
                    column: this.index - this.lineStart - 2
                  },
                  end: {}
                }); !this.eof(); ) {
                  var t = this.source.charCodeAt(this.index);
                  if (p.Character.isLineTerminator(t))
                    t === 13 && this.source.charCodeAt(this.index + 1) === 10 && ++this.index, ++this.lineNumber, ++this.index, this.lineStart = this.index;
                  else if (t === 42) {
                    if (this.source.charCodeAt(this.index + 1) === 47) {
                      if (this.index += 2, this.trackComment) {
                        x.end = {
                          line: this.lineNumber,
                          column: this.index - this.lineStart
                        };
                        var n = {
                          multiLine: !0,
                          slice: [E + 2, this.index - 2],
                          range: [E, this.index],
                          loc: x
                        };
                        v.push(n);
                      }
                      return v;
                    }
                    ++this.index;
                  } else
                    ++this.index;
                }
                if (this.trackComment) {
                  x.end = {
                    line: this.lineNumber,
                    column: this.index - this.lineStart
                  };
                  var n = {
                    multiLine: !0,
                    slice: [E + 2, this.index],
                    range: [E, this.index],
                    loc: x
                  };
                  v.push(n);
                }
                return this.tolerateUnexpectedToken(), v;
              }, F.prototype.scanComments = function() {
                var v;
                this.trackComment && (v = []);
                for (var E = this.index === 0; !this.eof(); ) {
                  var x = this.source.charCodeAt(this.index);
                  if (p.Character.isWhiteSpace(x))
                    ++this.index;
                  else if (p.Character.isLineTerminator(x))
                    ++this.index, x === 13 && this.source.charCodeAt(this.index) === 10 && ++this.index, ++this.lineNumber, this.lineStart = this.index, E = !0;
                  else if (x === 47)
                    if (x = this.source.charCodeAt(this.index + 1), x === 47) {
                      this.index += 2;
                      var t = this.skipSingleLineComment(2);
                      this.trackComment && (v = v.concat(t)), E = !0;
                    } else if (x === 42) {
                      this.index += 2;
                      var t = this.skipMultiLineComment();
                      this.trackComment && (v = v.concat(t));
                    } else
                      break;
                  else if (E && x === 45)
                    if (this.source.charCodeAt(this.index + 1) === 45 && this.source.charCodeAt(this.index + 2) === 62) {
                      this.index += 3;
                      var t = this.skipSingleLineComment(3);
                      this.trackComment && (v = v.concat(t));
                    } else
                      break;
                  else if (x === 60 && !this.isModule)
                    if (this.source.slice(this.index + 1, this.index + 4) === "!--") {
                      this.index += 4;
                      var t = this.skipSingleLineComment(4);
                      this.trackComment && (v = v.concat(t));
                    } else
                      break;
                  else
                    break;
                }
                return v;
              }, F.prototype.isFutureReservedWord = function(v) {
                switch (v) {
                  case "enum":
                  case "export":
                  case "import":
                  case "super":
                    return !0;
                  default:
                    return !1;
                }
              }, F.prototype.isStrictModeReservedWord = function(v) {
                switch (v) {
                  case "implements":
                  case "interface":
                  case "package":
                  case "private":
                  case "protected":
                  case "public":
                  case "static":
                  case "yield":
                  case "let":
                    return !0;
                  default:
                    return !1;
                }
              }, F.prototype.isRestrictedWord = function(v) {
                return v === "eval" || v === "arguments";
              }, F.prototype.isKeyword = function(v) {
                switch (v.length) {
                  case 2:
                    return v === "if" || v === "in" || v === "do";
                  case 3:
                    return v === "var" || v === "for" || v === "new" || v === "try" || v === "let";
                  case 4:
                    return v === "this" || v === "else" || v === "case" || v === "void" || v === "with" || v === "enum";
                  case 5:
                    return v === "while" || v === "break" || v === "catch" || v === "throw" || v === "const" || v === "yield" || v === "class" || v === "super";
                  case 6:
                    return v === "return" || v === "typeof" || v === "delete" || v === "switch" || v === "export" || v === "import";
                  case 7:
                    return v === "default" || v === "finally" || v === "extends";
                  case 8:
                    return v === "function" || v === "continue" || v === "debugger";
                  case 10:
                    return v === "instanceof";
                  default:
                    return !1;
                }
              }, F.prototype.codePointAt = function(v) {
                var E = this.source.charCodeAt(v);
                if (E >= 55296 && E <= 56319) {
                  var x = this.source.charCodeAt(v + 1);
                  if (x >= 56320 && x <= 57343) {
                    var t = E;
                    E = (t - 55296) * 1024 + x - 56320 + 65536;
                  }
                }
                return E;
              }, F.prototype.scanHexEscape = function(v) {
                for (var E = v === "u" ? 4 : 2, x = 0, t = 0; t < E; ++t)
                  if (!this.eof() && p.Character.isHexDigit(this.source.charCodeAt(this.index)))
                    x = x * 16 + m(this.source[this.index++]);
                  else
                    return null;
                return String.fromCharCode(x);
              }, F.prototype.scanUnicodeCodePointEscape = function() {
                var v = this.source[this.index], E = 0;
                for (v === "}" && this.throwUnexpectedToken(); !this.eof() && (v = this.source[this.index++], !!p.Character.isHexDigit(v.charCodeAt(0))); )
                  E = E * 16 + m(v);
                return (E > 1114111 || v !== "}") && this.throwUnexpectedToken(), p.Character.fromCodePoint(E);
              }, F.prototype.getIdentifier = function() {
                for (var v = this.index++; !this.eof(); ) {
                  var E = this.source.charCodeAt(this.index);
                  if (E === 92)
                    return this.index = v, this.getComplexIdentifier();
                  if (E >= 55296 && E < 57343)
                    return this.index = v, this.getComplexIdentifier();
                  if (p.Character.isIdentifierPart(E))
                    ++this.index;
                  else
                    break;
                }
                return this.source.slice(v, this.index);
              }, F.prototype.getComplexIdentifier = function() {
                var v = this.codePointAt(this.index), E = p.Character.fromCodePoint(v);
                this.index += E.length;
                var x;
                for (v === 92 && (this.source.charCodeAt(this.index) !== 117 && this.throwUnexpectedToken(), ++this.index, this.source[this.index] === "{" ? (++this.index, x = this.scanUnicodeCodePointEscape()) : (x = this.scanHexEscape("u"), (x === null || x === "\\" || !p.Character.isIdentifierStart(x.charCodeAt(0))) && this.throwUnexpectedToken()), E = x); !this.eof() && (v = this.codePointAt(this.index), !!p.Character.isIdentifierPart(v)); )
                  x = p.Character.fromCodePoint(v), E += x, this.index += x.length, v === 92 && (E = E.substr(0, E.length - 1), this.source.charCodeAt(this.index) !== 117 && this.throwUnexpectedToken(), ++this.index, this.source[this.index] === "{" ? (++this.index, x = this.scanUnicodeCodePointEscape()) : (x = this.scanHexEscape("u"), (x === null || x === "\\" || !p.Character.isIdentifierPart(x.charCodeAt(0))) && this.throwUnexpectedToken()), E += x);
                return E;
              }, F.prototype.octalToDecimal = function(v) {
                var E = v !== "0", x = w(v);
                return !this.eof() && p.Character.isOctalDigit(this.source.charCodeAt(this.index)) && (E = !0, x = x * 8 + w(this.source[this.index++]), "0123".indexOf(v) >= 0 && !this.eof() && p.Character.isOctalDigit(this.source.charCodeAt(this.index)) && (x = x * 8 + w(this.source[this.index++]))), {
                  code: x,
                  octal: E
                };
              }, F.prototype.scanIdentifier = function() {
                var v, E = this.index, x = this.source.charCodeAt(E) === 92 ? this.getComplexIdentifier() : this.getIdentifier();
                if (x.length === 1 ? v = 3 : this.isKeyword(x) ? v = 4 : x === "null" ? v = 5 : x === "true" || x === "false" ? v = 1 : v = 3, v !== 3 && E + x.length !== this.index) {
                  var t = this.index;
                  this.index = E, this.tolerateUnexpectedToken(h.Messages.InvalidEscapedReservedWord), this.index = t;
                }
                return {
                  type: v,
                  value: x,
                  lineNumber: this.lineNumber,
                  lineStart: this.lineStart,
                  start: E,
                  end: this.index
                };
              }, F.prototype.scanPunctuator = function() {
                var v = this.index, E = this.source[this.index];
                switch (E) {
                  case "(":
                  case "{":
                    E === "{" && this.curlyStack.push("{"), ++this.index;
                    break;
                  case ".":
                    ++this.index, this.source[this.index] === "." && this.source[this.index + 1] === "." && (this.index += 2, E = "...");
                    break;
                  case "}":
                    ++this.index, this.curlyStack.pop();
                    break;
                  case ")":
                  case ";":
                  case ",":
                  case "[":
                  case "]":
                  case ":":
                  case "?":
                  case "~":
                    ++this.index;
                    break;
                  default:
                    E = this.source.substr(this.index, 4), E === ">>>=" ? this.index += 4 : (E = E.substr(0, 3), E === "===" || E === "!==" || E === ">>>" || E === "<<=" || E === ">>=" || E === "**=" ? this.index += 3 : (E = E.substr(0, 2), E === "&&" || E === "||" || E === "==" || E === "!=" || E === "+=" || E === "-=" || E === "*=" || E === "/=" || E === "++" || E === "--" || E === "<<" || E === ">>" || E === "&=" || E === "|=" || E === "^=" || E === "%=" || E === "<=" || E === ">=" || E === "=>" || E === "**" ? this.index += 2 : (E = this.source[this.index], "<>=!+-*%&|^/".indexOf(E) >= 0 && ++this.index)));
                }
                return this.index === v && this.throwUnexpectedToken(), {
                  type: 7,
                  value: E,
                  lineNumber: this.lineNumber,
                  lineStart: this.lineStart,
                  start: v,
                  end: this.index
                };
              }, F.prototype.scanHexLiteral = function(v) {
                for (var E = ""; !this.eof() && p.Character.isHexDigit(this.source.charCodeAt(this.index)); )
                  E += this.source[this.index++];
                return E.length === 0 && this.throwUnexpectedToken(), p.Character.isIdentifierStart(this.source.charCodeAt(this.index)) && this.throwUnexpectedToken(), {
                  type: 6,
                  value: parseInt("0x" + E, 16),
                  lineNumber: this.lineNumber,
                  lineStart: this.lineStart,
                  start: v,
                  end: this.index
                };
              }, F.prototype.scanBinaryLiteral = function(v) {
                for (var E = "", x; !this.eof() && (x = this.source[this.index], !(x !== "0" && x !== "1")); )
                  E += this.source[this.index++];
                return E.length === 0 && this.throwUnexpectedToken(), this.eof() || (x = this.source.charCodeAt(this.index), (p.Character.isIdentifierStart(x) || p.Character.isDecimalDigit(x)) && this.throwUnexpectedToken()), {
                  type: 6,
                  value: parseInt(E, 2),
                  lineNumber: this.lineNumber,
                  lineStart: this.lineStart,
                  start: v,
                  end: this.index
                };
              }, F.prototype.scanOctalLiteral = function(v, E) {
                var x = "", t = !1;
                for (p.Character.isOctalDigit(v.charCodeAt(0)) ? (t = !0, x = "0" + this.source[this.index++]) : ++this.index; !this.eof() && p.Character.isOctalDigit(this.source.charCodeAt(this.index)); )
                  x += this.source[this.index++];
                return !t && x.length === 0 && this.throwUnexpectedToken(), (p.Character.isIdentifierStart(this.source.charCodeAt(this.index)) || p.Character.isDecimalDigit(this.source.charCodeAt(this.index))) && this.throwUnexpectedToken(), {
                  type: 6,
                  value: parseInt(x, 8),
                  octal: t,
                  lineNumber: this.lineNumber,
                  lineStart: this.lineStart,
                  start: E,
                  end: this.index
                };
              }, F.prototype.isImplicitOctalLiteral = function() {
                for (var v = this.index + 1; v < this.length; ++v) {
                  var E = this.source[v];
                  if (E === "8" || E === "9")
                    return !1;
                  if (!p.Character.isOctalDigit(E.charCodeAt(0)))
                    return !0;
                }
                return !0;
              }, F.prototype.scanNumericLiteral = function() {
                var v = this.index, E = this.source[v];
                a.assert(p.Character.isDecimalDigit(E.charCodeAt(0)) || E === ".", "Numeric literal must start with a decimal digit or a decimal point");
                var x = "";
                if (E !== ".") {
                  if (x = this.source[this.index++], E = this.source[this.index], x === "0") {
                    if (E === "x" || E === "X")
                      return ++this.index, this.scanHexLiteral(v);
                    if (E === "b" || E === "B")
                      return ++this.index, this.scanBinaryLiteral(v);
                    if (E === "o" || E === "O")
                      return this.scanOctalLiteral(E, v);
                    if (E && p.Character.isOctalDigit(E.charCodeAt(0)) && this.isImplicitOctalLiteral())
                      return this.scanOctalLiteral(E, v);
                  }
                  for (; p.Character.isDecimalDigit(this.source.charCodeAt(this.index)); )
                    x += this.source[this.index++];
                  E = this.source[this.index];
                }
                if (E === ".") {
                  for (x += this.source[this.index++]; p.Character.isDecimalDigit(this.source.charCodeAt(this.index)); )
                    x += this.source[this.index++];
                  E = this.source[this.index];
                }
                if (E === "e" || E === "E")
                  if (x += this.source[this.index++], E = this.source[this.index], (E === "+" || E === "-") && (x += this.source[this.index++]), p.Character.isDecimalDigit(this.source.charCodeAt(this.index)))
                    for (; p.Character.isDecimalDigit(this.source.charCodeAt(this.index)); )
                      x += this.source[this.index++];
                  else
                    this.throwUnexpectedToken();
                return p.Character.isIdentifierStart(this.source.charCodeAt(this.index)) && this.throwUnexpectedToken(), {
                  type: 6,
                  value: parseFloat(x),
                  lineNumber: this.lineNumber,
                  lineStart: this.lineStart,
                  start: v,
                  end: this.index
                };
              }, F.prototype.scanStringLiteral = function() {
                var v = this.index, E = this.source[v];
                a.assert(E === "'" || E === '"', "String literal must starts with a quote"), ++this.index;
                for (var x = !1, t = ""; !this.eof(); ) {
                  var n = this.source[this.index++];
                  if (n === E) {
                    E = "";
                    break;
                  } else if (n === "\\")
                    if (n = this.source[this.index++], !n || !p.Character.isLineTerminator(n.charCodeAt(0)))
                      switch (n) {
                        case "u":
                          if (this.source[this.index] === "{")
                            ++this.index, t += this.scanUnicodeCodePointEscape();
                          else {
                            var s = this.scanHexEscape(n);
                            s === null && this.throwUnexpectedToken(), t += s;
                          }
                          break;
                        case "x":
                          var d = this.scanHexEscape(n);
                          d === null && this.throwUnexpectedToken(h.Messages.InvalidHexEscapeSequence), t += d;
                          break;
                        case "n":
                          t += `
`;
                          break;
                        case "r":
                          t += "\r";
                          break;
                        case "t":
                          t += "	";
                          break;
                        case "b":
                          t += "\b";
                          break;
                        case "f":
                          t += "\f";
                          break;
                        case "v":
                          t += "\v";
                          break;
                        case "8":
                        case "9":
                          t += n, this.tolerateUnexpectedToken();
                          break;
                        default:
                          if (n && p.Character.isOctalDigit(n.charCodeAt(0))) {
                            var f = this.octalToDecimal(n);
                            x = f.octal || x, t += String.fromCharCode(f.code);
                          } else
                            t += n;
                          break;
                      }
                    else
                      ++this.lineNumber, n === "\r" && this.source[this.index] === `
` && ++this.index, this.lineStart = this.index;
                  else {
                    if (p.Character.isLineTerminator(n.charCodeAt(0)))
                      break;
                    t += n;
                  }
                }
                return E !== "" && (this.index = v, this.throwUnexpectedToken()), {
                  type: 8,
                  value: t,
                  octal: x,
                  lineNumber: this.lineNumber,
                  lineStart: this.lineStart,
                  start: v,
                  end: this.index
                };
              }, F.prototype.scanTemplate = function() {
                var v = "", E = !1, x = this.index, t = this.source[x] === "`", n = !1, s = 2;
                for (++this.index; !this.eof(); ) {
                  var d = this.source[this.index++];
                  if (d === "`") {
                    s = 1, n = !0, E = !0;
                    break;
                  } else if (d === "$") {
                    if (this.source[this.index] === "{") {
                      this.curlyStack.push("${"), ++this.index, E = !0;
                      break;
                    }
                    v += d;
                  } else if (d === "\\")
                    if (d = this.source[this.index++], p.Character.isLineTerminator(d.charCodeAt(0)))
                      ++this.lineNumber, d === "\r" && this.source[this.index] === `
` && ++this.index, this.lineStart = this.index;
                    else
                      switch (d) {
                        case "n":
                          v += `
`;
                          break;
                        case "r":
                          v += "\r";
                          break;
                        case "t":
                          v += "	";
                          break;
                        case "u":
                          if (this.source[this.index] === "{")
                            ++this.index, v += this.scanUnicodeCodePointEscape();
                          else {
                            var f = this.index, S = this.scanHexEscape(d);
                            S !== null ? v += S : (this.index = f, v += d);
                          }
                          break;
                        case "x":
                          var A = this.scanHexEscape(d);
                          A === null && this.throwUnexpectedToken(h.Messages.InvalidHexEscapeSequence), v += A;
                          break;
                        case "b":
                          v += "\b";
                          break;
                        case "f":
                          v += "\f";
                          break;
                        case "v":
                          v += "\v";
                          break;
                        default:
                          d === "0" ? (p.Character.isDecimalDigit(this.source.charCodeAt(this.index)) && this.throwUnexpectedToken(h.Messages.TemplateOctalLiteral), v += "\0") : p.Character.isOctalDigit(d.charCodeAt(0)) ? this.throwUnexpectedToken(h.Messages.TemplateOctalLiteral) : v += d;
                          break;
                      }
                  else p.Character.isLineTerminator(d.charCodeAt(0)) ? (++this.lineNumber, d === "\r" && this.source[this.index] === `
` && ++this.index, this.lineStart = this.index, v += `
`) : v += d;
                }
                return E || this.throwUnexpectedToken(), t || this.curlyStack.pop(), {
                  type: 10,
                  value: this.source.slice(x + 1, this.index - s),
                  cooked: v,
                  head: t,
                  tail: n,
                  lineNumber: this.lineNumber,
                  lineStart: this.lineStart,
                  start: x,
                  end: this.index
                };
              }, F.prototype.testRegExp = function(v, E) {
                var x = "￿", t = v, n = this;
                E.indexOf("u") >= 0 && (t = t.replace(/\\u\{([0-9a-fA-F]+)\}|\\u([a-fA-F0-9]{4})/g, function(s, d, f) {
                  var S = parseInt(d || f, 16);
                  return S > 1114111 && n.throwUnexpectedToken(h.Messages.InvalidRegExp), S <= 65535 ? String.fromCharCode(S) : x;
                }).replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, x));
                try {
                  RegExp(t);
                } catch {
                  this.throwUnexpectedToken(h.Messages.InvalidRegExp);
                }
                try {
                  return new RegExp(v, E);
                } catch {
                  return null;
                }
              }, F.prototype.scanRegExpBody = function() {
                var v = this.source[this.index];
                a.assert(v === "/", "Regular expression literal must start with a slash");
                for (var E = this.source[this.index++], x = !1, t = !1; !this.eof(); )
                  if (v = this.source[this.index++], E += v, v === "\\")
                    v = this.source[this.index++], p.Character.isLineTerminator(v.charCodeAt(0)) && this.throwUnexpectedToken(h.Messages.UnterminatedRegExp), E += v;
                  else if (p.Character.isLineTerminator(v.charCodeAt(0)))
                    this.throwUnexpectedToken(h.Messages.UnterminatedRegExp);
                  else if (x)
                    v === "]" && (x = !1);
                  else if (v === "/") {
                    t = !0;
                    break;
                  } else v === "[" && (x = !0);
                return t || this.throwUnexpectedToken(h.Messages.UnterminatedRegExp), E.substr(1, E.length - 2);
              }, F.prototype.scanRegExpFlags = function() {
                for (var v = "", E = ""; !this.eof(); ) {
                  var x = this.source[this.index];
                  if (!p.Character.isIdentifierPart(x.charCodeAt(0)))
                    break;
                  if (++this.index, x === "\\" && !this.eof())
                    if (x = this.source[this.index], x === "u") {
                      ++this.index;
                      var t = this.index, n = this.scanHexEscape("u");
                      if (n !== null)
                        for (E += n, v += "\\u"; t < this.index; ++t)
                          v += this.source[t];
                      else
                        this.index = t, E += "u", v += "\\u";
                      this.tolerateUnexpectedToken();
                    } else
                      v += "\\", this.tolerateUnexpectedToken();
                  else
                    E += x, v += x;
                }
                return E;
              }, F.prototype.scanRegExp = function() {
                var v = this.index, E = this.scanRegExpBody(), x = this.scanRegExpFlags(), t = this.testRegExp(E, x);
                return {
                  type: 9,
                  value: "",
                  pattern: E,
                  flags: x,
                  regex: t,
                  lineNumber: this.lineNumber,
                  lineStart: this.lineStart,
                  start: v,
                  end: this.index
                };
              }, F.prototype.lex = function() {
                if (this.eof())
                  return {
                    type: 2,
                    value: "",
                    lineNumber: this.lineNumber,
                    lineStart: this.lineStart,
                    start: this.index,
                    end: this.index
                  };
                var v = this.source.charCodeAt(this.index);
                return p.Character.isIdentifierStart(v) ? this.scanIdentifier() : v === 40 || v === 41 || v === 59 ? this.scanPunctuator() : v === 39 || v === 34 ? this.scanStringLiteral() : v === 46 ? p.Character.isDecimalDigit(this.source.charCodeAt(this.index + 1)) ? this.scanNumericLiteral() : this.scanPunctuator() : p.Character.isDecimalDigit(v) ? this.scanNumericLiteral() : v === 96 || v === 125 && this.curlyStack[this.curlyStack.length - 1] === "${" ? this.scanTemplate() : v >= 55296 && v < 57343 && p.Character.isIdentifierStart(this.codePointAt(this.index)) ? this.scanIdentifier() : this.scanPunctuator();
              }, F;
            }();
            i.Scanner = g;
          },
          /* 13 */
          /***/
          function(r, i) {
            Object.defineProperty(i, "__esModule", { value: !0 }), i.TokenName = {}, i.TokenName[
              1
              /* BooleanLiteral */
            ] = "Boolean", i.TokenName[
              2
              /* EOF */
            ] = "<end>", i.TokenName[
              3
              /* Identifier */
            ] = "Identifier", i.TokenName[
              4
              /* Keyword */
            ] = "Keyword", i.TokenName[
              5
              /* NullLiteral */
            ] = "Null", i.TokenName[
              6
              /* NumericLiteral */
            ] = "Numeric", i.TokenName[
              7
              /* Punctuator */
            ] = "Punctuator", i.TokenName[
              8
              /* StringLiteral */
            ] = "String", i.TokenName[
              9
              /* RegularExpression */
            ] = "RegularExpression", i.TokenName[
              10
              /* Template */
            ] = "Template";
          },
          /* 14 */
          /***/
          function(r, i) {
            Object.defineProperty(i, "__esModule", { value: !0 }), i.XHTMLEntities = {
              quot: '"',
              amp: "&",
              apos: "'",
              gt: ">",
              nbsp: " ",
              iexcl: "¡",
              cent: "¢",
              pound: "£",
              curren: "¤",
              yen: "¥",
              brvbar: "¦",
              sect: "§",
              uml: "¨",
              copy: "©",
              ordf: "ª",
              laquo: "«",
              not: "¬",
              shy: "­",
              reg: "®",
              macr: "¯",
              deg: "°",
              plusmn: "±",
              sup2: "²",
              sup3: "³",
              acute: "´",
              micro: "µ",
              para: "¶",
              middot: "·",
              cedil: "¸",
              sup1: "¹",
              ordm: "º",
              raquo: "»",
              frac14: "¼",
              frac12: "½",
              frac34: "¾",
              iquest: "¿",
              Agrave: "À",
              Aacute: "Á",
              Acirc: "Â",
              Atilde: "Ã",
              Auml: "Ä",
              Aring: "Å",
              AElig: "Æ",
              Ccedil: "Ç",
              Egrave: "È",
              Eacute: "É",
              Ecirc: "Ê",
              Euml: "Ë",
              Igrave: "Ì",
              Iacute: "Í",
              Icirc: "Î",
              Iuml: "Ï",
              ETH: "Ð",
              Ntilde: "Ñ",
              Ograve: "Ò",
              Oacute: "Ó",
              Ocirc: "Ô",
              Otilde: "Õ",
              Ouml: "Ö",
              times: "×",
              Oslash: "Ø",
              Ugrave: "Ù",
              Uacute: "Ú",
              Ucirc: "Û",
              Uuml: "Ü",
              Yacute: "Ý",
              THORN: "Þ",
              szlig: "ß",
              agrave: "à",
              aacute: "á",
              acirc: "â",
              atilde: "ã",
              auml: "ä",
              aring: "å",
              aelig: "æ",
              ccedil: "ç",
              egrave: "è",
              eacute: "é",
              ecirc: "ê",
              euml: "ë",
              igrave: "ì",
              iacute: "í",
              icirc: "î",
              iuml: "ï",
              eth: "ð",
              ntilde: "ñ",
              ograve: "ò",
              oacute: "ó",
              ocirc: "ô",
              otilde: "õ",
              ouml: "ö",
              divide: "÷",
              oslash: "ø",
              ugrave: "ù",
              uacute: "ú",
              ucirc: "û",
              uuml: "ü",
              yacute: "ý",
              thorn: "þ",
              yuml: "ÿ",
              OElig: "Œ",
              oelig: "œ",
              Scaron: "Š",
              scaron: "š",
              Yuml: "Ÿ",
              fnof: "ƒ",
              circ: "ˆ",
              tilde: "˜",
              Alpha: "Α",
              Beta: "Β",
              Gamma: "Γ",
              Delta: "Δ",
              Epsilon: "Ε",
              Zeta: "Ζ",
              Eta: "Η",
              Theta: "Θ",
              Iota: "Ι",
              Kappa: "Κ",
              Lambda: "Λ",
              Mu: "Μ",
              Nu: "Ν",
              Xi: "Ξ",
              Omicron: "Ο",
              Pi: "Π",
              Rho: "Ρ",
              Sigma: "Σ",
              Tau: "Τ",
              Upsilon: "Υ",
              Phi: "Φ",
              Chi: "Χ",
              Psi: "Ψ",
              Omega: "Ω",
              alpha: "α",
              beta: "β",
              gamma: "γ",
              delta: "δ",
              epsilon: "ε",
              zeta: "ζ",
              eta: "η",
              theta: "θ",
              iota: "ι",
              kappa: "κ",
              lambda: "λ",
              mu: "μ",
              nu: "ν",
              xi: "ξ",
              omicron: "ο",
              pi: "π",
              rho: "ρ",
              sigmaf: "ς",
              sigma: "σ",
              tau: "τ",
              upsilon: "υ",
              phi: "φ",
              chi: "χ",
              psi: "ψ",
              omega: "ω",
              thetasym: "ϑ",
              upsih: "ϒ",
              piv: "ϖ",
              ensp: " ",
              emsp: " ",
              thinsp: " ",
              zwnj: "‌",
              zwj: "‍",
              lrm: "‎",
              rlm: "‏",
              ndash: "–",
              mdash: "—",
              lsquo: "‘",
              rsquo: "’",
              sbquo: "‚",
              ldquo: "“",
              rdquo: "”",
              bdquo: "„",
              dagger: "†",
              Dagger: "‡",
              bull: "•",
              hellip: "…",
              permil: "‰",
              prime: "′",
              Prime: "″",
              lsaquo: "‹",
              rsaquo: "›",
              oline: "‾",
              frasl: "⁄",
              euro: "€",
              image: "ℑ",
              weierp: "℘",
              real: "ℜ",
              trade: "™",
              alefsym: "ℵ",
              larr: "←",
              uarr: "↑",
              rarr: "→",
              darr: "↓",
              harr: "↔",
              crarr: "↵",
              lArr: "⇐",
              uArr: "⇑",
              rArr: "⇒",
              dArr: "⇓",
              hArr: "⇔",
              forall: "∀",
              part: "∂",
              exist: "∃",
              empty: "∅",
              nabla: "∇",
              isin: "∈",
              notin: "∉",
              ni: "∋",
              prod: "∏",
              sum: "∑",
              minus: "−",
              lowast: "∗",
              radic: "√",
              prop: "∝",
              infin: "∞",
              ang: "∠",
              and: "∧",
              or: "∨",
              cap: "∩",
              cup: "∪",
              int: "∫",
              there4: "∴",
              sim: "∼",
              cong: "≅",
              asymp: "≈",
              ne: "≠",
              equiv: "≡",
              le: "≤",
              ge: "≥",
              sub: "⊂",
              sup: "⊃",
              nsub: "⊄",
              sube: "⊆",
              supe: "⊇",
              oplus: "⊕",
              otimes: "⊗",
              perp: "⊥",
              sdot: "⋅",
              lceil: "⌈",
              rceil: "⌉",
              lfloor: "⌊",
              rfloor: "⌋",
              loz: "◊",
              spades: "♠",
              clubs: "♣",
              hearts: "♥",
              diams: "♦",
              lang: "⟨",
              rang: "⟩"
            };
          },
          /* 15 */
          /***/
          function(r, i, u) {
            Object.defineProperty(i, "__esModule", { value: !0 });
            var a = u(10), p = u(12), h = u(13), m = function() {
              function g() {
                this.values = [], this.curly = this.paren = -1;
              }
              return g.prototype.beforeFunctionExpression = function(F) {
                return [
                  "(",
                  "{",
                  "[",
                  "in",
                  "typeof",
                  "instanceof",
                  "new",
                  "return",
                  "case",
                  "delete",
                  "throw",
                  "void",
                  // assignment operators
                  "=",
                  "+=",
                  "-=",
                  "*=",
                  "**=",
                  "/=",
                  "%=",
                  "<<=",
                  ">>=",
                  ">>>=",
                  "&=",
                  "|=",
                  "^=",
                  ",",
                  // binary/unary operators
                  "+",
                  "-",
                  "*",
                  "**",
                  "/",
                  "%",
                  "++",
                  "--",
                  "<<",
                  ">>",
                  ">>>",
                  "&",
                  "|",
                  "^",
                  "!",
                  "~",
                  "&&",
                  "||",
                  "?",
                  ":",
                  "===",
                  "==",
                  ">=",
                  "<=",
                  "<",
                  ">",
                  "!=",
                  "!=="
                ].indexOf(F) >= 0;
              }, g.prototype.isRegexStart = function() {
                var F = this.values[this.values.length - 1], v = F !== null;
                switch (F) {
                  case "this":
                  case "]":
                    v = !1;
                    break;
                  case ")":
                    var E = this.values[this.paren - 1];
                    v = E === "if" || E === "while" || E === "for" || E === "with";
                    break;
                  case "}":
                    if (v = !1, this.values[this.curly - 3] === "function") {
                      var x = this.values[this.curly - 4];
                      v = x ? !this.beforeFunctionExpression(x) : !1;
                    } else if (this.values[this.curly - 4] === "function") {
                      var x = this.values[this.curly - 5];
                      v = x ? !this.beforeFunctionExpression(x) : !0;
                    }
                    break;
                }
                return v;
              }, g.prototype.push = function(F) {
                F.type === 7 || F.type === 4 ? (F.value === "{" ? this.curly = this.values.length : F.value === "(" && (this.paren = this.values.length), this.values.push(F.value)) : this.values.push(null);
              }, g;
            }(), w = function() {
              function g(F, v) {
                this.errorHandler = new a.ErrorHandler(), this.errorHandler.tolerant = v ? typeof v.tolerant == "boolean" && v.tolerant : !1, this.scanner = new p.Scanner(F, this.errorHandler), this.scanner.trackComment = v ? typeof v.comment == "boolean" && v.comment : !1, this.trackRange = v ? typeof v.range == "boolean" && v.range : !1, this.trackLoc = v ? typeof v.loc == "boolean" && v.loc : !1, this.buffer = [], this.reader = new m();
              }
              return g.prototype.errors = function() {
                return this.errorHandler.errors;
              }, g.prototype.getNextToken = function() {
                if (this.buffer.length === 0) {
                  var F = this.scanner.scanComments();
                  if (this.scanner.trackComment)
                    for (var v = 0; v < F.length; ++v) {
                      var E = F[v], x = this.scanner.source.slice(E.slice[0], E.slice[1]), t = {
                        type: E.multiLine ? "BlockComment" : "LineComment",
                        value: x
                      };
                      this.trackRange && (t.range = E.range), this.trackLoc && (t.loc = E.loc), this.buffer.push(t);
                    }
                  if (!this.scanner.eof()) {
                    var n = void 0;
                    this.trackLoc && (n = {
                      start: {
                        line: this.scanner.lineNumber,
                        column: this.scanner.index - this.scanner.lineStart
                      },
                      end: {}
                    });
                    var s = this.scanner.source[this.scanner.index] === "/" && this.reader.isRegexStart(), d = s ? this.scanner.scanRegExp() : this.scanner.lex();
                    this.reader.push(d);
                    var f = {
                      type: h.TokenName[d.type],
                      value: this.scanner.source.slice(d.start, d.end)
                    };
                    if (this.trackRange && (f.range = [d.start, d.end]), this.trackLoc && (n.end = {
                      line: this.scanner.lineNumber,
                      column: this.scanner.index - this.scanner.lineStart
                    }, f.loc = n), d.type === 9) {
                      var S = d.pattern, A = d.flags;
                      f.regex = { pattern: S, flags: A };
                    }
                    this.buffer.push(f);
                  }
                }
                return this.buffer.shift();
              }, g;
            }();
            i.Tokenizer = w;
          }
          /******/
        ])
      );
    });
  }(Jt)), Jt.exports;
}
var Ae = {}, Dr = {}, gt = {}, ai;
function za() {
  if (ai) return gt;
  ai = 1, gt.byteLength = h, gt.toByteArray = w, gt.fromByteArray = v;
  for (var c = [], e = [], r = typeof Uint8Array < "u" ? Uint8Array : Array, i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", u = 0, a = i.length; u < a; ++u)
    c[u] = i[u], e[i.charCodeAt(u)] = u;
  e[45] = 62, e[95] = 63;
  function p(E) {
    var x = E.length;
    if (x % 4 > 0)
      throw new Error("Invalid string. Length must be a multiple of 4");
    var t = E.indexOf("=");
    t === -1 && (t = x);
    var n = t === x ? 0 : 4 - t % 4;
    return [t, n];
  }
  function h(E) {
    var x = p(E), t = x[0], n = x[1];
    return (t + n) * 3 / 4 - n;
  }
  function m(E, x, t) {
    return (x + t) * 3 / 4 - t;
  }
  function w(E) {
    var x, t = p(E), n = t[0], s = t[1], d = new r(m(E, n, s)), f = 0, S = s > 0 ? n - 4 : n, A;
    for (A = 0; A < S; A += 4)
      x = e[E.charCodeAt(A)] << 18 | e[E.charCodeAt(A + 1)] << 12 | e[E.charCodeAt(A + 2)] << 6 | e[E.charCodeAt(A + 3)], d[f++] = x >> 16 & 255, d[f++] = x >> 8 & 255, d[f++] = x & 255;
    return s === 2 && (x = e[E.charCodeAt(A)] << 2 | e[E.charCodeAt(A + 1)] >> 4, d[f++] = x & 255), s === 1 && (x = e[E.charCodeAt(A)] << 10 | e[E.charCodeAt(A + 1)] << 4 | e[E.charCodeAt(A + 2)] >> 2, d[f++] = x >> 8 & 255, d[f++] = x & 255), d;
  }
  function g(E) {
    return c[E >> 18 & 63] + c[E >> 12 & 63] + c[E >> 6 & 63] + c[E & 63];
  }
  function F(E, x, t) {
    for (var n, s = [], d = x; d < t; d += 3)
      n = (E[d] << 16 & 16711680) + (E[d + 1] << 8 & 65280) + (E[d + 2] & 255), s.push(g(n));
    return s.join("");
  }
  function v(E) {
    for (var x, t = E.length, n = t % 3, s = [], d = 16383, f = 0, S = t - n; f < S; f += d)
      s.push(F(E, f, f + d > S ? S : f + d));
    return n === 1 ? (x = E[t - 1], s.push(
      c[x >> 2] + c[x << 4 & 63] + "=="
    )) : n === 2 && (x = (E[t - 2] << 8) + E[t - 1], s.push(
      c[x >> 10] + c[x >> 4 & 63] + c[x << 2 & 63] + "="
    )), s.join("");
  }
  return gt;
}
var jt = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
var oi;
function $a() {
  return oi || (oi = 1, jt.read = function(c, e, r, i, u) {
    var a, p, h = u * 8 - i - 1, m = (1 << h) - 1, w = m >> 1, g = -7, F = r ? u - 1 : 0, v = r ? -1 : 1, E = c[e + F];
    for (F += v, a = E & (1 << -g) - 1, E >>= -g, g += h; g > 0; a = a * 256 + c[e + F], F += v, g -= 8)
      ;
    for (p = a & (1 << -g) - 1, a >>= -g, g += i; g > 0; p = p * 256 + c[e + F], F += v, g -= 8)
      ;
    if (a === 0)
      a = 1 - w;
    else {
      if (a === m)
        return p ? NaN : (E ? -1 : 1) * (1 / 0);
      p = p + Math.pow(2, i), a = a - w;
    }
    return (E ? -1 : 1) * p * Math.pow(2, a - i);
  }, jt.write = function(c, e, r, i, u, a) {
    var p, h, m, w = a * 8 - u - 1, g = (1 << w) - 1, F = g >> 1, v = u === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, E = i ? 0 : a - 1, x = i ? 1 : -1, t = e < 0 || e === 0 && 1 / e < 0 ? 1 : 0;
    for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (h = isNaN(e) ? 1 : 0, p = g) : (p = Math.floor(Math.log(e) / Math.LN2), e * (m = Math.pow(2, -p)) < 1 && (p--, m *= 2), p + F >= 1 ? e += v / m : e += v * Math.pow(2, 1 - F), e * m >= 2 && (p++, m /= 2), p + F >= g ? (h = 0, p = g) : p + F >= 1 ? (h = (e * m - 1) * Math.pow(2, u), p = p + F) : (h = e * Math.pow(2, F - 1) * Math.pow(2, u), p = 0)); u >= 8; c[r + E] = h & 255, E += x, h /= 256, u -= 8)
      ;
    for (p = p << u | h, w += u; w > 0; c[r + E] = p & 255, E += x, p /= 256, w -= 8)
      ;
    c[r + E - x] |= t * 128;
  }), jt;
}
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
var ui;
function qa() {
  return ui || (ui = 1, function(c) {
    const e = za(), r = $a(), i = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
    c.Buffer = h, c.SlowBuffer = d, c.INSPECT_MAX_BYTES = 50;
    const u = 2147483647;
    c.kMaxLength = u, h.TYPED_ARRAY_SUPPORT = a(), !h.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
      "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
    );
    function a() {
      try {
        const y = new Uint8Array(1), o = { foo: function() {
          return 42;
        } };
        return Object.setPrototypeOf(o, Uint8Array.prototype), Object.setPrototypeOf(y, o), y.foo() === 42;
      } catch {
        return !1;
      }
    }
    Object.defineProperty(h.prototype, "parent", {
      enumerable: !0,
      get: function() {
        if (h.isBuffer(this))
          return this.buffer;
      }
    }), Object.defineProperty(h.prototype, "offset", {
      enumerable: !0,
      get: function() {
        if (h.isBuffer(this))
          return this.byteOffset;
      }
    });
    function p(y) {
      if (y > u)
        throw new RangeError('The value "' + y + '" is invalid for option "size"');
      const o = new Uint8Array(y);
      return Object.setPrototypeOf(o, h.prototype), o;
    }
    function h(y, o, l) {
      if (typeof y == "number") {
        if (typeof o == "string")
          throw new TypeError(
            'The "string" argument must be of type string. Received type number'
          );
        return F(y);
      }
      return m(y, o, l);
    }
    h.poolSize = 8192;
    function m(y, o, l) {
      if (typeof y == "string")
        return v(y, o);
      if (ArrayBuffer.isView(y))
        return x(y);
      if (y == null)
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof y
        );
      if (ve(y, ArrayBuffer) || y && ve(y.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (ve(y, SharedArrayBuffer) || y && ve(y.buffer, SharedArrayBuffer)))
        return t(y, o, l);
      if (typeof y == "number")
        throw new TypeError(
          'The "value" argument must not be of type number. Received type number'
        );
      const C = y.valueOf && y.valueOf();
      if (C != null && C !== y)
        return h.from(C, o, l);
      const _ = n(y);
      if (_) return _;
      if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof y[Symbol.toPrimitive] == "function")
        return h.from(y[Symbol.toPrimitive]("string"), o, l);
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof y
      );
    }
    h.from = function(y, o, l) {
      return m(y, o, l);
    }, Object.setPrototypeOf(h.prototype, Uint8Array.prototype), Object.setPrototypeOf(h, Uint8Array);
    function w(y) {
      if (typeof y != "number")
        throw new TypeError('"size" argument must be of type number');
      if (y < 0)
        throw new RangeError('The value "' + y + '" is invalid for option "size"');
    }
    function g(y, o, l) {
      return w(y), y <= 0 ? p(y) : o !== void 0 ? typeof l == "string" ? p(y).fill(o, l) : p(y).fill(o) : p(y);
    }
    h.alloc = function(y, o, l) {
      return g(y, o, l);
    };
    function F(y) {
      return w(y), p(y < 0 ? 0 : s(y) | 0);
    }
    h.allocUnsafe = function(y) {
      return F(y);
    }, h.allocUnsafeSlow = function(y) {
      return F(y);
    };
    function v(y, o) {
      if ((typeof o != "string" || o === "") && (o = "utf8"), !h.isEncoding(o))
        throw new TypeError("Unknown encoding: " + o);
      const l = f(y, o) | 0;
      let C = p(l);
      const _ = C.write(y, o);
      return _ !== l && (C = C.slice(0, _)), C;
    }
    function E(y) {
      const o = y.length < 0 ? 0 : s(y.length) | 0, l = p(o);
      for (let C = 0; C < o; C += 1)
        l[C] = y[C] & 255;
      return l;
    }
    function x(y) {
      if (ve(y, Uint8Array)) {
        const o = new Uint8Array(y);
        return t(o.buffer, o.byteOffset, o.byteLength);
      }
      return E(y);
    }
    function t(y, o, l) {
      if (o < 0 || y.byteLength < o)
        throw new RangeError('"offset" is outside of buffer bounds');
      if (y.byteLength < o + (l || 0))
        throw new RangeError('"length" is outside of buffer bounds');
      let C;
      return o === void 0 && l === void 0 ? C = new Uint8Array(y) : l === void 0 ? C = new Uint8Array(y, o) : C = new Uint8Array(y, o, l), Object.setPrototypeOf(C, h.prototype), C;
    }
    function n(y) {
      if (h.isBuffer(y)) {
        const o = s(y.length) | 0, l = p(o);
        return l.length === 0 || y.copy(l, 0, 0, o), l;
      }
      if (y.length !== void 0)
        return typeof y.length != "number" || vt(y.length) ? p(0) : E(y);
      if (y.type === "Buffer" && Array.isArray(y.data))
        return E(y.data);
    }
    function s(y) {
      if (y >= u)
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + u.toString(16) + " bytes");
      return y | 0;
    }
    function d(y) {
      return +y != y && (y = 0), h.alloc(+y);
    }
    h.isBuffer = function(o) {
      return o != null && o._isBuffer === !0 && o !== h.prototype;
    }, h.compare = function(o, l) {
      if (ve(o, Uint8Array) && (o = h.from(o, o.offset, o.byteLength)), ve(l, Uint8Array) && (l = h.from(l, l.offset, l.byteLength)), !h.isBuffer(o) || !h.isBuffer(l))
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
        );
      if (o === l) return 0;
      let C = o.length, _ = l.length;
      for (let B = 0, R = Math.min(C, _); B < R; ++B)
        if (o[B] !== l[B]) {
          C = o[B], _ = l[B];
          break;
        }
      return C < _ ? -1 : _ < C ? 1 : 0;
    }, h.isEncoding = function(o) {
      switch (String(o).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return !0;
        default:
          return !1;
      }
    }, h.concat = function(o, l) {
      if (!Array.isArray(o))
        throw new TypeError('"list" argument must be an Array of Buffers');
      if (o.length === 0)
        return h.alloc(0);
      let C;
      if (l === void 0)
        for (l = 0, C = 0; C < o.length; ++C)
          l += o[C].length;
      const _ = h.allocUnsafe(l);
      let B = 0;
      for (C = 0; C < o.length; ++C) {
        let R = o[C];
        if (ve(R, Uint8Array))
          B + R.length > _.length ? (h.isBuffer(R) || (R = h.from(R)), R.copy(_, B)) : Uint8Array.prototype.set.call(
            _,
            R,
            B
          );
        else if (h.isBuffer(R))
          R.copy(_, B);
        else
          throw new TypeError('"list" argument must be an Array of Buffers');
        B += R.length;
      }
      return _;
    };
    function f(y, o) {
      if (h.isBuffer(y))
        return y.length;
      if (ArrayBuffer.isView(y) || ve(y, ArrayBuffer))
        return y.byteLength;
      if (typeof y != "string")
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof y
        );
      const l = y.length, C = arguments.length > 2 && arguments[2] === !0;
      if (!C && l === 0) return 0;
      let _ = !1;
      for (; ; )
        switch (o) {
          case "ascii":
          case "latin1":
          case "binary":
            return l;
          case "utf8":
          case "utf-8":
            return Ce(y).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return l * 2;
          case "hex":
            return l >>> 1;
          case "base64":
            return ae(y).length;
          default:
            if (_)
              return C ? -1 : Ce(y).length;
            o = ("" + o).toLowerCase(), _ = !0;
        }
    }
    h.byteLength = f;
    function S(y, o, l) {
      let C = !1;
      if ((o === void 0 || o < 0) && (o = 0), o > this.length || ((l === void 0 || l > this.length) && (l = this.length), l <= 0) || (l >>>= 0, o >>>= 0, l <= o))
        return "";
      for (y || (y = "utf8"); ; )
        switch (y) {
          case "hex":
            return Ee(this, o, l);
          case "utf8":
          case "utf-8":
            return J(this, o, l);
          case "ascii":
            return se(this, o, l);
          case "latin1":
          case "binary":
            return le(this, o, l);
          case "base64":
            return V(this, o, l);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return Se(this, o, l);
          default:
            if (C) throw new TypeError("Unknown encoding: " + y);
            y = (y + "").toLowerCase(), C = !0;
        }
    }
    h.prototype._isBuffer = !0;
    function A(y, o, l) {
      const C = y[o];
      y[o] = y[l], y[l] = C;
    }
    h.prototype.swap16 = function() {
      const o = this.length;
      if (o % 2 !== 0)
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      for (let l = 0; l < o; l += 2)
        A(this, l, l + 1);
      return this;
    }, h.prototype.swap32 = function() {
      const o = this.length;
      if (o % 4 !== 0)
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      for (let l = 0; l < o; l += 4)
        A(this, l, l + 3), A(this, l + 1, l + 2);
      return this;
    }, h.prototype.swap64 = function() {
      const o = this.length;
      if (o % 8 !== 0)
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      for (let l = 0; l < o; l += 8)
        A(this, l, l + 7), A(this, l + 1, l + 6), A(this, l + 2, l + 5), A(this, l + 3, l + 4);
      return this;
    }, h.prototype.toString = function() {
      const o = this.length;
      return o === 0 ? "" : arguments.length === 0 ? J(this, 0, o) : S.apply(this, arguments);
    }, h.prototype.toLocaleString = h.prototype.toString, h.prototype.equals = function(o) {
      if (!h.isBuffer(o)) throw new TypeError("Argument must be a Buffer");
      return this === o ? !0 : h.compare(this, o) === 0;
    }, h.prototype.inspect = function() {
      let o = "";
      const l = c.INSPECT_MAX_BYTES;
      return o = this.toString("hex", 0, l).replace(/(.{2})/g, "$1 ").trim(), this.length > l && (o += " ... "), "<Buffer " + o + ">";
    }, i && (h.prototype[i] = h.prototype.inspect), h.prototype.compare = function(o, l, C, _, B) {
      if (ve(o, Uint8Array) && (o = h.from(o, o.offset, o.byteLength)), !h.isBuffer(o))
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof o
        );
      if (l === void 0 && (l = 0), C === void 0 && (C = o ? o.length : 0), _ === void 0 && (_ = 0), B === void 0 && (B = this.length), l < 0 || C > o.length || _ < 0 || B > this.length)
        throw new RangeError("out of range index");
      if (_ >= B && l >= C)
        return 0;
      if (_ >= B)
        return -1;
      if (l >= C)
        return 1;
      if (l >>>= 0, C >>>= 0, _ >>>= 0, B >>>= 0, this === o) return 0;
      let R = B - _, ne = C - l;
      const me = Math.min(R, ne), pe = this.slice(_, B), xe = o.slice(l, C);
      for (let ce = 0; ce < me; ++ce)
        if (pe[ce] !== xe[ce]) {
          R = pe[ce], ne = xe[ce];
          break;
        }
      return R < ne ? -1 : ne < R ? 1 : 0;
    };
    function b(y, o, l, C, _) {
      if (y.length === 0) return -1;
      if (typeof l == "string" ? (C = l, l = 0) : l > 2147483647 ? l = 2147483647 : l < -2147483648 && (l = -2147483648), l = +l, vt(l) && (l = _ ? 0 : y.length - 1), l < 0 && (l = y.length + l), l >= y.length) {
        if (_) return -1;
        l = y.length - 1;
      } else if (l < 0)
        if (_) l = 0;
        else return -1;
      if (typeof o == "string" && (o = h.from(o, C)), h.isBuffer(o))
        return o.length === 0 ? -1 : k(y, o, l, C, _);
      if (typeof o == "number")
        return o = o & 255, typeof Uint8Array.prototype.indexOf == "function" ? _ ? Uint8Array.prototype.indexOf.call(y, o, l) : Uint8Array.prototype.lastIndexOf.call(y, o, l) : k(y, [o], l, C, _);
      throw new TypeError("val must be string, number or Buffer");
    }
    function k(y, o, l, C, _) {
      let B = 1, R = y.length, ne = o.length;
      if (C !== void 0 && (C = String(C).toLowerCase(), C === "ucs2" || C === "ucs-2" || C === "utf16le" || C === "utf-16le")) {
        if (y.length < 2 || o.length < 2)
          return -1;
        B = 2, R /= 2, ne /= 2, l /= 2;
      }
      function me(xe, ce) {
        return B === 1 ? xe[ce] : xe.readUInt16BE(ce * B);
      }
      let pe;
      if (_) {
        let xe = -1;
        for (pe = l; pe < R; pe++)
          if (me(y, pe) === me(o, xe === -1 ? 0 : pe - xe)) {
            if (xe === -1 && (xe = pe), pe - xe + 1 === ne) return xe * B;
          } else
            xe !== -1 && (pe -= pe - xe), xe = -1;
      } else
        for (l + ne > R && (l = R - ne), pe = l; pe >= 0; pe--) {
          let xe = !0;
          for (let ce = 0; ce < ne; ce++)
            if (me(y, pe + ce) !== me(o, ce)) {
              xe = !1;
              break;
            }
          if (xe) return pe;
        }
      return -1;
    }
    h.prototype.includes = function(o, l, C) {
      return this.indexOf(o, l, C) !== -1;
    }, h.prototype.indexOf = function(o, l, C) {
      return b(this, o, l, C, !0);
    }, h.prototype.lastIndexOf = function(o, l, C) {
      return b(this, o, l, C, !1);
    };
    function T(y, o, l, C) {
      l = Number(l) || 0;
      const _ = y.length - l;
      C ? (C = Number(C), C > _ && (C = _)) : C = _;
      const B = o.length;
      C > B / 2 && (C = B / 2);
      let R;
      for (R = 0; R < C; ++R) {
        const ne = parseInt(o.substr(R * 2, 2), 16);
        if (vt(ne)) return R;
        y[l + R] = ne;
      }
      return R;
    }
    function P(y, o, l, C) {
      return ue(Ce(o, y.length - l), y, l, C);
    }
    function j(y, o, l, C) {
      return ue(qe(o), y, l, C);
    }
    function M(y, o, l, C) {
      return ue(ae(o), y, l, C);
    }
    function Z(y, o, l, C) {
      return ue($(o, y.length - l), y, l, C);
    }
    h.prototype.write = function(o, l, C, _) {
      if (l === void 0)
        _ = "utf8", C = this.length, l = 0;
      else if (C === void 0 && typeof l == "string")
        _ = l, C = this.length, l = 0;
      else if (isFinite(l))
        l = l >>> 0, isFinite(C) ? (C = C >>> 0, _ === void 0 && (_ = "utf8")) : (_ = C, C = void 0);
      else
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported"
        );
      const B = this.length - l;
      if ((C === void 0 || C > B) && (C = B), o.length > 0 && (C < 0 || l < 0) || l > this.length)
        throw new RangeError("Attempt to write outside buffer bounds");
      _ || (_ = "utf8");
      let R = !1;
      for (; ; )
        switch (_) {
          case "hex":
            return T(this, o, l, C);
          case "utf8":
          case "utf-8":
            return P(this, o, l, C);
          case "ascii":
          case "latin1":
          case "binary":
            return j(this, o, l, C);
          case "base64":
            return M(this, o, l, C);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return Z(this, o, l, C);
          default:
            if (R) throw new TypeError("Unknown encoding: " + _);
            _ = ("" + _).toLowerCase(), R = !0;
        }
    }, h.prototype.toJSON = function() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    function V(y, o, l) {
      return o === 0 && l === y.length ? e.fromByteArray(y) : e.fromByteArray(y.slice(o, l));
    }
    function J(y, o, l) {
      l = Math.min(y.length, l);
      const C = [];
      let _ = o;
      for (; _ < l; ) {
        const B = y[_];
        let R = null, ne = B > 239 ? 4 : B > 223 ? 3 : B > 191 ? 2 : 1;
        if (_ + ne <= l) {
          let me, pe, xe, ce;
          switch (ne) {
            case 1:
              B < 128 && (R = B);
              break;
            case 2:
              me = y[_ + 1], (me & 192) === 128 && (ce = (B & 31) << 6 | me & 63, ce > 127 && (R = ce));
              break;
            case 3:
              me = y[_ + 1], pe = y[_ + 2], (me & 192) === 128 && (pe & 192) === 128 && (ce = (B & 15) << 12 | (me & 63) << 6 | pe & 63, ce > 2047 && (ce < 55296 || ce > 57343) && (R = ce));
              break;
            case 4:
              me = y[_ + 1], pe = y[_ + 2], xe = y[_ + 3], (me & 192) === 128 && (pe & 192) === 128 && (xe & 192) === 128 && (ce = (B & 15) << 18 | (me & 63) << 12 | (pe & 63) << 6 | xe & 63, ce > 65535 && ce < 1114112 && (R = ce));
          }
        }
        R === null ? (R = 65533, ne = 1) : R > 65535 && (R -= 65536, C.push(R >>> 10 & 1023 | 55296), R = 56320 | R & 1023), C.push(R), _ += ne;
      }
      return Y(C);
    }
    const H = 4096;
    function Y(y) {
      const o = y.length;
      if (o <= H)
        return String.fromCharCode.apply(String, y);
      let l = "", C = 0;
      for (; C < o; )
        l += String.fromCharCode.apply(
          String,
          y.slice(C, C += H)
        );
      return l;
    }
    function se(y, o, l) {
      let C = "";
      l = Math.min(y.length, l);
      for (let _ = o; _ < l; ++_)
        C += String.fromCharCode(y[_] & 127);
      return C;
    }
    function le(y, o, l) {
      let C = "";
      l = Math.min(y.length, l);
      for (let _ = o; _ < l; ++_)
        C += String.fromCharCode(y[_]);
      return C;
    }
    function Ee(y, o, l) {
      const C = y.length;
      (!o || o < 0) && (o = 0), (!l || l < 0 || l > C) && (l = C);
      let _ = "";
      for (let B = o; B < l; ++B)
        _ += ar[y[B]];
      return _;
    }
    function Se(y, o, l) {
      const C = y.slice(o, l);
      let _ = "";
      for (let B = 0; B < C.length - 1; B += 2)
        _ += String.fromCharCode(C[B] + C[B + 1] * 256);
      return _;
    }
    h.prototype.slice = function(o, l) {
      const C = this.length;
      o = ~~o, l = l === void 0 ? C : ~~l, o < 0 ? (o += C, o < 0 && (o = 0)) : o > C && (o = C), l < 0 ? (l += C, l < 0 && (l = 0)) : l > C && (l = C), l < o && (l = o);
      const _ = this.subarray(o, l);
      return Object.setPrototypeOf(_, h.prototype), _;
    };
    function he(y, o, l) {
      if (y % 1 !== 0 || y < 0) throw new RangeError("offset is not uint");
      if (y + o > l) throw new RangeError("Trying to access beyond buffer length");
    }
    h.prototype.readUintLE = h.prototype.readUIntLE = function(o, l, C) {
      o = o >>> 0, l = l >>> 0, C || he(o, l, this.length);
      let _ = this[o], B = 1, R = 0;
      for (; ++R < l && (B *= 256); )
        _ += this[o + R] * B;
      return _;
    }, h.prototype.readUintBE = h.prototype.readUIntBE = function(o, l, C) {
      o = o >>> 0, l = l >>> 0, C || he(o, l, this.length);
      let _ = this[o + --l], B = 1;
      for (; l > 0 && (B *= 256); )
        _ += this[o + --l] * B;
      return _;
    }, h.prototype.readUint8 = h.prototype.readUInt8 = function(o, l) {
      return o = o >>> 0, l || he(o, 1, this.length), this[o];
    }, h.prototype.readUint16LE = h.prototype.readUInt16LE = function(o, l) {
      return o = o >>> 0, l || he(o, 2, this.length), this[o] | this[o + 1] << 8;
    }, h.prototype.readUint16BE = h.prototype.readUInt16BE = function(o, l) {
      return o = o >>> 0, l || he(o, 2, this.length), this[o] << 8 | this[o + 1];
    }, h.prototype.readUint32LE = h.prototype.readUInt32LE = function(o, l) {
      return o = o >>> 0, l || he(o, 4, this.length), (this[o] | this[o + 1] << 8 | this[o + 2] << 16) + this[o + 3] * 16777216;
    }, h.prototype.readUint32BE = h.prototype.readUInt32BE = function(o, l) {
      return o = o >>> 0, l || he(o, 4, this.length), this[o] * 16777216 + (this[o + 1] << 16 | this[o + 2] << 8 | this[o + 3]);
    }, h.prototype.readBigUInt64LE = Ze(function(o) {
      o = o >>> 0, K(o, "offset");
      const l = this[o], C = this[o + 7];
      (l === void 0 || C === void 0) && ie(o, this.length - 8);
      const _ = l + this[++o] * 2 ** 8 + this[++o] * 2 ** 16 + this[++o] * 2 ** 24, B = this[++o] + this[++o] * 2 ** 8 + this[++o] * 2 ** 16 + C * 2 ** 24;
      return BigInt(_) + (BigInt(B) << BigInt(32));
    }), h.prototype.readBigUInt64BE = Ze(function(o) {
      o = o >>> 0, K(o, "offset");
      const l = this[o], C = this[o + 7];
      (l === void 0 || C === void 0) && ie(o, this.length - 8);
      const _ = l * 2 ** 24 + this[++o] * 2 ** 16 + this[++o] * 2 ** 8 + this[++o], B = this[++o] * 2 ** 24 + this[++o] * 2 ** 16 + this[++o] * 2 ** 8 + C;
      return (BigInt(_) << BigInt(32)) + BigInt(B);
    }), h.prototype.readIntLE = function(o, l, C) {
      o = o >>> 0, l = l >>> 0, C || he(o, l, this.length);
      let _ = this[o], B = 1, R = 0;
      for (; ++R < l && (B *= 256); )
        _ += this[o + R] * B;
      return B *= 128, _ >= B && (_ -= Math.pow(2, 8 * l)), _;
    }, h.prototype.readIntBE = function(o, l, C) {
      o = o >>> 0, l = l >>> 0, C || he(o, l, this.length);
      let _ = l, B = 1, R = this[o + --_];
      for (; _ > 0 && (B *= 256); )
        R += this[o + --_] * B;
      return B *= 128, R >= B && (R -= Math.pow(2, 8 * l)), R;
    }, h.prototype.readInt8 = function(o, l) {
      return o = o >>> 0, l || he(o, 1, this.length), this[o] & 128 ? (255 - this[o] + 1) * -1 : this[o];
    }, h.prototype.readInt16LE = function(o, l) {
      o = o >>> 0, l || he(o, 2, this.length);
      const C = this[o] | this[o + 1] << 8;
      return C & 32768 ? C | 4294901760 : C;
    }, h.prototype.readInt16BE = function(o, l) {
      o = o >>> 0, l || he(o, 2, this.length);
      const C = this[o + 1] | this[o] << 8;
      return C & 32768 ? C | 4294901760 : C;
    }, h.prototype.readInt32LE = function(o, l) {
      return o = o >>> 0, l || he(o, 4, this.length), this[o] | this[o + 1] << 8 | this[o + 2] << 16 | this[o + 3] << 24;
    }, h.prototype.readInt32BE = function(o, l) {
      return o = o >>> 0, l || he(o, 4, this.length), this[o] << 24 | this[o + 1] << 16 | this[o + 2] << 8 | this[o + 3];
    }, h.prototype.readBigInt64LE = Ze(function(o) {
      o = o >>> 0, K(o, "offset");
      const l = this[o], C = this[o + 7];
      (l === void 0 || C === void 0) && ie(o, this.length - 8);
      const _ = this[o + 4] + this[o + 5] * 2 ** 8 + this[o + 6] * 2 ** 16 + (C << 24);
      return (BigInt(_) << BigInt(32)) + BigInt(l + this[++o] * 2 ** 8 + this[++o] * 2 ** 16 + this[++o] * 2 ** 24);
    }), h.prototype.readBigInt64BE = Ze(function(o) {
      o = o >>> 0, K(o, "offset");
      const l = this[o], C = this[o + 7];
      (l === void 0 || C === void 0) && ie(o, this.length - 8);
      const _ = (l << 24) + // Overflow
      this[++o] * 2 ** 16 + this[++o] * 2 ** 8 + this[++o];
      return (BigInt(_) << BigInt(32)) + BigInt(this[++o] * 2 ** 24 + this[++o] * 2 ** 16 + this[++o] * 2 ** 8 + C);
    }), h.prototype.readFloatLE = function(o, l) {
      return o = o >>> 0, l || he(o, 4, this.length), r.read(this, o, !0, 23, 4);
    }, h.prototype.readFloatBE = function(o, l) {
      return o = o >>> 0, l || he(o, 4, this.length), r.read(this, o, !1, 23, 4);
    }, h.prototype.readDoubleLE = function(o, l) {
      return o = o >>> 0, l || he(o, 8, this.length), r.read(this, o, !0, 52, 8);
    }, h.prototype.readDoubleBE = function(o, l) {
      return o = o >>> 0, l || he(o, 8, this.length), r.read(this, o, !1, 52, 8);
    };
    function fe(y, o, l, C, _, B) {
      if (!h.isBuffer(y)) throw new TypeError('"buffer" argument must be a Buffer instance');
      if (o > _ || o < B) throw new RangeError('"value" argument is out of bounds');
      if (l + C > y.length) throw new RangeError("Index out of range");
    }
    h.prototype.writeUintLE = h.prototype.writeUIntLE = function(o, l, C, _) {
      if (o = +o, l = l >>> 0, C = C >>> 0, !_) {
        const ne = Math.pow(2, 8 * C) - 1;
        fe(this, o, l, C, ne, 0);
      }
      let B = 1, R = 0;
      for (this[l] = o & 255; ++R < C && (B *= 256); )
        this[l + R] = o / B & 255;
      return l + C;
    }, h.prototype.writeUintBE = h.prototype.writeUIntBE = function(o, l, C, _) {
      if (o = +o, l = l >>> 0, C = C >>> 0, !_) {
        const ne = Math.pow(2, 8 * C) - 1;
        fe(this, o, l, C, ne, 0);
      }
      let B = C - 1, R = 1;
      for (this[l + B] = o & 255; --B >= 0 && (R *= 256); )
        this[l + B] = o / R & 255;
      return l + C;
    }, h.prototype.writeUint8 = h.prototype.writeUInt8 = function(o, l, C) {
      return o = +o, l = l >>> 0, C || fe(this, o, l, 1, 255, 0), this[l] = o & 255, l + 1;
    }, h.prototype.writeUint16LE = h.prototype.writeUInt16LE = function(o, l, C) {
      return o = +o, l = l >>> 0, C || fe(this, o, l, 2, 65535, 0), this[l] = o & 255, this[l + 1] = o >>> 8, l + 2;
    }, h.prototype.writeUint16BE = h.prototype.writeUInt16BE = function(o, l, C) {
      return o = +o, l = l >>> 0, C || fe(this, o, l, 2, 65535, 0), this[l] = o >>> 8, this[l + 1] = o & 255, l + 2;
    }, h.prototype.writeUint32LE = h.prototype.writeUInt32LE = function(o, l, C) {
      return o = +o, l = l >>> 0, C || fe(this, o, l, 4, 4294967295, 0), this[l + 3] = o >>> 24, this[l + 2] = o >>> 16, this[l + 1] = o >>> 8, this[l] = o & 255, l + 4;
    }, h.prototype.writeUint32BE = h.prototype.writeUInt32BE = function(o, l, C) {
      return o = +o, l = l >>> 0, C || fe(this, o, l, 4, 4294967295, 0), this[l] = o >>> 24, this[l + 1] = o >>> 16, this[l + 2] = o >>> 8, this[l + 3] = o & 255, l + 4;
    };
    function De(y, o, l, C, _) {
      te(o, C, _, y, l, 7);
      let B = Number(o & BigInt(4294967295));
      y[l++] = B, B = B >> 8, y[l++] = B, B = B >> 8, y[l++] = B, B = B >> 8, y[l++] = B;
      let R = Number(o >> BigInt(32) & BigInt(4294967295));
      return y[l++] = R, R = R >> 8, y[l++] = R, R = R >> 8, y[l++] = R, R = R >> 8, y[l++] = R, l;
    }
    function Xe(y, o, l, C, _) {
      te(o, C, _, y, l, 7);
      let B = Number(o & BigInt(4294967295));
      y[l + 7] = B, B = B >> 8, y[l + 6] = B, B = B >> 8, y[l + 5] = B, B = B >> 8, y[l + 4] = B;
      let R = Number(o >> BigInt(32) & BigInt(4294967295));
      return y[l + 3] = R, R = R >> 8, y[l + 2] = R, R = R >> 8, y[l + 1] = R, R = R >> 8, y[l] = R, l + 8;
    }
    h.prototype.writeBigUInt64LE = Ze(function(o, l = 0) {
      return De(this, o, l, BigInt(0), BigInt("0xffffffffffffffff"));
    }), h.prototype.writeBigUInt64BE = Ze(function(o, l = 0) {
      return Xe(this, o, l, BigInt(0), BigInt("0xffffffffffffffff"));
    }), h.prototype.writeIntLE = function(o, l, C, _) {
      if (o = +o, l = l >>> 0, !_) {
        const me = Math.pow(2, 8 * C - 1);
        fe(this, o, l, C, me - 1, -me);
      }
      let B = 0, R = 1, ne = 0;
      for (this[l] = o & 255; ++B < C && (R *= 256); )
        o < 0 && ne === 0 && this[l + B - 1] !== 0 && (ne = 1), this[l + B] = (o / R >> 0) - ne & 255;
      return l + C;
    }, h.prototype.writeIntBE = function(o, l, C, _) {
      if (o = +o, l = l >>> 0, !_) {
        const me = Math.pow(2, 8 * C - 1);
        fe(this, o, l, C, me - 1, -me);
      }
      let B = C - 1, R = 1, ne = 0;
      for (this[l + B] = o & 255; --B >= 0 && (R *= 256); )
        o < 0 && ne === 0 && this[l + B + 1] !== 0 && (ne = 1), this[l + B] = (o / R >> 0) - ne & 255;
      return l + C;
    }, h.prototype.writeInt8 = function(o, l, C) {
      return o = +o, l = l >>> 0, C || fe(this, o, l, 1, 127, -128), o < 0 && (o = 255 + o + 1), this[l] = o & 255, l + 1;
    }, h.prototype.writeInt16LE = function(o, l, C) {
      return o = +o, l = l >>> 0, C || fe(this, o, l, 2, 32767, -32768), this[l] = o & 255, this[l + 1] = o >>> 8, l + 2;
    }, h.prototype.writeInt16BE = function(o, l, C) {
      return o = +o, l = l >>> 0, C || fe(this, o, l, 2, 32767, -32768), this[l] = o >>> 8, this[l + 1] = o & 255, l + 2;
    }, h.prototype.writeInt32LE = function(o, l, C) {
      return o = +o, l = l >>> 0, C || fe(this, o, l, 4, 2147483647, -2147483648), this[l] = o & 255, this[l + 1] = o >>> 8, this[l + 2] = o >>> 16, this[l + 3] = o >>> 24, l + 4;
    }, h.prototype.writeInt32BE = function(o, l, C) {
      return o = +o, l = l >>> 0, C || fe(this, o, l, 4, 2147483647, -2147483648), o < 0 && (o = 4294967295 + o + 1), this[l] = o >>> 24, this[l + 1] = o >>> 16, this[l + 2] = o >>> 8, this[l + 3] = o & 255, l + 4;
    }, h.prototype.writeBigInt64LE = Ze(function(o, l = 0) {
      return De(this, o, l, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    }), h.prototype.writeBigInt64BE = Ze(function(o, l = 0) {
      return Xe(this, o, l, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    function Te(y, o, l, C, _, B) {
      if (l + C > y.length) throw new RangeError("Index out of range");
      if (l < 0) throw new RangeError("Index out of range");
    }
    function Ie(y, o, l, C, _) {
      return o = +o, l = l >>> 0, _ || Te(y, o, l, 4), r.write(y, o, l, C, 23, 4), l + 4;
    }
    h.prototype.writeFloatLE = function(o, l, C) {
      return Ie(this, o, l, !0, C);
    }, h.prototype.writeFloatBE = function(o, l, C) {
      return Ie(this, o, l, !1, C);
    };
    function ze(y, o, l, C, _) {
      return o = +o, l = l >>> 0, _ || Te(y, o, l, 8), r.write(y, o, l, C, 52, 8), l + 8;
    }
    h.prototype.writeDoubleLE = function(o, l, C) {
      return ze(this, o, l, !0, C);
    }, h.prototype.writeDoubleBE = function(o, l, C) {
      return ze(this, o, l, !1, C);
    }, h.prototype.copy = function(o, l, C, _) {
      if (!h.isBuffer(o)) throw new TypeError("argument should be a Buffer");
      if (C || (C = 0), !_ && _ !== 0 && (_ = this.length), l >= o.length && (l = o.length), l || (l = 0), _ > 0 && _ < C && (_ = C), _ === C || o.length === 0 || this.length === 0) return 0;
      if (l < 0)
        throw new RangeError("targetStart out of bounds");
      if (C < 0 || C >= this.length) throw new RangeError("Index out of range");
      if (_ < 0) throw new RangeError("sourceEnd out of bounds");
      _ > this.length && (_ = this.length), o.length - l < _ - C && (_ = o.length - l + C);
      const B = _ - C;
      return this === o && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(l, C, _) : Uint8Array.prototype.set.call(
        o,
        this.subarray(C, _),
        l
      ), B;
    }, h.prototype.fill = function(o, l, C, _) {
      if (typeof o == "string") {
        if (typeof l == "string" ? (_ = l, l = 0, C = this.length) : typeof C == "string" && (_ = C, C = this.length), _ !== void 0 && typeof _ != "string")
          throw new TypeError("encoding must be a string");
        if (typeof _ == "string" && !h.isEncoding(_))
          throw new TypeError("Unknown encoding: " + _);
        if (o.length === 1) {
          const R = o.charCodeAt(0);
          (_ === "utf8" && R < 128 || _ === "latin1") && (o = R);
        }
      } else typeof o == "number" ? o = o & 255 : typeof o == "boolean" && (o = Number(o));
      if (l < 0 || this.length < l || this.length < C)
        throw new RangeError("Out of range index");
      if (C <= l)
        return this;
      l = l >>> 0, C = C === void 0 ? this.length : C >>> 0, o || (o = 0);
      let B;
      if (typeof o == "number")
        for (B = l; B < C; ++B)
          this[B] = o;
      else {
        const R = h.isBuffer(o) ? o : h.from(o, _), ne = R.length;
        if (ne === 0)
          throw new TypeError('The value "' + o + '" is invalid for argument "value"');
        for (B = 0; B < C - l; ++B)
          this[B + l] = R[B % ne];
      }
      return this;
    };
    const Be = {};
    function $e(y, o, l) {
      Be[y] = class extends l {
        constructor() {
          super(), Object.defineProperty(this, "message", {
            value: o.apply(this, arguments),
            writable: !0,
            configurable: !0
          }), this.name = `${this.name} [${y}]`, this.stack, delete this.name;
        }
        get code() {
          return y;
        }
        set code(_) {
          Object.defineProperty(this, "code", {
            configurable: !0,
            enumerable: !0,
            value: _,
            writable: !0
          });
        }
        toString() {
          return `${this.name} [${y}]: ${this.message}`;
        }
      };
    }
    $e(
      "ERR_BUFFER_OUT_OF_BOUNDS",
      function(y) {
        return y ? `${y} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
      },
      RangeError
    ), $e(
      "ERR_INVALID_ARG_TYPE",
      function(y, o) {
        return `The "${y}" argument must be of type number. Received type ${typeof o}`;
      },
      TypeError
    ), $e(
      "ERR_OUT_OF_RANGE",
      function(y, o, l) {
        let C = `The value of "${y}" is out of range.`, _ = l;
        return Number.isInteger(l) && Math.abs(l) > 2 ** 32 ? _ = ke(String(l)) : typeof l == "bigint" && (_ = String(l), (l > BigInt(2) ** BigInt(32) || l < -(BigInt(2) ** BigInt(32))) && (_ = ke(_)), _ += "n"), C += ` It must be ${o}. Received ${_}`, C;
      },
      RangeError
    );
    function ke(y) {
      let o = "", l = y.length;
      const C = y[0] === "-" ? 1 : 0;
      for (; l >= C + 4; l -= 3)
        o = `_${y.slice(l - 3, l)}${o}`;
      return `${y.slice(0, l)}${o}`;
    }
    function U(y, o, l) {
      K(o, "offset"), (y[o] === void 0 || y[o + l] === void 0) && ie(o, y.length - (l + 1));
    }
    function te(y, o, l, C, _, B) {
      if (y > l || y < o) {
        const R = typeof o == "bigint" ? "n" : "";
        let ne;
        throw o === 0 || o === BigInt(0) ? ne = `>= 0${R} and < 2${R} ** ${(B + 1) * 8}${R}` : ne = `>= -(2${R} ** ${(B + 1) * 8 - 1}${R}) and < 2 ** ${(B + 1) * 8 - 1}${R}`, new Be.ERR_OUT_OF_RANGE("value", ne, y);
      }
      U(C, _, B);
    }
    function K(y, o) {
      if (typeof y != "number")
        throw new Be.ERR_INVALID_ARG_TYPE(o, "number", y);
    }
    function ie(y, o, l) {
      throw Math.floor(y) !== y ? (K(y, l), new Be.ERR_OUT_OF_RANGE("offset", "an integer", y)) : o < 0 ? new Be.ERR_BUFFER_OUT_OF_BOUNDS() : new Be.ERR_OUT_OF_RANGE(
        "offset",
        `>= 0 and <= ${o}`,
        y
      );
    }
    const ye = /[^+/0-9A-Za-z-_]/g;
    function we(y) {
      if (y = y.split("=")[0], y = y.trim().replace(ye, ""), y.length < 2) return "";
      for (; y.length % 4 !== 0; )
        y = y + "=";
      return y;
    }
    function Ce(y, o) {
      o = o || 1 / 0;
      let l;
      const C = y.length;
      let _ = null;
      const B = [];
      for (let R = 0; R < C; ++R) {
        if (l = y.charCodeAt(R), l > 55295 && l < 57344) {
          if (!_) {
            if (l > 56319) {
              (o -= 3) > -1 && B.push(239, 191, 189);
              continue;
            } else if (R + 1 === C) {
              (o -= 3) > -1 && B.push(239, 191, 189);
              continue;
            }
            _ = l;
            continue;
          }
          if (l < 56320) {
            (o -= 3) > -1 && B.push(239, 191, 189), _ = l;
            continue;
          }
          l = (_ - 55296 << 10 | l - 56320) + 65536;
        } else _ && (o -= 3) > -1 && B.push(239, 191, 189);
        if (_ = null, l < 128) {
          if ((o -= 1) < 0) break;
          B.push(l);
        } else if (l < 2048) {
          if ((o -= 2) < 0) break;
          B.push(
            l >> 6 | 192,
            l & 63 | 128
          );
        } else if (l < 65536) {
          if ((o -= 3) < 0) break;
          B.push(
            l >> 12 | 224,
            l >> 6 & 63 | 128,
            l & 63 | 128
          );
        } else if (l < 1114112) {
          if ((o -= 4) < 0) break;
          B.push(
            l >> 18 | 240,
            l >> 12 & 63 | 128,
            l >> 6 & 63 | 128,
            l & 63 | 128
          );
        } else
          throw new Error("Invalid code point");
      }
      return B;
    }
    function qe(y) {
      const o = [];
      for (let l = 0; l < y.length; ++l)
        o.push(y.charCodeAt(l) & 255);
      return o;
    }
    function $(y, o) {
      let l, C, _;
      const B = [];
      for (let R = 0; R < y.length && !((o -= 2) < 0); ++R)
        l = y.charCodeAt(R), C = l >> 8, _ = l % 256, B.push(_), B.push(C);
      return B;
    }
    function ae(y) {
      return e.toByteArray(we(y));
    }
    function ue(y, o, l, C) {
      let _;
      for (_ = 0; _ < C && !(_ + l >= o.length || _ >= y.length); ++_)
        o[_ + l] = y[_];
      return _;
    }
    function ve(y, o) {
      return y instanceof o || y != null && y.constructor != null && y.constructor.name != null && y.constructor.name === o.name;
    }
    function vt(y) {
      return y !== y;
    }
    const ar = function() {
      const y = "0123456789abcdef", o = new Array(256);
      for (let l = 0; l < 16; ++l) {
        const C = l * 16;
        for (let _ = 0; _ < 16; ++_)
          o[C + _] = y[l] + y[_];
      }
      return o;
    }();
    function Ze(y) {
      return typeof BigInt > "u" ? or : y;
    }
    function or() {
      throw new Error("BigInt not supported");
    }
  }(Dr)), Dr;
}
var ci;
function Jr() {
  if (ci) return Ae;
  ci = 1;
  function c(t) {
    return Array.isArray ? Array.isArray(t) : x(t) === "[object Array]";
  }
  Ae.isArray = c;
  function e(t) {
    return typeof t == "boolean";
  }
  Ae.isBoolean = e;
  function r(t) {
    return t === null;
  }
  Ae.isNull = r;
  function i(t) {
    return t == null;
  }
  Ae.isNullOrUndefined = i;
  function u(t) {
    return typeof t == "number";
  }
  Ae.isNumber = u;
  function a(t) {
    return typeof t == "string";
  }
  Ae.isString = a;
  function p(t) {
    return typeof t == "symbol";
  }
  Ae.isSymbol = p;
  function h(t) {
    return t === void 0;
  }
  Ae.isUndefined = h;
  function m(t) {
    return x(t) === "[object RegExp]";
  }
  Ae.isRegExp = m;
  function w(t) {
    return typeof t == "object" && t !== null;
  }
  Ae.isObject = w;
  function g(t) {
    return x(t) === "[object Date]";
  }
  Ae.isDate = g;
  function F(t) {
    return x(t) === "[object Error]" || t instanceof Error;
  }
  Ae.isError = F;
  function v(t) {
    return typeof t == "function";
  }
  Ae.isFunction = v;
  function E(t) {
    return t === null || typeof t == "boolean" || typeof t == "number" || typeof t == "string" || typeof t == "symbol" || // ES6 symbol
    typeof t > "u";
  }
  Ae.isPrimitive = E, Ae.isBuffer = qa().Buffer.isBuffer;
  function x(t) {
    return Object.prototype.toString.call(t);
  }
  return Ae;
}
var Cr, li;
function Za() {
  if (li) return Cr;
  li = 1;
  const c = 32, e = 7, r = 256, i = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9];
  let u;
  const a = (t) => t < 1e5 ? t < 100 ? t < 10 ? 0 : 1 : t < 1e4 ? t < 1e3 ? 2 : 3 : 4 : t < 1e7 ? t < 1e6 ? 5 : 6 : t < 1e9 ? t < 1e8 ? 7 : 8 : 9;
  function p(t, n) {
    if (t === n)
      return 0;
    if (~~t === t && ~~n === n) {
      if (t === 0 || n === 0)
        return t < n ? -1 : 1;
      if (t < 0 || n < 0) {
        if (n >= 0)
          return -1;
        if (t >= 0)
          return 1;
        t = -t, n = -n;
      }
      const f = a(t), S = a(n);
      let A = 0;
      return f < S ? (t *= i[S - f - 1], n /= 10, A = -1) : f > S && (n *= i[f - S - 1], t /= 10, A = 1), t === n ? A : t < n ? -1 : 1;
    }
    const s = String(t), d = String(n);
    return s === d ? 0 : s < d ? -1 : 1;
  }
  function h(t) {
    let n = 0;
    for (; t >= c; )
      n |= t & 1, t >>= 1;
    return t + n;
  }
  function m(t, n, s, d) {
    let f = n + 1;
    if (f === s)
      return 1;
    if (d(t[f++], t[n]) < 0) {
      for (; f < s && d(t[f], t[f - 1]) < 0; )
        f++;
      w(t, n, f), w(u, n, f);
    } else
      for (; f < s && d(t[f], t[f - 1]) >= 0; )
        f++;
    return f - n;
  }
  function w(t, n, s) {
    for (s--; n < s; ) {
      const d = t[n];
      t[n++] = t[s], t[s--] = d;
    }
  }
  function g(t, n, s, d, f) {
    for (d === n && d++; d < s; d++) {
      const S = t[d], A = u[d];
      let b = n, k = d;
      for (; b < k; ) {
        const P = b + k >>> 1;
        f(S, t[P]) < 0 ? k = P : b = P + 1;
      }
      let T = d - b;
      switch (T) {
        case 3:
          t[b + 3] = t[b + 2], u[b + 3] = u[b + 2];
        /* falls through */
        case 2:
          t[b + 2] = t[b + 1], u[b + 2] = u[b + 1];
        /* falls through */
        case 1:
          t[b + 1] = t[b], u[b + 1] = u[b];
          break;
        default:
          for (; T > 0; )
            t[b + T] = t[b + T - 1], u[b + T] = u[b + T - 1], T--;
      }
      t[b] = S, u[b] = A;
    }
  }
  function F(t, n, s, d, f, S) {
    let A = 0, b = 0, k = 1;
    if (S(t, n[s + f]) > 0) {
      for (b = d - f; k < b && S(t, n[s + f + k]) > 0; )
        A = k, k = (k << 1) + 1, k <= 0 && (k = b);
      k > b && (k = b), A += f, k += f;
    } else {
      for (b = f + 1; k < b && S(t, n[s + f - k]) <= 0; )
        A = k, k = (k << 1) + 1, k <= 0 && (k = b);
      k > b && (k = b);
      const T = A;
      A = f - k, k = f - T;
    }
    for (A++; A < k; ) {
      const T = A + (k - A >>> 1);
      S(t, n[s + T]) > 0 ? A = T + 1 : k = T;
    }
    return k;
  }
  function v(t, n, s, d, f, S) {
    let A = 0, b = 0, k = 1;
    if (S(t, n[s + f]) < 0) {
      for (b = f + 1; k < b && S(t, n[s + f - k]) < 0; )
        A = k, k = (k << 1) + 1, k <= 0 && (k = b);
      k > b && (k = b);
      const T = A;
      A = f - k, k = f - T;
    } else {
      for (b = d - f; k < b && S(t, n[s + f + k]) >= 0; )
        A = k, k = (k << 1) + 1, k <= 0 && (k = b);
      k > b && (k = b), A += f, k += f;
    }
    for (A++; A < k; ) {
      const T = A + (k - A >>> 1);
      S(t, n[s + T]) < 0 ? k = T : A = T + 1;
    }
    return k;
  }
  class E {
    constructor(n, s) {
      this.array = n, this.compare = s;
      const { length: d } = n;
      this.length = d, this.minGallop = e, this.tmpStorageLength = d < 2 * r ? d >>> 1 : r, this.tmp = new Array(this.tmpStorageLength), this.tmpIndex = new Array(this.tmpStorageLength), this.stackLength = d < 120 ? 5 : d < 1542 ? 10 : d < 119151 ? 19 : 40, this.runStart = new Array(this.stackLength), this.runLength = new Array(this.stackLength), this.stackSize = 0;
    }
    /**
     * Push a new run on TimSort's stack.
     *
     * @param {number} runStart - Start index of the run in the original array.
     * @param {number} runLength - Length of the run;
     */
    pushRun(n, s) {
      this.runStart[this.stackSize] = n, this.runLength[this.stackSize] = s, this.stackSize += 1;
    }
    /**
     * Merge runs on TimSort's stack so that the following holds for all i:
     * 1) runLength[i - 3] > runLength[i - 2] + runLength[i - 1]
     * 2) runLength[i - 2] > runLength[i - 1]
     */
    mergeRuns() {
      for (; this.stackSize > 1; ) {
        let n = this.stackSize - 2;
        if (n >= 1 && this.runLength[n - 1] <= this.runLength[n] + this.runLength[n + 1] || n >= 2 && this.runLength[n - 2] <= this.runLength[n] + this.runLength[n - 1])
          this.runLength[n - 1] < this.runLength[n + 1] && n--;
        else if (this.runLength[n] > this.runLength[n + 1])
          break;
        this.mergeAt(n);
      }
    }
    /**
     * Merge all runs on TimSort's stack until only one remains.
     */
    forceMergeRuns() {
      for (; this.stackSize > 1; ) {
        let n = this.stackSize - 2;
        n > 0 && this.runLength[n - 1] < this.runLength[n + 1] && n--, this.mergeAt(n);
      }
    }
    /**
     * Merge the runs on the stack at positions i and i+1. Must be always be called
     * with i=stackSize-2 or i=stackSize-3 (that is, we merge on top of the stack).
     *
     * @param {number} i - Index of the run to merge in TimSort's stack.
     */
    mergeAt(n) {
      const { compare: s } = this, { array: d } = this;
      let f = this.runStart[n], S = this.runLength[n];
      const A = this.runStart[n + 1];
      let b = this.runLength[n + 1];
      this.runLength[n] = S + b, n === this.stackSize - 3 && (this.runStart[n + 1] = this.runStart[n + 2], this.runLength[n + 1] = this.runLength[n + 2]), this.stackSize--;
      const k = v(d[A], d, f, S, 0, s);
      f += k, S -= k, S !== 0 && (b = F(
        d[f + S - 1],
        d,
        A,
        b,
        b - 1,
        s
      ), b !== 0 && (S <= b ? this.mergeLow(f, S, A, b) : this.mergeHigh(f, S, A, b)));
    }
    /**
     * Merge two adjacent runs in a stable way. The runs must be such that the
     * first element of run1 is bigger than the first element in run2 and the
     * last element of run1 is greater than all the elements in run2.
     * The method should be called when run1.length <= run2.length as it uses
     * TimSort temporary array to store run1. Use mergeHigh if run1.length >
     * run2.length.
     *
     * @param {number} start1 - First element in run1.
     * @param {number} length1 - Length of run1.
     * @param {number} start2 - First element in run2.
     * @param {number} length2 - Length of run2.
     */
    mergeLow(n, s, d, f) {
      const { compare: S } = this, { array: A } = this, { tmp: b } = this, { tmpIndex: k } = this;
      let T = 0;
      for (T = 0; T < s; T++)
        b[T] = A[n + T], k[T] = u[n + T];
      let P = 0, j = d, M = n;
      if (A[M] = A[j], u[M] = u[j], M++, j++, --f === 0) {
        for (T = 0; T < s; T++)
          A[M + T] = b[P + T], u[M + T] = k[P + T];
        return;
      }
      if (s === 1) {
        for (T = 0; T < f; T++)
          A[M + T] = A[j + T], u[M + T] = u[j + T];
        A[M + f] = b[P], u[M + f] = k[P];
        return;
      }
      let { minGallop: Z } = this;
      for (; ; ) {
        let V = 0, J = 0, H = !1;
        do
          if (S(A[j], b[P]) < 0) {
            if (A[M] = A[j], u[M] = u[j], M++, j++, J++, V = 0, --f === 0) {
              H = !0;
              break;
            }
          } else if (A[M] = b[P], u[M] = k[P], M++, P++, V++, J = 0, --s === 1) {
            H = !0;
            break;
          }
        while ((V | J) < Z);
        if (H)
          break;
        do {
          if (V = v(A[j], b, P, s, 0, S), V !== 0) {
            for (T = 0; T < V; T++)
              A[M + T] = b[P + T], u[M + T] = k[P + T];
            if (M += V, P += V, s -= V, s <= 1) {
              H = !0;
              break;
            }
          }
          if (A[M] = A[j], u[M] = u[j], M++, j++, --f === 0) {
            H = !0;
            break;
          }
          if (J = F(b[P], A, j, f, 0, S), J !== 0) {
            for (T = 0; T < J; T++)
              A[M + T] = A[j + T], u[M + T] = u[j + T];
            if (M += J, j += J, f -= J, f === 0) {
              H = !0;
              break;
            }
          }
          if (A[M] = b[P], u[M] = k[P], M++, P++, --s === 1) {
            H = !0;
            break;
          }
          Z--;
        } while (V >= e || J >= e);
        if (H)
          break;
        Z < 0 && (Z = 0), Z += 2;
      }
      if (this.minGallop = Z, Z < 1 && (this.minGallop = 1), s === 1) {
        for (T = 0; T < f; T++)
          A[M + T] = A[j + T], u[M + T] = u[j + T];
        A[M + f] = b[P], u[M + f] = k[P];
      } else {
        if (s === 0)
          throw new Error("mergeLow preconditions were not respected");
        for (T = 0; T < s; T++)
          A[M + T] = b[P + T], u[M + T] = k[P + T];
      }
    }
    /**
     * Merge two adjacent runs in a stable way. The runs must be such that the
     * first element of run1 is bigger than the first element in run2 and the
     * last element of run1 is greater than all the elements in run2.
     * The method should be called when run1.length > run2.length as it uses
     * TimSort temporary array to store run2. Use mergeLow if run1.length <=
     * run2.length.
     *
     * @param {number} start1 - First element in run1.
     * @param {number} length1 - Length of run1.
     * @param {number} start2 - First element in run2.
     * @param {number} length2 - Length of run2.
     */
    mergeHigh(n, s, d, f) {
      const { compare: S } = this, { array: A } = this, { tmp: b } = this, { tmpIndex: k } = this;
      let T = 0;
      for (T = 0; T < f; T++)
        b[T] = A[d + T], k[T] = u[d + T];
      let P = n + s - 1, j = f - 1, M = d + f - 1, Z = 0, V = 0;
      if (A[M] = A[P], u[M] = u[P], M--, P--, --s === 0) {
        for (Z = M - (f - 1), T = 0; T < f; T++)
          A[Z + T] = b[T], u[Z + T] = k[T];
        return;
      }
      if (f === 1) {
        for (M -= s, P -= s, V = M + 1, Z = P + 1, T = s - 1; T >= 0; T--)
          A[V + T] = A[Z + T], u[V + T] = u[Z + T];
        A[M] = b[j], u[M] = k[j];
        return;
      }
      let { minGallop: J } = this;
      for (; ; ) {
        let H = 0, Y = 0, se = !1;
        do
          if (S(b[j], A[P]) < 0) {
            if (A[M] = A[P], u[M] = u[P], M--, P--, H++, Y = 0, --s === 0) {
              se = !0;
              break;
            }
          } else if (A[M] = b[j], u[M] = k[j], M--, j--, Y++, H = 0, --f === 1) {
            se = !0;
            break;
          }
        while ((H | Y) < J);
        if (se)
          break;
        do {
          if (H = s - v(
            b[j],
            A,
            n,
            s,
            s - 1,
            S
          ), H !== 0) {
            for (M -= H, P -= H, s -= H, V = M + 1, Z = P + 1, T = H - 1; T >= 0; T--)
              A[V + T] = A[Z + T], u[V + T] = u[Z + T];
            if (s === 0) {
              se = !0;
              break;
            }
          }
          if (A[M] = b[j], u[M] = k[j], M--, j--, --f === 1) {
            se = !0;
            break;
          }
          if (Y = f - F(
            A[P],
            b,
            0,
            f,
            f - 1,
            S
          ), Y !== 0) {
            for (M -= Y, j -= Y, f -= Y, V = M + 1, Z = j + 1, T = 0; T < Y; T++)
              A[V + T] = b[Z + T], u[V + T] = k[Z + T];
            if (f <= 1) {
              se = !0;
              break;
            }
          }
          if (A[M] = A[P], u[M] = u[P], M--, P--, --s === 0) {
            se = !0;
            break;
          }
          J--;
        } while (H >= e || Y >= e);
        if (se)
          break;
        J < 0 && (J = 0), J += 2;
      }
      if (this.minGallop = J, J < 1 && (this.minGallop = 1), f === 1) {
        for (M -= s, P -= s, V = M + 1, Z = P + 1, T = s - 1; T >= 0; T--)
          A[V + T] = A[Z + T], u[V + T] = u[Z + T];
        A[M] = b[j], u[M] = k[j];
      } else {
        if (f === 0)
          throw new Error("mergeHigh preconditions were not respected");
        for (Z = M - (f - 1), T = 0; T < f; T++)
          A[Z + T] = b[T], u[Z + T] = k[T];
      }
    }
  }
  function x(t, n, s, d) {
    if (!Array.isArray(t))
      throw new TypeError(
        `The "array" argument must be an array. Received ${t}`
      );
    u = [];
    const { length: f } = t;
    let S = 0;
    for (; S < f; )
      u[S] = S++;
    n ? typeof n != "function" && (d = s, s = n, n = p) : n = p, s || (s = 0), d || (d = f);
    let A = d - s;
    if (A < 2)
      return u;
    let b = 0;
    if (A < c)
      return b = m(t, s, d, n), g(t, s, d, s + b, n), u;
    const k = new E(t, n), T = h(A);
    do {
      if (b = m(t, s, d, n), b < T) {
        let P = A;
        P > T && (P = T), g(t, s, s + P, s + b, n), b = P;
      }
      k.pushRun(s, b), k.mergeRuns(), A -= b, s += b;
    } while (A !== 0);
    return k.forceMergeRuns(), u;
  }
  return Cr = {
    sort: x
  }, Cr;
}
var Sr, hi;
function Ha() {
  if (hi) return Sr;
  hi = 1;
  const c = Object.prototype.hasOwnProperty;
  return Sr = (e, r) => c.call(e, r), Sr;
}
var wr, di;
function sr() {
  if (di) return wr;
  di = 1;
  const c = Ha(), {
    isObject: e,
    isArray: r,
    isString: i,
    isNumber: u
  } = Jr(), a = "before", p = "after-prop", h = "after-colon", m = "after-value", w = "after", g = "before-all", F = "after-all", v = "[", E = "]", x = "{", t = "}", n = ",", s = "", d = "-", f = [
    a,
    p,
    h,
    m,
    w
  ], S = [
    a,
    g,
    F
  ].map(Symbol.for), A = ":", b = void 0, k = (J, H) => Symbol.for(J + A + H), T = (J, H, Y) => Object.defineProperty(J, H, {
    value: Y,
    writable: !0,
    configurable: !0
  }), P = (J, H, Y, se, le, Ee) => {
    const Se = k(le, se);
    if (!c(H, Se))
      return;
    const he = Y === se ? Se : k(le, Y);
    T(J, he, H[Se]), Ee && delete H[Se];
  }, j = (J, H, Y, se, le) => {
    f.forEach((Ee) => {
      P(
        J,
        H,
        Y,
        se,
        Ee,
        le
      );
    });
  }, M = (J, H, Y) => {
    H !== Y && f.forEach((se) => {
      const le = k(se, Y);
      if (!c(J, le)) {
        P(J, J, Y, H, se, !0);
        return;
      }
      const Ee = J[le];
      delete J[le], P(J, J, Y, H, se, !0), T(J, k(se, H), Ee);
    });
  }, Z = (J, H) => {
    S.forEach((Y) => {
      const se = H[Y];
      se && T(J, Y, se);
    });
  }, V = (J, H, Y) => (Y.forEach((se) => {
    !i(se) && !u(se) || c(H, se) && (J[se] = H[se], j(J, H, se, se));
  }), J);
  return wr = {
    SYMBOL_PREFIXES: f,
    PREFIX_BEFORE: a,
    PREFIX_AFTER_PROP: p,
    PREFIX_AFTER_COLON: h,
    PREFIX_AFTER_VALUE: m,
    PREFIX_AFTER: w,
    PREFIX_BEFORE_ALL: g,
    PREFIX_AFTER_ALL: F,
    BRACKET_OPEN: v,
    BRACKET_CLOSE: E,
    CURLY_BRACKET_OPEN: x,
    CURLY_BRACKET_CLOSE: t,
    COLON: A,
    COMMA: n,
    MINUS: d,
    EMPTY: s,
    UNDEFINED: b,
    symbol: k,
    define: T,
    copy_comments: j,
    swap_comments: M,
    assign_non_prop_comments: Z,
    assign(J, H, Y) {
      if (!e(J))
        throw new TypeError("Cannot convert undefined or null to object");
      if (!e(H))
        return J;
      if (Y === b)
        Y = Object.keys(H), Z(J, H);
      else if (r(Y))
        Y.length === 0 && Z(J, H);
      else throw new TypeError("keys must be array or undefined");
      return V(J, H, Y);
    }
  }, wr;
}
var Ar, pi;
function Yi() {
  if (pi) return Ar;
  pi = 1;
  const { isArray: c } = Jr(), { sort: e } = Za(), {
    SYMBOL_PREFIXES: r,
    UNDEFINED: i,
    symbol: u,
    copy_comments: a,
    swap_comments: p
  } = sr(), h = (E) => {
    const { length: x } = E;
    let t = 0;
    const n = x / 2;
    for (; t < n; t++)
      p(E, t, x - t - 1);
  }, m = (E, x, t, n, s) => {
    a(E, x, t + n, t, s);
  }, w = (E, x, t, n, s, d) => {
    if (s > 0) {
      let S = n;
      for (; S-- > 0; )
        m(E, x, t + S, s, d);
      return;
    }
    let f = 0;
    for (; f < n; ) {
      const S = f++;
      m(E, x, t + S, s, d);
    }
  }, g = (E, x) => {
    r.forEach((t) => {
      const n = u(t, x);
      delete E[n];
    });
  }, F = (E, x) => {
    let t = x;
    for (; t in E; )
      t = E[t];
    return t;
  };
  class v extends Array {
    // - deleteCount + items.length
    // We should avoid `splice(begin, deleteCount, ...items)`,
    // because `splice(0, undefined)` is not equivalent to `splice(0)`,
    // as well as:
    // - slice
    splice(...x) {
      const { length: t } = this, n = super.splice(...x);
      let [s, d, ...f] = x;
      s < 0 && (s += t), arguments.length === 1 ? d = t - s : d = Math.min(t - s, d);
      const {
        length: S
      } = f, A = S - d, b = s + d, k = t - b;
      return w(this, this, b, k, A, !0), n;
    }
    slice(...x) {
      const { length: t } = this, n = super.slice(...x);
      if (!n.length)
        return new v();
      let [s, d] = x;
      return d === i ? d = t : d < 0 && (d += t), s < 0 ? s += t : s === i && (s = 0), w(n, this, s, d - s, -s), n;
    }
    unshift(...x) {
      const { length: t } = this, n = super.unshift(...x), {
        length: s
      } = x;
      return s > 0 && w(this, this, 0, t, s, !0), n;
    }
    shift() {
      const x = super.shift(), { length: t } = this;
      return g(this, 0), w(this, this, 1, t, -1, !0), x;
    }
    reverse() {
      return super.reverse(), h(this), this;
    }
    pop() {
      const x = super.pop();
      return g(this, this.length), x;
    }
    concat(...x) {
      let { length: t } = this;
      const n = super.concat(...x);
      return x.length && (w(n, this, 0, this.length, 0), x.forEach((s) => {
        const d = t;
        t += c(s) ? s.length : 1, s instanceof v && w(n, s, 0, s.length, d);
      })), n;
    }
    sort(...x) {
      const t = e(
        this,
        ...x.slice(0, 1)
      ), n = /* @__PURE__ */ Object.create(null);
      return t.forEach((s, d) => {
        if (s === d)
          return;
        const f = F(n, s);
        f !== d && (n[d] = f, p(this, d, f));
      }), this;
    }
  }
  return Ar = {
    CommentArray: v
  }, Ar;
}
var Fr, fi;
function Va() {
  if (fi) return Fr;
  fi = 1;
  const c = Xa(), {
    CommentArray: e
  } = Yi(), {
    PREFIX_BEFORE: r,
    PREFIX_AFTER_PROP: i,
    PREFIX_AFTER_COLON: u,
    PREFIX_AFTER_VALUE: a,
    PREFIX_AFTER: p,
    PREFIX_BEFORE_ALL: h,
    PREFIX_AFTER_ALL: m,
    BRACKET_OPEN: w,
    BRACKET_CLOSE: g,
    CURLY_BRACKET_OPEN: F,
    CURLY_BRACKET_CLOSE: v,
    COLON: E,
    COMMA: x,
    MINUS: t,
    EMPTY: n,
    UNDEFINED: s,
    define: d,
    assign_non_prop_comments: f
  } = sr(), S = ($) => c.tokenize($, {
    comment: !0,
    loc: !0
  }), A = [];
  let b = null, k = null;
  const T = [];
  let P, j = !1, M = !1, Z = null, V = null, J = null, H, Y = null;
  const se = () => {
    T.length = A.length = 0, V = null, P = s;
  }, le = () => {
    se(), Z.length = 0, k = b = Z = V = J = Y = null;
  }, Ee = ($) => Symbol.for(
    P !== s ? $ + E + P : $
  ), Se = ($, ae) => Y ? Y($, ae) : ae, he = () => {
    const $ = new SyntaxError(`Unexpected token ${J.value.slice(0, 1)}`);
    throw Object.assign($, J.loc.start), $;
  }, fe = () => {
    const $ = new SyntaxError("Unexpected end of JSON input");
    throw Object.assign($, V ? V.loc.end : {
      line: 1,
      column: 0
    }), $;
  }, De = () => {
    const $ = Z[++H];
    M = J && $ && J.loc.end.line === $.loc.start.line || !1, V = J, J = $;
  }, Xe = () => (J || fe(), J.type === "Punctuator" ? J.value : J.type), Te = ($) => Xe() === $, Ie = ($) => {
    Te($) || he();
  }, ze = ($) => {
    A.push(b), b = $;
  }, Be = () => {
    b = A.pop();
  }, $e = () => {
    if (!k)
      return;
    const $ = [];
    for (const ue of k)
      if (ue.inline)
        $.push(ue);
      else
        break;
    const { length: ae } = $;
    ae && (ae === k.length ? k = null : k.splice(0, ae), d(b, Ee(p), $));
  }, ke = ($) => {
    k && (d(b, Ee($), k), k = null);
  }, U = ($) => {
    const ae = [];
    for (; J && (Te("LineComment") || Te("BlockComment")); ) {
      const ue = {
        ...J,
        inline: M
      };
      ae.push(ue), De();
    }
    if (!j && ae.length) {
      if ($) {
        d(b, Ee($), ae);
        return;
      }
      k = ae;
    }
  }, te = ($, ae) => {
    ae && T.push(P), P = $;
  }, K = () => {
    P = T.pop();
  }, ie = () => {
    const $ = {};
    ze($), te(s, !0);
    let ae = !1, ue;
    for (U(); !Te(v) && !(ae && (ke(a), Ie(x), De(), U(), $e(), Te(v))); )
      ae = !0, Ie("String"), ue = JSON.parse(J.value), te(ue), ke(r), De(), U(i), Ie(E), De(), U(u), $[ue] = Se(ue, we()), U();
    return ae && ke(p), De(), P = void 0, ae || ke(r), Be(), K(), $;
  }, ye = () => {
    const $ = new e();
    ze($), te(s, !0);
    let ae = !1, ue = 0;
    for (U(); !Te(g) && !(ae && (ke(a), Ie(x), De(), U(), $e(), Te(g))); )
      ae = !0, te(ue), ke(r), $[ue] = Se(ue, we()), ue++, U();
    return ae && ke(p), De(), P = void 0, ae || ke(r), Be(), K(), $;
  };
  function we() {
    let $ = Xe();
    if ($ === F)
      return De(), ie();
    if ($ === w)
      return De(), ye();
    let ae = n;
    $ === t && (De(), $ = Xe(), ae = t);
    let ue;
    switch ($) {
      case "String":
      case "Boolean":
      case "Null":
      case "Numeric":
        return ue = J.value, De(), JSON.parse(ae + ue);
    }
  }
  const Ce = ($) => Object($) === $;
  return Fr = {
    parse: ($, ae, ue) => {
      se(), Z = S($), Y = ae, j = ue, Z.length || fe(), H = -1, De(), ze({}), U(h);
      let ve = we();
      return U(m), J && he(), !ue && ve !== null && (Ce(ve) || (ve = new Object(ve)), f(ve, b)), Be(), ve = Se("", ve), le(), ve;
    },
    tokenize: S
  }, Fr;
}
/*!
 * repeat-string <https://github.com/jonschlinkert/repeat-string>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */
var br, mi;
function Ka() {
  if (mi) return br;
  mi = 1;
  var c = "", e;
  br = r;
  function r(i, u) {
    if (typeof i != "string")
      throw new TypeError("expected a string");
    if (u === 1) return i;
    if (u === 2) return i + i;
    var a = i.length * u;
    if (e !== i || typeof e > "u")
      e = i, c = "";
    else if (c.length >= a)
      return c.substr(0, a);
    for (; a > c.length && u > 1; )
      u & 1 && (c += i), u >>= 1, i += i;
    return c += i, c = c.substr(0, a), c;
  }
  return br;
}
var kr, xi;
function Wa() {
  if (xi) return kr;
  xi = 1;
  const {
    isArray: c,
    isObject: e,
    isFunction: r,
    isNumber: i,
    isString: u
  } = Jr(), a = Ka(), {
    PREFIX_BEFORE_ALL: p,
    PREFIX_BEFORE: h,
    PREFIX_AFTER_PROP: m,
    PREFIX_AFTER_COLON: w,
    PREFIX_AFTER_VALUE: g,
    PREFIX_AFTER: F,
    PREFIX_AFTER_ALL: v,
    BRACKET_OPEN: E,
    BRACKET_CLOSE: x,
    CURLY_BRACKET_OPEN: t,
    CURLY_BRACKET_CLOSE: n,
    COLON: s,
    COMMA: d,
    EMPTY: f,
    UNDEFINED: S
  } = sr(), A = /[\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, b = " ", k = `
`, T = "null", P = (U) => `${h}:${U}`, j = (U) => `${m}:${U}`, M = (U) => `${w}:${U}`, Z = (U) => `${g}:${U}`, V = (U) => `${F}:${U}`, J = {
    "\b": "\\b",
    "	": "\\t",
    "\n": "\\n",
    "\f": "\\f",
    "\r": "\\r",
    '"': '\\"',
    "\\": "\\\\"
  }, H = (U) => (A.lastIndex = 0, A.test(U) ? U.replace(A, (te) => {
    const K = J[te];
    return typeof K == "string" ? K : te;
  }) : U), Y = (U) => `"${H(U)}"`, se = (U, te) => te ? `//${U}` : `/*${U}*/`, le = (U, te, K, ie) => {
    const ye = U[Symbol.for(te)];
    if (!ye || !ye.length)
      return f;
    let we = !1;
    const Ce = ye.reduce((qe, {
      inline: $,
      type: ae,
      value: ue
    }) => {
      const ve = $ ? b : k + K;
      return we = ae === "LineComment", qe + ve + se(ue, we);
    }, f);
    return ie || we ? Ce + k + K : Ce;
  };
  let Ee = null, Se = f;
  const he = () => {
    Ee = null, Se = f;
  }, fe = (U, te, K) => U ? te ? U + te.trim() + k + K : U.trimRight() + k + K : te ? te.trimRight() + k + K : f, De = (U, te, K) => {
    const ie = le(te, h, K + Se, !0);
    return fe(ie, U, K);
  }, Xe = (U, te) => {
    const K = te + Se, { length: ie } = U;
    let ye = f, we = f;
    for (let Ce = 0; Ce < ie; Ce++) {
      Ce !== 0 && (ye += d);
      const qe = fe(
        we,
        le(U, P(Ce), K),
        K
      );
      ye += qe || k + K, ye += Ie(Ce, U, K) || T, ye += le(U, Z(Ce), K), we = le(U, V(Ce), K);
    }
    return ye += fe(
      we,
      le(U, F, K),
      K
    ), E + De(ye, U, te) + x;
  }, Te = (U, te) => {
    if (!U)
      return "null";
    const K = te + Se;
    let ie = f, ye = f, we = !0;
    const Ce = c(Ee) ? Ee : Object.keys(U), qe = ($) => {
      const ae = Ie($, U, K);
      if (ae === S)
        return;
      we || (ie += d), we = !1;
      const ue = fe(
        ye,
        le(U, P($), K),
        K
      );
      ie += ue || k + K, ie += Y($) + le(U, j($), K) + s + le(U, M($), K) + b + ae + le(U, Z($), K), ye = le(U, V($), K);
    };
    return Ce.forEach(qe), ie += fe(
      ye,
      le(U, F, K),
      K
    ), t + De(ie, U, te) + n;
  };
  function Ie(U, te, K) {
    let ie = te[U];
    switch (e(ie) && r(ie.toJSON) && (ie = ie.toJSON(U)), r(Ee) && (ie = Ee.call(te, U, ie)), typeof ie) {
      case "string":
        return Y(ie);
      case "number":
        return Number.isFinite(ie) ? String(ie) : T;
      case "boolean":
      case "null":
        return String(ie);
      // If the type is 'object', we might be dealing with an object or an array or
      // null.
      case "object":
        return c(ie) ? Xe(ie, K) : Te(ie, K);
    }
  }
  const ze = (U) => u(U) ? U : i(U) ? a(b, U) : f, { toString: Be } = Object.prototype, $e = [
    "[object Number]",
    "[object String]",
    "[object Boolean]"
  ], ke = (U) => {
    if (typeof U != "object")
      return !1;
    const te = Be.call(U);
    return $e.includes(te);
  };
  return kr = (U, te, K) => {
    const ie = ze(K);
    if (!ie)
      return JSON.stringify(U, te);
    !r(te) && !c(te) && (te = null), Ee = te, Se = ie;
    const ye = ke(U) ? JSON.stringify(U) : Ie("", { "": U }, f);
    return he(), e(U) ? le(U, p, f).trimLeft() + ye + le(U, v, f).trimRight() : ye;
  }, kr;
}
var _r, yi;
function Ga() {
  if (yi) return _r;
  yi = 1;
  const { parse: c, tokenize: e } = Va(), r = Wa(), { CommentArray: i } = Yi(), { assign: u } = sr();
  return _r = {
    parse: c,
    stringify: r,
    tokenize: e,
    CommentArray: i,
    assign: u
  }, _r;
}
var Qi = Ga();
function xo(c) {
  const e = gi(c);
  if (!e.userConfigPath && !e.workspaceConfigPath) return null;
  const r = Kt("user", e.userConfigPath), i = Kt("workspace", e.workspaceConfigPath);
  return r && i ? {
    mcpServers: {
      ...r.mcpServers,
      ...i.mcpServers
    }
  } : i || r;
}
function Kt(c, e) {
  if (!e) return null;
  try {
    const r = vi.readFileSync(e, "utf8"), i = Qi.parse(r), u = Cs.safeParse(i);
    return u.success ? (Object.values(u.data.mcpServers).forEach(Ya), u.data) : (de.error(`Invalid mcp.json format in ${c} directory: ${u.error.message}`), null);
  } catch (r) {
    return de.error(
      `Error loading mcp.json from ${c} directory: ${r instanceof Error ? r.message : String(r)}`
    ), null;
  }
}
function Ya(c) {
  if (!c.disabled && !c.command)
    throw new Error("Enabled servers must specify a command");
}
function yo(c, e, r) {
  const i = eo(c, r), u = Qa(i.config, c, e);
  vi.writeFileSync(i.path, Qi.stringify(u, null, 2));
  const a = `Tool ${e} added to auto-approve list`;
  de.info(a, c), Ct.window.showInformationMessage(a, "Open Settings").then((p) => {
    p === "Open Settings" && (i.sourceName === "workspace" ? Ct.commands.executeCommand("kiroAgent.openWorkspaceMcpConfig") : Ct.commands.executeCommand("kiroAgent.openUserMcpConfig"));
  });
}
function Qa(c, e, r) {
  const i = c.mcpServers[e], u = {
    ...i,
    autoApprove: i.autoApprove.concat(r)
  };
  return c.mcpServers[e] = u, c;
}
function eo(c, e) {
  const r = gi(e);
  if (!r.userConfigPath && !r.workspaceConfigPath)
    throw new Error("No MCP config file found");
  if (r.workspaceConfigPath) {
    const i = Kt("workspace", r.workspaceConfigPath);
    if (i && c in i.mcpServers)
      return { path: r.workspaceConfigPath, config: i, sourceName: "workspace" };
  }
  if (r.userConfigPath) {
    const i = Kt("user", r.userConfigPath);
    if (i && c in i.mcpServers)
      return { path: r.userConfigPath, config: i, sourceName: "user" };
  }
  throw new Error(`Server ${c} not found in any MCP config file`);
}
export {
  Ds as M,
  Cs as a,
  ni as b,
  ja as c,
  yo as d,
  eo as e,
  Ua as f,
  xo as l
};
