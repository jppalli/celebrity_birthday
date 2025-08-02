define([
  '/games/service/PluginHandler.js',
  '/utils/io_plugin.js',
  '/games/new_world/logs/log_listener.js',
], function (PluginHandler,IOPlugin ,NewWorldLogListener) {
  return class NewWorldPluginHandler extends PluginHandler {
    constructor(config) {
      super(config);
    }

    start(gameInfo, infoDB, featuresHandler, isDisabled) {
      super.start(gameInfo, infoDB, featuresHandler, isDisabled);

      const self = this;

      IOPlugin.asyncAssureCreation().then(function (ioPlugin) {
        const _logListener = new NewWorldLogListener(gameInfo, infoDB, featuresHandler);
        _logListener.start(ioPlugin);
      }).catch(_ => {
        console.log(" failed to create io plugin service");
      });

    }

    stop() {
      super.stop();
    }

    _handleSingleGameInfo(info) {
      super._handleSingleGameInfo(info);
    }
  }
});