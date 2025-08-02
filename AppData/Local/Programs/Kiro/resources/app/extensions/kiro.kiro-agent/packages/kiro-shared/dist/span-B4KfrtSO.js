import { SpanStatusCode as i, trace as d } from "@opentelemetry/api";
import { D as S, c as m, i as a } from "./initialize-C-lPoOET.js";
import { T as p } from "./errors-ExctlPQy.js";
import "path";
import "os";
import "fs";
import "vscode";
import "node-machine-id";
function s(t) {
  return typeof t == "string" ? t : typeof t == "boolean" || typeof t == "number" ? t.toString() : t instanceof Error ? {
    name: t.name,
    ...t instanceof p ? {
      message: t.message
    } : {}
    // message: value.message,
    // stack: value.stack,
  } : t === void 0 ? "undefined" : JSON.stringify(t);
}
function g(t) {
  return !!t && typeof t.then == "function";
}
function b(t, o, c) {
  return u(t).startActiveSpan(o, c);
}
function I(t, o, c) {
  return u(t).startActiveSpan(`${t}.${o}`, (r) => {
    try {
      r.setAttributes(S);
      const e = c(r);
      return g(e) ? e.then((n) => (r.setStatus({ code: i.OK }), n)).catch((n) => {
        throw r.recordException(s(n)), r.setStatus({
          code: i.ERROR
        }), n;
      }).finally(() => {
        r.end();
      }) : (r.setStatus({ code: i.OK }), r.end(), e);
    } catch (e) {
      throw r.recordException(s(e)), r.setStatus({
        code: i.ERROR
      }), r.end(), e;
    }
  });
}
const f = {};
function u(t) {
  if (t in f)
    return f[t];
  const o = d.getTracer(t, m);
  return a() && (f[t] = o), o;
}
export {
  b as s,
  I as w
};
