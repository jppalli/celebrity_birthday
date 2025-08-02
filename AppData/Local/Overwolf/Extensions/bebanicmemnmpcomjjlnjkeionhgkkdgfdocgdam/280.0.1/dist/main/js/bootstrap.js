
function triggerDomReflow(element) {
  // this is a hack to trigger DOM reflow
  // it's useful for applying layout changes before starting css animations 
  // source: https://css-tricks.com/restart-css-animation/
  void element.offsetWidth;
}

function getParameterByName(locationObject, name) {
  let regex, results;

  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  results = regex.exec(locationObject);
  // results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

const ancestorContainerClasses = [
  "tab-content",
  "game-list-item__content__inner"
];
function getAncestorContainer(node) {
  if (node == document.body) {
    // to avoid stack overflow
    return node;
  }

  for (const ancestorClass of ancestorContainerClasses) {
    if (node.classList.contains(ancestorClass)) {
      return node;
    }
  }

  return getAncestorContainer(node.parentElement);
}

//------------------------------------------------------------------------------
let aboveTheFoldControllers = [
  // The App
  new AppController()
];

let controllers = [
  // // Capture Tab
  new CaptureTabController(),
  new CaptureTabVideoController(),
  new CaptureTabVideoRecordingModeController(),
  new CaptureTabVideoCaptureOptionsController(),
  new CaptureTabVideoRecordingIndicatorController(),
  new CaptureTabVideoEncodingController(),
  new CaptureTabAudioController(),
  // // Sounds Tab
  new SoundsTabController(),
  //
  // // Language Tab
  new LanguageTabController

];

(async () => {
  let configurationCache = {};

  for (let i = 0; i < aboveTheFoldControllers.length; ++i) {
    let controller = aboveTheFoldControllers[i];

    let category = controller.settingCategory;
    if (!configurationCache[category]) {
      configurationCache[category] =
        await SettingsService.getSettingsAsync(category);
    }

    controller.init(configurationCache[category]);
  }

  // setTimeout(() => {
    // document.body.style.background = '#161326';
    document.body.style.display = 'flex';
  // }, 0)

  setTimeout(async () => {
    // When the language changes - make sure to refresh the translations.
    // This only takes care of the non-angular and non-react elements.
    // For Angular see privacy-angular.js and for React see i18n.config.ts.
    overwolf.settings.language.onLanguageChanged.addListener(() => {
      translationService.translateApp();
    });
  
    await translationService.translateApp()

    for (let i = 0; i < controllers.length; ++i) {
      let controller = controllers[i];

      let category = controller.settingCategory;
      if (!configurationCache[category]) {
        configurationCache[category] =
          await SettingsService.getSettingsAsync(category);
      }

      controller.init(configurationCache[category]);
    }
  }, 0);
})();


(function initResize() {
  let windowId;
  overwolf.windows.getCurrentWindow(function (result) {
    if (result.status === "success") {
      windowId = result.window.id;
    }
  });

  document.querySelector(".resize.bottom-right").addEventListener("mousedown", () => {
    overwolf.windows.dragResize(windowId, overwolf.windows.enums.WindowDragEdge.BottomRight);
  });
}); // Code disabled for now

(function initPageLanguage() {
  const restartNotification = document.getElementsByClassName("tab-content--language__restart-notification")[0];
  const restartNotificationInfoBox = restartNotification.getElementsByClassName("info-box")[0];
  new ResizeObserver(() => {
    if (restartNotificationInfoBox.scrollHeight > 0) {
      restartNotification.style = `--content-height:${restartNotificationInfoBox.scrollHeight}px`;
    }
  }).observe(restartNotificationInfoBox);
})();

// sliders
(function initSliders() {
  function refreshSliderCssValue(sliderElement) {
    sliderElement.style = `--value:${sliderElement.value}`;
  }

  for (let sliderElement of document.querySelectorAll("input[type=range]")) {
    sliderElement.addEventListener("input", (e) => {
      refreshSliderCssValue(sliderElement);
    })
    refreshSliderCssValue(sliderElement);
  }
})();

(function initDropdownMenus() {
  let activeDropdownMenu;

  function deactivateActiveDropdownMenu() {
    if (!activeDropdownMenu) return;

    activeDropdownMenu.classList.remove("active");
    activeDropdownMenu = null;
  }

  for (let dropdownElement of document.getElementsByClassName("dropdown")) {
    const selectedItem = dropdownElement.getElementsByClassName("dropdown-selected-item")[0];
    const dropDownList = dropdownElement.getElementsByClassName("dropdown-list-wrapper")[0].getElementsByClassName("dropdown-list")[0];

    dropdownElement.addEventListener("click", (e) => {
      const clickedElement = e.target;

      if (activeDropdownMenu == dropdownElement) {
        // Clicked dropdown element is already open, select item?
        if (selectedItem == clickedElement || selectedItem.contains(clickedElement)) {
          // Clicked selected item element
          deactivateActiveDropdownMenu();
        } else if (dropDownList == clickedElement.parentElement) {
          // Reset all other active items (should be just one)
          for (let listItem of dropDownList.getElementsByTagName("li")) {
            listItem.classList.remove("active");
          }

          // Activate clicked item
          clickedElement.classList.add("active");

          // Update selected item text
          let selectedItemSpan = selectedItem.getElementsByTagName("span")[0];
          selectedItemSpan.innerText = clickedElement.innerText;

          // copy all data attributes
          for (let attribute of clickedElement.attributes) {
            if ((attribute.name) && (attribute.name.startsWith("data-"))) {
              selectedItemSpan.setAttribute(attribute.name, attribute.value);
            }
          }

          var event = new Event('change');
          selectedItemSpan.dispatchEvent(event);

          deactivateActiveDropdownMenu();
        }
      } else {
        // Open clicked dropdown element
        deactivateActiveDropdownMenu();
        activeDropdownMenu = dropdownElement;
        activeDropdownMenu.classList.add("active");
      }
    });

    document.addEventListener("click", (e) => {
      if (activeDropdownMenu && !activeDropdownMenu.contains(e.target)) {
        deactivateActiveDropdownMenu();
      }
    });
    new ResizeObserver(() => {
      dropdownElement.style = `--content-height:${dropDownList.scrollHeight}px`;
    }).observe(dropDownList);
  }
})();

(function initFlippableButtons() {
  for (let button of document.getElementsByClassName("button--text--flippable")) {
    button.addEventListener("click", () => {
      button.classList.toggle("active");
      if (button.dataset.idToActivate) {
        const element = document.getElementById(button.dataset.idToActivate);

        if (button.classList.contains("active")) {
          // When toggling to active -> scroll to button and content
          element.classList.add("active");
          button.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          // When toggling to not active -> scroll to show button
          button.scrollIntoView({ behavior: "smooth", block: "end" });
          setTimeout(() => {
            element.classList.remove("active");
          }, 500);
        }
      }
    })
  }
})();

(function initCornerSelectors() {
  for (const cornerSelector of document.getElementsByClassName("corner-selector")) {
    let currentCorner = "bottom-left";
    for (const button of cornerSelector.getElementsByClassName("corner-selector__button")) {
      button.addEventListener("click", () => {
        cornerSelector.classList.remove(`selected--${currentCorner}`);
        currentCorner = button.dataset.corner;
        cornerSelector.classList.add(`selected--${currentCorner}`);
        cornerSelector.dataset.settingId = button.dataset.settingId;
      });
    }
  }
})();

  (function initTooltips() {
    for (let tooltip of document.getElementsByClassName("tooltip")) {
      TooltipUtils.setupTooltip(tooltip);
    }
  })();

(function initPageCapture() {
  const subsectionSelector = document.getElementById("capture-subsection-selector");
  const subsectionButtons = subsectionSelector.getElementsByTagName("button");

  const subsectionVideo = document.getElementById("capture-subsection--video");
  const subsectionAudio = document.getElementById("capture-subsection--audio");

  const activeTransitionTimeInMsWithExtra = 100 + 50;
  for (let button of subsectionButtons) {
    button.addEventListener("click", () => {
      for (let button2 of subsectionButtons) {
        button2.classList.remove("active");
      }

      button.classList.add("active");
      if (button.id == "captureAudioSelectionButton") {
        subsectionSelector.classList.add("audio");
        subsectionVideo.classList.remove("active");
        setTimeout(() => {
          subsectionVideo.style = "display:none";
          subsectionAudio.style = "";

          // Trigger reflow for 'display' change to take effect,
          // otherwise adding the 'active' class won't show a transition
          triggerDomReflow(subsectionAudio);

          subsectionAudio.classList.add("active");

        }, activeTransitionTimeInMsWithExtra);
      } else {
        subsectionSelector.classList.remove("audio");
        subsectionAudio.classList.remove("active");
        setTimeout(() => {
          subsectionAudio.style = "display:none";
          subsectionVideo.style = "";

          // Trigger reflow for 'display' change to take effect,
          // otherwise adding the 'active' class won't show a transition
          triggerDomReflow(subsectionVideo);

          subsectionVideo.classList.add("active");
        }, activeTransitionTimeInMsWithExtra);
      }
    });
  }

  // capture-in-progress notification
  const captureNotification = document.getElementsByClassName("tab-content--capture__recording-in-progress-notification")[0];
  const captureNotificationInfoBox = captureNotification.getElementsByClassName("info-box")[0];
  new ResizeObserver(() => {
    if (captureNotificationInfoBox.scrollHeight > 0) {
      captureNotification.style = `--content-height:${captureNotificationInfoBox.scrollHeight}px`;
    }
  }).observe(captureNotificationInfoBox);
})();

(function initPageCaptureVideo() {
  const recordingModeMonitor = document.getElementById("recording-mode--monitor");
  const recordMonitorDropdown = document.getElementById("record-monitor-dropdown");
  for (let recordingModeRadioButton of document.getElementsByName("recording-mode")) {
    recordingModeRadioButton.addEventListener("change", () => {
      if (recordingModeMonitor.checked) {
        recordMonitorDropdown.classList.remove("disabled");
      } else {
        recordMonitorDropdown.classList.add("disabled");
      }
    });
  }
})();
