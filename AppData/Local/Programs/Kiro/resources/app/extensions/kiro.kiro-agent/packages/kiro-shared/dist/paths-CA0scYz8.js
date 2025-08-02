import * as i from "path";
import * as a from "os";
import * as r from "fs";
function c() {
  const o = a.homedir();
  return i.join(o, ".kiro");
}
function f(o) {
  return i.join(o, ".kiro");
}
function m(o) {
  let n, s;
  if (o) {
    const t = i.join(f(o), "settings", "mcp.json");
    r.existsSync(t) && (n = t);
  }
  const e = c();
  if (e) {
    const t = i.join(e, "settings", "mcp.json");
    r.existsSync(t) && (s = t);
  }
  return {
    workspaceConfigPath: n,
    userConfigPath: s
  };
}
export {
  f as a,
  m as b,
  c as g
};
