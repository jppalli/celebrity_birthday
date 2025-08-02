var d = Object.defineProperty;
var h = (r, e, t) => e in r ? d(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var o = (r, e, t) => h(r, typeof e != "symbol" ? e + "" : e, t);
import { metrics as y } from "@opentelemetry/api";
import { c as J, i as l } from "./initialize-C-lPoOET.js";
class p {
  /**
   * Creates a new Metrics instance for the given telemetry namespace
   * @param namespace The telemetry namespace to use for metrics
   */
  constructor(e) {
    o(this, "counters", /* @__PURE__ */ new Map());
    o(this, "histograms", /* @__PURE__ */ new Map());
    o(this, "namespace");
    o(this, "meter");
    this.namespace = e, this.meter = m(e);
  }
  /**
   * Add a count metric
   */
  addCount(e, t, s = {}) {
    const n = this.counters.get(e) || [];
    n.push({ value: t, attributes: s }), this.counters.set(e, n);
  }
  /**
   * Add a histogram metric
   */
  addHistogram(e, t, s = {}) {
    const n = this.histograms.get(e) || [];
    n.push({ value: t, attributes: s }), this.histograms.set(e, n);
  }
  /**
   * Flush all collected metrics to OpenTelemetry
   */
  flush() {
    for (const [e, t] of this.counters.entries()) {
      const s = this.meter.createCounter(e);
      for (const { value: n, attributes: i } of t)
        s.add(n, i);
    }
    this.counters.clear();
    for (const [e, t] of this.histograms.entries()) {
      const s = this.meter.createHistogram(e);
      for (const { value: n, attributes: i } of t)
        s.record(n, i);
    }
    this.histograms.clear();
  }
}
function u(r, e, t) {
  return m(r).createCounter(e, t);
}
function f(r, e, t) {
  return m(r).createHistogram(e, t);
}
const a = {};
function m(r) {
  if (r in a)
    return a[r];
  const e = y.getMeter(r, J);
  return l() && (a[r] = e), e;
}
const c = {};
function w(r) {
  if (r in c)
    return c[r];
  const e = new v(r);
  return c[r] = e, e;
}
class v {
  /**
   * Creates a new journey tracker
   */
  constructor(e) {
    o(this, "namespace");
    o(this, "activeJourneys", /* @__PURE__ */ new Map());
    this.namespace = e;
  }
  /**
   * Starts tracking a new telemetry journey
   * @param config Configuration for the journey
   * @returns Unique journey identifier
   * @example
   * const journeyId = telemetry.startJourney({
   *   id: 'onboarding',
   *   timeoutMs: 10000,
   *   namespace: TelemetryNamespace.Core
   * });
   */
  startJourney(e) {
    const t = this.activeJourneys.get(e.id);
    if (t)
      return t.uniqueId;
    const s = `${e.id}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, n = setTimeout(() => {
      this.timeoutJourney(e.id);
    }, e.timeoutMs), i = {
      journeyId: e.id,
      uniqueId: s,
      timeoutId: n,
      startTime: performance.now(),
      durationTracker: f(this.namespace, `journey.${e.id}.duration`, {
        unit: "milliseconds"
      }),
      metrics: new p(this.namespace),
      onJourneyEnd: e.onJourneyEnd
    };
    return this.activeJourneys.set(e.id, i), u(this.namespace, `journey.${e.id}.started`).add(1), s;
  }
  /**
   * Marks a journey as successfully completed
   * @param journeyId ID of the journey to complete
   * @param attributes Additional attributes to record with completion
   * @example
   * telemetry.completeJourney('journey-123', { outcome: 'success' });
   */
  completeJourney(e, t = {}) {
    this.activeJourneys.get(e) && (this.cleanupJourney(e), u(this.namespace, `journey.${e}.completed`).add(1, {
      ...t
    }));
  }
  /**
   * Handles journey timeout by marking the span as error and cleaning up
   * @param journeyId ID of the timed out journey
   */
  timeoutJourney(e) {
    this.activeJourneys.get(e) && (this.cleanupJourney(e), u(this.namespace, `journey.${e}.time_out`).add(1, {}));
  }
  cleanupJourney(e) {
    const t = this.activeJourneys.get(e);
    t && (t.onJourneyEnd && t.onJourneyEnd(t.metrics), t.durationTracker.record(performance.now() - t.startTime), t.metrics.flush(), clearTimeout(t.timeoutId), this.activeJourneys.delete(e));
  }
  /**
   * Cleans up all active journeys when the tracker is disposed
   */
  dispose() {
    for (const [e, t] of this.activeJourneys)
      this.cleanupJourney(e), u(this.namespace, `journey.${e}.disposed`).add(1, {
        journeyId: e,
        uniqueJourneyId: t.uniqueId
      });
    this.activeJourneys.clear();
  }
}
export {
  v as J,
  p as M,
  f as a,
  u as c,
  w as g
};
