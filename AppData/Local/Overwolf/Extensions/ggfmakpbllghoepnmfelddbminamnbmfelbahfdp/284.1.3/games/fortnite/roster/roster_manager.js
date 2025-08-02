"use strict";

define([
    "/games/fortnite/supported_features.js",
    "/utils/base_utils.js"
  ],
  function (SupportedFeatures, BaseUtils) {

    const INFO_UPDATE_TIMEOUT = 2000;

    let RosterManager = class RosterManager{
      constructor(config){
        this._infoDB = config.infoDB;
      }

      process(info){
        if (!info.key.startsWith("roster_")){
          return false
        }

        let val = JSON.parse(info.value);
        if (val.is_local) {
          val.is_local = val.is_local == 1 ? true : false;
        }

        if (typeof val.player !== 'undefined') {
          val.player = BaseUtils.b64DecodeUnicode(val.player);
        }

        val = BaseUtils.convertStringsToNumber(val);


        this._infoDB.set(
          SupportedFeatures.match_info.name,
          SupportedFeatures.roster.info.roster.category,
          info.key,
          JSON.stringify(val),
        );

        return true;
      }
    };

    return RosterManager;

  });
