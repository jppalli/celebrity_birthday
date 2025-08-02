"use strict";
const kCaptureVideoSelectionButtonId = "captureVideoSelectionButton";

//------------------------------------------------------------------------------
class CaptureTabView extends View {
  //----------------------------------------------------------------------------
  get Constants() {
    return {
      capturingInfoBox: 'capturingInfoBox',
      relevantAppsBox: 'relevantAppsBox',
      relevantApps: 'relevantApps',
      mainState: 'mainState',
      noAppsState: 'noAppsState',
      discoverAppsButton: 'discoverAppsButton',
      videoAudioSelector: 'videoAudioSelector',
      captureNavButton: 'captureNavButton'
    }
  }

  //----------------------------------------------------------------------------
  constructor(viewDelegate) {
    super(viewDelegate);

    const kSelectorCaptureSection = "#tab-content--capture";

    this._capturingInfoBox = new ViewComponent(this.Constants.capturingInfoBox, `${kSelectorCaptureSection} .tab-content--capture__recording-in-progress-notification`, false);
    this._relevantAppsBox = new ViewComponent(this.Constants.relevantAppsBox, `${kSelectorCaptureSection} .relevant-apps-box`, false);
    this._relevantApps = new ViewComponent(this.Constants.relevantApps, `${kSelectorCaptureSection} .relevant-apps-box ul`, false);
    this._mainStateSection = new ViewComponent(this.Constants.mainState, `${kSelectorCaptureSection} .tab-content--capture__main-state`, false);
    this._noAppsStateSection = new ViewComponent(this.Constants.noAppsState, `${kSelectorCaptureSection} .tab-content--capture__no-apps-state`, false);
    this._discoverAppsButton = new ViewComponent(this.Constants.discoverAppsButton, `${kSelectorCaptureSection} .tab-content--capture__no-apps-state button`, false);

    this._videoAudioSelector = new ViewComponent(this.Constants.videoAudioSelector, `${kSelectorCaptureSection} #capture-subsection-selector`);

    //TODO - review this remove
    // this._captureNavButton = new ViewComponent(this.Constants.captureNavButton, `#js-tab-button--capture`);
  }

  //----------------------------------------------------------------------------
  init() {
    super.initComponents();
  
    try {
      this._discoverAppsButton.element.addEventListener('click', () => {
        super.onClicked(this._discoverAppsButton.name);
      });

      this._videoAudioSelector.element.addEventListener('click', () => {
        super.onClicked(this._videoAudioSelector.name);
      });
    } catch (e) {
    }
  }

  //----------------------------------------------------------------------------
  // Getters/Setters
  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
  set runningRecorders(value) {
    if (!value || !value.extensions || !value.extensions.length) {
      this._capturingInfoBox.element.classList.remove("active");
    } else {
      this._capturingInfoBox.element.classList.add("active");
    }
  }

  //----------------------------------------------------------------------------
  get runningRecorders() {
    return null; //????
  }

  //----------------------------------------------------------------------------
  set relevantApps(apps) {
    if (!apps || !apps.length) {
      
      this._mainStateSection.element.style.display = 'none';
      this._noAppsStateSection.element.style.display = 'grid';
    } else {
      this._relevantApps.element.innerHTML = '';
      for (let {UID, name} of apps) {
        let liElement = document.createElement('li');
        let imgElement = document.createElement('img');
        imgElement.src = `overwolf://extension-resources/${UID}/icon`;
        let tooltip = `<span class="more-info">
                          <div class="tooltip">
                            <p><span>${name}</span></p>
                          </div>
                        </span>`;
        liElement.innerHTML = tooltip;
        liElement.appendChild(imgElement);
        
        this._relevantApps.element.appendChild(liElement);

        let moreInfoEl = liElement.getElementsByClassName('more-info')[0];
        let tooltipEl = moreInfoEl.getElementsByClassName('tooltip')[0];
        TooltipUtils.setupTooltip(tooltipEl)
      }

      this._mainStateSection.element.style.display = 'grid';
      this._noAppsStateSection.element.style.display = 'none';
      
    }
  }

  //----------------------------------------------------------------------------
  get isVideoSectionSelected() {
    try {
      let activeButton = this._videoAudioSelector.element.querySelector(
        "button[class*='active']");
      if (!activeButton) {
        return false;
      }

      if (activeButton.id == kCaptureVideoSelectionButtonId) {
        return true;
      }

      return false;
    } catch (e) {
      return true;
    }    
  }

  //----------------------------------------------------------------------------
  get isNoAppsStateShown() {
    return this._noAppsStateSection.element.style.display == 'grid';
  }  
}