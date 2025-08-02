"use strict";

const kRecordingIndicationOffOption = 0;

//------------------------------------------------------------------------------
class CaptureTabVideoRecordingIndicatorView extends View {
  //----------------------------------------------------------------------------
  get Constants() {
    return {
      recordingIndicator: "recordingIndicator",
      recordingIndicatorCorner: "recordingIndicatorCorner"
    }
  }

  //----------------------------------------------------------------------------
  constructor(viewDelegate) {
    super(viewDelegate);

    const kSelectorCaptureVideoSection = "#capture-subsection--video";

    this._listRecordingIndicators = new ViewComponent(null, `${kSelectorCaptureVideoSection} #recordingIndicatorList`);
    this._selectedRecordingIndicator = new ViewComponent(this.Constants.recordingIndicator, `${kSelectorCaptureVideoSection} #selectedRecordingIndicator`);

    this._recordingIndicatorCornerSelector = new ViewComponent(this.Constants.recordingIndicatorCorner, `${kSelectorCaptureVideoSection} #recording-indicator-corner-selector`);
  }

  //----------------------------------------------------------------------------
  init() {
    super.initComponents();

    try {
      this._selectedRecordingIndicator.element.addEventListener("change", () => {
        this._updateIndicatorCornerSelector();
        super.onChanged(this._selectedRecordingIndicator.name);
      });

      this._recordingIndicatorCornerSelector.element.addEventListener("click",
        () => {
          super.onChanged(this._recordingIndicatorCornerSelector.name);
        });
    } catch (e) {
    }
  }

  //----------------------------------------------------------------------------
  _updateIndicatorCornerSelector() {
    if (this.recordingIndicator == kRecordingIndicationOffOption) {
      this._recordingIndicatorCornerSelector.element.classList.add("disabled");
    } else {
      this._recordingIndicatorCornerSelector.element.classList.remove("disabled");
    }
  }

  //----------------------------------------------------------------------------
  // Getters/Setters
  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
  set recordingIndicator(option) {
    try {
      let recordingIndicatorElement =
        this._listRecordingIndicators.element.querySelector(
          `li[data-setting-id='${option}']`);

      if (!recordingIndicatorElement) {
        // try to fallback to the default if we failed
        recordingIndicatorElement =
          this._listRecordingIndicators.element.firstElementChild;
      }

      this._selectedRecordingIndicator.element.innerText =
        recordingIndicatorElement.innerText;
      this._selectedRecordingIndicator.element.dataset.settingId = option;

      this._updateIndicatorCornerSelector();
    } catch (e) {
      console.log(e);
    }
  }

  //----------------------------------------------------------------------------
  get recordingIndicator() {
    try {
      return this._selectedRecordingIndicator.element.dataset.settingId;
    } catch (e) {
      return null;
    }
  }

  //----------------------------------------------------------------------------
  set recordingIndicatorCorner(option) {
    try {
      let recordingIndicatorCornerElement =
        this._recordingIndicatorCornerSelector.element.querySelector(
          `button[data-setting-id='${option}']`);

      if (!recordingIndicatorCornerElement) {
        // try to fallback to the default if we failed
        recordingIndicatorCornerElement =
          this._recordingIndicatorCornerSelector.element.firstElementChild;
      }

      recordingIndicatorCornerElement.click();
      this._updateIndicatorCornerSelector();
    } catch (e) {
      console.log(e);
    }
  }

  //----------------------------------------------------------------------------
  get recordingIndicatorCorner() {
    try {
      return this._recordingIndicatorCornerSelector.element.dataset.settingId;
    } catch (e) {
      return null;
    }
  }


}