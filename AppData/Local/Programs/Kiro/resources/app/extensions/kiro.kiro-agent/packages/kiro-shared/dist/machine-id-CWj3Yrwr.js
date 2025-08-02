import * as n from "vscode";
import { l as o } from "./errors-ExctlPQy.js";
import { machineIdSync as c } from "node-machine-id";
function p(a, t = "CodeWhisperer") {
  if (!n.env.isTelemetryEnabled) {
    o.debug(`${t}: telemetry is disabled, setting x-amzn-codewhisperer-optout to true`);
    const d = (r) => async (e) => {
      const i = e;
      return i.request.headers = {
        ...i.request.headers,
        "x-amzn-codewhisperer-optout": "true"
      }, r(e);
    };
    a.middlewareStack.add(d, { step: "build" });
  }
}
function w(a, t) {
  const d = (r) => async (e) => {
    const i = e;
    return i.request.headers = {
      ...i.request.headers,
      "x-amzn-kiro-agent-mode": t
    }, r(e);
  };
  a.middlewareStack.add(d, { step: "build" });
}
async function h(a, t, d, s) {
  var e;
  const r = n.workspace.getConfiguration(a, s);
  ((e = r.inspect(t)) == null ? void 0 : e.workspaceValue) !== void 0 ? await r.update(t, d, n.ConfigurationTarget.Workspace) : await r.update(t, d, n.ConfigurationTarget.Global);
}
const u = "UNDETERMINED_MACHINE_ID";
function g() {
  try {
    return c();
  } catch {
    return n.env.machineId || u;
  }
}
export {
  p as a,
  w as b,
  g,
  h as u
};
