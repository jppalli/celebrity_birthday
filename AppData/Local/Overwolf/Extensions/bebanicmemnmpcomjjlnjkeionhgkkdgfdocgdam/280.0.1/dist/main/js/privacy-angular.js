let privacyApp = angular.module('PrivacyControlPanel', ['ngAnimate']);

//------------------------------------------------------------------------------
function _sanitizer($compileProvider) {
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|overwolf|overwolf-extension.*):|data:image\//);
}

//------------------------------------------------------------------------------
function docReady(fn) {
  // see if DOM is already available
  if (document.readyState === "complete" || document.readyState === "interactive") {
    // call on next available tick
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

//------------------------------------------------------------------------------
function initForLanguageUpdates() {
  const momento = document.querySelector('#tab-content--privacy').outerHTML;

  overwolf.settings.language.onLanguageChanged.addListener(() => {
    document.querySelector('#tab-content--privacy').outerHTML = momento;
    console.log('>>> re-bootstrap phase');

    // Required because of a race condition which will translate to the previous
    // language.
    setTimeout(() => {
      angular.bootstrap(document.querySelector("#tab-content--privacy"),    
        ['PrivacyControlPanel']);
    }, 100);
  })
}

//------------------------------------------------------------------------------
localesService.init().then(function () {

  privacyApp.config(_sanitizer);

  if (overwolf.profile.refreshUserProfile) {
    overwolf.profile.refreshUserProfile(console.log);
  }

  // NOTE(twolf): When moving to CEF 79, we had synchronization issues (I think)
  // that would cause the privacy page not to load. This here solves it.
  docReady(() => {
    console.log('>>> bootstrap phase');
    angular.bootstrap(document.querySelector("#tab-content--privacy"),
      ['PrivacyControlPanel']);

    initForLanguageUpdates();
  });
});