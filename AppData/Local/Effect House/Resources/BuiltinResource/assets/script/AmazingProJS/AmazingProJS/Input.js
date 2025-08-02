const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        4258: function(t, e, r) {
            var n = this && this.__decorate || function(t, e, r, n) {
                var i, s = arguments.length, a = s < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, r) : n;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, r, n); else for (var o = t.length - 1; o >= 0; o--) (i = t[o]) && (a = (s < 3 ? i(a) : s > 3 ? i(e, r, a) : i(e, r)) || a);
                return s > 3 && a && Object.defineProperty(e, r, a), a;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.RateSensorAgent = e.RotationSensorAgent = e.GyroSensorAgent = e.GravitySensorAgent = e.AccelerationSensorAgent = e.SensorAgent = e.Input = void 0;
            const i = r(2864), s = r(1012);
            let a = class Input extends i.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.Input), this._typedRtti = this._rtti;
                }
                getCameraPosition() {
                    return this._typedRtti.getCameraPosition();
                }
                getDeviceFov() {
                    return this._typedRtti.getDeviceFov();
                }
                getFrameTimestamp() {
                    return this._typedRtti.getFrameTimestamp();
                }
                addScriptListener(t, e, r, n) {
                    return this._typedRtti.addScriptListener(t.getNative(), e, r, n.getNative());
                }
                removeScriptListener(t, e, r, n) {
                    return this._typedRtti.removeScriptListener(t.getNative(), e, r, n.getNative());
                }
                buildAccelerationSensorAgent(t) {
                    return (0, s.transferToAPJSObj)(this._typedRtti.buildAccelerationSensorAgent(t));
                }
                buildGravitySensorAgent(t) {
                    return (0, s.transferToAPJSObj)(this._typedRtti.buildGravitySensorAgent(t));
                }
                buildGyroSensorAgent(t) {
                    return (0, s.transferToAPJSObj)(this._typedRtti.buildGyroSensorAgent(t));
                }
                buildRotationSensorAgent(t) {
                    return (0, s.transferToAPJSObj)(this._typedRtti.buildRotationSensorAgent(t));
                }
                buildRateSensorAgent() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.buildRateSensorAgent());
                }
            };
            e.Input = a, e.Input = a = n([ (0, s.registerClass)() ], a);
            let o = class SensorAgent extends i.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.SensorAgent), this._typedRtti = this._rtti;
                }
                get enabled() {
                    return this._typedRtti.isEnable();
                }
                set enabled(t) {
                    this._typedRtti.setEnable(t);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.SensorAgent = o, e.SensorAgent = o = n([ (0, s.registerClass)() ], o);
            let g = class AccelerationSensorAgent extends o {
                constructor(t) {
                    super(t || new effect.Amaz.AccelerationSensorAgent), this._typedRtti = this._rtti;
                }
                getData() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.getData());
                }
                isValidData() {
                    return this._typedRtti.isValidData();
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.AccelerationSensorAgent = g, e.AccelerationSensorAgent = g = n([ (0, s.registerClass)() ], g);
            let u = class GravitySensorAgent extends o {
                constructor(t) {
                    super(t || new effect.Amaz.GravitySensorAgent), this._typedRtti = this._rtti;
                }
                getData() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.getData());
                }
                isValidData() {
                    return this._typedRtti.isValidData();
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.GravitySensorAgent = u, e.GravitySensorAgent = u = n([ (0, s.registerClass)() ], u);
            let d = class GyroSensorAgent extends o {
                constructor(t) {
                    super(t || new effect.Amaz.GyroSensorAgent), this._typedRtti = this._rtti;
                }
                getData() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.getData());
                }
                isValidData() {
                    return this._typedRtti.isValidData();
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.GyroSensorAgent = d, e.GyroSensorAgent = d = n([ (0, s.registerClass)() ], d);
            let l = class RotationSensorAgent extends o {
                constructor(t) {
                    super(t || new effect.Amaz.RotationSensorAgent), this._typedRtti = this._rtti;
                }
                getQuaternion() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.getData());
                }
                getEulerAngles() {
                    let t = this.getQuaternion().toEulerAngles();
                    return t.multiplyScalar(180 / Math.PI), t;
                }
                isValidData() {
                    return this._typedRtti.isValidData();
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.RotationSensorAgent = l, e.RotationSensorAgent = l = n([ (0, s.registerClass)() ], l);
            let c = class RateSensorAgent extends o {
                constructor(t) {
                    super(t || new effect.Amaz.RateSensorAgent), this._typedRtti = this._rtti;
                }
                get refreshRate() {
                    return this._typedRtti.getRate();
                }
                set refreshRate(t) {
                    this._typedRtti.setRate(t);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.RateSensorAgent = c, e.RateSensorAgent = c = n([ (0, s.registerClass)() ], c);
        },
        2864: function(t) {
            t.exports = APJS_Require("AObject");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var r = function r(n) {
        var i = e[n];
        if (void 0 !== i) return i.exports;
        var s = e[n] = {
            exports: {}
        };
        return t[n].call(s.exports, s, s.exports, r), s.exports;
    }(4258), n = exports;
    for (var i in r) n[i] = r[i];
    r.__esModule && Object.defineProperty(n, "__esModule", {
        value: !0
    });
}();