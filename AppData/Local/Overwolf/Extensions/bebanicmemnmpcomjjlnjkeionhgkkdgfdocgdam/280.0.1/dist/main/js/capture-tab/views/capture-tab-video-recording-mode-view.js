"use strict";

//------------------------------------------------------------------------------
class CaptureTabVideoRecordingModeView extends View {
  //----------------------------------------------------------------------------
  get Constants() {
    return {
      captureMonitor: "captureMonitor",
      recordActiveGame: "recordActiveGame",
      compatibilityMode: "compatibilityMode"
    }
  }

  //----------------------------------------------------------------------------
  constructor(viewDelegate) {
    super(viewDelegate);

    const kSelectorCaptureVideoSection = "#capture-subsection--video";
        
    this._sectionRecordMonitor = new ViewComponent(null, `${kSelectorCaptureVideoSection} #record-monitor-dropdown`);   
    this._listCaptureMonitors = new ViewComponent(null, `${kSelectorCaptureVideoSection} #captureMonitorList`);
    this._selectedCaptureMonitor = new ViewComponent(this.Constants.captureMonitor, `${kSelectorCaptureVideoSection} #selectedCaptureMonitor`);
    this._optionRecordingModeMonitor = new ViewComponent(this.Constants.recordActiveGame, `${kSelectorCaptureVideoSection} #recording-mode--monitor`);
    this._optionRecordingModeActiveGame = new ViewComponent(this.Constants.recordActiveGame, `${kSelectorCaptureVideoSection} #recording-mode--game`);
  }

  //----------------------------------------------------------------------------
  init() {
    super.initComponents();
  
    try {
      this._selectedCaptureMonitor.element.addEventListener("change", () => {
        super.onChanged(this._selectedCaptureMonitor.name);
      });

      this._optionRecordingModeMonitor.element.addEventListener("change",
                                                                () => {
        super.onChanged(this._optionRecordingModeMonitor.name);
      });

      this._optionRecordingModeActiveGame.element.addEventListener("change",
                                                                   () => {
        super.onChanged(this._optionRecordingModeActiveGame.name);
      });

    } catch (e) {
    }
  }

  //----------------------------------------------------------------------------
  setCaptureMonitors(monitors) {
    // Clear all items (if any exist)
    this._listCaptureMonitors.element.innerHTML = "";

    if (!monitors) {
      return;
    }

    let defaultMonitor = null;
  
    monitors.forEach(monitor => {     
      let monitorElement = document.createElement("li");
      let displayName = monitor.name;
      if (monitor.is_primary) {
        displayName += " (Main)";
      }
      
      monitorElement.innerText = displayName;
      monitorElement.dataset.settingId = monitor.handle.value;
      this._listCaptureMonitors.element.appendChild(monitorElement);
      
      if (!defaultMonitor) {
        defaultMonitor = monitorElement;
      }
    });

    if (!defaultMonitor) {
      return;
    }

    this._selectedCaptureMonitor.element.innerText = defaultMonitor.innerText;
    this._selectedCaptureMonitor.element.dataset.settingId = 
      defaultMonitor.dataset.settingId;
  }

  //----------------------------------------------------------------------------
  // Getters/Setters
  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
  set recordActiveGame(value) {
    try {
      this._optionRecordingModeMonitor.element.checked = !value;
      this._optionRecordingModeActiveGame.element.checked = value;

      if (value) {
        this._sectionRecordMonitor.element.classList.add("disabled");
      } else {
        this._sectionRecordMonitor.element.classList.remove("disabled");
      }
    } catch (e) {
    }   
  }

  //----------------------------------------------------------------------------
  get recordActiveGame() {
    try {
      return this._optionRecordingModeActiveGame.element.checked;
    } catch (e) {
    }
  }
  
  //----------------------------------------------------------------------------
  set captureMonitor(monitorHandle) {
    try {
      let monitorElement = this._listCaptureMonitors.element.querySelector(
        `li[data-setting-id='${monitorHandle}']`);

      if (!monitorElement) {
        // try to fallback to the default if we failed
        monitorElement = this._listCaptureMonitors.element.firstElementChild;
      }

      this._selectedCaptureMonitor.element.innerText = monitorElement.innerText;
      this._selectedCaptureMonitor.element.dataset.settingId = monitorHandle;
    } catch (e) {
      console.log(e);
    }   
  }

  //----------------------------------------------------------------------------
  get captureMonitor() {
    try {
      return this._selectedCaptureMonitor.element.dataset.settingId;
    } catch (e) {
      return null;
    }   
  }


}