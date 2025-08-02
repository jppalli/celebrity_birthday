define([
	'../monitoring_statics.js',
	'/utils/GSI/gsi_utils.js'
],
function(MonitoringStatics,
         gsi_utils) {

  var _server = null;
  var _events;
  var _listeners = [];
  var _previousInfo = {};
  let _gepVersion;
  let _checks = null;

  function addListener(listener) {
    _listeners.push(listener);
  }

  function removeListener(listener) {
    var index = _listeners.indexOf(listener);
    if (!index) {
      return;
    }

    _listeners.splice(index,1);
  }

  async function start(gameName, events, checks, port) {
    return new Promise(resolve => {
      overwolf.extensions.current.getManifest(async function (manifest) {
        _gepVersion = manifest.meta.version;
        _checks = checks;
        _events = events;

         overwolf.web.createServer(port, function(serverInfo) {
          if (serverInfo.status == "error") {
            console.log("Failed to create server");
            resolve(null);
            return;
          } else {
            _server = serverInfo.server;
            _server.onRequest.addListener(onRequest);
            _server.listen(function(info) {
              if (info.status === "error") {
                console.log("Failed to listen to server | " + info.reason);
                MonitoringStatics.sendTrack(MonitoringStatics.TRACKING_KINDS.GSI_ERROR, gameName + "." + _gepVersion.replace(/\./g,"_"));
              } else {
                console.log("Server listening status on port " + port + " :", info);
              }
            });
            resolve(port);
          }
        });
      });
    });
  }


  async function startInfoListener(gameName,  port) {
    return new Promise(resolve => {
      overwolf.extensions.current.getManifest(async function (manifest) {
        _gepVersion = manifest.meta.version;

         overwolf.web.createServer(port, function(serverInfo) {
          if (serverInfo.status == "error") {
            console.log("Failed to create server");
            resolve(null);
            return;
          } else {
            _server = serverInfo.server;
            _server.onRequest.addListener(onInfoRequest);
            _server.listen(function(info) {
              if (info.status === "error") {
                console.log("Failed to listen to server | " + info.reason);
                MonitoringStatics.sendTrack(MonitoringStatics.TRACKING_KINDS.GSI_ERROR, gameName + "." + _gepVersion.replace(/\./g,"_"));
              } else {
                console.log("Server listening status on port " + port + " :", info);
              }
            });
            resolve(port);
          }
        });
      });
    });
  }

  function stop() {
    _server.close();
    _listeners = [];
  }

  async function findAvailablePort(gameId, defaultPort) {
    let gsiPorts = gsi_utils.getGamePorts();
    let port = gsiPorts[gameId] || defaultPort;

    if (port && await isPortAvailable(port)) {
      gsi_utils.setGamePort(gameId, port);
      return port;
    }

    for (let i = 0; i < gsi_utils.configuration.max_port_retries; i++) {
      let port = gsi_utils.getRandomInt(50000, 60000);
      if (await isPortAvailable(port)) {
        gsi_utils.setGamePort(gameId, port);
        return port;
      }
    }

    return null;
  }

  async function isPortAvailable(port) {
    return await new Promise(resolve => {
      overwolf.web.createServer(port, async function (info) {
        if (!info.success) {
          resolve(false);
          return;
        }

          let result = await new Promise(resolveListen => {
          info.server.listen(listenInfo => {
            if (!listenInfo.success) {
              resolveListen(false);
              return;
            }

              console.log(`Found available port ${port}`);
            resolveListen(true);
          });
        });

        info.server.close();
        resolve(result);
      });
    });
  }

  function onRequest(info) {
    var parsedInfo = JSON.parse(info.content);

    if (localStorage.logRawGsiEvents) {
      console.log("Raw GSI Event", info.content);
    }

    checkEvents(parsedInfo);

    _previousInfo = parsedInfo;
  }


  function onInfoRequest(info) {
    var parsedInfo = JSON.parse(info.content);

    if (localStorage.logRawGsiEvents) {
      console.log("Raw GSI Event", info.content);
    }

    for (var i=0;i<_listeners.length;i++) {
      _listeners[i](parsedInfo);
    }

    _previousInfo = parsedInfo;
  }

  function checkEvents(info) {
    for (var eventName in _events) {
      checkEvent(info, eventName);
    }
  }

  function checkEvent(info, eventName) {
    for (var triggerIndex in _events[eventName].triggers) {
      var firedTrigger = checkTriggers(_events[eventName].triggers[triggerIndex], info);
      if (!firedTrigger) {
        continue;
      }

      fireEvent(eventName, info, firedTrigger);

      if (!_events[eventName].multiEvents) {
        return;
      }
    }
  }

  function checkTriggers(trigger, info) {
    if (trigger.where && !_checks?.where(trigger.where, info, _previousInfo)) {
      return null;
    }
    if (trigger.change && !_checks?.changes(trigger.change, info, _previousInfo)) {
      return null;
    }
    if (trigger.added && !_checks?.added(trigger.added, info, _previousInfo)) {
      return null;
    }
    if (trigger.same && !_checks?.same(trigger.same, info, _previousInfo)) {
      return null;
    }
    if (trigger.removed && !_checks?.removed(trigger.removed, info, _previousInfo)) {
      return null;
    }

    return trigger;
  }

  function fireEvent(eventName, infoJson, trigger) {
    var eventInfo = {};
    for (var key in trigger.provide_info) {
      if (typeof trigger.provide_info[key] == 'string') {
        eventInfo[key] = deepValue(trigger.provide_info[key], infoJson);
      } else if (typeof trigger.provide_info[key] == 'object') {
        var objectType = Object.keys(trigger.provide_info[key])[0];
        var objectVal = trigger.provide_info[key][objectType];

        if (typeof objectType == 'string') {
          if (objectType == 'value') {
            eventInfo[key] = objectVal;
          } else {
          }
        }
      }
      else if (typeof trigger.provide_info[key] == 'function') {
        eventInfo[key] = trigger.provide_info[key](infoJson);
      }
    }

    for (var i=0;i<_listeners.length;i++) {
      _listeners[i](eventName, eventInfo, infoJson);
    }
  }

  function deepValue(path, obj) {
    for (var i=0, path=path.split('.'), len=path.length; i<len; i++) {
      if (_.isUndefined(obj[path[i]])) {
        return null;
      }

      obj = obj[path[i]];
    }

    return obj;
  }

  return {
    start: start,
    startInfoListener: startInfoListener,
    stop: stop,
    addListener: addListener,
    removeListener: removeListener,
    getGamePort: findAvailablePort,
    fileExists: gsi_utils.fileExists,
    writeFileIfNeeded: gsi_utils.writeFileIfNeeded
  }
});