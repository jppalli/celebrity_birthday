const {BaseNode} = require('../Utils/BaseNode');
const APJS = require('../../../amazingpro');

const SensorIndexEnum = {
  GYRO: 0,
  ACCELERATION: 1,
  GRAVITY: 2,
  ROT: 3,
};

const SensorDefine = {
  SENSOR_MAX: 4,
  OUTPUT_OFFSET: 2,
};

class CGGyroscopeData extends BaseNode {
  constructor() {
    super();
    this.gyroSensorAgent = null;
    this.accSensorAgent = null;
    this.gravitySensorAgent = null;
    this.rotSensorAgent = null;
    this.rateSensorAgent = null;

    this.dataArray = new Array(SensorDefine.SENSOR_MAX);
    this.dataSensorAgent = new Array(SensorDefine.SENSOR_MAX);
    this.dataEnableArray = new Array(SensorDefine.SENSOR_MAX);
    this.rateValue = -1;

    this.isValidData = false;

    this.inited = false;
  }

  beforeStart() {
    const input = APJS.AmazingManager.getSingleton('Input');
    this.accSensorAgent = input.buildAccelerationSensorAgent(APJS.SensorFilterType.None);
    this.gravitySensorAgent = input.buildGravitySensorAgent(APJS.SensorFilterType.None);
    this.gyroSensorAgent = input.buildGyroSensorAgent(APJS.SensorFilterType.None);
    this.rotSensorAgent = input.buildRotationSensorAgent(APJS.SensorFilterType.None);
    this.rateSensorAgent = input.buildRateSensorAgent();

    this.dataSensorAgent[SensorIndexEnum.GYRO] = this.gyroSensorAgent;
    this.dataSensorAgent[SensorIndexEnum.ACCELERATION] = this.accSensorAgent;
    this.dataSensorAgent[SensorIndexEnum.GRAVITY] = this.gravitySensorAgent;
    this.dataSensorAgent[SensorIndexEnum.ROT] = this.rotSensorAgent;
    for (let i = 0; i <= SensorDefine.SENSOR_MAX; i++) {
      this.dataEnableArray[i] = true;
    }

    this.inited = true;
  }

  onUpdate() {
    //console.log(SensorDefine.SENSOR_MAX);

    if (this.inited) {
      this.updateSensorState();
      this.updateSensorData();
      let slot = 0;
      if (!this.isValidData) {
        slot = 1;
      }
      if (this.nexts[slot]) {
        this.nexts[slot]();
      }

      let rateValueInput = this.inputs[0]();
      rateValueInput = Math.max(rateValueInput, 30.0);
      rateValueInput = Math.min(rateValueInput, 60.0);

      //this.rateSensorAgent.refreshRate = rateValueInput;

      if (Math.abs(rateValueInput - this.rateValue) < 0.01) {
        if (this.rateSensorAgent != null) {
          this.rateSensorAgent.refreshRate = rateValueInput;
        }
        //console.log(rateValueInput);
        this.rateValue = rateValueInput;
      }
    }
  }
  onDestroy() {
    console.log('onDestroy');
    this.accSensorAgent = null;
    this.gravitySensorAgent = null;
    this.gyroSensorAgent = null;
    this.rotSensorAgent = null;
    this.rateSensorAgent = null;

    this.dataSensorAgent[SensorIndexEnum.GYRO] = null;
    this.dataSensorAgent[SensorIndexEnum.ACCELERATION] = null;
    this.dataSensorAgent[SensorIndexEnum.GRAVITY] = null;
    this.dataSensorAgent[SensorIndexEnum.ROT] = null;
  }

  updateSensorState() {
    for (let i = 0; i <= SensorDefine.SENSOR_MAX; i++) {
      const isOutputEnable = this.isOutputConnected(i + SensorDefine.OUTPUT_OFFSET);
      //console.log(isOutputEnable);
      if (isOutputEnable != this.dataEnableArray[i]) {
        if (this.dataSensorAgent[i] != null) {
          this.dataSensorAgent[i].enabled = isOutputEnable;
        }
        this.dataEnableArray[i] = isOutputEnable;
        //}
      }
    }

    this.isValidData = false;
    for (let i = 0; i <= SensorDefine.SENSOR_MAX; i++) {
      if (this.dataSensorAgent[i] != null) {
        const isOutputEnable = this.isOutputConnected(i + SensorDefine.OUTPUT_OFFSET);
        if (isOutputEnable) {
          let isValidData = this.dataSensorAgent[i].isValidData();
          if (i == SensorIndexEnum.ROT) {
            isValidData = true;
          }
          //isValidData = true;
          if (isValidData) {
            this.isValidData = true;
          } else {
            this.isValidData = false;
            break;
          }
        }
      }
    }
  }
  updateSensorData() {
    if (this.gyroSensorAgent != null && this.dataEnableArray[SensorIndexEnum.GYRO]) {
      this.dataArray[SensorIndexEnum.GYRO] = this.gyroSensorAgent.getData();
    }
    if (this.accSensorAgent != null && this.dataEnableArray[SensorIndexEnum.ACCELERATION]) {
      this.dataArray[SensorIndexEnum.ACCELERATION] = this.accSensorAgent.getData();
    }
    if (this.gravitySensorAgent != null && this.dataEnableArray[SensorIndexEnum.GRAVITY]) {
      this.dataArray[SensorIndexEnum.GRAVITY] = this.gravitySensorAgent.getData();
    }
    if (this.rotSensorAgent != null && this.dataEnableArray[SensorIndexEnum.ROT]) {
      this.dataArray[SensorIndexEnum.ROT] = this.rotSensorAgent.getEulerAngles();
    }
  }

  getOutput(index) {
    //console.log(index);
    let ret;
    if (index >= SensorDefine.OUTPUT_OFFSET) {
      ret = this.dataArray[index - SensorDefine.OUTPUT_OFFSET];
    }

    ////console.log("Log Sensor x=" + ret.x + "y=" + ret.y + "z=" + ret.z);
    return ret;
  }
}

exports.CGGyroscopeData = CGGyroscopeData;
