import * as d from "vscode";
const i = d.window.createOutputChannel("Kiro Logs", { log: !0 }), g = [];
function s(o, n, ...r) {
  const t = r.map((e) => typeof e == "object" ? JSON.stringify(e) : e).join(" "), $ = `[${(/* @__PURE__ */ new Date()).toISOString()}] [${o}] ${n} ${t}`;
  g.push($);
}
const L = {
  trace(o, ...n) {
    i.trace(o, ...n), s("trace", o, ...n);
  },
  debug(o, ...n) {
    i.debug(o, ...n), s("debug", o, ...n);
  },
  info(o, ...n) {
    i.info(o, ...n), s("info", o, ...n);
  },
  warn(o, ...n) {
    i.warn(o, ...n), s("warn", o, ...n);
  },
  error(o, ...n) {
    i.error(o, ...n), s("error", `${o}`, ...n);
  },
  capture() {
    const o = g.join(`
`);
    return g.length = 0, i.clear(), o;
  }
}, l = /* @__PURE__ */ new Map(), c = d.window.createOutputChannel("Kiro - MCP Logs", { log: !0 });
function a(o, n, r, ...t) {
  const p = t.map((f) => typeof f == "object" ? JSON.stringify(f) : f).join(" "), $ = (/* @__PURE__ */ new Date()).toISOString(), e = r || "KIRO_MCP_DEFAULT", w = `[${$}] [${n}] [${e}] ${o} ${p}`, u = l.get(e) || [];
  u.push(w), l.set(e, u);
}
const S = {
  trace(o, n, ...r) {
    const t = n ? `[${n}] ` : "";
    c.trace(`${t}${o}`, ...r), a(o, "trace", n, ...r);
  },
  debug(o, n, ...r) {
    const t = n ? `[${n}] ` : "";
    c.debug(`${t}${o}`, ...r), a(o, "debug", n, ...r);
  },
  info(o, n, ...r) {
    const t = n ? `[${n}] ` : "";
    c.info(`${t}${o}`, ...r), a(o, "info", n, ...r);
  },
  warn(o, n, ...r) {
    const t = n ? `[${n}] ` : "";
    c.warn(`${t}${o}`, ...r), a(o, "warn", n, ...r);
  },
  error(o, n, ...r) {
    const t = n ? `[${n}] ` : "";
    c.error(`${t}${o}`, ...r), a(`${o}`, "error", n, ...r);
  },
  getLogsForServer(o) {
    return l.get(o) || [];
  },
  show() {
    c.show();
  },
  capture() {
    const o = Array.from(l.values()).flatMap((n) => n).join(`
`);
    return l.clear(), c.clear(), o;
  }
};
function b(o) {
  return o instanceof Error && (o.name.includes("Abort") || o.message.includes("Aborted"));
}
function h(o) {
  const n = o instanceof Error ? o.name : "UnknownError";
  return b(o) ? "AbortedError" : n;
}
class E extends Error {
}
export {
  E as T,
  h as a,
  b as i,
  L as l,
  S as m
};
