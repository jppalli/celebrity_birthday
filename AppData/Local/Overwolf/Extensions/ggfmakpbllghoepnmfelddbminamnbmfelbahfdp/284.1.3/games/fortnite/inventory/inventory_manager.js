"use strict";

define([
    "/games/fortnite/supported_features.js",
  ],
  function (SupportedFeatures) {

    const INVENTORY_EVENT_NAMES = ["inventory_picked", "inventory_update",
      "inventory_dropped"];
    const QUICKBAR_EVENT_NAMES = ["quickbar_new_primary",
      "quickbar_updated_primary", "quickbar_removed_primary"];
    const INFO_NAMES = ["primary_slot", "build_slot", "resource_slot"];

    let InventoryManager = class InventoryManager {
      constructor(config) {
        this._infoDB = config.infoDB;
        this.inventory = {};
        this.quickbar = new Array(6);
        this._count = 0;
      }

      handleInventoryEvent(event) {

        let isInventory = INVENTORY_EVENT_NAMES.indexOf(event.name) >= 0;
        let isQuickbar = QUICKBAR_EVENT_NAMES.indexOf(event.name) >= 0;
        if(!isInventory && !isQuickbar) {
          return false;
        }

        if(isInventory) {
          return this._handleInventory(event);
        }
        else if(isQuickbar) {
          return this._handleQuickbar(event);
        }
      }

      handleInventoryInfo(info) {
        if (info.value === "waiting_for_players" || info.value === "free_fly") {
          this._resetInventory();
          this._resetQuickbar();
          return false;
        }

        if (info.key == 'scene_state' && info.value === 'lobby') {
          this._resetInventory();
          this._resetQuickbar();
          return false;
        }

        if(INFO_NAMES.indexOf(info.key) < 0) {
          return false;
        }

        let feature = SupportedFeatures.items;

        let featureInfo;
        let value;

        if(info.key === "primary_slot" || info.key === "build_slot") {
          featureInfo = feature.info.selected_slot;
          value = JSON.stringify({
            isPrimary: info.key === "primary_slot",
            slot: info.value
          });
        }
        else {
          featureInfo = feature.info.selected_material;
          value = info.value;
        }

        this._infoDB.set(feature.name,
                         featureInfo.category,
                         featureInfo.key,
                         value);
      }

      _resetInventory() {
        this.inventory = {};

        let feature = SupportedFeatures.items;
        for (let i = 0; i < this._count; ++i) {
          const key = feature.info.inventory.key + i;
          const cat = feature.info.inventory.category;

          this._infoDB.set(feature.name, cat, key, null);  
        }

        this._count = 0;
      }

      _resetQuickbar() {
        const feature = SupportedFeatures.items;
        for (let i = 0; i < this.quickbar.length; ++i) {
          if (!this.quickbar[i]) {
            continue;
          }

          const key = feature.info.quickbar.key + i;
          const cat = feature.info.quickbar.category;

          this._infoDB.set(feature.name, cat, key, null);  
        }

		        this.quickbar = new Array(6);
      }

      _handleInventory(event) {
        try {
          if(event.name === "inventory_picked") {
            let item = JSON.parse(event.data);
            if (!this.inventory.hasOwnProperty(item.id)) {
              this.inventory[item.id] = {
                count: item.count,
                ammo: item.ammo,
                index: this._count,
                rarity: item.rarity,
                dropped: false
              };
              this._count++;
            }
            else {
              this.inventory[item.id].dropped = false;
            }

            this._updateInfo(item.id);
            return true;
          }
          else if(event.name === "inventory_update") {
            let item = JSON.parse(event.data);
            this.inventory[item.id].count = item.count;
            this.inventory[item.id].ammo = item.ammo;
            this._updateInfo(item.id);
            return true;
          }
          else if (event.name === "inventory_dropped") {
            this.inventory[event.data].dropped = true;
            this._updateInfo(event.data);
            return true;
          }
          else {
            return false;
          }
        }
        catch(e) {
          console.log("[INVENTORY MANAGER] failed to parse event data");
        }
      }

      _handleQuickbar(event) {
        if(event.name === "quickbar_new_primary" ||
           event.name === "quickbar_updated_primary") {

          let item = JSON.parse(event.data);
          let index = parseInt(item.slot);
          this.quickbar[index] = item.id;
          this._updateQuickbarInfo(index);

          return true;
        }
        else if (event.name === "quickbar_removed_primary") {
          let index = parseInt(event.data);
          this.quickbar[index] = null;
          this._updateQuickbarInfo(index);
          return true;
        }
        else {
          return false;
        }
      }

      _updateInfo(itemId) {
        let item = this.inventory[itemId];
        let feature = SupportedFeatures.items;
        let key = feature.info.inventory.key + item.index;

        let itemObj;

        if(item.dropped) {
          itemObj = null;
        }
        else {
          itemObj = JSON.stringify({
            name: itemId,
            count: item.count,
            ammo: item.ammo,
            rarity: item.rarity
          });
        }

        this._infoDB.set(feature.name,
                         feature.info.inventory.category,
                         key,
                         itemObj);
      }

      _updateQuickbarInfo(index) {
        let itemId = this.quickbar[index];
        let feature = SupportedFeatures.items;
        let key = feature.info.quickbar.key + index;

        let itemObj;
        if(itemId){
          itemObj = JSON.stringify({
            name: itemId,
          });
        }
        else {
          itemObj = null;
        }

        this._infoDB.set(feature.name,
                         feature.info.quickbar.category,
                         key,
                         itemObj);
      }

    };

    return InventoryManager;

  });
