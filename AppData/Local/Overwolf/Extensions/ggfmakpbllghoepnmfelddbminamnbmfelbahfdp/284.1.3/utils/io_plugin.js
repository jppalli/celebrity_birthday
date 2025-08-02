"use strict";

define(function() {
  let Constants = {
    SIMPLE_IO_PLUGIN_NAME: "simple-io-plugin"
  };

  var _simpleIOPlugin = null;

  function asyncAssureCreation() {
    return new Promise((resolve, reject) => {
      if (_simpleIOPlugin != null) {
        return resolve(_simpleIOPlugin);
      }

      overwolf.extensions.current.getExtraObject(
        Constants.SIMPLE_IO_PLUGIN_NAME, function(result) {

        if (result.status == "success") {
          _simpleIOPlugin  = result.object;
          return resolve(_simpleIOPlugin);
        } else {
          console.error("Fail to load io Plugin: " + JSON.stringify(result));
          return reject();
        }
      }); 

    }); 
  }

  function get() {
    return _simpleIOPlugin;
  }

  return {
    asyncAssureCreation: asyncAssureCreation,
    get: get
  }
});
