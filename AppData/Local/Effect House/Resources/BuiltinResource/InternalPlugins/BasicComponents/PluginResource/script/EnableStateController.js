const Amaz = effect.Amaz;

const PROP_NAMES = ['frontCamera', 'backCamera', 'preview', 'recording'];
const DISABLE_ALL_COMPS = true;

function isOnMobile() {
  return Amaz.Platform.name() !== 'Mac' && Amaz.Platform.name() !== 'Windows' && Amaz.Platform.name() !== 'Linux';
}

class EnableStateController {
  constructor() {
    this.name = 'EnableStateController';

    // variables from property map
    this.frontCamera = true;
    this.backCamera = true;
    this.preview = true;
    this.recording = true;

    this._visualStates = new Map();

    // member variables
    this._isUsingFrontCam = false;
    this._isRecording = false;

    // Utility object that contains all interesting variables' previous values
    this.lastValues = {};

    // Record last values
    this._updateLastValues();
  }

  onStart() {
    const camFacing = Amaz.Platform.getCameraToward();
    if (camFacing === 0) {
      this._onChangeToFrontCamera();
    } else if (camFacing === 1) {
      this._onChangeToBackCamera();
    }

    this._determineVisibilities();
  }

  /* onDestroy logic can be removed ONLY IF
  we don't have use case where on destroy is triggered
  after user remove this component from a scene object then user
  will expect other "states" to be recovered, but it depends on
  exact dual instance logic, also if scripting user expect to have removal
  cases for this component via scripting API, we CAN NOT remove */
  onDestroy() {
    //console.warn(`${this.name}: `, 'onDestroy'); // Debugging purpose, TODO: remove later
    //this._restoreVisual(); // Revert to default values
  }

  onEnable() {
    //console.warn(`${this.name}: `, 'onEnable'); // Debugging purpose, TODO: remove later
  }

  onDisable() {
    //console.warn(`${this.name}: `, 'onDisable'); // Debugging purpose, TODO: remove later
  }

  onUpdate(deltaTime) {
    // // TODO: Remove debug/ex-impl code in the near future
    // this._loadProperties();
    // this._logProperties();

    /* I am really tempted to put this in onLateUpdate, 
    but haven't done so yet, just in case we might get side effects.
    Reason why put in onLateUpdate is because we want to
    ensure other sibling components' onUpdate logic run first,
    then we run enable state controlling logic
     */
    this._monitorFactorChanges();
  }

  onEvent(event) {
    if (event.type === Amaz.AppEventType.COMPAT_BEF) {
      if (event.args.size() > 1) {
        const eventResult = event.args.get(0);
        if (eventResult === Amaz.BEFEventType.BET_RECORD_VIDEO) {
          const eventCode = event.args.get(1);
          if (eventCode === 1) {
            // Event code triggered with recording start event
            this._onRecordingStarted();
          }
          if (eventCode === 2) {
            // Event code triggered with recording stop event
            this._onRecordingEnded();
          }
        } else if (eventResult === Amaz.BEFEventType.BET_CAMERA_SWITCHED) {
          const eventCode = event.args.get(1);
          if (eventCode === 0) {
            // Event code triggered with camera swithc to front event
            this._onChangeToFrontCamera();
          } else if (eventCode === 1) {
            // Event code triggered with camera swithc to back event
            this._onChangeToBackCamera();
          }
        }
      }
    }
  }

  _onRecordingStarted() {
    this._isRecording = true;
  }

  _onRecordingEnded() {
    this._isRecording = false;
  }

  _onChangeToBackCamera() {
    this._isUsingFrontCam = false;
  }

  _onChangeToFrontCamera() {
    this._isUsingFrontCam = true;
  }

  _canBeDisabledByStateController(comp) {
    if (!comp) {
      return false;
    }

    if (DISABLE_ALL_COMPS) {
      return comp.isInstanceOf('Component') && !comp.isInstanceOf('Transform');
    } else {
      // More micro managed logics, reserved for the future
      return (
        comp.isInstanceOf('MeshRenderer') ||
        comp.isInstanceOf('SkinMeshRenderer') ||
        comp.isInstanceOf('SeqMeshRenderer') ||
        comp.isInstanceOf('DirectionalLight') ||
        comp.isInstanceOf('PointLight') ||
        comp.isInstanceOf('SpotLight') ||
        comp.isInstanceOf('AreaLight') ||
        comp.isInstanceOf('LightProbGroup')
      );
    }
  }

  _customRestore(comp, origVisibility) {
    // Can be extended to more customized logics for special types
    if (comp.isInstanceOf('Component') && !comp.isInstanceOf('Transform')) {
      comp.enabled = origVisibility;
    }
  }

  _customHide(comp) {
    // Can be extended to more customized logics for special types
    if (comp.isInstanceOf('Component') && !comp.isInstanceOf('Transform')) {
      comp.enabled = false;
    }
  }

  _hideVisual() {
    for (let i = 0; i < this.entity.components.size(); i++) {
      const comp = this.entity.components.get(i);
      if (comp.guid.toString() === this.getComponent(this.script.className).guid.toString()) {
        continue; // Skip self
      }
      if (this._canBeDisabledByStateController(comp)) {
        const guidStr = comp.guid.toString();
        if (!this._visualStates.has(guidStr)) {
          this._visualStates.set(guidStr, comp.enabled);
          this._customHide(comp);
        }
      }
    }
  }

  _restoreVisual() {
    for (let i = 0; i < this.entity.components.size(); i++) {
      const comp = this.entity.components.get(i);
      if (comp.guid.toString() === this.getComponent(this.script.className).guid.toString()) {
        continue; // Skip self
      }
      if (this._canBeDisabledByStateController(comp)) {
        const guidStr = comp.guid.toString();
        if (this._visualStates.has(guidStr) === true) {
          const origVis = this._visualStates.get(guidStr);
          this._customRestore(comp, origVis);
          this._visualStates.delete(guidStr);
        }
      }
    }
  }

  _monitorFactorChanges() {
    if (
      this._isUsingFrontCam !== this.lastValues._isUsingFrontCam ||
      this._isRecording !== this.lastValues._isRecording ||
      this.frontCamera !== this.lastValues.frontCamera ||
      this.backCamera !== this.lastValues.backCamera ||
      this.preview !== this.lastValues.preview ||
      this.recording !== this.lastValues.recording
    ) {
      this._determineVisibilities();
      this._updateLastValues();
    }
  }

  _updateLastValues() {
    this.lastValues.frontCamera = this.frontCamera;
    this.lastValues.backCamera = this.backCamera;
    this.lastValues.preview = this.preview;
    this.lastValues.recording = this.recording;
    this.lastValues._isUsingFrontCam = this._isUsingFrontCam;
    this.lastValues._isRecording = this._isRecording;
  }

  _determineVisibilities() {
    if (
      (this._isRecording && this.recording === false) ||
      (!this._isRecording && this.preview === false) ||
      (this._isUsingFrontCam && this.frontCamera === false) ||
      (!this._isUsingFrontCam && this.backCamera === false)
    ) {
      this._hideVisual();
    } else {
      this._restoreVisual();
    }
  }

  // Old impl code, TODO: consdier removing in the future
  _loadProperties() {
    for (const propName of PROP_NAMES) {
      this[propName] = this.properties.get(propName);
    }
  }

  // Debug function
  _logProperties() {
    for (const propName of PROP_NAMES) {
      // console.warn('RLTest', propName, this[propName]);
    }
  }
}

exports.EnableStateController = EnableStateController;
