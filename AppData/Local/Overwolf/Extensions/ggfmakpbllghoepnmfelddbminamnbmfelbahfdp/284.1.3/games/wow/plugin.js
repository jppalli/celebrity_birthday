define([
  '/games/service/PluginHandler.js',
  '/utils/analytics.js'
], function (PluginHandler,
  Analytics) {
  return class WorldOfWarcraftPluginHandler extends PluginHandler {
    _gameFlavour = '';

    constructor(config) {
      super(config);
    }

      start(gameInfo, infoDB, featuresHandler, isDisabled) {
      super.start(gameInfo, infoDB, featuresHandler, isDisabled);
      if (isDisabled) {
        return;        
      }

      this._detectFlavour(gameInfo);
    }

    _handleSingleGameInfo(info) {
      if (!info.value) {
        return;
      }

      if (info.value === 'c_lfglist_created') {
        info.value = JSON.stringify({});
      } else if (info.value === 'c_lfglist_destroyed') {
        info.value = null;
      } else if (info.value === 'c_lfglist_update') {
        let value = JSON.parse(info.value);
        value = this._parseIntRecuresively(value);
        info.value = JSON.stringify(value);
      }

            super._handleSingleGameInfo(info);
    }

    _parseIntRecuresively(obj) {
      Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === 'object') {
          obj[key] = this._parseIntRecuresively(obj[key]);
        }

        if (typeof obj[key] === 'string' && !isNaN(obj[key])) {
          const parser = obj[key].includes('.') ? parseFloat : parseInt;
          obj[key] = parser(obj[key]);
        }
      });

      return obj;
    }

    async _detectFlavour(gameInfo) {
      try {
        let gameFolder = gameInfo.executionPath.substring(
          0, gameInfo.executionPath.lastIndexOf("/") + 1);

        if (!gameFolder) {
          return;          
        }

                let flavourFile = gameFolder + '.flavor.info';
        overwolf.io.readTextFile(flavourFile,{},(fileInfo) => {
          try {
            if (!fileInfo.success) {
              console.warn(
                `${this._logName} fail to read flavour file: ${flavourFile}`);
              return;
            }
            this._log(`flavour file info: ${fileInfo.content}`);

            this._gameFlavour = fileInfo.content.split('\n')[1].trim();

            this._log(`flavour detected: ${this._gameFlavour}`);
          } catch (err) {
            console.error(
              `${this._logName} detect game flavour error`, err);
          }
        });

               } catch (err) {
        console.error(`${this._logName} read game flavour error`,err);
      }
    }
  }
});