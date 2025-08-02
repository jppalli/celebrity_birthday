define([
    '/games/lol/supported_features.js'
  ],
  function(SupportedFeatures){

    let _infoDB, _featuresHandler, _highestKillStreak, _killEventTimout,
      _killRankToTrigger;

    function KillEventHandler(config){

      if (!(this instanceof KillEventHandler)) {
        throw new TypeError(
          "DeathEventHandler constructor cannot be called as a function.");
      }

      _infoDB = config.infoDB;
      _featuresHandler = config.featuresHandler;
      _highestKillStreak = 0;
      _killRankToTrigger = 0;
      _killEventTimout = null;
    }

    KillEventHandler.prototype = {
      constructor: KillEventHandler,

      handleEvent: function handleEvent(eventData, killRank) {
        console.log(`[LOL KILL HANDLER] handleEvent ${JSON.stringify(eventData)}, killRank: ${killRank}`);
        console.log(`[LOL KILL HANDLER] _highestKillStreak ${_highestKillStreak}`);
        console.log(`[LOL KILL HANDLER] _killRankToTrigger ${_killRankToTrigger}`);
        let category, key;

        _highestKillStreak = Math.max(_highestKillStreak, killRank);
        console.log(`[LOL KILL HANDLER] new _highestKillStreak ${_highestKillStreak}`);

        switch (eventData.label) {
          case SupportedFeatures.kill.events.kill.data.label:
            category = SupportedFeatures.kill.info.kills.category;
            key = SupportedFeatures.kill.info.kills.key;
            break;
          case SupportedFeatures.kill.events.doubleKill.data.label:
            category = SupportedFeatures.kill.info.doubleKills.category;
            key = SupportedFeatures.kill.info.doubleKills.key;
            break;
          case SupportedFeatures.kill.events.tripleKill.data.label:
            category = SupportedFeatures.kill.info.tripleKills.category;
            key = SupportedFeatures.kill.info.tripleKills.key;
            break;
          case SupportedFeatures.kill.events.quadraKill.data.label:
            category = SupportedFeatures.kill.info.quadraKills.category;
            key = SupportedFeatures.kill.info.quadraKills.key;
            break;
          case SupportedFeatures.kill.events.pentaKill.data.label:
            category = SupportedFeatures.kill.info.pentaKills.category;
            key = SupportedFeatures.kill.info.pentaKills.key;
            break;
          default:
            return;
        }

        _infoDB.set(SupportedFeatures.kill.name, category, key, eventData.count);
      },

      triggerDelayedKill: function triggerDelayedKill(eventData){
        if (_highestKillStreak > 0) {
          let featureId = SupportedFeatures.kill.name;
          let eventName;

          if (_highestKillStreak <= _killRankToTrigger) {
            return;
          }

          if (_killEventTimout) {
            clearTimeout(_killEventTimout);
          }

          _killRankToTrigger = _highestKillStreak;

          switch (_killRankToTrigger) {
            case 1:
              eventName = SupportedFeatures.kill.events.kill.name;
              break;
            case 2:
              eventName = SupportedFeatures.kill.events.doubleKill.name;
              break;
            case 3:
              eventName = SupportedFeatures.kill.events.tripleKill.name;
              break;
            case 4:
              eventName = SupportedFeatures.kill.events.quadraKill.name;
              break;
            case 5:
              eventName = SupportedFeatures.kill.events.pentaKill.name;
              break;
          }

          _killEventTimout = setTimeout(function() {
            eventData.totalKills =
              _infoDB.get(SupportedFeatures.kill.info.kills.category,
                          SupportedFeatures.kill.info.kills.key);

            console.log(`[LOL KILL HANDLER] triggering kill event featureId: `+
              `${featureId} eventName: ${eventName} eventData: ` +
              `${JSON.stringify(eventData)}`);

            _featuresHandler.triggerEvent(featureId, eventName, eventData);

            _highestKillStreak = 0;
            _killRankToTrigger = 0;
          }, 300);
        }
      },

      reset: function(){
        _highestKillStreak = 0;
        _killEventTimout = null;
      }
    };

    return KillEventHandler;
});