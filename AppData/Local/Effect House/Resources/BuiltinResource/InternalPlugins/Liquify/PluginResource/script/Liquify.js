const Amaz = effect.Amaz;
const {FaceCaptureUtils} = require('./FaceCaptureUtils');

const LiquifyAreaMap = new Map([
  ['Full', new Amaz.Vector2f(0.0, 0.0)],
  ['Left', new Amaz.Vector2f(-1.0, 0.0)],
  ['Right', new Amaz.Vector2f(1.0, 0.0)],
  ['Up', new Amaz.Vector2f(0.0, 1.0)],
  ['Down', new Amaz.Vector2f(0.0, -1.0)],
]);

class Liquify {
  constructor() {
    this.name = 'Liquify';
    this.points = undefined;
  }
  
  onInit() {
    this.renderer = this.entity.getComponent('MeshRenderer');
    this.baseTransform = this.entity.getComponent('Transform');
  }

  onStart() {
    this.faceCapture = null;
    if (FaceCaptureUtils && this.baseTransform !== null && this.baseTransform !== undefined) {
      this.faceCapture = FaceCaptureUtils._getfaceCaptureComponent(this.baseTransform);
    }

    this.camera = null;
    if (FaceCaptureUtils && this.faceCapture !== null) {
      this.camera = FaceCaptureUtils._getCameraComponent(this.faceCapture);
    }

    this.faceCaptureUtils = null;
    this.faceCaptureUtilsSymmetry = null;
  }

  /*
   * @return this attached component, since this property does not exist for JS Scripts
   */
  component() {
    const jsScriptComps = this.entity.getComponents('JSScriptComponent');
    for (let i = 0; i < jsScriptComps.size(); i++) {
      const comp = jsScriptComps.get(i);
      const className = comp.getScript().className;
      if (className === this.script.className) {
        return comp;
      }
    }
  }

  onUpdate(dt) {
    const componentProperties = this.component().properties;

    const radius = componentProperties.get('radius');
    const intensityX = componentProperties.get('intensityX');
    const intensityY = componentProperties.get('intensityY');
    const area = componentProperties.get('area');
    const isSymmetry = componentProperties.get('isSymmetry');
    if (!this.points) {
      this.points = [];
      const pointsVector = componentProperties.get('meanFace3DPoints');
      for (let i = 0; i < pointsVector.size(); i++) {
        this.points.push(pointsVector.get(i));
      }
    }

    // console.warn("Liquify radius: ", radius.toString());
    // console.warn("Liquify intensityX: ", intensityX.toString());
    // console.warn("Liquify intensityY:", intensityY.toString());
    // console.warn("Liquify area:", area.toString());

    if (this.renderer && this.renderer.material) {
      this.renderer.material.setFloat('radius', radius);
      this.renderer.material.setVec2('intensity', new Amaz.Vector2f(intensityX, intensityY));
      this.renderer.material.setVec2('signFlag', LiquifyAreaMap.get(area));
      this.renderer.material.disableMacro('AE_LIQUIFYBACKGROUND');

      if (this.baseTransform.parent !== null && this.baseTransform.parent !== undefined) {
        this.renderer.material.setMat4('u_ParentModel', this.baseTransform.parent.getWorldMatrix());
      } else {
        this.renderer.material.setMat4('u_ParentModel', new Amaz.Matrix4x4f());
      }

      if (FaceCaptureUtils) {
        if (!this.faceCaptureUtils) {
          this.faceCaptureUtils = new FaceCaptureUtils();
        }

        const newMatrix = new Amaz.Matrix4x4f();
        newMatrix.setTRS(
          this.faceCaptureUtils.remapPosition(
            this.baseTransform.localPosition,
            this.points,
            this.faceCapture,
            this.camera
          ),
          this.baseTransform.localOrientation,
          this.baseTransform.localScale
        );
        this.renderer.material.setMat4('u_LocalModel', newMatrix);

        if (isSymmetry) {
          if (!this.faceCaptureUtilsSymmetry) {
            this.faceCaptureUtilsSymmetry = new FaceCaptureUtils();
          }
          this.renderer.material.setPassEnabled(1, true);
          // Amaz.LOGS('EffectEditor', 'isSymmetry yes');

          const symmetryTransPos = new Amaz.Vector3f(
            -this.baseTransform.localPosition.x,
            this.baseTransform.localPosition.y,
            this.baseTransform.localPosition.z
          );

          const symmetryMatrix = new Amaz.Matrix4x4f();
          symmetryMatrix.setTRS(
            this.faceCaptureUtilsSymmetry.remapPosition(symmetryTransPos, this.points, this.faceCapture, this.camera),
            new Amaz.Quaternionf(
              this.baseTransform.localOrientation.x,
              -this.baseTransform.localOrientation.y,
              -this.baseTransform.localOrientation.z,
              this.baseTransform.localOrientation.w
            ),
            this.baseTransform.localScale
          );
          this.renderer.material.setMat4('u_SymmetryLocalModel', symmetryMatrix);
        } else {
          this.renderer.material.setPassEnabled(1, false);
          // Amaz.LOGS('EffectEditor', 'isSymmetry no');
        }
      } else {
        this.renderer.material.setMat4('u_LocalModel', this.baseTransform.localMatrix);

        if (isSymmetry) {
          this.renderer.material.setPassEnabled(1, true);
          // Amaz.LOGS('EffectEditor', 'isSymmetry yes');

          const symmetryMatrix = new Amaz.Matrix4x4f();
          symmetryMatrix.setTRS(
            new Amaz.Vector3f(
              -this.baseTransform.localPosition.x,
              this.baseTransform.localPosition.y,
              this.baseTransform.localPosition.z
            ),
            new Amaz.Quaternionf(
              this.baseTransform.localOrientation.x,
              -this.baseTransform.localOrientation.y,
              -this.baseTransform.localOrientation.z,
              this.baseTransform.localOrientation.w
            ),
            this.baseTransform.localScale
          );
          this.renderer.material.setMat4('u_SymmetryLocalModel', symmetryMatrix);
        } else {
          this.renderer.material.setPassEnabled(1, false);
          // Amaz.LOGS('EffectEditor', 'isSymmetry no');
        }
      }
    }
  }

  onEnable() {
    if (this.renderer !== null && this.renderer !== undefined) {
      this.renderer.enabled = true;
    }
  }

  onDisable() {
    if (this.renderer !== null && this.renderer !== undefined) {
      this.renderer.enabled = false;
    } 
  }

  onLateUpdate(dt) {}
}

exports.Liquify = Liquify;
