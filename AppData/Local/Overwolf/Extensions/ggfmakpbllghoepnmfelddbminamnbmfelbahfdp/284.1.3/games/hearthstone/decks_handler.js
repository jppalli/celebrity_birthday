define([], function() {
  const kArenaDeckId = 'Arena Deck';
  const kAdventureDeckId = 'Adventure Deck';

  class DecksHandler {
    constructor({ 
      infoDB, 
      supportedFeatures 
    }) {
      this._infoDB = infoDB;
      this._supportedFeatures = supportedFeatures;

      this.matchStart = this.matchStart.bind(this);
      this.matchEnd = this.matchEnd.bind(this);
      this.handleInfoUpdate = this.handleInfoUpdate.bind(this);
    }


    matchStart(info) {
    }


    matchEnd(info) {
      this._resetDecks();
    }


    handleInfoUpdate(info) {
      if (this._handleArenaDeck(info)) {
        return true;
      }

        if (this._handleAdventureDeck(info)) {
        return true;
      }

        if (this._handleAdventureLootOptions(info)) {
        return true;
      }

      return false;
    }


    _updateDeckInfo(deck, deckId) {
      this._infoDB.set(
        this._supportedFeatures.decks.name,
        this._supportedFeatures.decks.info.decks.category,
        deckId,
        JSON.stringify(deck));
    }


    _handleArenaDeck(info) {
      if (info.key !== 'arena_deck') {
        return false;
      }

      let deck = this._parsePluginValue(info.value);
      if (!deck) {
        return true;
      }

      deck.deck_id = kArenaDeckId;
      deck.deck_key = 'arena_deck';
      deck.cards = deck.cards.map(card => this._parsePluginCard(card));

      this._updateDeckInfo(deck, kArenaDeckId);

        return true;
    }


    _handleAdventureDeck(info) {
      if (info.key !== 'adv_deck') {
        return false;
      }

      const deck = this._parsePluginValue(info.value);
      if (!deck) {
        return false;
      }

      deck.deck_id = kAdventureDeckId;
      deck.deck_key = 'adventure_deck';
      deck.cards = deck.cards.map((card) => this._parsePluginCard(card));

      this._updateDeckInfo(deck, kAdventureDeckId);

            return true;
    }


    _handleAdventureLootOptions(info) {
      if (info.key !== 'adv_loot_options') {
        return false;
      }

      let decks = this._parsePluginValue(info.value);
      if (!decks) {
        return false;
      }

      decks = decks.map(deck => {
        deck.cards = deck.cards.map(card => this._parsePluginCard(card));

        return deck;
      });

      this._infoDB.set(
        this._supportedFeatures.decks.name,
        this._supportedFeatures.decks.info.adventure_loot_options.category,
        this._supportedFeatures.decks.info.adventure_loot_options.key,
        JSON.stringify(decks));
      return true;
    }


    _resetDecks() {
      this._infoDB.set(
        this._supportedFeatures.decks.name,
        this._supportedFeatures.decks.info.adventure_loot_options.category,
        this._supportedFeatures.decks.info.adventure_loot_options.key,
        null);

      this._updateDeckInfo(null, kArenaDeckId);
      this._updateDeckInfo(null, kAdventureDeckId)
    }


    _parsePluginValue(valueStr){
      try {
        return JSON.parse(valueStr);
      } catch {
        return null;
      }
    }


    _parsePluginCard(card) {
      return {
        id: card.id,
        count: parseInt(card.c),
        premiumCount: parseInt(card.p)
      };
    }


  }

  return DecksHandler;
});
