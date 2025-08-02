define([
  '/games/service/PluginHandler.js',
], function (PluginHandler) {
  return class MinecraftPluginHandler extends PluginHandler {
    _featuresToClearOnMatchEnd = [
      {
        feature: this._supportedFeatures.match_info,
        infos: [
          'server',
          'server_info',
          'items_stats',
          'general_stats',
          'mobs_stats',
          'location',
          'facing',
          'biome',
          'realms_info'
        ]
      }
    ];

    constructor(config) {
      super(config);
    }

    _handleSingleEvent(event) {
      if (event.name === 'match_end') {
        this._clearData(this._featuresToClearOnMatchEnd);
      }



      super._handleSingleEvent(event);
    }

    _handleSingleGameInfo(info) {
      if (this._handleModsDetails(info)) {
        return;
      }

      super._handleSingleGameInfo(info);
    }


    _handleModsDetails(info) {
      if (!info.key.startsWith('addon_')) {
        return false;
      }

      this._infoDB.set(this._supportedFeatures.mods.name,
        this._supportedFeatures.mods.info.mods.category,
        info.key,
        info.value);

      let getMachine = false;
      let feature = this._supportedFeatures.mods.name;
      let infoDb = this._supportedFeatures.mods.info.mods_details;
      let infoData = JSON.parse(info.value);
      let machine_name = infoData.name;
      let version = infoData.version;

      if (!getMachine && (machine_name == "fabricloader" || machine_name == "forge")) {
        let machine_version = machine_name + '_' + version;
        this._infoDB.set(feature,
          infoDb.category,
          infoDb.key,
          machine_version);
        getMachine = true;
      }
    }
  }
});