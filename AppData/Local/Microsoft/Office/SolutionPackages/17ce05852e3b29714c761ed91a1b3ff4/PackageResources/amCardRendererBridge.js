// Create the renderer
window.meCardRenderer = new MeRenderHelper.MeCardRenderer();

// Set start time
const startTime = new Date();

/////////// Native to JS ///////////
function executeNativeToJsEvent(eventType, eventPayload) {
  const time = new Date();
  console.log(`NativeToJavaScript::
    timestamp:${time.toISOString()},
    timeSinceStart:${time - startTime},
    eventType:${eventType},
    eventPayload:${eventPayload}`);

  // Pass the event to renderer
  window.meCardRenderer.postMessage(eventType, eventPayload);

  // Set background color
  if (eventType === 13 /*HydrateCard*/ || eventType === 14 /*ThemeChanged*/) {
    const parsedPayload = JSON.parse(eventPayload);
    const backgroundColor = parsedPayload?.payload?.config?.backgroundColor ?? parsedPayload?.payload?.backgroundColor;
    console.log(`Setting document background color to: ${backgroundColor}`);
    document.body.style.backgroundColor = backgroundColor;
  }
}

window.executeEvent = (eventType, eventPayload) => {
  executeNativeToJsEvent(eventType, eventPayload);
}

/////////// JS to native ///////////
function executeJsToNativeEvent(eventType, eventPayload) {
  const time = new Date();
  console.log(`JavaScriptToNative::
    timestamp:${time.toISOString()},
    timeSinceStart:${time - startTime},
    eventType:${eventType},
    eventPayload:${eventPayload}`);

  // Pass the event to native (through OSF)
  window.external.Execute(1000, [eventType, eventPayload]);
}

window.amNativeRenderer = {
  notify: executeJsToNativeEvent
};