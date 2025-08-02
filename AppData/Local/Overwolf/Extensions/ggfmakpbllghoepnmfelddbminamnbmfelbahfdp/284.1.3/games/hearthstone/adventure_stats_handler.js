define([], function() {
  const kResetScenes = ['scene_hub'];

  class AdventureStatsHandler {
    constructor({ 
      infoDB, 
      supportedFeatures 
    }) {
      this._infoDB = infoDB;
      this._supportedFeatures = supportedFeatures;

      this._adventureStats = {};

      this.handleInfoUpdate = this.handleInfoUpdate.bind(this);
    }

    handleEvent(event) {
      if (this._handleSingleStatEvent(event)) {
        return true;
      }

      return false;
    }

    handleInfoUpdate(info) {
      if (this._handleSceneState(info)) {
        return true;
      }

      return false;
    }

    _handleSceneState(info) {
      if (info.key !== 'scene_state') {
        return false;
      }

      if (!kResetScenes.includes(info.value)) {
        return false;
      }

      this._adventureStats = {};
      this._publishStatsInfo();

      return true;
    }

    _handleSingleStatEvent(event) {
      if (event.name !== 'savedata') {
        return false;
      }

      const stat = this._parsePluginValue(event.data);

      const {
        key,
        subkey,
        value
      } = stat;

      if (!this._adventureStats.hasOwnProperty(key)) {
        this._adventureStats[key] = {};
      }

      this._adventureStats[key][subkey] = parseInt(value);
      this._publishStatsInfo();
    }

    _parsePluginValue(valueStr) {
      try {
        return JSON.parse(valueStr);
      } catch {
        return null;
      }
    }

    _publishStatsInfo() {
      this._infoDB.set(
        this._supportedFeatures.match_info.name,
        this._supportedFeatures.match_info.info.adventure_stats.category,
        this._supportedFeatures.match_info.info.adventure_stats.key,
        JSON.stringify(this._adventureStats));
    }

  }

  return AdventureStatsHandler;
});
