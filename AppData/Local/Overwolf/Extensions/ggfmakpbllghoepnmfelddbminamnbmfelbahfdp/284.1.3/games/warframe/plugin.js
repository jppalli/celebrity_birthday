define([
  '/games/service/PluginHandler.js'
], function (PluginHandler) {
  return class WarframePluginHandler extends PluginHandler {
    constructor(config) {
      super(config);
    }

    _handleSingleGameInfo(info) {
      switch (info.key) {
        case 'username': {
          info.value = this._parseUsernameInfoValue(info.value);

          break;
        }
        case 'highlighted': {
          info.value = this._parseHighlightedInfoValue(info.value);

          break;
        }
      }

      super._handleSingleGameInfo(info);
    }


    _parseUsernameInfoValue(value) {
      const parsedValue = JSON.parse(value);
      return parsedValue.DisplayName;
    }

    _parseHighlightedInfoValue(value) {
      const parsedValue = JSON.parse(value);

      const [rivenDetails, rivenValues] = parsedValue.riven_details;

      if (rivenDetails && rivenValues) {
        const rivenValuesArr = rivenValues.values;

        let nOfBuffs = 0;

        if (rivenDetails.buffs && Array.isArray(rivenDetails.buffs)) {
          rivenDetails.buffs = rivenDetails.buffs.map((buff, i) => ({
            ...buff,
            Value: rivenValuesArr[i]
          }));

          nOfBuffs = rivenDetails.buffs.length;
        }

        if (rivenDetails.curses && Array.isArray(rivenDetails.curses)) {
          rivenDetails.curses = rivenDetails.curses.map((curse, i) => ({
            ...curse,
            Value: rivenValuesArr[i + nOfBuffs]
          }))
        }

        parsedValue.riven_details = rivenDetails;
      }

      return JSON.stringify(parsedValue);
    }
  }
});