/**
 * @file CGARRayCast.js
 * @author zhangzhouyu
 * @date 2024/6/4
 * @brief CGARRayCast.js
 * @copyright Copyright (c) 2024, ByteDance Inc, All Rights Reserved
 */

const {BaseNode} = require('../Utils/BaseNode');
const Amaz = effect.Amaz;
class CGARRayCast extends BaseNode {
  constructor() {
    super();
    this.maxDistance = Number.POSITIVE_INFINITY;
    this.cameraPosition = null;
    this.isTrigger = false;
    this.algMgr = null;
    this.sensorAgent = null;
    this.ID = null;
    this.ARMatrix = null;
    this.RETRY_TIMES = 10;
    this.retry = this.RETRY_TIMES;
  }

  setInput(index, func) {
    this.inputs[index] = func;
  }

  beforeStart(sys) {
    this.algMgr = Amaz.AmazingManager.getSingleton('Algorithm');
    this.sensorAgent = Amaz.AmazingManager.getSingleton('Input').createDeviceSensorHub();

    if (this.sensorAgent) {
      this.sensorAgent.setSensorEnabled(Amaz.SensorType.Rotation, true);
      this.sensorAgent.setRefreshRate(Amaz.SensorType.Rotation, 100);
      this.sensorAgent.setSensorEnabled(Amaz.SensorType.Gravity, true);
      this.sensorAgent.setRefreshRate(Amaz.SensorType.Gravity, 100);
      this.sensorAgent.setSensorEnabled(Amaz.SensorType.Gyro, true);
      this.sensorAgent.setRefreshRate(Amaz.SensorType.Gyro, 100);
      this.sensorAgent.setSensorEnabled(Amaz.SensorType.Acceleration, true);
      this.sensorAgent.setRefreshRate(Amaz.SensorType.Acceleration, 100);
    }
  }

  onUpdate(dt) {
    if (this.isTrigger) {
      const algResult = this.algMgr.getAEAlgorithmResult();
      const slamResult = algResult.getSlamInfo();
      if (!slamResult) {
        return;
      }

      const slamPosition = slamResult.clickT;
      const currentID = slamPosition.w.toFixed(4);
      if (currentID !== this.ID) {
        return;
      }

      if (slamPosition.x === 0 && slamPosition.y === 0 && slamPosition.z === 0) {
        if (this.retry === 0) {
          this.onFail('AR slam click ray cast fail!');
        } else {
          this.retry--;
        }
        return;
      }

      const ray = new Amaz.Vector3f(
        slamPosition.x - this.cameraPosition.x,
        slamPosition.y - this.cameraPosition.y,
        slamPosition.z - this.cameraPosition.z
      );
      const distance = ray.magnitude() / 100; // cm to m
      if (distance > this.maxDistance) {
        this.onFail('AR distance out of limit, current:' + distance + ' max:' + this.maxDistance);
        return;
      }

      const slamRotate = slamResult.clickR;
      const temp = new Amaz.Matrix4x4f();
      this.ARMatrix.multiplyMatrices3x4(new Amaz.Matrix4x4f(slamRotate), temp);
      const fixedRotate = new Amaz.Matrix3x3f(temp);
      const euler = new Amaz.Vector3f();
      fixedRotate.matrixToEuler(euler);
      const toDegree = 180 / Math.PI;
      euler.x *= toDegree;
      euler.y *= toDegree;
      euler.z *= toDegree;

      const toCM = 100;
      let targetPosition = new Amaz.Vector3f(slamPosition.x * toCM, slamPosition.y * toCM, slamPosition.z * toCM); // m to cm
      targetPosition = this.ARMatrix.multiplyVector3(targetPosition);
      this.onSuccess(targetPosition, euler);
    }
  }

  getOutput(index) {
    return this.outputs[index];
  }

  onFail(msg) {
    if (msg) {
      console.error(msg);
    }
    this.outputs[2] = new Amaz.Vector3f(0, 0, 0);
    this.outputs[3] = new Amaz.Vector3f(0, 0, 0);
    this.nexts[1]();
    this.isTrigger = false;
    this.retry = this.RETRY_TIMES;
  }

  onSuccess(position, rotate) {
    this.outputs[2] = position;
    this.outputs[3] = rotate;
    this.nexts[0]();
    this.isTrigger = false;
    this.retry = this.RETRY_TIMES;
  }

  cameraCheck(camera) {
    const deviceTracker = camera.getSceneObject().getComponent('DeviceTracker');
    if (!deviceTracker || !deviceTracker.getScript()) {
      this.onFail('Camera is not AR camera, no DeviceTracker component!');
      return false;
    }
    const scriptRef = deviceTracker.getScript().ref;
    if (scriptRef && 'trackingMode' in scriptRef && scriptRef['trackingMode'] === 'World3D') {
      this.ARMatrix = scriptRef.getARToWorldMatrix();
    } else {
      this.onFail('AR camera trackingMode is not World3D, current mode:' + scriptRef['trackingMode']);
      return false;
    }
    this.cameraPosition = camera.getSceneObject().getComponent('Transform').localPosition;
    return true;
  }

  triggerSlamClick(screen_x, srceen_y) {
    const x = screen_x + Math.random() * 0.01; // add random to force slam recompute for fixed screen position
    const y = 1.0 - srceen_y + Math.random() * 0.01; // use topleft as origin point
    this.algMgr.setAlgorithmParamInt('', 'nailSlam_0', 'nail_slam_mesh_enable', 1);
    this.algMgr.setAlgorithmParamInt('', 'nailSlam_0', 'nail_slam_click_flag_eh', 1);
    this.algMgr.setAlgorithmParamFloat('', 'nailSlam_0', 'nail_slam_click_x_eh', x);
    this.algMgr.setAlgorithmParamFloat('', 'nailSlam_0', 'nail_slam_click_y_eh', y);
    this.ID = (x + y).toFixed(4); // using x+y as result ID (slam will store ID in clickT.w)
  }

  // eslint-disable-next-line complexity
  execute(index) {
    if (index !== 0) {
      return;
    }

    if (!this.nexts[0] && !this.nexts[1]) {
      return;
    }

    if (!this.inputs[1]) {
      this.onFail('AR Camera is not set!');
      return;
    }

    if (!this.cameraCheck(this.inputs[1]())) {
      return;
    }

    if (!this.inputs[2]) {
      this.onFail('AR screen position is not set!');
      return;
    }

    const screenPosition = this.inputs[2]();
    if (screenPosition.x < 0 || screenPosition.x > 1) {
      this.onFail('AR screen position x is out of [0, 1]!');
      return;
    }
    if (screenPosition.y < 0 || screenPosition.y > 1) {
      this.onFail('AR screen position y is out of [0, 1]!');
      return;
    }
    this.triggerSlamClick(screenPosition.x, screenPosition.y);

    this.maxDistance = this.inputs[3]();
    this.isTrigger = true;
  }
}

exports.CGARRayCast = CGARRayCast;
