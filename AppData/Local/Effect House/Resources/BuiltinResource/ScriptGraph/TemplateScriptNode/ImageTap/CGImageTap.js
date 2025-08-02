/**
 * @file CGImageTap.js
 * @author rcano
 * @date 2022/5/11
 * @brief CGImageTap.js
 * @copyright Copyright (c) 2021, ByteDance Inc, All Rights Reserved
 */

const {BaseNode} = require('../Utils/BaseNode');
const APJS = require('../../../amazingpro');

class CGImageTap extends BaseNode {
  constructor() {
    super();
    this._min = new APJS.Vector3f();
    this._max = new APJS.Vector3f();
    this._fixedTapPos = new APJS.Vector3f();
    this._tapPos = new APJS.Vector2f();
    this._clamp01 = num => Math.min(Math.max(num, 0), 1);
    this._imgTrans = null;
    this._img = null;
    this._canvas = null;
    this._isScreenTapped = false;
    this.outputs[1] = false;
  }

  onUpdate(sys, dt) {
    this.outputs[1] = false;
    if (this._isScreenTapped) {
      this._runImageTapNode(sys);
      this._isScreenTapped = false;
    }
  }

  onEvent(sys, event) {
    if (this.inputs[0] == null) {
      return;
    }

    if (event.type === APJS.EventType.TOUCH) {
      const touch = event.args[0];
      if (touch.type === APJS.TouchType.TOUCH_BEGAN) {
        this._tapPos.set(touch.x, 1 - touch.y);
        this._isScreenTapped = true;
      }
    }
  }

  _runImageTapNode(sys) {
    const img = this.inputs[0]();

    if (img == null || !img.getSceneObject().isEnabledInHierarchy()) {
      return;
    }

    if (this._imgTrans == null || this._img !== img) {
      this._imgTrans = img.getSceneObject().getComponent('IFTransform2d');
      this._img = img;
    }
    const parentEntity = this._imgTrans.getSceneObject().parent;
    if (!parentEntity) {
      return;
    }
    const canvas = this._findComponentInParent(parentEntity.getTransform(), 'IFCanvas2d');
    if (canvas == null) {
      return;
    }

    const entities = sys.APJScene.getAllSceneObjects();
    for (let i = 0; i < entities.length; i++) {
      const cams = entities[i].getComponents();
      for (let j = 0; j < cams.length; ++j) {
        const component = cams[j];
        if (component instanceof APJS.Camera) {
          const cam = component;
          if (!cam.isEntityVisible(canvas.getSceneObject()) || !cam.getSceneObject().isEnabledInHierarchy()) {
            continue;
          }

          const isValidTap = this._setupData(this._imgTrans, cam);

          if (!isValidTap) {
            continue;
          }

          const isImgTapped = this._isImgTapped(cam);

          if (isImgTapped) {
            this.outputs[1] = true;
            if (this.nexts[0] != null) {
              this.nexts[0](); //on tapped event
            }
            return; //early out if we get a tap
          }
        }
      }
    }
  }

  _isImgTapped(cam) {
    const imgPos = this._imgTrans.getWorldPosition();
    const worldToLocal = this._imgTrans.getWorldMatrix().inverse();
    let localTapPoint = cam.viewportToWorldPoint(this._fixedTapPos);
    localTapPoint.z = imgPos.z; //currently in world space
    localTapPoint = worldToLocal.multiplyPoint(localTapPoint); //now in image local space
    const imgPosViewSpace = cam.worldToViewportPoint(imgPos);
    //can do AABB test even with rotations since the point is in the image's local space
    const isInQuad = this._isInAABB(localTapPoint, this._min, this._max);
    const isInView = this._inViewPlanes(cam, imgPosViewSpace.z);

    return isInQuad && isInView;
  }

  _isInAABB(point, min, max) {
    return point.x > min.x && point.x < max.x && point.y > min.y && point.y < max.y;
  }

  //sets up the corner points and adjusts the tap position to account for viewport adjustments
  _setupData(trans, cam) {
    const viewport = cam.viewport;
    if (!this._isInRect(this._tapPos, viewport)) {
      return false;
    }

    //correct for viewport adjustments
    //remaps the tapposition to be normalized screen coords to in actual camera's viewport
    this._fixedTapPos.set(
      this._inverseLerp(this._tapPos.x, viewport.x, viewport.x + viewport.width),
      this._inverseLerp(this._tapPos.y, viewport.y, viewport.y + viewport.height),
      0
    );

    const pixelWidth = cam.renderTexture.getWidth();
    const pixelHeight = cam.renderTexture.getHeight();

    const adjWidth = Math.min(viewport.width, 1 - viewport.x);
    const adjHeight = Math.min(viewport.height, 1 - viewport.y);

    //weird math to account for viewport adjustments and to create a vector that goes from the center of the screen to trans.size/2.
    //we can't just use screentoworldpoint(trans.size/2) since that is for points and this is a vector.
    let halfsize = new APJS.Vector3f(
      (pixelWidth + trans.size.x) * (0.5 * adjWidth) + viewport.x * pixelWidth,
      (pixelHeight + trans.size.y) * (0.5 * adjHeight) + viewport.y * pixelHeight,
      0
    );
    halfsize = cam.screenToWorldPoint(halfsize);
    halfsize = halfsize.multiply(1.0 / cam.orthoHeight); //I dont know why I nzeed to do this, screentoworldpoint should take care of this
    halfsize.set(Math.abs(halfsize.x), Math.abs(halfsize.y), 0);

    //calculate the min max in the Img's localspace
    this._min.set(-halfsize.x, -halfsize.y, 0);
    this._max.set(halfsize.x, halfsize.y, 0);

    //take into account pivot
    const pivot = trans.pivot;
    pivot.set((pivot.x * 2 - 1) * halfsize.x, (pivot.y * 2 - 1) * halfsize.y); //remap 0-1 space to [-halfsize, halfsize]
    //move the AABB so that the pivot is in the center of the AABB if its not already. The worldToLocal matrix
    //used in _isImgTapped does not account for the pivot having been changed
    this._min.set(this._min.x - pivot.x, this._min.y - pivot.y, this._min.z);
    this._max.set(this._max.x - pivot.x, this._max.y - pivot.y, this._max.z);

    return true;
  }

  _mulv3(a, b) {
    return new APJS.Vector3f(a.x * b.x, a.y * b.y, a.z * b.z);
  }

  //only need to check if you are in between the near and far plane
  //and let inAABB take care of the other bounds
  _inViewPlanes(cam, d) {
    return d >= cam.near && d < cam.far;
  }

  _isInRect(point, rect) {
    return point.x > rect.x && point.x < rect.x + rect.width && point.y > rect.y && point.y < rect.y + rect.height;
  }

  _inverseLerp(v, a, b) {
    if (a === b) {
      return 0;
    }

    return this._clamp01((v - a) / (b - a));
  }

  _findComponentInParent(trans, compName) {
    let comp = null;
    while (trans != null && trans !== undefined && comp == null) {
      comp = trans.getSceneObject().getComponent(compName);
      const parentEntity = trans.getSceneObject().parent;
      trans = parentEntity ? parentEntity.getTransform() : null;
    }
    return comp;
  }

  resetOnRecord(sys) {
    this._min = new APJS.Vector3f();
    this._max = new APJS.Vector3f();
    this._fixedTapPos = new APJS.Vector3f();
    this._tapPos = new APJS.Vector2f();
    this._clamp01 = num => Math.min(Math.max(num, 0), 1);
    this._imgTrans = null;
    this._img = null;
    this._canvas = null;
    this._isScreenTapped = false;
  }
}

exports.CGImageTap = CGImageTap;
