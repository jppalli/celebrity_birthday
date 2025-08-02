'use strict';

define([
  '/utils/plugin/plugin_constants.js',
  '/utils/plugin/game_plugin_base.js',
  '/utils/monitoring_statics.js',
  '/utils/base_utils.js'], 
  function (Constants,
            GamePluginBase,
            MonitoringStatic,
            BaseUtils) {
  const GEPPLUGIN = "GEPPlugin";

  class GamePluginGep extends GamePluginBase {
    constructor(config) {
      config = config || {};

      config.pluginName = GEPPLUGIN;
      super(config);
    }

    start(config, callback) {
      super.start(config, callback);
    }


  };

  return GamePluginGep;
});
