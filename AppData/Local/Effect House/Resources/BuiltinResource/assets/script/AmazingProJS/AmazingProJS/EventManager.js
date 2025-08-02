const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        3512: function(e) {
            e.exports = APJS_Require("Event");
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        }
    }, t = {};
    function n(a) {
        var r = t[a];
        if (void 0 !== r) return r.exports;
        var i = t[a] = {
            exports: {}
        };
        return e[a](i, i.exports, n), i.exports;
    }
    var a = {};
    !function() {
        var e = a;
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.EventManager = e.SceneEventType = void 0;
        const t = n(3512), r = n(1012), i = -1e4, s = -9e3, v = -8e3, o = "undefined" != typeof WeakRef;
        var E;
        !function(e) {
            e[e.ON_START = -9e3] = "ON_START", e[e.ON_UPDATE = -8999] = "ON_UPDATE", e[e.ON_LATE_UPDATE = -8998] = "ON_LATE_UPDATE", 
            e[e.ON_COMPONENT_ADDED = -8997] = "ON_COMPONENT_ADDED", e[e.ON_COMPONENT_REMOVED = -8996] = "ON_COMPONENT_REMOVED";
        }(E || (e.SceneEventType = E = {}));
        class JSEvent {
            constructor(e) {
                this._dirtyNativeArgs = !0, this._type = e, this._args = [], this._nativeEvent = void 0;
            }
            get type() {
                return this._type;
            }
            set type(e) {
                this._type = e;
            }
            get args() {
                return this._dirtyNativeArgs = !0, this._args;
            }
            set args(e) {
                this._args !== e && (this._dirtyNativeArgs = !0, this._args = null != e ? Array.from(e) : []);
            }
            getNative() {
                return null == this._nativeEvent && (this._nativeEvent = new t.Event, this._dirtyNativeArgs = !0), 
                this._nativeEvent.type = this.type, this._dirtyNativeArgs && (this._nativeEvent.args = this._args, 
                this._dirtyNativeArgs = !1), this._nativeEvent.getNative();
            }
        }
        class WrapCallback {
            constructor(e, t, n, a) {
                this.context = t, this._callback = e, this._invalid = !1, this._removeFunc = a;
                let r = e;
                void 0 !== t && (r = e.bind(t)), this._wrapCallback = e => {
                    if (this._invalid) return;
                    void 0 === this.context && this.contextWeakRef ? this.removeFunc() : (r(e), n && this.removeFunc());
                };
            }
            get context() {
                return void 0 !== this._context ? o ? this._context.deref() : this._context : void 0;
            }
            set context(e) {
                this._context = void 0 !== e ? o ? new WeakRef(e) : e : void 0;
            }
            get contextWeakRef() {
                return !o || void 0 !== this._context;
            }
            get callback() {
                return this._callback;
            }
            check(e, t) {
                return t ? this._callback === e && this.context === t : this._callback === e && void 0 === this.context;
            }
            invoke(e) {
                this._wrapCallback(e);
            }
            removeFunc() {
                this._invalid = !0, this._removeFunc(this);
            }
        }
        class WrapCallbackSet {
            constructor() {
                this._set = new Set, this._array = new Array, this._dirty = !1;
            }
            find(e, t) {
                for (let n of this._set) if (n.check(e, t)) return n;
            }
            add(e) {
                this._set.add(e), this._dirty = !0;
            }
            delete(e) {
                this._set.delete(e), this._dirty = !0;
            }
            has(e) {
                this._set.has(e);
            }
            forEach(e) {
                this.doDirty(), this._array.forEach(e), this.doDirty();
            }
            doDirty() {
                this._dirty && (this._array = Array.from(this._set), this._dirty = !1);
            }
            get size() {
                return this._set.size;
            }
        }
        class WrapCallbackMap {
            constructor() {
                this._map = new Map;
            }
            tryGet(e) {
                let t = this._map.get(e);
                return null == t && (t = new WrapCallbackSet, this._map.set(e, t)), t;
            }
            get(e) {
                return this._map.get(e);
            }
            add(e, t, n, a) {
                if (void 0 === t) return;
                if (!EventManager.checkGlobalEventTypeValid(e)) return;
                let r = this.tryGet(e);
                void 0 === r.find(t, n) && (r.size >= 255 || r.add(new WrapCallback(t, n, a, (e => {
                    r.delete(e);
                }))));
            }
            remove(e, t, n) {
                if (void 0 === t) return;
                let a = this.get(e);
                if (void 0 === a) return;
                let r = a.find(t, n);
                void 0 !== r && (a.delete(r), 0 === a.size && this._map.delete(e));
            }
            invoke(e) {
                let t = this.get(e.type);
                void 0 !== t && t.forEach((t => {
                    t.invoke(e);
                }));
            }
            has(e) {
                let t = this.get(e);
                return void 0 !== t && 0 !== t.size;
            }
            clear() {
                this._map.clear();
            }
            get size() {
                return this._map.size;
            }
        }
        class GlobalEventEmitter {
            constructor() {
                this._wrapCallbackMap = new WrapCallbackMap;
            }
            on(e, t, n) {
                this._wrapCallbackMap.add(e, t, n, !1);
            }
            once(e, t, n) {
                this._wrapCallbackMap.add(e, t, n, !0);
            }
            off(e, t, n) {
                this._wrapCallbackMap.remove(e, t, n);
            }
            internalEmit(e) {
                null != e && this._wrapCallbackMap.invoke(e);
            }
            emit(e) {
                null != e && EventManager.checkUserEventType(e.type) && this._wrapCallbackMap.invoke(e);
            }
            has(e) {
                return this._wrapCallbackMap && this._wrapCallbackMap.has(e);
            }
            clear() {
                this._wrapCallbackMap.clear();
            }
        }
        const c = () => {};
        class ObjectEventEmitter {
            static _WrapJSEvent(e, t) {
                let n = new JSEvent(e);
                return n.args.push(t), n;
            }
            constructor(e) {
                let t = (0, r.getNativeFromObj)(e);
                if (t && (this._object = t), this._usersWrapCallbackMap = new WrapCallbackMap, this._nativeWrapCallbackSet = new Map, 
                this._nativeRemovedFuncs = new Array, !this._object) throw new Error(r.APTAG + "EventEmitter constructor's parameters error!");
            }
            get object() {
                return this._object;
            }
            set object(e) {
                this._object = e;
            }
            addListenerToJS(e, t, n, a) {
                this._usersWrapCallbackMap.add(e, t, n, a);
            }
            removeListenerToJS(e, t, n) {
                this._usersWrapCallbackMap.remove(e, t, n);
            }
            invokeListenerToJS(e) {
                this._usersWrapCallbackMap.invoke(e);
            }
            checkRemovedFuncs() {
                this._nativeRemovedFuncs.length > 0 && (this._nativeRemovedFuncs.forEach((e => e())), 
                this._nativeRemovedFuncs.length = 0);
            }
            addListenerToNative(e, t, n, a) {
                let i, s = this.object;
                if (void 0 === s) return;
                let v = this._nativeWrapCallbackSet.get(e);
                if (void 0 === v && (v = new WrapCallbackSet, this._nativeWrapCallbackSet.set(e, v)), 
                void 0 !== v.find(t, n)) return;
                if (v.size >= 255) return;
                let o = new WrapCallback(t, n, a, (t => {
                    this._nativeRemovedFuncs.push((() => {
                        v.delete(t), 0 === v.size && this._nativeWrapCallbackSet.delete(e), effect.Amaz.AmazingManager.removeListener(s, e, c, t);
                    })), EventManager.addDirtyObjectEmitter(this);
                }));
                v.add(o), i = function(e, t, n) {
                    let a = ObjectEventEmitter._WrapJSEvent(n, (0, r.transferToAPJSObj)(t));
                    o.invoke(a);
                }, effect.Amaz.AmazingManager.addListener(s, e, i, o);
            }
            removeListenerToNative(e, t, n) {
                if (void 0 === this.object) return;
                let a = this._nativeWrapCallbackSet.get(e);
                if (void 0 === a) return;
                let r = a.find(t, n);
                void 0 !== r && r.removeFunc();
            }
            invokeListenerToNative(e) {
                let t;
                null != e.args && e.args.length > 0 && (t = e.args[0]);
                let n = this.object;
                n && effect.Amaz.AmazingManager.invokeCompListener(n, e.type, (0, r.getNativeFromObj)(t));
            }
            addListener(e, t, n, a) {
                this.checkRemovedFuncs(), EventManager.isAPJSEventType(e) ? this.addListenerToJS(e, t, n, a) : this.addListenerToNative(e, t, n, a);
            }
            removeListener(e, t, n) {
                this.checkRemovedFuncs(), EventManager.isAPJSEventType(e) ? this.removeListenerToJS(e, t, n) : this.removeListenerToNative(e, t, n);
            }
            invokeListener(e, t) {
                this.checkRemovedFuncs(), t ? EventManager.isAPJSEventType(e.type) ? this.invokeListenerToJS(e) : this.invokeListenerToNative(e) : EventManager.checkUserEventType(e.type) && this.invokeListenerToJS(e);
            }
            on(e, t, n) {
                void 0 !== t && this.addListener(e, t, n, !1);
            }
            once(e, t, n) {
                void 0 !== t && this.addListener(e, t, n, !0);
            }
            off(e, t, n) {
                void 0 !== t && this.removeListener(e, t, n);
            }
            internalEmit(e) {
                null != e && this.invokeListener(e, !0);
            }
            emit(e) {
                null != e && this.invokeListener(e, !1);
            }
            clear() {
                this._usersWrapCallbackMap.clear(), void 0 !== this.object && (this.checkRemovedFuncs(), 
                void 0 !== this._nativeWrapCallbackSet && 0 !== this._nativeWrapCallbackSet.size && (this._nativeWrapCallbackSet.forEach(((e, t) => {
                    e.forEach((e => {
                        e.removeFunc();
                    }));
                })), this._nativeWrapCallbackSet.clear()));
            }
        }
        class EventManager {
            constructor() {
                throw new Error(r.APTAG + "Event Manager DO NOT ALLOW construct!");
            }
            static defineUserEventType(e) {
                if (EventManager._userEventIndex >= s) return -9001;
                let t = EventManager._userEventMap.get(e);
                return null == t && (t = EventManager._userEventIndex++, EventManager._userEventMap.set(e, t)), 
                t;
            }
            static clearUserEventType() {
                EventManager._userEventIndex = i, EventManager._userEventMap.clear();
            }
            static checkUserEventType(e) {
                return i <= e && e < EventManager._userEventIndex;
            }
            static defineBuiltinEventType(e) {
                if (EventManager._builtinEventIndex >= v) return -8001;
                let t = EventManager._builtinEventMap.get(e);
                return null == t && (t = EventManager._builtinEventIndex++, EventManager._builtinEventMap.set(e, t)), 
                t;
            }
            static clearBuiltinEventType() {
                EventManager._builtinEventIndex = E.ON_COMPONENT_REMOVED + 1, EventManager._builtinEventMap.clear();
            }
            static checkGlobalEventTypeValid(e) {
                return i <= e && e < EventManager._userEventIndex || -9e3 <= e && e < EventManager._builtinEventIndex;
            }
            static isUserEventType(e) {
                return i <= e && e < s;
            }
            static isBuiltinEventType(e) {
                return -9e3 <= e && e < v;
            }
            static isAPJSEventType(e) {
                return EventManager.isUserEventType(e) || EventManager.isBuiltinEventType(e);
            }
            static createEvent(e) {
                return new JSEvent(e);
            }
            static sendEventAllScene(e) {
                if (null == e) return;
                if (EventManager.isAPJSEventType(e.type)) return;
                const t = effect.Amaz.AmazingManager.getSingleton("EventCenter");
                t && t.sendEvent(e.getNative());
            }
            static postEventAllScene(e) {
                if (null == e) return;
                if (EventManager.isAPJSEventType(e.type)) return;
                const t = effect.Amaz.AmazingManager.getSingleton("EventCenter");
                t && t.postEvent(e.getNative());
            }
            static getGlobalEmitter() {
                return null == EventManager._globalEmitter && (EventManager._globalEmitter = new GlobalEventEmitter), 
                EventManager._globalEmitter;
            }
            static findObjectEmitter(e) {
                if (void 0 === EventManager._objectEmitterMap) return;
                return EventManager._objectEmitterMap.get(e);
            }
            static pushObjectEmitter(e) {
                void 0 === EventManager._objectEmitterMap && (EventManager._objectEmitterMap = new Map), 
                EventManager._objectEmitterMap.set(e.object, e), void 0 === EventManager._objectEmitterSet && (EventManager._objectEmitterSet = new Set), 
                EventManager._objectEmitterSet.add(e);
            }
            static clearObjectEmitter() {
                EventManager.doDirtyObjectEmitter(), void 0 !== EventManager._objectEmitterSet && (EventManager._objectEmitterSet.forEach((e => {
                    e.clear();
                })), EventManager._objectEmitterSet.clear(), EventManager._objectEmitterMap.clear());
            }
            static addDirtyObjectEmitter(e) {
                void 0 === EventManager._objectEmitterNeedRemoveSet && (EventManager._objectEmitterNeedRemoveSet = new Set), 
                EventManager._objectEmitterNeedRemoveSet.add(e);
            }
            static doDirtyObjectEmitter() {
                void 0 !== EventManager._objectEmitterNeedRemoveSet && EventManager._objectEmitterNeedRemoveSet.size > 0 && (EventManager._objectEmitterNeedRemoveSet.forEach((e => {
                    e.checkRemovedFuncs();
                })), EventManager._objectEmitterNeedRemoveSet.clear());
            }
            static getObjectEmitter(e) {
                if (!e) return;
                let t, n;
                if ((0, r.isAPJSType)(e)) t = e.getNative(); else {
                    if (!(e instanceof effect.Amaz.AObject)) return;
                    t = e;
                }
                return n = EventManager.findObjectEmitter(t), void 0 === n && (n = new ObjectEventEmitter(e), 
                EventManager.pushObjectEmitter(n)), n;
            }
            static initialize() {
                EventManager.finalize(), EventManager.clearUserEventType(), EventManager.clearBuiltinEventType(), 
                EventManager._globalEmitter = void 0, EventManager._objectEmitterMap = void 0, EventManager._objectEmitterSet = void 0, 
                EventManager.onUpdate = EventManager.onFirstFrameUpdate;
            }
            static finalize() {
                EventManager.clearObjectEmitter(), EventManager._globalEmitter && EventManager._globalEmitter.clear(), 
                EventManager.onUpdate = EventManager.onFirstFrameUpdate;
            }
            static onSceneEvent(e, t) {
                void 0 !== EventManager._globalEmitter && EventManager._globalEmitter.has(e) && (EventManager.sceneEvent.type = e, 
                null != t && t(EventManager.sceneEvent), EventManager._globalEmitter.internalEmit(EventManager.sceneEvent));
            }
            static onGlobalEvent(e) {
                void 0 !== e && void 0 !== EventManager._globalEmitter && EventManager._globalEmitter.internalEmit(e);
            }
            static onFirstFrameUpdate(e) {
                EventManager.onSceneEvent(E.ON_START), EventManager.onSceneEvent(E.ON_UPDATE, (t => {
                    t.args = [ e ];
                })), EventManager.onUpdate = EventManager.onStandardUpdate;
            }
            static onStandardUpdate(e) {
                EventManager.onSceneEvent(E.ON_UPDATE, (t => {
                    t.args = [ e ];
                }));
            }
            static onLateUpdate(e) {
                EventManager.onSceneEvent(E.ON_LATE_UPDATE, (t => {
                    t.args = [ e ];
                })), EventManager.doDirtyObjectEmitter();
            }
            static onComponentAdded(e) {
                EventManager.onSceneEvent(E.ON_COMPONENT_ADDED, (t => {
                    t.args = [ e ];
                }));
            }
            static onComponentRemoved(e) {
                EventManager.onSceneEvent(E.ON_COMPONENT_REMOVED, (t => {
                    t.args = [ e ];
                }));
            }
        }
        e.EventManager = EventManager, EventManager._userEventIndex = i, EventManager._userEventMap = new Map, 
        EventManager._builtinEventIndex = E.ON_COMPONENT_REMOVED + 1, EventManager._builtinEventMap = new Map, 
        EventManager._globalEmitter = void 0, EventManager._objectEmitterMap = void 0, EventManager._objectEmitterSet = void 0, 
        EventManager._objectEmitterNeedRemoveSet = void 0, EventManager.sceneEvent = new JSEvent(E.ON_START), 
        EventManager.onUpdate = EventManager.onFirstFrameUpdate;
    }();
    var r = exports;
    for (var i in a) r[i] = a[i];
    a.__esModule && Object.defineProperty(r, "__esModule", {
        value: !0
    });
}();