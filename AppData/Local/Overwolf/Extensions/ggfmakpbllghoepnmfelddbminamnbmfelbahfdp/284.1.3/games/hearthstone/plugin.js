'use strict';

define([
  '/games/hearthstone/plugin_whitelists.js',
  '/games/hearthstone/supported_features.js',
  '/games/hearthstone/decks_handler.js',
  '/games/hearthstone/adventure_stats_handler.js',
  '/utils/plugin/game_plugin_gep.js',
  '/libs/js-uuid.js'
], function(PluginWhitelist,
            SupportedFeatures,
            DecksHandler,
            AdventureStatsHandler,
            GamePluginGep,
            uuid) {

  const COLLECTION_TIMEOUT = 5000;

  let _gameInfo = null;
  let _infoDB = null;
  let _featuresHandler = null;
  let _gamePlugin = new GamePluginGep();
  let _matchStarted = false;
  let _collection = {};
  let _decks = {};
  let _timeout = null;
  let _decksHandler = null
  let _adventureHandler = null;

  function start(gameInfo, infoDB, featuresHandler, isDisabled) {
    if(isDisabled){
      console.log("[HEARTHSTONE SERVICE] game events are disabled for this game");
      return;
    }
    console.log('[HEARTHSTONE SERVICE] starting');
    _gameInfo = gameInfo;
    _infoDB = infoDB;
    _featuresHandler = featuresHandler;

    _gamePlugin.start({
      game: {
        id: 9898,
        name: "Hearthstone",
      },
      eventsWhiteList: PluginWhitelist,
        logBlackList: ["collection", "card_"]
    },
    _onGamePluginLoaded);

    _decksHandler = new DecksHandler({
      infoDB: infoDB,
      supportedFeatures: SupportedFeatures
    });

    _adventureHandler = new AdventureStatsHandler({
      infoDB: infoDB,
      supportedFeatures: SupportedFeatures
    });
  }

  function stop() {
    _gamePlugin.stop();
  }


  function _onGamePluginLoaded(result){
    if(result.status === "success"){
      _gamePlugin.addListener(_gamePlugin.EVENT_TYPES.info_update, 
                              _onPluginInfoUpdate);
      _gamePlugin.addListener(_gamePlugin.EVENT_TYPES.event, 
                              _onPluginEvent);
    }
  }

  function _onPluginEvent(currentEvent) {
    const msg = JSON.stringify(currentEvent);
    console.log(`[HEARTHSTONE SERVICE] got game event ${msg}`);

    if (currentEvent.name === "match_start") {
      const id = uuid.v4();
      _updatePseudoMatchId(id);
      _decksHandler.matchStart();
    } else if (currentEvent.name === "match_end") {
      _updatePseudoMatchId(null);
      _resetMatchType();
      _decksHandler.matchEnd();
    }

    if (_adventureHandler.handleEvent(currentEvent)) {
      return;
    }

    const feature = SupportedFeatures.match;
    _featuresHandler.triggerEvent(
      feature.name,
      currentEvent.name,
      currentEvent.data);
  }

  function _onPluginInfoUpdate(info) {
    if(info.category === "plugin_status") {
      _handlePluginStatus(info);
    } else {
      _handleInfoUpdate(info);
    }
  }

  function _handlePluginStatus(info) {
    console.log(`[HEARTHSTONE SERVICE] got plugin status ${JSON.stringify(info)}`);
  }

  function _handleInfoUpdate(info) {
    let whitelistInfo = PluginWhitelist.InfoDB[info.key];
    if (!whitelistInfo && info.key.startsWith("deck_")) {
      whitelistInfo = PluginWhitelist.InfoDB["deck_"];
    }

    if (info.key.startsWith("card_")) {
      whitelistInfo = PluginWhitelist.InfoDB["card_"];

      if (_handleCollection(info, whitelistInfo)) {
        return;
      }
    }

    if (info.key.startsWith("deck_")) {
      _handleDeck(info);
      return;
    }

    if (_decksHandler.handleInfoUpdate(info)) {
      return;
    }

    if (_adventureHandler.handleInfoUpdate(info)) {
      return;
    }

    if (info.key === "match_player_info") {
      let playersInfo = JSON.parse(info.value);
      _reportPlayerInfo(playersInfo.local, true);
      _reportPlayerInfo(playersInfo.opponent, false);
      return;
    }

    if (info.key === "battleground") {
      const data = JSON.parse(info.value);
      _infoDB.set(whitelistInfo.feature_id,
                  whitelistInfo.config.category,
                  whitelistInfo.config.key,
                  data.rating);
      return;
    }

    let feature = SupportedFeatures[whitelistInfo.feature_id];
    _infoDB.set(feature.name,
      whitelistInfo.config.category,
      whitelistInfo.config.key,
      info.value);
  }

  function _handleCollection(info) {
    if(_matchStarted) {
      return _handleCard(info.value);
    }

    const card = _parsePluginValue(info.value);
    if (!card) {
      return false;
    }

    _collection[card.id] = info.value;
    if (_timeout === null) {
      _timeout = setTimeout(function () {
        _updateCollectionInfo();
      }, COLLECTION_TIMEOUT);
    }
    return true;
  }

  function _updateCollectionInfo() {
    _matchStarted = true;
    for(let cardId in _collection){
      if(_collection.hasOwnProperty(cardId)){
        _handleCard(_collection[cardId]);
      }
    }
  }

  function _handleCard(cardStr) {
    let card = _parsePluginValue(cardStr);
    if(card){
      _infoDB.set("collection",
        "collection",
        card.id,
        cardStr);

      return true;
    } else {
      return false;
    }
  }

  function _parsePluginValue(valueStr){
    try {
      let value = JSON.parse(valueStr);
      return value;
    }
    catch(e){
      return null;
    }
  }

  function _handleDeck(info) {
    let deck = _parsePluginValue(info.value);
    if (deck) {
      if ((deck.deck_id === '') && (deck.cards.length === 0)) {
        _removeDeck(info.key);
        return true;
      }

      deck.deck_key = info.key;
      deck.cards = deck.cards.map((card) => {
        return {
          id: card.id,
          count: card.c,
          premiumCount: card.p
        };
      });

      _decks[deck.deck_id] = deck;
      _updateDecksInfo(deck);
      return true;
    } else {
      return false;
    }
  }

  function _removeDeck(key) {
    for (let deckName in _decks) {
      if (_decks.hasOwnProperty(deckName)) {
        let deck = _decks[deckName];
        if (deck.deck_key === key) {
          deck.removed = true;
          _decks[deckName] = deck;
          _updateDecksInfo(deck);
          return;
        }
      }
    }
  }

  function _updateDecksInfo(deck) {
    _infoDB.set(
      SupportedFeatures.decks.name,
      SupportedFeatures.decks.info.decks.category,
      deck.deck_id,
      JSON.stringify(deck));
  }


  function _reportPlayerInfo(playerInfo, isLocal) {
    let player = {
      "name" : playerInfo.name,
      "standardRank" : playerInfo.rank,
      "standardLegendRank" : playerInfo.legend,
      "wildRank" : playerInfo.wildrank,
      "wildLegendRank" : playerInfo.wildlegend,
      "cardBackId" : playerInfo.backid,
      "cardId" : playerInfo.herocar
    };

    let feature = SupportedFeatures.match;
    let info = SupportedFeatures.match.info.match_player_info;
    let key = isLocal ? "localPlayer" : "opponent";

    _infoDB.set(feature.name, info.category, key, JSON.stringify(player));
  }

  function _updatePseudoMatchId(id) {
    const pseudoMatchIdfeature = SupportedFeatures.match_info;
    _infoDB.set(pseudoMatchIdfeature.name,
                pseudoMatchIdfeature.info.pseudo_match_id.category,
                pseudoMatchIdfeature.info.pseudo_match_id.key,
                id);
  }

  function _resetMatchType() {
    const matchFeature = SupportedFeatures.match;
    _infoDB.set(matchFeature.name,
                matchFeature.info.match_type.category,
                matchFeature.info.match_type.key,
                null);
  }

  return {
    start: start,
    stop: stop
  }
});
