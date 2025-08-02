const Amaz = effect.Amaz;

class FaceCaptureUtils {
  constructor() {
    this.localPosition = null;
    this.nearestIndex = -1;
    this.coeff = new Amaz.Vector2f(0, 0);
    this.anchorOffset = new Amaz.Vector3f(0, 0, 0);
  }

  init(faceCapture, camera, meanFace3DPoints, position) {
    this.localPosition = position;
    const isBindingv2 = faceCapture instanceof effect.Amaz.JSScriptComponent;

    let anchorOffset = new Amaz.Vector3f(0, 0, 0);
    const model = new Amaz.Matrix4x4f();
    if (isBindingv2) {
      const script = faceCapture.getScript().ref;
      if (script) {
        anchorOffset = script.anchorOffset;
      }
    }
    model.setPosition(anchorOffset);
    this.anchorOffset = anchorOffset;

    //suppose model matrix = I
    const view = camera.getWorldToCameraMatrix();
    const project = isBindingv2 ? camera.projectionMatrix : faceCapture.getProjectionMatrix();

    const mv = new Amaz.Matrix4x4f();
    Amaz.Matrix4x4f.multiplyMatrices4x4(view, model, mv);

    const vp = new Amaz.Matrix4x4f();
    Amaz.Matrix4x4f.multiplyMatrices4x4(project, view, vp);

    const mvp = new Amaz.Matrix4x4f();
    Amaz.Matrix4x4f.multiplyMatrices4x4(project, mv, mvp);

    const meanface2d = [];
    for (let i = 0; i < 103; i++) {
      const p_3d = new Amaz.Vector3f(
        meanFace3DPoints[i * 3 + 0],
        meanFace3DPoints[i * 3 + 1],
        meanFace3DPoints[i * 3 + 2]
      );
      meanface2d.push(FaceCaptureUtils._project(p_3d, vp));
    }
    model.setPosition(anchorOffset);
    this.anchorOffset = anchorOffset;
    // project the mount point under 3d meanface onto the 2d plane
    const anchor_2d = FaceCaptureUtils._project(this.localPosition, mvp);

    this.nearestIndex = -1;
    let minDistance = Number.MAX_VALUE;

    for (let i = 0; i < 103; i++) {
      const p_tmp = meanface2d[i];
      const distance =
        (p_tmp.x - anchor_2d.x) * (p_tmp.x - anchor_2d.x) + (p_tmp.y - anchor_2d.y) * (p_tmp.y - anchor_2d.y);

      if (distance < minDistance) {
        minDistance = distance;
        this.nearestIndex = i;
      }
    }

    const leftEyeIndex = 74;
    const rightEyeIndex = 77;

    const xAxis_meanface = Amaz.Vector2f.sub(meanface2d[rightEyeIndex], meanface2d[leftEyeIndex]);
    const yAxis_meanface = new Amaz.Vector2f(xAxis_meanface.y, -xAxis_meanface.x);

    const offset = Amaz.Vector2f.sub(anchor_2d, meanface2d[this.nearestIndex]);
    this.coeff = FaceCaptureUtils._trans2Coeff(xAxis_meanface, yAxis_meanface, offset);
  }

  remapPosition(localPosition, meanFace3DPoints, faceCapture, camera) {
    if (faceCapture === null) {
      return localPosition;
    }

    const isBindingv2 = faceCapture instanceof effect.Amaz.JSScriptComponent;

    // check faceCapture type and if there are any facial results
    if (!isBindingv2 && faceCapture.captureType !== Amaz.CaptureType.HUMAN) {
      return localPosition;
    }

    if (camera === null) {
      return localPosition;
    }

    const faceid = isBindingv2 ? faceCapture.properties.get('faceIdx') : faceCapture.faceid;

    const algResult = Amaz.AmazingManager.getSingleton('Algorithm').getAEAlgorithmResult();
    const faceInfo = algResult.getFaceBaseInfo(faceid);
    if (faceInfo === null) {
      return localPosition;
    }

    if (this.localPosition === null) {
      this.init(faceCapture, camera, meanFace3DPoints, localPosition);
    }

    let anchorOffset = new Amaz.Vector3f(0, 0, 0);
    if (isBindingv2) {
      const script = faceCapture.getScript().ref;
      if (script) {
        anchorOffset = script.anchorOffset;
      }
    }
    const anchordifference = Amaz.Vector3f.sub(anchorOffset, this.anchorOffset);

    const difference = Amaz.Vector3f.sub(localPosition, this.localPosition);
    if (difference.sqrMagnitude() > 0.1 || anchordifference.sqrMagnitude() > 0.1) {
      this.init(faceCapture, camera, meanFace3DPoints, localPosition);
    }

    // create mvp matrix
    const faceCaptureTransform = faceCapture.entity.getComponent('Transform');
    const model = faceCaptureTransform.getWorldMatrix();
    const view = camera.getWorldToCameraMatrix();
    const project = isBindingv2 ? camera.projectionMatrix : faceCapture.getProjectionMatrix();

    const mv = new Amaz.Matrix4x4f();
    Amaz.Matrix4x4f.multiplyMatrices4x4(view, model, mv);

    const vp = new Amaz.Matrix4x4f();
    Amaz.Matrix4x4f.multiplyMatrices4x4(project, view, vp);

    const mvp = new Amaz.Matrix4x4f();
    Amaz.Matrix4x4f.multiplyMatrices4x4(project, mv, mvp);

    // construct the face coordinate system based on the current human facial points;
    // use the offset and index to recover the corresponding position of the current facial point_2d
    const facepoints = faceInfo.points_array;
    const xAxis_curface = Amaz.Vector2f.sub(facepoints.get(77), facepoints.get(74));
    const yAxis_curface = new Amaz.Vector2f(xAxis_curface.y, -xAxis_curface.x);
    const new_anchor_2d = new Amaz.Vector2f(0.0, 0.0);
    new_anchor_2d.x =
      facepoints.get(this.nearestIndex).x + xAxis_curface.x * this.coeff.x + yAxis_curface.x * this.coeff.y;
    new_anchor_2d.y =
      facepoints.get(this.nearestIndex).y + xAxis_curface.y * this.coeff.x + yAxis_curface.y * this.coeff.y;

    // next project the new_anchor_2d onto the 3d space
    const vp_inv = vp.invert_Full();

    const p3d_ndc = new Amaz.Vector3f(new_anchor_2d.x * 2.0 - 1.0, new_anchor_2d.y * 2.0 - 1.0, 1.0);
    const p3d_world = new Amaz.Vector3f(0, 0, 0);
    vp_inv.perspectiveMultiplyPoint3(p3d_ndc, p3d_world);

    const cameraToWorld = view.invert_Full();
    const cameraPos = cameraToWorld.getPosition();

    const direction = p3d_world.sub(cameraPos);
    // after projecting, we get a ray from the center of the camera, and choose an appropriate step based on the z of the original mount point;
    // the distance from the original mount point to the center of camera, need to be calculated in the camera space
    const anchor_in_camra = mv.multiplyVector4(
      new Amaz.Vector4f(localPosition.x, localPosition.y, localPosition.z, 1.0)
    );
    const want_z = anchor_in_camra.z;

    const forward = cameraToWorld.getAxisZ();
    forward.x = -forward.x;
    forward.y = -forward.y;
    forward.z = -forward.z;

    const distToPlane = direction.dot(forward);
    const scale = Math.abs(want_z) / distToPlane;

    const new_anchor_3d = new Amaz.Vector3f(0, 0, 0);
    new_anchor_3d.x = cameraPos.x + direction.x * scale;
    new_anchor_3d.y = cameraPos.y + direction.y * scale;
    new_anchor_3d.z = cameraPos.z + direction.z * scale;

    // finally convert to the local position of facecapture
    const new_localPosition = faceCaptureTransform
      .getWorldToLocalMatrix()
      .multiplyVector4(new Amaz.Vector4f(new_anchor_3d.x, new_anchor_3d.y, new_anchor_3d.z, 1.0));
    return new Amaz.Vector3f(new_localPosition.x, new_localPosition.y, new_localPosition.z);
  }

  //----------------------------utils functions------------------------------------
  static _getfaceCaptureComponent(baseTransform) {
    let transform = baseTransform;
    while (transform) {
      if (transform.entity.getComponent('FaceCapture')) {
        const faceCapture = transform.entity.getComponent('FaceCapture');
        //Amaz.LOGS('EffectEditor', 'faceCapture name is  ' + faceCapture.entity.name.toString());
        return faceCapture;
      }

      if (transform.entity.getComponent('JSScriptComponent')) {
        const faceCapture = transform.entity.getComponent('JSScriptComponent');
        if (faceCapture.path === 'js/FaceBindingV2.js') {
          return faceCapture;
        }
      }

      transform = transform.parent;
    }

    return null;
  }

  static _getCameraComponent(faceCapture) {
    const entities = faceCapture.entity.scene.entities;

    for (let i = 0; i < entities.size(); i++) {
      const entity = entities.get(i);
      const camera = entity.getComponent('Camera');

      if (camera && camera.isEntityVisible(faceCapture.entity)) {
        return camera;
      }
    }

    return null;
  }

  static _project(point, mvp) {
    const p_res = mvp.multiplyVector4(new Amaz.Vector4f(point.x, point.y, point.z, 1.0));

    const ret = new Amaz.Vector2f(p_res.x / p_res.w, p_res.y / p_res.w);
    ret.x = ret.x * 0.5 + 0.5;
    ret.y = ret.y * 0.5 + 0.5;
    return ret;
  }

  static _trans2Coeff(e1, e2, p_in) {
    const x1 = e1.x;
    const x2 = e2.x;
    const x = p_in.x;

    const y1 = e1.y;
    const y2 = e2.y;
    const y = p_in.y;

    const b = (x1 * y - y1 * x) / (x1 * y2 - y1 * x2);
    const a = (x * y2 - x2 * y) / (x1 * y2 - y1 * x2);

    return new Amaz.Vector2f(a, b);
  }
}

exports.FaceCaptureUtils = FaceCaptureUtils;
