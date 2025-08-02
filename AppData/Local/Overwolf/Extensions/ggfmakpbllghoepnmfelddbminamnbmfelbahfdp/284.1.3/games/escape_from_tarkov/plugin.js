define([
  '/games/service/PluginHandler.js',
  '/utils/base_utils.js'
], function (PluginHandler, BaseUtils) {
  return class EscapeFromTarkovPluginHandler extends PluginHandler {
    constructor(config) {
      super(config);
      this._sceneOrder = false;
      this._setStart = false;
      this._orderEnd = false;
    }
    _handleSingleGameInfo(info) {
      super._handleSingleGameInfo(info);

      if (info.key === 'scene_state' && info.value === 'scene_TimeHasCome') {
        this._sceneOrder = true;
      }

      if (
        info.key === 'scene_state' &&
        info.value === 'scene_BattleUI' &&
        !this._setStart &&
        this._sceneOrder
      ) {
        this._handleMatchStart();
        this._setStart = true;
        this._sceneOrder = false;
      }

      if (
        info.key === 'scene_state' &&
        (info.value === 'scene_SessionStatistics' || info.value === 'scene_ExitStatus')
      ) {
        this._orderEnd = true;
      }

      if (
        this._orderEnd &&
        this._setStart &&
        info.key === 'scene_state' &&
        info.value === 'scene_MainMenu'
      ) {
        this._handleMatchEnd();
        this._setStart = false;
        this._orderEnd = false;
      }

      if (info.key === "session_type") {
        this._handleSessionTypeInfo(info);
      }

      if (info.key.includes("quests_list")) {
        this._handleQuestsListInfo(info);
      }
    }

    _handleMatchEnd() {
      this._featuresHandler.triggerEvent(
        this._supportedFeatures.match_info.name,
        this._supportedFeatures.match_info.events.match_end.name,
        null
      );

      this._infoDB.set(
        this._supportedFeatures.match_info.name,
        this._supportedFeatures.match_info.info.raid_type.category,
        this._supportedFeatures.match_info.info.raid_type.key,
        null
      );
    }

    _handleMatchStart() {
      this._featuresHandler.triggerEvent(
        this._supportedFeatures.match_info.name,
        this._supportedFeatures.match_info.events.match_start.name,
        null
      );
    }


    _handleSessionTypeInfo(info) {

      let value = info.value;
      value = value === "Regular" ? "PVP" : "PVE";

      this._infoDB.set(
        this._supportedFeatures.match_info.name,
        this._supportedFeatures.match_info.info.session_type.category,
        this._supportedFeatures.match_info.info.session_type.key,
        value
      );
    }


    _handleQuestsListInfo(info) {
      let value = JSON.parse(info.value);
      const infoKey = info.key;

      value = value.map(item => ({
        ...item,
        quest: BaseUtils.b64DecodeUnicode(item.quest)
      }));

      this._infoDB.set(
        this._supportedFeatures.game_info.name,
        this._supportedFeatures.game_info.info[infoKey].category,
        this._supportedFeatures.game_info.info[infoKey].key,
        JSON.stringify(value)
      );
    }
  };
});
