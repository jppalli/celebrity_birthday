const apjs = require('amazingpro.js');
let AlgBody;
try {
    AlgBody = require('AmgAlgorithm.js');
} catch (e) { }
let iejs;
try {
  iejs = require('IEJS.js');
} catch (e) {}

globalThis.isInternalIndex = 1;

class AmazingProRuntime {
  constructor() {
    this.name = 'AmazingProRuntime';
    this.amazingProInstances = new Array();
    this.allDynamicComponents = [];
    this.systemStarted = false;
    this.jsAssetManager = new apjs.DynamicAssetRuntimeManager();
    this.guidToObjMap = new Map();
    apjs.setDynamicAssetRuntimeManager(this.jsAssetManager);
  }

  onInit() {
    apjs.setDynamicAssetRuntimeManager(this.jsAssetManager);
    // EventManager Init
    apjs.EventManager.initialize();

    Object.defineProperty(apjs, 'scene', {
        writable: false,
        configurable: false,
        enumerable: false,
        value: this.scene
    });
    this.script.handleComponentName('DynamicComponent');
    // add Event type on demand
    this.script.addEventType(apjs.AppEventType.COMPAT_BEF);
    if (apjs.EventType.DUAL_INSTANCE) {
      // since 1830, the engine add the DUAL_INSTANCE event type, so we only add it when the engine has it.
      this.script.addEventType(apjs.EventType.DUAL_INSTANCE);
    }
    this.jsAssetManager.setCurrentScene(apjs.transferToAPJSObj(this.scene));
    this.jsAssetManager.checkAndLoadJSAsset();

    // IEJs register some variables

    if (iejs && iejs.Util && iejs.Util.Const) {
      iejs.Util.Const.registerVars({ scene: new apjs.Scene(this.scene) });
    }
  }

  onStart() {
    apjs.setDynamicAssetRuntimeManager(this.jsAssetManager);
    for (let i = 0; i < this.allDynamicComponents.length; i++) {
      const customComp = this.allDynamicComponents[i];
      if (customComp.isInheritedEnabled()) {
        customComp.onEnable();
        customComp.onStart();
      }
    }
    this.jsAssetManager.onStart();
    this.systemStarted = true;
    this.jsAssetManager.setSystemStarted(true);
  }

    onUpdate(dt)
    {
        apjs.setDynamicAssetRuntimeManager(this.jsAssetManager);
        apjs.MathNativeObjectPool.update();
        for (let i = 0; i < this.allDynamicComponents.length; i++) {
            const customComp = this.allDynamicComponents[i];
            if (customComp && customComp.isInheritedEnabled()) {
                customComp.onUpdate(dt);
            }
        }
        if(AlgBody) {
            AlgBody.AmgAlgorithm.getInstance().onUpdate();
        }
        this.jsAssetManager.onUpdate(dt);
        // SceneEvent 
        apjs.EventManager.onUpdate(dt);
    }
    onLateUpdate(dt)
    {
        apjs.setDynamicAssetRuntimeManager(this.jsAssetManager);
        for (let i = 0; i < this.allDynamicComponents.length; i++) {
            const customComp = this.allDynamicComponents[i];
            if (customComp && customComp.isInheritedEnabled()) {
                customComp.onLateUpdate(dt);
            }
        }
        this.jsAssetManager.onLateUpdate(dt);
        // SceneEvent 
        apjs.EventManager.onLateUpdate(dt);
    }
    onComponentAdded(comp) 
    {
        if (comp && comp.constructor.name === 'DynamicComponent') {
            const sceneObject = apjs.transferToAPJSObj(comp.entity);
            const apjsClassName = comp.className;
            if (sceneObject && apjsClassName) {
                const apjsComponent = sceneObject.getComponent(apjsClassName);
                if (apjsComponent) {
                    // init apjsComponent properties
                    const serializedProperty = apjsComponent.getNative().serializedProperty;
                    if (serializedProperty) {
                        const props = serializedProperty.properties;
                        if (props) {
                            const keys = props.getVectorKeys();
                            const size = keys.size();
                            for (let i = 0; i < size; i++) {
                                const key = keys.get(i);
                                const value = props.get(key);
                                apjsComponent[key] = apjs.transferToAPJSObj(value);
                            }
                        }
                    }

          this.allDynamicComponents.push(apjsComponent);
          apjsComponent.onInit();
          if (apjsComponent.isInheritedEnabled()) {
            apjsComponent.onEnable();
            if (this.systemStarted) {
              apjsComponent.onStart();
            }
          }
          // SceneEvent
          apjs.EventManager.onComponentAdded(apjsComponent);
        }
      }
    }
  }

  onComponentRemoved(comp) {
    if (comp && comp.constructor.name === 'DynamicComponent') {
      const sceneObject = apjs.transferToAPJSObj(comp.entity);
      const apjsClassName = comp.className;
      if (sceneObject && apjsClassName) {
        const apjsComponent = sceneObject.getComponent(apjsClassName);
        if (apjsComponent) {
          const index = this.allDynamicComponents.indexOf(apjsComponent);
          if (index > -1) {
            this.allDynamicComponents.splice(index, 1);
          }
          if (apjsComponent.isInheritedEnabled()) {
            apjsComponent.onDisable();
          }
          // SceneEvent
          apjs.EventManager.onComponentRemoved(apjsComponent);
          apjsComponent.onDestroy();
        }
      }
    }
  }

  onEvent(event) {
    apjs.setDynamicAssetRuntimeManager(this.jsAssetManager);
    for (let i = 0; i < this.allDynamicComponents.length; i++) {
      const customComp = this.allDynamicComponents[i];
      if (customComp) {
        customComp.onEvent(event);
      }
    }
    this.jsAssetManager.onEvent(event);
    apjs.EventManager.onGlobalEvent(apjs.transferToAPJSObj(event));
  }

  onDestroy() {
    apjs.setDynamicAssetRuntimeManager(this.jsAssetManager);
    for (let i = 0; i < this.allDynamicComponents.length; i++) {
      const customComp = this.allDynamicComponents[i];
      if (customComp) {
        customComp.onDestroy();
        customComp.getNative().ref = null;
        customComp.getNative().refReleased = true;
      }
    }
    this.guidToObjMap.clear();
    this.jsAssetManager.onDestroy();
    // finalize
    apjs.EventManager.finalize();

    //  // IEJs unregister
    if (iejs && iejs.Util && iejs.Util.Const) {
      iejs.Util.Const.unregisterVars();
    }
    apjs.clearObjectCache();
  }

  onSerializedPropertyChanged(guid, serializedProperty) {}

    onDualInstanceScriptMethodCall(guid, methodName, value) {
        let obj = this.guidToObjMap.get(guid.toString());
        if (!obj) {
            obj = apjs.AmazingUtil.guidToPointer(new apjs.Guid(guid));
            this.guidToObjMap.set(guid.toString(), obj);
        }
        if (value instanceof effect.Amaz.Guid) {
            value = apjs.transferToAPJSObj(effect.Amaz.AmazingUtil.guidToPointer(value));
        }
        const apjsValue =  apjs.transferToAPJSObj(value);
        if (apjs.isDynamicAsset(obj)) {
          obj = obj.getControl();
        }
        if (apjs.isSerializeProperty(obj, methodName) || apjs.isDualInstanceScriptProperty(obj, methodName)) {
            obj[methodName] = apjsValue;
        } else if (apjs.isDualInstanceScriptMethod(obj, methodName)){
            obj[methodName](apjsValue);
        }
    }
}

exports.AmazingProRuntime = AmazingProRuntime;
