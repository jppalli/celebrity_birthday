const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        7515: function(e) {
            e.exports = APJS_Require("Color");
        },
        4455: function(e) {
            e.exports = APJS_Require("Vector2");
        },
        3968: function(e) {
            e.exports = APJS_Require("Vector3");
        },
        3157: function(e) {
            e.exports = APJS_Require("Vector4");
        },
        4666: function(e) {
            e.exports = APJS_Require("serialize");
        }
    }, t = {};
    function r(o) {
        var i = t[o];
        if (void 0 !== i) return i.exports;
        var s = t[o] = {
            exports: {}
        };
        return e[o](s, s.exports, r), s.exports;
    }
    var o = {};
    !function() {
        var e = o;
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.widget = e.DropDownWidget = e.TextAreaWidget = e.RangeWidget = e.ColorWidget = e.WidgetBase = e.subGroup = e.separator = e.input = e.useDefaultEditor = void 0;
        const t = r(4455), i = r(3968), s = r(3157), n = r(7515), u = r(4666);
        e.useDefaultEditor = function(e) {};
        const c = [ "float", "int", "string", "bool", "Vector2f", "Vector3f", "Vector4f", "Color", "Transform", "Texture" ];
        new t.Vector2f(0, 0), new i.Vector3f(0, 0, 0), new s.Vector4f(0, 0, 0, 0), new n.Color(1, 1, 1, 1);
        e.input = function(e, t) {
            return c.indexOf(e), function(e, t) {
                (0, u.serialize)(e, t);
            };
        }, e.separator = function() {
            return function(e, t) {};
        }, e.subGroup = function(e, t) {};
        class WidgetBase {
            constructor() {}
        }
        e.WidgetBase = WidgetBase;
        e.ColorWidget = class ColorWidget extends WidgetBase {
            constructor(e = !0) {
                super(), this.showAlpha = e;
            }
        };
        e.RangeWidget = class RangeWidget extends WidgetBase {
            constructor(e, t, r = 1, o = !0) {
                super(), this.min = e, this.max = t, this.step = r, this.slider = o;
            }
        };
        e.TextAreaWidget = class TextAreaWidget extends WidgetBase {
            constructor(e = 100) {
                super(), this.maxLength = e;
            }
        };
        e.DropDownWidget = class DropDownWidget extends WidgetBase {
            constructor(e) {
                super(), this.options = e;
            }
        }, e.widget = function(e) {};
    }();
    var i = exports;
    for (var s in o) i[s] = o[s];
    o.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();