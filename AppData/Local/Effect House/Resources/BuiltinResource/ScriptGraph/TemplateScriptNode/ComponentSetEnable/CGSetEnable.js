const {BaseNode} = require('../Utils/BaseNode');
const {EffectReset} = require('../../../EffectReset');
const {CentralDataReset, CentralResetDataMode} = require('../Utils/CentralDataReset');

class CGSetEnable extends BaseNode {
  constructor() {
    super();
  }

  beforeStart(sys) {
    this.sys = sys;
  }

  execute(index) {
    if (this.inputs[1] !== null && this.inputs[1] !== undefined) {
      const object = this.inputs[1]();
      const enable = this.inputs[2]();

      if (object !== null && object !== undefined && object.isInstanceOf('Component')) {
        if (
          object.isInstanceOf('FaceStretchComponent') ||
          (object.isInstanceOf('JSScriptComponent') && object.path === 'js/LutFilter.js')
        ) {
          const meshRenderer = object.getSceneObject().getComponent('MeshRenderer');

          if (meshRenderer !== null && meshRenderer !== undefined) {
            if (!EffectReset.getInstance().propertyInitValueMap.has(meshRenderer.guid.toString())) {
              const callBackFuncMap = new Map();
              callBackFuncMap.set(
                (_meshRendererComp, _enable) => {
                  _meshRendererComp.enabled = _enable;
                },
                [meshRenderer.enabled && object.enabled]
              );
              EffectReset.getInstance().propertyInitValueMap.set(meshRenderer.guid.toString(), callBackFuncMap);
            }
            meshRenderer.enabled = enable;
          }
        } else if (object.isInstanceOf('JSScriptComponent') && object.path === 'js/FaceShapeController.js') {
          if (!EffectReset.getInstance().propertyInitValueMap.has(object.guid.toString())) {
            const callBackFuncMap = new Map();
            callBackFuncMap.set(
              (_jssScriptComp, _enable) => _jssScriptComp.properties.set('isVisible', _enable),
              [object.properties.get('isVisible')]
            );
            EffectReset.getInstance().propertyInitValueMap.set(object.guid.toString(), callBackFuncMap);
          }
          object.properties.set('isVisible', enable);
        }

        if (!EffectReset.getInstance().propertyInitValueMap.has(object.guid.toString())) {
          const callBackFuncMap = new Map();
          callBackFuncMap.set((_comp, _enable) => (_comp.enabled = _enable), [object.enabled]);
          EffectReset.getInstance().propertyInitValueMap.set(object.guid.toString(), callBackFuncMap);
          CentralDataReset.getInstance().registerPropertyResetCallbacks(CentralResetDataMode.NormalObject, object, [
            'enabled',
          ]);
        }

        object.enabled = enable;
        this.outputs[1] = enable;
      } else {
        this.outputs[1] = null;
      }
    }

    if (this.nexts[0]) {
      this.nexts[0]();
    }
  }
}

exports.CGSetEnable = CGSetEnable;
