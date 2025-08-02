(function loadRedirect() {
  window.addEventListener("beforeunload", () => {
    // We let the app know that we are about to navigate, so that it can
    // show the offline message if the iframe doesn't report that it was
    // loaded successfully
    window.parent.postMessage({action: 'widget-before-navigation'}, '*');
  });
})();
