'use strict';

define(function() {
  let _infoDB, _heroDetected = false;

  function tryDetectHero(_infoDB){
    let steamId = _infoDB.get("me", "steam_id");
    let playersList;
    try{
      playersList = JSON.parse(_infoDB.get("roster", "players"));
    }catch (e){
      console.log("Failed to get roster from localStorage")
    }

    if(steamId && playersList){
      if(playersList.length > 0) {
        for (let playerInfo of playersList) {
          if (playerInfo.steamId === steamId && playerInfo.pickConfirmed && !_heroDetected) {
            let info = {
              feature: "me",
              category: "me",
              key: "hero",
              value: playerInfo.hero
            };
            _infoDB.set(info.feature, info.category, info.key, info.value);
            _heroDetected = true;
            break;
          }
        }
      }
      else{
        let info = {
          feature: "me",
          category: "me",
          key: "hero",
          value: null
        };
        _infoDB.set(info.feature, info.category, info.key, info.value);
        _heroDetected = false;
      }
    }
  }

  function resetHeroDetection () {
    _heroDetected = false;
  }

    return {
    tryDetectHero: tryDetectHero,
    resetHeroDetection: resetHeroDetection
  }
});