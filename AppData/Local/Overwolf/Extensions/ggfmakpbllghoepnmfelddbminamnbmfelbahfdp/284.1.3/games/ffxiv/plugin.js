define([
  '/games/service/PluginHandler.js',
  '/utils/base_utils.js'
], function (PluginHandler, base_utils) {
  return class FinalFantasyXivPluginHandler extends PluginHandler {
    _featuresToClearOnMatchStart = [];

    _featuresToClearOnMatchEnd = [];

    constructor(config) {
      super(config);
    }

    _handleSingleGameInfo(info) {
      switch (info.key) {
        case (info.key.match(/contact_/) || {}).input: {
          const value = JSON.parse(info.value);
          value.name = base_utils.b64DecodeUnicode(value.name);
          info.value = JSON.stringify(value);
          break;
        }
      }

      super._handleSingleGameInfo(info);
      this._handleEvents(info);
    }

    _handleEvents(info) {

          }
  }
});