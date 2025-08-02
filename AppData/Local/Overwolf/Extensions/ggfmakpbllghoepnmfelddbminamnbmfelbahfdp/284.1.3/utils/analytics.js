
define([], function () {
  var allowTracking = true;

  overwolfInternal.settings.privacy.get(({ flags }) => {
    if (!flags) {
      console.warn('[Analytics] Usage flag is missing');
      return;
    }
    allowTracking = flags.usage;
    console.log('[Analytics] Usage:', flags.usage);
  });

  class Analytics {
    static gameModLoaded(name, version, flavour, gameInfo) {
      Analytics.actualTrack('game_mod_loaded',
        {
          "mod_name": name,
          "mod_version": version,
          "game_flavour": flavour
        });
    }


    static lolGameMode(gameName) {
      Analytics.actualTrack('lol_game_mode',
        {
          "game_mode": gameName
        });
    }
    static actualTrack(name, extra) {
      if (!allowTracking) {
        return;
      }

      if (typeof overwolfInternal.trackRSEventV2 === 'undefined') {
        overwolfInternal.trackRSEvent(name, extra);
        return;
      }

      overwolfInternal.trackRSEventV2(name, extra);
    }


  }

  return Analytics;
});
