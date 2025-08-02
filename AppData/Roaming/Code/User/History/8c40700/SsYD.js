function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
}
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
var _this = this;
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
import React, { useEffect, useRef, useState, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import * as THREE from 'three';
// Constants for game settings
// Built-in levels for Square Quest Origins
var ORIGINS_LEVELS = [
    // Level 1 (Original starter level)
  [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0],[0,0,7,0,0,0,0,6,0,0,0,5,0,0,0,0,0,0,0,0,8,0,0,0],[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]],
  // Level 2
  [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,8,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,2,2,2,2,0,3,3,3,3,3,0,0,0,2,2,0,0,0,0,0,0,0,0],[0,2,2,2,2,0,2,2,2,2,2,0,0,0,0,2,2,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,6,0,0,0,2,2,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,2,0,0,0],[0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,0,2,2,2,2,0,0,0],[7,0,0,0,0,0,2,2,2,0,2,2,2,2,2,2,0,0,2,2,2,0,0,0],[2,2,2,2,2,0,2,2,2,0,2,2,2,2,2,2,0,0,0,2,2,0,0,0],[2,2,2,2,2,0,2,2,2,0,2,2,2,2,2,2,0,0,0,0,2,0,0,0]],
  // Level 3
  [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,10,0,0,0,0,0,0,8,10,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0],[0,0,2,0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0],[0,2,2,2,0,0,0,0,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0],[6,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,2,2,2,2,2,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,10,0,0,0,0,0,6,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,2,2,2,2,2,2,0,0,0,10,0,0,0,0,0,0,0,0],[2,0,2,0,2,2,2,2,2,2,2,2,0,2,2,2,2,2,0,0,0,0,0,7],[2,5,2,5,2,2,2,2,2,2,2,2,0,2,2,2,2,2,0,2,2,2,2,2],[2,2,2,2,2,2,2,2,2,2,2,2,0,2,2,2,2,2,0,2,2,2,2,2]],
  // Level 4
  [[0,0,0,0,0,0,0,0,6,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,10,0,0,0,0,0,0,0,0,10,0,0,0,0,0,0,0,0],[0,0,6,0,2,2,2,2,0,0,0,0,0,2,2,2,2,0,0,0,0,8,0,0],[0,0,0,0,0,0,10,0,0,0,0,0,0,0,0,2,2,0,0,2,2,2,0,0],[0,0,0,2,2,2,2,2,2,0,0,0,10,0,0,0,6,0,0,0,2,2,0,0],[0,0,0,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,2,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,6,0,0,0,0,0,10,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,10,0,0,0,3,3,3,3,3,3,3,3,3,3,0,0],[0,0,0,0,0,0,4,4,4,4,4,0,2,2,2,2,2,2,2,2,2,2,0,0],[0,7,0,0,2,0,2,2,2,2,2,0,2,2,2,2,2,2,2,2,2,2,0,0],[0,2,2,2,2,0,2,2,2,2,2,0,2,2,2,2,2,2,2,2,2,2,0,0]],
  // Level 5
  [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,6,0,0,0,0,0,0],[0,0,6,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,8],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,0,0,0,0,0,0],[0,0,0,0,0,4,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,4,4,4],[0,0,0,0,0,2,0,0,2,2,2,2,0,0,0,0,0,0,0,0,0,2,2,2],[0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,0,0,0,0,0,0],[0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0],[0,0,0,0,2,2,2,2,0,0,6,0,10,0,0,2,2,2,2,0,0,0,0,7],[6,0,10,2,2,2,2,2,0,0,4,4,4,4,0,2,2,2,2,0,4,4,4,4],[2,2,2,2,2,2,2,2,0,0,2,2,2,2,0,2,2,2,2,0,2,2,2,2]],
  // Level 6
  [[0,0,0,0,0,0,0,0,0,9,0,0,0,0,9,0,0,0,6,0,9,0,9,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,3,3,0,0,0,0,3,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,3,2,0,3,3,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,2,2,0,2,2,0,6,0],[0,0,0,0,0,0,0,0,0,0,3,3,3,3,0,2,2,2,0,2,2,0,0,0],[0,0,0,0,0,0,0,0,3,3,2,2,2,2,0,2,2,2,0,2,2,0,0,0],[0,0,0,0,0,0,5,0,2,2,2,2,2,0,0,2,2,2,0,2,2,0,8,0],[0,7,0,0,0,3,3,3,2,2,2,2,0,0,0,2,2,2,0,2,2,0,3,0],[0,3,3,3,0,2,2,2,2,2,0,0,0,0,0,2,2,2,0,2,2,0,2,0],[0,2,2,2,0,2,2,2,2,2,2,2,2,2,2,2,2,2,0,2,2,0,2,0]],
  //Level 7
  [[0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0],[0,0,0,0,5,0,6,0,5,0,6,0,5,0,6,0,5,0,6,0,5,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[7,0,0,0,0,0,5,0,0,0,5,0,0,0,5,0,0,0,5,0,0,0,0,0],[2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0],[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0],[0,0,0,0,0,9,0,0,0,9,0,0,0,9,0,0,0,9,0,0,0,9,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[8,0,0,5,0,0,0,5,0,0,0,5,0,0,0,5,0,0,0,5,0,0,0,0],[2,2,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,2,2],[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]],
  // Level 8
  [[0,0,0,0,0,0,0,0,0,0,9,0,0,9,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,9,0,0,0,0,9,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,9,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,9,0,0,0,0,0,0,0],[0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,0,0,9,0,0,0,0,0,0],[0,0,0,0,0,9,0,0,0,0,0,0,0,0,0,0,0,0,9,0,0,0,0,0],[0,0,0,0,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9,0,0,0,0],[0,0,0,9,0,0,0,0,0,0,0,6,6,0,0,0,0,0,0,0,9,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,0],[0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0],[0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0]],
  //Level 9
  [[6,0,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9,0,6],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,3,0,0,3,0,0,0,0,0,0,0,4,0,0,0,4,0,0,0,0],[0,0,0,0,2,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0],[5,5,2,5,2,0,0,7,8,0,0,0,0,0,0,0,0,0,0,2,5,2,5,5],[2,2,2,2,2,0,0,3,3,0,0,0,2,0,0,0,0,0,0,2,2,2,2,2],[2,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],[9,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,9],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0],[6,0,0,0,0,0,0,0,0,0,0,10,0,0,0,0,0,0,0,0,0,0,0,6],[4,0,0,0,4,0,0,0,2,0,0,2,2,0,0,2,0,0,0,3,0,0,0,3]]

    
];
var TILE_SIZE = 64;
var GRAVITY = 30; // Units per second
var JUMP_FORCE = 400; // Units per second
var MOVE_SPEED = 300; // Units per second
var GRID_SIZE = {
    WIDTH: 24,
    HEIGHT: 12
};
// Game assets and tile types
var TILE_TYPES = {
    EMPTY: 0,
    PLATFORM: 2,
    PLATFORM_ICE: 3,
    PLATFORM_MUD: 4,
    SPIKE: 5,
    COLLECTIBLE: 6,
    PLAYER_START: 7,
    EXIT: 8,
    HAMMER: 9,
    WALKER: 10
};
var _obj;
// Color mapping for different tile types
var TILE_COLORS = (_obj = {}, _define_property(_obj, TILE_TYPES.EMPTY, 'transparent'), _define_property(_obj, TILE_TYPES.PLATFORM, '#90EE90'), _define_property(_obj, TILE_TYPES.PLATFORM_ICE, '#ADD8E6'), _define_property(_obj, TILE_TYPES.PLATFORM_MUD, '#654321'), _define_property(_obj, TILE_TYPES.SPIKE, '#FF0000'), _define_property(_obj, TILE_TYPES.COLLECTIBLE, '#FFD700'), _define_property(_obj, TILE_TYPES.PLAYER_START, '#8B4513'), _define_property(_obj, TILE_TYPES.EXIT, '#4B4B4B'), _define_property(_obj, TILE_TYPES.HAMMER, '#666666'), _define_property(_obj, TILE_TYPES.WALKER, '#FF6B6B'), _obj);
/**
 * Game state management
 */ var GameState = /*#__PURE__*/ function() {
    "use strict";
    function GameState() {
        _class_call_check(this, GameState);
        this.currentLevel = [];
        this.currentLevelIndex = 0;
        this.isDead = false;
        this.showCollectText = false;
        this.playerPosition = {
            x: 0,
            y: 0
        };
        // Initialize sound effects
        this.coinSound = new Audio('https://play.rosebud.ai/assets/coin.wav?uXRz');
        this.jumpSound = new Audio('https://play.rosebud.ai/assets/jump2.wav?zpti');
        this.failSound = new Audio('https://play.rosebud.ai/assets/fail.wav?Rbbo');
        this.successSound = new Audio('https://play.rosebud.ai/assets/success.wav?tvGQ');
        this.mudSound = new Audio('https://play.rosebud.ai/assets/mud.wav?KIpe');
        this.descendSound = new Audio('https://play.rosebud.ai/assets/descend.wav?biSa');
        // Set volume levels (0.0 to 1.0)
        this.coinSound.volume = 0.3;
        this.jumpSound.volume = 0.2;
        this.failSound.volume = 0.3;
        this.successSound.volume = 0.3;
        this.descendSound.volume = 0.05;
        // Pre-load sounds
        this.coinSound.load();
        this.jumpSound.load();
        this.failSound.load();
        this.successSound.load();
        this.playerVelocity = {
            x: 0,
            y: 0
        };
        this.visualPosition = {
            x: 0,
            y: 0
        };
        this.mudDrops = [];
        this.collectibles = 0;
        this.totalCollectibles = 0;
        this.isPlaying = false;
        this.isEditing = true;
        this.playerFacing = 'right';
        this.jumpAvailable = false;
        this.debug = true;
        this.hammers = [];
        this.walkers = [];
        this.jumpForce = 0;
        this.isJumping = false;
        this.maxJumpForce = JUMP_FORCE;
        this.lastFrameTime = 0; // Add this line
    }
    _create_class(GameState, [
        {
            key: "initializeLevel",
            value: function initializeLevel(levelData) {
                this.currentLevel = JSON.parse(JSON.stringify(levelData));
                this.isDead = false;
                this.calculatePlayerStartPosition();
                this.countCollectibles();
                this.playerVelocity = {
                    x: 0,
                    y: 0
                };
                this.visualPosition = _object_spread({}, this.playerPosition);
                this.isPlaying = true;
                this.collectibles = 0;
                this.jumpAvailable = false;
                this.initializeWalkers();
                this.hammers = [];
                this.initializeHammers();
            }
        },
        {
            key: "initializeWalkers",
            value: function initializeWalkers() {
                this.walkers = [];
                var newLevel = JSON.parse(JSON.stringify(this.currentLevel));
                for(var y = 0; y < this.currentLevel.length; y++){
                    for(var x = 0; x < this.currentLevel[y].length; x++){
                        if (this.currentLevel[y][x] === TILE_TYPES.WALKER) {
                            this.walkers.push({
                                x: x * TILE_SIZE,
                                y: y * TILE_SIZE,
                                direction: Math.random() < 0.5 ? 'left' : 'right',
                                speed: 2,
                                visualX: x * TILE_SIZE
                            });
                            newLevel[y][x] = TILE_TYPES.EMPTY;
                        }
                    }
                }
                this.currentLevel = newLevel;
            }
        },
        {
            key: "initializeHammers",
            value: function initializeHammers() {
                this.hammers = [];
                for(var y = 0; y < this.currentLevel.length; y++){
                    for(var x = 0; x < this.currentLevel[y].length; x++){
                        if (this.currentLevel[y][x] === TILE_TYPES.HAMMER) {
                            this.hammers.push({
                                x: x * TILE_SIZE,
                                y: y * TILE_SIZE,
                                originalY: y * TILE_SIZE,
                                state: 'up',
                                waitTimer: 60,
                                visualY: y * TILE_SIZE
                            });
                            this.currentLevel[y][x] = TILE_TYPES.EMPTY;
                        }
                    }
                }
            }
        },
        {
            key: "updateHammers",
            value: function updateHammers() {
                var SLAM_SPEED = 20;
                var RISE_SPEED = 2;
                var WAIT_TIME = 60;
                var MAX_DISTANCE = TILE_SIZE * 5;
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this.hammers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var hammer = _step.value;
                        hammer.visualY += (hammer.y - hammer.visualY) * 0.3;
                        switch(hammer.state){
                            case 'up':
                                if (hammer.waitTimer > 0) {
                                    hammer.waitTimer--;
                                } else {
                                    hammer.state = 'slamming';
                                    // Play descend sound when hammer starts slamming
                                    this.descendSound.currentTime = 0;
                                    this.descendSound.play().catch(function(err) {
                                        return console.log('Audio play failed:', err);
                                    });
                                }
                                break;
                            case 'slamming':
                                hammer.y += SLAM_SPEED;
                                for(var checkY = hammer.y; checkY < hammer.y + TILE_SIZE; checkY += TILE_SIZE){
                                    var gridY = Math.floor(checkY / TILE_SIZE);
                                    var gridX = Math.floor(hammer.x / TILE_SIZE);
                                    if (gridY >= 0 && gridY < this.currentLevel.length) {
                                        var tile = this.currentLevel[gridY][gridX];
                                        if (tile === TILE_TYPES.WALL || tile === TILE_TYPES.PLATFORM || tile === TILE_TYPES.PLATFORM_ICE || tile === TILE_TYPES.PLATFORM_MUD) {
                                            hammer.y = gridY * TILE_SIZE - TILE_SIZE;
                                            hammer.state = 'rising';
                                            break;
                                        }
                                    }
                                }
                                break;
                            case 'rising':
                                hammer.y -= RISE_SPEED;
                                if (hammer.y <= hammer.originalY) {
                                    hammer.y = hammer.originalY;
                                    hammer.state = 'up';
                                    hammer.waitTimer = WAIT_TIME;
                                }
                                break;
                        }
                        // Check for player collision
                        var collisionMargin = 8; // pixels of forgiveness
                        if (this.isPlaying && this.playerPosition.x < hammer.x + TILE_SIZE - collisionMargin && this.playerPosition.x + TILE_SIZE - collisionMargin > hammer.x + collisionMargin && this.playerPosition.y < hammer.visualY + TILE_SIZE - collisionMargin && this.playerPosition.y + TILE_SIZE - collisionMargin > hammer.visualY + collisionMargin) {
                            this.isPlaying = false;
                            this.isDead = true;
                            return 'player_died';
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return null;
            }
        },
        {
            key: "calculatePlayerStartPosition",
            value: function calculatePlayerStartPosition() {
                for(var y = 0; y < this.currentLevel.length; y++){
                    for(var x = 0; x < this.currentLevel[y].length; x++){
                        if (this.currentLevel[y][x] === TILE_TYPES.PLAYER_START) {
                            this.playerPosition = {
                                x: x * TILE_SIZE,
                                y: y * TILE_SIZE
                            };
                            this.currentLevel[y][x] = TILE_TYPES.EMPTY;
                            return;
                        }
                    }
                }
                this.playerPosition = {
                    x: TILE_SIZE,
                    y: TILE_SIZE
                };
            }
        },
        {
            key: "countCollectibles",
            value: function countCollectibles() {
                this.totalCollectibles = 0;
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this.currentLevel[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var row = _step.value;
                        var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
                        try {
                            for(var _iterator1 = row[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                                var tile = _step1.value;
                                if (tile === TILE_TYPES.COLLECTIBLE) {
                                    this.totalCollectibles++;
                                }
                            }
                        } catch (err) {
                            _didIteratorError1 = true;
                            _iteratorError1 = err;
                        } finally{
                            try {
                                if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                                    _iterator1.return();
                                }
                            } finally{
                                if (_didIteratorError1) {
                                    throw _iteratorError1;
                                }
                            }
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
        },
        {
            key: "getTileAt",
            value: function getTileAt(worldX, worldY) {
                var gridX = Math.floor(worldX / TILE_SIZE);
                var gridY = Math.floor(worldY / TILE_SIZE);
                if (gridY < 0 || gridY >= this.currentLevel.length || gridX < 0 || gridX >= this.currentLevel[0].length) {
                    return TILE_TYPES.EMPTY;
                }
                return this.currentLevel[gridY][gridX];
            }
        },
        {
            key: "collectItemAt",
            value: function collectItemAt(worldX, worldY) {
                var gridX = Math.floor(worldX / TILE_SIZE);
                var gridY = Math.floor(worldY / TILE_SIZE);
                if (gridY < 0 || gridY >= this.currentLevel.length || gridX < 0 || gridX >= this.currentLevel[0].length) {
                    return;
                }
                if (this.currentLevel[gridY][gridX] === TILE_TYPES.COLLECTIBLE) {
                    this.currentLevel[gridY][gridX] = TILE_TYPES.EMPTY;
                    this.collectibles++;
                    // Play coin collection sound
                    this.coinSound.currentTime = 0;
                    this.coinSound.play().catch(function(err) {
                        return console.log('Audio play failed:', err);
                    });
                    var effect = {
                        x: gridX * TILE_SIZE + TILE_SIZE / 2,
                        y: gridY * TILE_SIZE + TILE_SIZE / 2,
                        alpha: 1,
                        particles: Array(6).fill().map(function() {
                            return {
                                x: (Math.random() - 0.5) * 20,
                                y: (Math.random() - 0.5) * 20,
                                speed: Math.random() * 3 + 2,
                                angle: Math.random() * Math.PI * 2,
                                size: Math.random() * 8 + 4
                            };
                        })
                    };
                    if (!this.collectibleEffects) {
                        this.collectibleEffects = [];
                    }
                    this.collectibleEffects.push(effect);
                }
            }
        },
        {
            key: "checkCollision",
            value: function checkCollision(x, y, width, height) {
                var left = Math.floor(x / TILE_SIZE);
                var right = Math.floor((x + width - 1) / TILE_SIZE);
                var top = Math.floor(y / TILE_SIZE);
                var bottom = Math.floor((y + height - 1) / TILE_SIZE);
                var tiles = [];
                for(var gridY = top; gridY <= bottom; gridY++){
                    for(var gridX = left; gridX <= right; gridX++){
                        if (gridY >= 0 && gridY < this.currentLevel.length && gridX >= 0 && gridX < this.currentLevel[0].length) {
                            var tile = this.currentLevel[gridY][gridX];
                            if (tile === TILE_TYPES.WALL || tile === TILE_TYPES.PLATFORM || tile === TILE_TYPES.PLATFORM_ICE || tile === TILE_TYPES.PLATFORM_MUD) {
                                tiles.push({
                                    type: tile,
                                    x: gridX * TILE_SIZE,
                                    y: gridY * TILE_SIZE,
                                    width: TILE_SIZE,
                                    height: TILE_SIZE
                                });
                            }
                        }
                    }
                }
                return tiles;
            }
        },
        {
            key: "update",
            value: function update(keys) {
                var _this = this;
                if (!this.isPlaying) return null;
                
                // Calculate delta time in seconds
                const currentTime = performance.now();
                const deltaTime = (currentTime - this.lastFrameTime) / 1000; // Convert to seconds
                this.lastFrameTime = currentTime;

                // Apply frame-rate independent movement
                let moveSpeed = MOVE_SPEED * deltaTime;
                let friction = Math.pow(0.8, deltaTime * 60); // Adjust friction for framerate

                // Update walkers with deltaTime
                for (const walker of this.walkers) {
                    walker.x += (walker.direction === 'right' ? walker.speed : -walker.speed) * deltaTime * 60;
                    // ...existing walker code...
                }

                // Apply movement with deltaTime
                if (keys.ArrowRight || keys.d) {
                    this.playerVelocity.x += moveSpeed * 0.1 * 60;
                    this.playerVelocity.x = Math.min(this.playerVelocity.x, MOVE_SPEED * deltaTime * 60);
                    this.playerFacing = 'right';
                } else if (keys.ArrowLeft || keys.a) {
                    this.playerVelocity.x -= moveSpeed * 0.1 * 60;
                    this.playerVelocity.x = Math.max(this.playerVelocity.x, -MOVE_SPEED * deltaTime * 60);
                    this.playerFacing = 'left';
                } else {
                    this.playerVelocity.x *= friction;
                }

                // Apply gravity with deltaTime
                this.playerVelocity.y = Math.min(this.playerVelocity.y + GRAVITY * deltaTime * 60, 900 * deltaTime);

                // Apply jump with deltaTime
                if ((keys.ArrowUp || keys.w || keys[' ']) && this.jumpAvailable) {
                    this.isJumping = true;
                    this.jumpAvailable = false;
                    this.playerVelocity.y = -JUMP_FORCE * deltaTime;
                    // ...existing jump sound code...
                }

                // Rest of the update logic
                // ...existing code...
            }
        }
    ]);
    return GameState;
}();
/**
 * Level Editor Component
 */ var LevelEditor = function(param) {
    var level = param.level, setLevel = param.setLevel, startGame = param.startGame, returnToMainMenu = param.returnToMainMenu;
    var _useState = _sliced_to_array(useState(TILE_TYPES.WALL), 2), selectedTile = _useState[0], setSelectedTile = _useState[1];
    var _useState1 = _sliced_to_array(useState(false), 2), isDrawing = _useState1[0], setIsDrawing = _useState1[1];
    var _useState2 = _sliced_to_array(useState(null), 2), selectionStart = _useState2[0], setSelectionStart = _useState2[1];
    var _useState3 = _sliced_to_array(useState(null), 2), selectionEnd = _useState3[0], setSelectionEnd = _useState3[1];
    var _useState4 = _sliced_to_array(useState(false), 2), isSelecting = _useState4[0], setIsSelecting = _useState4[1];
    var _useState5 = _sliced_to_array(useState(null), 2), selectedTiles = _useState5[0], setSelectedTiles = _useState5[1];
    var handleTilePlacement = function(rowIndex, colIndex) {
        if (selectedTiles) {
            // Paste selected tiles
            var newLevel = _to_consumable_array(level);
            for(var i = 0; i < selectedTiles.length; i++){
                for(var j = 0; j < selectedTiles[0].length; j++){
                    var targetRow = rowIndex + i;
                    var targetCol = colIndex + j;
                    if (targetRow < GRID_SIZE.HEIGHT && targetCol < GRID_SIZE.WIDTH) {
                        newLevel[targetRow][targetCol] = selectedTiles[i][j];
                    }
                }
            }
            setLevel(newLevel);
        } else {
            // Normal tile placement
            var newLevel1 = _to_consumable_array(level);
            newLevel1[rowIndex][colIndex] = selectedTile;
            setLevel(newLevel1);
        }
    };
    var getSelectionBounds = function() {
        if (!selectionStart || !selectionEnd) return null;
        var startRow = Math.min(selectionStart.row, selectionEnd.row);
        var endRow = Math.max(selectionStart.row, selectionEnd.row);
        var startCol = Math.min(selectionStart.col, selectionEnd.col);
        var endCol = Math.max(selectionStart.col, selectionEnd.col);
        return {
            startRow: startRow,
            endRow: endRow,
            startCol: startCol,
            endCol: endCol
        };
    };
    var copySelection = function() {
        var bounds = getSelectionBounds();
        if (!bounds) return;
        var startRow = bounds.startRow, endRow = bounds.endRow, startCol = bounds.startCol, endCol = bounds.endCol;
        var selection = [];
        for(var i = startRow; i <= endRow; i++){
            var row = [];
            for(var j = startCol; j <= endCol; j++){
                row.push(level[i][j]);
            }
            selection.push(row);
        }
        setSelectedTiles(selection);
        setSelectionStart(null);
        setSelectionEnd(null);
    };
    var handleMouseDown = function(rowIndex, colIndex, e) {
        if (e.ctrlKey || e.metaKey) {
            setIsSelecting(true);
            setSelectionStart({
                row: rowIndex,
                col: colIndex
            });
            setSelectionEnd({
                row: rowIndex,
                col: colIndex
            });
        } else {
            setIsDrawing(true);
            handleTilePlacement(rowIndex, colIndex);
        }
    };
    var handleMouseMove = function(rowIndex, colIndex) {
        if (isDrawing) {
            handleTilePlacement(rowIndex, colIndex);
        } else if (isSelecting) {
            setSelectionEnd({
                row: rowIndex,
                col: colIndex
            });
        }
    };
    var handleMouseUp = function() {
        if (isSelecting) {
            copySelection();
        }
        setIsDrawing(false);
        setIsSelecting(false);
    };
    useEffect(function() {
        var handleGlobalMouseUp = function() {
            setIsDrawing(false);
            setIsSelecting(false);
        };
        var handleKeyDown = function(e) {
            // Handle Escape to cancel selection
            if (e.key === 'Escape') {
                setSelectionStart(null);
                setSelectionEnd(null);
                setSelectedTiles(null);
            }
            // Handle Ctrl+V to clear selection after paste
            if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
                setSelectedTiles(null);
            }
        };
        window.addEventListener('mouseup', handleGlobalMouseUp);
        window.addEventListener('keydown', handleKeyDown);
        return function() {
            window.removeEventListener('mouseup', handleGlobalMouseUp);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
    var clearLevel = function() {
        var newLevel = Array(GRID_SIZE.HEIGHT).fill().map(function() {
            return Array(GRID_SIZE.WIDTH).fill(TILE_TYPES.EMPTY);
        });
        setLevel(newLevel);
    };
    var saveLevel = function() {
        var levelJson = JSON.stringify(level);
        localStorage.setItem('savedLevel', levelJson);
        alert('Level saved!');
    };
    var loadLevel = function() {
        var savedLevel = localStorage.getItem('savedLevel');
        if (savedLevel) {
            setLevel(JSON.parse(savedLevel));
            alert('Level loaded!');
        } else {
            alert('No saved level found.');
        }
    };
    var createBasicLevel = function() {
        var newLevel = Array(GRID_SIZE.HEIGHT).fill().map(function() {
            return Array(GRID_SIZE.WIDTH).fill(TILE_TYPES.EMPTY);
        });
        for(var x = 0; x < GRID_SIZE.WIDTH; x++){
            newLevel[GRID_SIZE.HEIGHT - 1][x] = TILE_TYPES.WALL;
        }
        for(var x1 = 3; x1 < 8; x1++){
            newLevel[8][x1] = TILE_TYPES.PLATFORM;
        }
        for(var x2 = 10; x2 < 14; x2++){
            newLevel[6][x2] = TILE_TYPES.PLATFORM;
        }
        newLevel[7][5] = TILE_TYPES.COLLECTIBLE;
        newLevel[5][12] = TILE_TYPES.COLLECTIBLE;
        newLevel[GRID_SIZE.HEIGHT - 2][GRID_SIZE.WIDTH - 2] = TILE_TYPES.COLLECTIBLE;
        newLevel[GRID_SIZE.HEIGHT - 2][1] = TILE_TYPES.PLAYER_START;
        newLevel[GRID_SIZE.HEIGHT - 2][GRID_SIZE.WIDTH - 2] = TILE_TYPES.EXIT;
        setLevel(newLevel);
    };
    return /*#__PURE__*/ _jsxDEV("div", {
        style: {
            padding: '10px',
            width: '100%',
            margin: '0',
            background: 'linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)',
            height: '100vh',
            color: 'white',
            display: 'flex',
            gap: '20px',
            border: '3px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '8px',
            boxSizing: 'border-box',
            overflow: 'hidden'
        },
        children: [
            /*#__PURE__*/ _jsxDEV("button", {
                onClick: returnToMainMenu,
                style: {
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    padding: '10px 15px',
                    fontSize: '14px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    zIndex: 1000
                },
                children: "Back to Main Menu"
            }, void 0, false, {
                fileName: "main.js",
                lineNumber: 711,
                columnNumber: 7
            }, _this),
            /*#__PURE__*/ _jsxDEV("div", {
                style: {
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    minWidth: '200px',
                    maxWidth: '250px',
                    height: 'fit-content',
                    padding: '15px',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    borderRadius: '10px',
                    marginTop: '50px'
                },
                children: [
                    /*#__PURE__*/ _jsxDEV("div", {
                        style: {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px'
                        },
                        children: [
                            /*#__PURE__*/ _jsxDEV("div", {
                                style: {
                                    border: '2px solid #666',
                                    borderRadius: '5px',
                                    padding: '8px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                                },
                                children: [
                                    /*#__PURE__*/ _jsxDEV("label", {
                                        style: {
                                            color: 'white',
                                            marginBottom: '5px',
                                            display: 'block',
                                            fontSize: '12px',
                                            fontWeight: 'bold'
                                        },
                                        children: "Platform Type:"
                                    }, void 0, false, {
                                        fileName: "main.js",
                                        lineNumber: 750,
                                        columnNumber: 13
                                    }, _this),
                                    /*#__PURE__*/ _jsxDEV("div", {
                                        style: {
                                            display: 'flex',
                                            gap: '5px'
                                        },
                                        children: [
                                            /*#__PURE__*/ _jsxDEV("button", {
                                                style: {
                                                    backgroundColor: selectedTile === TILE_TYPES.PLATFORM ? '#aaffaa' : TILE_COLORS[TILE_TYPES.PLATFORM],
                                                    flex: 1,
                                                    height: '40px',
                                                    border: '2px solid black',
                                                    borderRadius: '5px',
                                                    cursor: 'pointer',
                                                    fontSize: '10px',
                                                    fontWeight: 'bold',
                                                    color: '#000',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    textTransform: 'uppercase'
                                                },
                                                onClick: function() {
                                                    return setSelectedTile(TILE_TYPES.PLATFORM);
                                                },
                                                title: "Normal Platform",
                                                children: "Normal"
                                            }, void 0, false, {
                                                fileName: "main.js",
                                                lineNumber: 760,
                                                columnNumber: 15
                                            }, _this),
                                            /*#__PURE__*/ _jsxDEV("button", {
                                                style: {
                                                    backgroundColor: selectedTile === TILE_TYPES.PLATFORM_ICE ? '#aaffaa' : TILE_COLORS[TILE_TYPES.PLATFORM_ICE],
                                                    flex: 1,
                                                    height: '40px',
                                                    border: '2px solid black',
                                                    borderRadius: '5px',
                                                    cursor: 'pointer',
                                                    fontSize: '10px',
                                                    fontWeight: 'bold',
                                                    color: '#000',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    textTransform: 'uppercase'
                                                },
                                                onClick: function() {
                                                    return setSelectedTile(TILE_TYPES.PLATFORM_ICE);
                                                },
                                                title: "Ice Platform",
                                                children: "Ice"
                                            }, void 0, false, {
                                                fileName: "main.js",
                                                lineNumber: 781,
                                                columnNumber: 15
                                            }, _this),
                                            /*#__PURE__*/ _jsxDEV("button", {
                                                style: {
                                                    backgroundColor: selectedTile === TILE_TYPES.PLATFORM_MUD ? '#aaffaa' : TILE_COLORS[TILE_TYPES.PLATFORM_MUD],
                                                    flex: 1,
                                                    height: '40px',
                                                    border: '2px solid black',
                                                    borderRadius: '5px',
                                                    cursor: 'pointer',
                                                    fontSize: '10px',
                                                    fontWeight: 'bold',
                                                    color: '#fff',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    textTransform: 'uppercase'
                                                },
                                                onClick: function() {
                                                    return setSelectedTile(TILE_TYPES.PLATFORM_MUD);
                                                },
                                                title: "Mud Platform",
                                                children: "Mud"
                                            }, void 0, false, {
                                                fileName: "main.js",
                                                lineNumber: 802,
                                                columnNumber: 15
                                            }, _this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "main.js",
                                        lineNumber: 759,
                                        columnNumber: 13
                                    }, _this)
                                ]
                            }, void 0, true, {
                                fileName: "main.js",
                                lineNumber: 744,
                                columnNumber: 11
                            }, _this),
                            /*#__PURE__*/ _jsxDEV("div", {
                                style: {
                                    border: '2px solid #666',
                                    borderRadius: '5px',
                                    padding: '8px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    marginBottom: '10px'
                                },
                                children: [
                                    /*#__PURE__*/ _jsxDEV("label", {
                                        style: {
                                            color: 'white',
                                            marginBottom: '5px',
                                            display: 'block',
                                            fontSize: '12px',
                                            fontWeight: 'bold'
                                        },
                                        children: "Level Elements:"
                                    }, void 0, false, {
                                        fileName: "main.js",
                                        lineNumber: 834,
                                        columnNumber: 13
                                    }, _this),
                                    /*#__PURE__*/ _jsxDEV("div", {
                                        style: {
                                            display: 'flex',
                                            gap: '5px',
                                            flexWrap: 'wrap'
                                        },
                                        children: [
                                            /*#__PURE__*/ _jsxDEV("button", {
                                                style: {
                                                    backgroundColor: selectedTile === TILE_TYPES.PLAYER_START ? '#aaffaa' : TILE_COLORS[TILE_TYPES.PLAYER_START],
                                                    flex: '1 1 30%',
                                                    height: '40px',
                                                    border: '2px solid black',
                                                    borderRadius: '5px',
                                                    cursor: 'pointer',
                                                    fontSize: '10px',
                                                    fontWeight: 'bold',
                                                    color: '#000',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    textTransform: 'uppercase'
                                                },
                                                onClick: function() {
                                                    return setSelectedTile(TILE_TYPES.PLAYER_START);
                                                },
                                                children: "Start"
                                            }, void 0, false, {
                                                fileName: "main.js",
                                                lineNumber: 844,
                                                columnNumber: 15
                                            }, _this),
                                            /*#__PURE__*/ _jsxDEV("button", {
                                                style: {
                                                    backgroundColor: selectedTile === TILE_TYPES.EXIT ? '#aaffaa' : TILE_COLORS[TILE_TYPES.EXIT],
                                                    flex: '1 1 30%',
                                                    height: '40px',
                                                    border: '2px solid black',
                                                    borderRadius: '5px',
                                                    cursor: 'pointer',
                                                    fontSize: '10px',
                                                    fontWeight: 'bold',
                                                    color: '#000',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    textTransform: 'uppercase'
                                                },
                                                onClick: function() {
                                                    return setSelectedTile(TILE_TYPES.EXIT);
                                                },
                                                children: "Exit"
                                            }, void 0, false, {
                                                fileName: "main.js",
                                                lineNumber: 864,
                                                columnNumber: 15
                                            }, _this),
                                            /*#__PURE__*/ _jsxDEV("button", {
                                                style: {
                                                    backgroundColor: selectedTile === TILE_TYPES.COLLECTIBLE ? '#aaffaa' : TILE_COLORS[TILE_TYPES.COLLECTIBLE],
                                                    flex: '1 1 30%',
                                                    height: '40px',
                                                    border: '2px solid black',
                                                    borderRadius: '5px',
                                                    cursor: 'pointer',
                                                    fontSize: '10px',
                                                    fontWeight: 'bold',
                                                    color: '#000',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    textTransform: 'uppercase'
                                                },
                                                onClick: function() {
                                                    return setSelectedTile(TILE_TYPES.COLLECTIBLE);
                                                },
                                                children: "Coin"
                                            }, void 0, false, {
                                                fileName: "main.js",
                                                lineNumber: 884,
                                                columnNumber: 15
                                            }, _this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "main.js",
                                        lineNumber: 843,
                                        columnNumber: 13
                                    }, _this)
                                ]
                            }, void 0, true, {
                                fileName: "main.js",
                                lineNumber: 827,
                                columnNumber: 11
                            }, _this),
                            /*#__PURE__*/ _jsxDEV("div", {
                                style: {
                                    border: '2px solid #666',
                                    borderRadius: '5px',
                                    padding: '8px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    marginBottom: '10px'
                                },
                                children: [
                                    /*#__PURE__*/ _jsxDEV("label", {
                                        style: {
                                            color: 'white',
                                            marginBottom: '5px',
                                            display: 'block',
                                            fontSize: '12px',
                                            fontWeight: 'bold'
                                        },
                                        children: "Hazards:"
                                    }, void 0, false, {
                                        fileName: "main.js",
                                        lineNumber: 914,
                                        columnNumber: 13
                                    }, _this),
                                    /*#__PURE__*/ _jsxDEV("div", {
                                        style: {
                                            display: 'flex',
                                            gap: '5px',
                                            flexWrap: 'wrap'
                                        },
                                        children: [
                                            /*#__PURE__*/ _jsxDEV("button", {
                                                style: {
                                                    backgroundColor: selectedTile === TILE_TYPES.SPIKE ? '#aaffaa' : TILE_COLORS[TILE_TYPES.SPIKE],
                                                    flex: '1 1 30%',
                                                    height: '40px',
                                                    border: '2px solid black',
                                                    borderRadius: '5px',
                                                    cursor: 'pointer',
                                                    fontSize: '10px',
                                                    fontWeight: 'bold',
                                                    color: '#fff',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    textTransform: 'uppercase'
                                                },
                                                onClick: function() {
                                                    return setSelectedTile(TILE_TYPES.SPIKE);
                                                },
                                                title: "Spike",
                                                children: "Spike"
                                            }, void 0, false, {
                                                fileName: "main.js",
                                                lineNumber: 924,
                                                columnNumber: 15
                                            }, _this),
                                            /*#__PURE__*/ _jsxDEV("button", {
                                                style: {
                                                    backgroundColor: selectedTile === TILE_TYPES.HAMMER ? '#aaffaa' : TILE_COLORS[TILE_TYPES.HAMMER],
                                                    flex: '1 1 30%',
                                                    height: '40px',
                                                    border: '2px solid black',
                                                    borderRadius: '5px',
                                                    cursor: 'pointer',
                                                    fontSize: '10px',
                                                    fontWeight: 'bold',
                                                    color: '#fff',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    textTransform: 'uppercase'
                                                },
                                                onClick: function() {
                                                    return setSelectedTile(TILE_TYPES.HAMMER);
                                                },
                                                title: "Hammer",
                                                children: "Hammer"
                                            }, void 0, false, {
                                                fileName: "main.js",
                                                lineNumber: 945,
                                                columnNumber: 15
                                            }, _this),
                                            /*#__PURE__*/ _jsxDEV("button", {
                                                style: {
                                                    backgroundColor: selectedTile === TILE_TYPES.WALKER ? '#aaffaa' : TILE_COLORS[TILE_TYPES.WALKER],
                                                    flex: '1 1 30%',
                                                    height: '40px',
                                                    border: '2px solid black',
                                                    borderRadius: '5px',
                                                    cursor: 'pointer',
                                                    fontSize: '10px',
                                                    fontWeight: 'bold',
                                                    color: '#fff',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    textTransform: 'uppercase'
                                                },
                                                onClick: function() {
                                                    return setSelectedTile(TILE_TYPES.WALKER);
                                                },
                                                title: "Walker",
                                                children: "Walker"
                                            }, void 0, false, {
                                                fileName: "main.js",
                                                lineNumber: 966,
                                                columnNumber: 15
                                            }, _this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "main.js",
                                        lineNumber: 923,
                                        columnNumber: 13
                                    }, _this)
                                ]
                            }, void 0, true, {
                                fileName: "main.js",
                                lineNumber: 907,
                                columnNumber: 11
                            }, _this),
                            /*#__PURE__*/ _jsxDEV("div", {
                                style: {
                                    border: '2px solid #666',
                                    borderRadius: '5px',
                                    padding: '8px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    marginBottom: '10px'
                                },
                                children: [
                                    /*#__PURE__*/ _jsxDEV("label", {
                                        style: {
                                            color: 'white',
                                            marginBottom: '5px',
                                            display: 'block',
                                            fontSize: '12px',
                                            fontWeight: 'bold'
                                        },
                                        children: "Clear Options:"
                                    }, void 0, false, {
                                        fileName: "main.js",
                                        lineNumber: 998,
                                        columnNumber: 13
                                    }, _this),
                                    /*#__PURE__*/ _jsxDEV("div", {
                                        style: {
                                            display: 'flex',
                                            gap: '5px',
                                            flexDirection: 'row'
                                        },
                                        children: [
                                            /*#__PURE__*/ _jsxDEV("button", {
                                                onClick: function() {
                                                    return setSelectedTile(TILE_TYPES.EMPTY);
                                                },
                                                style: {
                                                    backgroundColor: selectedTile === TILE_TYPES.EMPTY ? '#aaffaa' : TILE_COLORS[TILE_TYPES.EMPTY] || '#eee',
                                                    flex: 1,
                                                    height: '30px',
                                                    border: '2px solid black',
                                                    color: 'black',
                                                    fontWeight: 'bold',
                                                    cursor: 'pointer',
                                                    borderRadius: '5px',
                                                    fontSize: '10px'
                                                },
                                                children: "EMPTY"
                                            }, void 0, false, {
                                                fileName: "main.js",
                                                lineNumber: 1008,
                                                columnNumber: 15
                                            }, _this),
                                            /*#__PURE__*/ _jsxDEV("button", {
                                                onClick: clearLevel,
                                                style: {
                                                    backgroundColor: '#ff4444',
                                                    flex: 1,
                                                    height: '30px',
                                                    color: 'white',
                                                    fontWeight: 'bold',
                                                    fontSize: '10px',
                                                    cursor: 'pointer',
                                                    borderRadius: '5px',
                                                    border: '2px solid #cc0000',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '1px'
                                                },
                                                children: "Clear All"
                                            }, void 0, false, {
                                                fileName: "main.js",
                                                lineNumber: 1024,
                                                columnNumber: 15
                                            }, _this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "main.js",
                                        lineNumber: 1007,
                                        columnNumber: 13
                                    }, _this)
                                ]
                            }, void 0, true, {
                                fileName: "main.js",
                                lineNumber: 991,
                                columnNumber: 11
                            }, _this),
                            Object.entries(TILE_TYPES).filter(function(param) {
                                var _param = _sliced_to_array(param, 1), name = _param[0];
                                return !name.includes('PLATFORM') && name !== 'PLAYER_START' && name !== 'EXIT' && name !== 'SPIKE' && name !== 'HAMMER' && name !== 'WALL' && name !== 'EMPTY' && name !== 'COLLECTIBLE' && name !== 'WALKER';
                            }).map(function(param) {
                                var _param = _sliced_to_array(param, 2), name = _param[0], value = _param[1];
                                return /*#__PURE__*/ _jsxDEV("button", {
                                    style: {
                                        backgroundColor: selectedTile === value ? '#aaffaa' : TILE_COLORS[value] || '#eee',
                                        width: '100%',
                                        height: '40px',
                                        border: '2px solid black',
                                        color: value === TILE_TYPES.WALL ? 'white' : 'black',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        borderRadius: '5px',
                                        fontSize: '12px'
                                    },
                                    onClick: function() {
                                        return setSelectedTile(value);
                                    },
                                    children: name.replace('TILE_TYPES.', '')
                                }, name, false, {
                                    fileName: "main.js",
                                    lineNumber: 1056,
                                    columnNumber: 15
                                }, _this);
                            })
                        ]
                    }, void 0, true, {
                        fileName: "main.js",
                        lineNumber: 742,
                        columnNumber: 9
                    }, _this),
                    /*#__PURE__*/ _jsxDEV("div", {
                        style: {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                            marginBottom: '5px'
                        },
                        children: [
                            /*#__PURE__*/ _jsxDEV("button", {
                                onClick: function() {
                                    // Load all original levels into localStorage
                                    ORIGINS_LEVELS.forEach(function(levelData, index) {
                                        var levelId = index + 1;
                                        var levelName = "Origins Level ".concat(levelId);
                                        var levelOrder = levelId;
                                        localStorage.setItem("levelName_".concat(levelId), levelName);
                                        localStorage.setItem("levelOrder_".concat(levelId), levelOrder);
                                        localStorage.setItem("level_".concat(levelId), JSON.stringify(levelData));
                                    });
                                    alert('Original game levels have been loaded into storage!');
                                    // Refresh the select dropdown
                                    document.getElementById('levelSelect').dispatchEvent(new Event('change', {
                                        bubbles: true
                                    }));
                                },
                                style: {
                                    padding: '10px 15px',
                                    backgroundColor: '#9C27B0',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    fontSize: '14px',
                                    marginTop: '10px',
                                    marginBottom: '10px'
                                },
                                children: "Load Original Game Levels"
                            }, void 0, false, {
                                fileName: "main.js",
                                lineNumber: 1077,
                                columnNumber: 11
                            }, _this),
                            /*#__PURE__*/ _jsxDEV("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px'
                                },
                                children: [
                                    /*#__PURE__*/ _jsxDEV("select", {
                                        id: "levelSelect",
                                        style: {
                                            padding: '10px',
                                            borderRadius: '5px',
                                            border: '1px solid #ccc',
                                            marginRight: '5px',
                                            minWidth: '150px'
                                        },
                                        onChange: function(e) {
                                            var levelId = e.target.value;
                                            if (levelId) {
                                                var savedLevel = localStorage.getItem("level_".concat(levelId));
                                                var savedName = localStorage.getItem("levelName_".concat(levelId));
                                                var savedOrder = localStorage.getItem("levelOrder_".concat(levelId));
                                                if (savedLevel) {
                                                    setLevel(JSON.parse(savedLevel));
                                                    document.getElementById('levelName').value = savedName || '';
                                                    document.getElementById('levelOrder').value = savedOrder || '';
                                                }
                                            } else {
                                                // Create New Level selected
                                                setLevel(Array(GRID_SIZE.HEIGHT).fill().map(function() {
                                                    return Array(GRID_SIZE.WIDTH).fill(TILE_TYPES.EMPTY);
                                                }));
                                                document.getElementById('levelName').value = '';
                                                document.getElementById('levelOrder').value = '';
                                            }
                                        },
                                        children: [
                                            /*#__PURE__*/ _jsxDEV("option", {
                                                value: "",
                                                children: "Create New Level..."
                                            }, void 0, false, {
                                                fileName: "main.js",
                                                lineNumber: 1141,
                                                columnNumber: 15
                                            }, _this),
                                            function() {
                                                var levels = [];
                                                for(var i = 1; i <= 10; i++){
                                                    var levelName = localStorage.getItem("levelName_".concat(i));
                                                    var levelOrder = localStorage.getItem("levelOrder_".concat(i));
                                                    var levelData = localStorage.getItem("level_".concat(i));
                                                    if (levelName) {
                                                        levels.push({
                                                            id: i,
                                                            name: levelName,
                                                            order: levelOrder ? parseInt(levelOrder) : i
                                                        });
                                                    }
                                                }
                                                levels.sort(function(a, b) {
                                                    return a.order - b.order;
                                                });
                                                return levels.map(function(level) {
                                                    return /*#__PURE__*/ _jsxDEV("option", {
                                                        value: level.id,
                                                        children: "Edit Level: ".concat(level.order, ". ").concat(level.name)
                                                    }, level.id, false, {
                                                        fileName: "main.js",
                                                        lineNumber: 1159,
                                                        columnNumber: 19
                                                    }, _this);
                                                });
                                            }()
                                        ]
                                    }, void 0, true, {
                                        fileName: "main.js",
                                        lineNumber: 1112,
                                        columnNumber: 13
                                    }, _this),
                                    /*#__PURE__*/ _jsxDEV("input", {
                                        type: "number",
                                        id: "levelOrder",
                                        min: "1",
                                        max: "99",
                                        placeholder: "Order",
                                        style: {
                                            padding: '10px',
                                            width: '70px',
                                            borderRadius: '5px',
                                            border: '1px solid #ccc'
                                        }
                                    }, void 0, false, {
                                        fileName: "main.js",
                                        lineNumber: 1165,
                                        columnNumber: 13
                                    }, _this)
                                ]
                            }, void 0, true, {
                                fileName: "main.js",
                                lineNumber: 1111,
                                columnNumber: 11
                            }, _this),
                            /*#__PURE__*/ _jsxDEV("input", {
                                type: "text",
                                id: "levelName",
                                placeholder: "Level name...",
                                style: {
                                    padding: '10px',
                                    borderRadius: '5px',
                                    border: '1px solid #ccc',
                                    marginRight: '5px'
                                }
                            }, void 0, false, {
                                fileName: "main.js",
                                lineNumber: 1179,
                                columnNumber: 11
                            }, _this),
                            /*#__PURE__*/ _jsxDEV("button", {
                                onClick: function() {
                                    var levelName = document.getElementById('levelName').value;
                                    var levelOrder = document.getElementById('levelOrder').value;
                                    var selectedLevel = document.getElementById('levelSelect').value;
                                    if (!levelName) {
                                        alert('Please enter a level name');
                                        return;
                                    }
                                    var saveLevelData = function(id) {
                                        localStorage.setItem("levelName_".concat(id), levelName);
                                        localStorage.setItem("level_".concat(id), JSON.stringify(level));
                                        localStorage.setItem("levelOrder_".concat(id), levelOrder || id);
                                        console.log("Level ".concat(id, " saved: ").concat(levelName));
                                    };
                                    if (selectedLevel) {
                                        // Update existing level
                                        saveLevelData(selectedLevel);
                                    } else {
                                        // Create new level
                                        for(var i = 1; i <= 10; i++){
                                            if (!localStorage.getItem("levelName_".concat(i))) {
                                                saveLevelData(i);
                                                document.getElementById('levelSelect').value = i;
                                                break;
                                            }
                                            if (i === 10) {
                                                alert('All slots are full. Delete a level first.');
                                                return;
                                            }
                                        }
                                    }
                                    // Refresh the select dropdown
                                    document.getElementById('levelSelect').dispatchEvent(new Event('change', {
                                        bubbles: true
                                    }));
                                    console.log("Level ".concat(selectedLevel ? 'updated' : 'created', ": ").concat(levelName));
                                    alert(selectedLevel ? 'Level updated!' : 'Level created!');
                                },
                                style: {
                                    padding: '10px 15px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    borderRadius: '5px'
                                },
                                children: "Save Level"
                            }, void 0, false, {
                                fileName: "main.js",
                                lineNumber: 1190,
                                columnNumber: 11
                            }, _this),
                            /*#__PURE__*/ _jsxDEV("button", {
                                onClick: function() {
                                    var select = document.getElementById('levelSelect');
                                    var value = select.value;
                                    if (!value) return;
                                    localStorage.removeItem("levelName_".concat(value));
                                    localStorage.removeItem("level_".concat(value));
                                    localStorage.removeItem("levelOrder_".concat(value));
                                    select.value = '';
                                    document.getElementById('levelOrder').value = '';
                                    select.dispatchEvent(new Event('change', {
                                        bubbles: true
                                    }));
                                },
                                style: {
                                    padding: '10px 15px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    borderRadius: '5px'
                                },
                                children: "Delete Level"
                            }, void 0, false, {
                                fileName: "main.js",
                                lineNumber: 1237,
                                columnNumber: 11
                            }, _this),
                            /*#__PURE__*/ _jsxDEV("button", {
                                onClick: startGame,
                                className: "game-button",
                                style: {
                                    padding: '15px 30px',
                                    fontSize: '18px',
                                    backgroundColor: '#4CAF50',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '15px',
                                    cursor: 'pointer',
                                    margin: '10px',
                                    fontWeight: 'bold',
                                    letterSpacing: '2px',
                                    textTransform: 'uppercase'
                                },
                                children: "Play Level"
                            }, void 0, false, {
                                fileName: "main.js",
                                lineNumber: 1255,
                                columnNumber: 11
                            }, _this)
                        ]
                    }, void 0, true, {
                        fileName: "main.js",
                        lineNumber: 1076,
                        columnNumber: 9
                    }, _this)
                ]
            }, void 0, true, {
                fileName: "main.js",
                lineNumber: 730,
                columnNumber: 7
            }, _this),
            /*#__PURE__*/ _jsxDEV("div", {
                style: {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flex: 1,
                    padding: '0',
                    height: '100%',
                    overflow: 'auto'
                },
                children: [
                    /*#__PURE__*/ _jsxDEV("div", {
                        style: {
                            display: 'grid',
                            gridTemplateColumns: "repeat(".concat(GRID_SIZE.WIDTH, ", ").concat(TILE_SIZE, "px)"),
                            gridTemplateRows: "repeat(".concat(GRID_SIZE.HEIGHT, ", ").concat(TILE_SIZE, "px)"),
                            gap: '1px',
                            backgroundColor: '#ccc',
                            border: '3px solid #333',
                            transform: 'scale(0.8)',
                            transformOrigin: 'top center',
                            margin: '10px auto 0',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                            position: 'relative',
                            zIndex: 1
                        },
                        children: level.map(function(row, rowIndex) {
                            return row.map(function(tile, colIndex) {
                                return /*#__PURE__*/ _jsxDEV("div", {
                                    style: {
                                        width: "".concat(TILE_SIZE, "px"),
                                        height: "".concat(TILE_SIZE, "px"),
                                        backgroundColor: TILE_COLORS[tile],
                                        border: '1px solid #888',
                                        cursor: 'pointer',
                                        minWidth: "".concat(TILE_SIZE, "px"),
                                        minHeight: "".concat(TILE_SIZE, "px"),
                                        boxSizing: 'border-box',
                                        userSelect: 'none',
                                        position: 'relative',
                                        outline: getSelectionBounds() && rowIndex >= getSelectionBounds().startRow && rowIndex <= getSelectionBounds().endRow && colIndex >= getSelectionBounds().startCol && colIndex <= getSelectionBounds().endCol ? '2px solid rgba(0, 255, 255, 0.7)' : 'none',
                                        boxShadow: getSelectionBounds() && rowIndex >= getSelectionBounds().startRow && rowIndex <= getSelectionBounds().endRow && colIndex >= getSelectionBounds().startCol && colIndex <= getSelectionBounds().endCol ? 'inset 0 0 15px rgba(0, 255, 255, 0.3)' : 'none'
                                    },
                                    onMouseDown: function(e) {
                                        return handleMouseDown(rowIndex, colIndex, e);
                                    },
                                    onMouseMove: function() {
                                        return handleMouseMove(rowIndex, colIndex);
                                    },
                                    onMouseUp: handleMouseUp,
                                    onDragStart: function(e) {
                                        return e.preventDefault();
                                    }
                                }, "".concat(rowIndex, "-").concat(colIndex), false, {
                                    fileName: "main.js",
                                    lineNumber: 1305,
                                    columnNumber: 15
                                }, _this);
                            });
                        })
                    }, void 0, false, {
                        fileName: "main.js",
                        lineNumber: 1286,
                        columnNumber: 9
                    }, _this),
                    /*#__PURE__*/ _jsxDEV("div", {
                        style: {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                            alignItems: 'center',
                            width: '100%',
                            padding: '10px 20px',
                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                            borderRadius: '10px',
                            marginTop: '0',
                            marginBottom: '10px',
                            position: 'relative',
                            zIndex: 2
                        },
                        children: [
                            /*#__PURE__*/ _jsxDEV("div", {
                                style: {
                                    display: 'flex',
                                    gap: '10px',
                                    width: '100%',
                                    maxWidth: '800px',
                                    alignItems: 'center'
                                },
                                children: [
                                    /*#__PURE__*/ _jsxDEV("textarea", {
                                        readOnly: true,
                                        value: JSON.stringify(level),
                                        style: {
                                            flex: 1,
                                            padding: '10px',
                                            borderRadius: '5px',
                                            border: '1px solid #ccc',
                                            backgroundColor: '#f5f5f5',
                                            fontFamily: 'monospace',
                                            fontSize: '12px',
                                            height: '100px',
                                            resize: 'vertical'
                                        }
                                    }, void 0, false, {
                                        fileName: "main.js",
                                        lineNumber: 1362,
                                        columnNumber: 13
                                    }, _this),
                                    /*#__PURE__*/ _jsxDEV("button", {
                                        onClick: function() {
                                            navigator.clipboard.writeText(JSON.stringify(level)).then(function() {
                                                alert('Level array copied to clipboard!');
                                            }).catch(function(err) {
                                                console.error('Failed to copy:', err);
                                                alert('Failed to copy level array. See console for details.');
                                            });
                                        },
                                        style: {
                                            padding: '10px 20px',
                                            backgroundColor: '#4CAF50',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                            fontWeight: 'bold',
                                            height: '40px',
                                            whiteSpace: 'nowrap'
                                        },
                                        children: "Copy Array"
                                    }, void 0, false, {
                                        fileName: "main.js",
                                        lineNumber: 1377,
                                        columnNumber: 13
                                    }, _this)
                                ]
                            }, void 0, true, {
                                fileName: "main.js",
                                lineNumber: 1355,
                                columnNumber: 11
                            }, _this),
                            /*#__PURE__*/ _jsxDEV("div", {
                                style: {
                                    display: 'flex',
                                    gap: '10px',
                                    justifyContent: 'center',
                                    width: '100%'
                                },
                                children: /*#__PURE__*/ _jsxDEV("button", {
                                    onClick: function(e) {
                                        e.preventDefault();
                                        var textarea = document.querySelector('textarea');
                                        var levels = [];
                                        // Collect all levels from localStorage
                                        for(var i = 1; i <= 10; i++){
                                            var levelName = localStorage.getItem("levelName_".concat(i));
                                            var levelOrder = localStorage.getItem("levelOrder_".concat(i));
                                            var levelData = localStorage.getItem("level_".concat(i));
                                            if (levelName && levelData) {
                                                levels.push({
                                                    id: i,
                                                    name: levelName,
                                                    order: parseInt(levelOrder) || i,
                                                    data: JSON.parse(levelData)
                                                });
                                            }
                                        }
                                        if (levels.length === 0) {
                                            textarea.value = 'No levels found in storage.';
                                            return;
                                        }
                                        // Sort levels and create CSV format
                                        levels.sort(function(a, b) {
                                            return a.order - b.order;
                                        });
                                        var output = 'ID,Name,Order,Data\n';
                                        levels.forEach(function(level) {
                                            var escapedName = level.name.includes(',') ? '"'.concat(level.name, '"') : level.name;
                                            var levelDataStr = JSON.stringify(level.data);
                                            output += "".concat(level.id, ",").concat(escapedName, ",").concat(level.order, ",").concat(levelDataStr, "\n");
                                        });
                                        output += "\nTotal levels: ".concat(levels.length);
                                        textarea.value = output;
                                    },
                                    style: {
                                        padding: '10px 20px',
                                        fontSize: '14px',
                                        backgroundColor: '#FF9800',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        fontWeight: 'bold',
                                        letterSpacing: '1px'
                                    },
                                    children: "Print all Levels"
                                }, void 0, false, {
                                    fileName: "main.js",
                                    lineNumber: 1409,
                                    columnNumber: 11
                                }, _this)
                            }, void 0, false, {
                                fileName: "main.js",
                                lineNumber: 1403,
                                columnNumber: 11
                            }, _this)
                        ]
                    }, void 0, true, {
                        fileName: "main.js",
                        lineNumber: 1341,
                        columnNumber: 9
                    }, _this)
                ]
            }, void 0, true, {
                fileName: "main.js",
                lineNumber: 1277,
                columnNumber: 7
            }, _this)
        ]
    }, void 0, true, {
        fileName: "main.js",
        lineNumber: 697,
        columnNumber: 5
    }, _this);
};
/**
 * Game Canvas Component
 */ var GameCanvas = function(param) {
    var level = param.level, gameState = param.gameState, returnToEditor = param.returnToEditor, setLevel = param.setLevel, setCurrentScreen = param.setCurrentScreen, isEditing = param.isEditing;
    var canvasRef = useRef(null);
    var keysRef = useRef({});
    var _useState = _sliced_to_array(useState(function() {
        return Array.from({
            length: 8
        }, function() {
            return {
                x: Math.random() * (GRID_SIZE.WIDTH * TILE_SIZE),
                y: Math.random() * (GRID_SIZE.HEIGHT * TILE_SIZE) * 0.6,
                speed: 0.2 + Math.random() * 0.3,
                size: 40 + Math.random() * 40,
                opacity: 0.4 + Math.random() * 0.3
            };
        });
    }), 1), clouds = _useState[0];
    var _useState1 = _sliced_to_array(useState(null), 2), gameStatus = _useState1[0], setGameStatus = _useState1[1];
    var _useState2 = _sliced_to_array(useState(false), 2), deathSoundPlayed = _useState2[0], setDeathSoundPlayed = _useState2[1];
    var _useState3 = _sliced_to_array(useState({}), 2), gamepads = _useState3[0], setGamepads = _useState3[1];
    var _useState4 = _sliced_to_array(useState(false), 2), fadeIn = _useState4[0], setFadeIn = _useState4[1];
    var _useState5 = _sliced_to_array(useState(''), 2), currentLevelName = _useState5[0], setCurrentLevelName = _useState5[1];
    var loadNextLevel = useCallback(function() {
        if (!isEditing) {
            if (!gameState.customLevels) {
                // Handle Origins levels
                if (gameState.currentLevelIndex < ORIGINS_LEVELS.length - 1) {
                    gameState.currentLevelIndex++;
                    setLevel(ORIGINS_LEVELS[gameState.currentLevelIndex]);
                    gameState.initializeLevel(ORIGINS_LEVELS[gameState.currentLevelIndex]);
                    setGameStatus(null);
                    setCurrentLevelName("Level ".concat(gameState.currentLevelIndex + 1));
                    return true;
                } else {
                    // All original levels completed
                    gameState.isPlaying = false;
                    setTimeout(function() {
                        setCurrentScreen('end');
                    }, 1000);
                    return false;
                }
            } else if (gameState.customLevels && gameState.currentLevelIndex < gameState.customLevels.length - 1) {
                // Handle custom levels progression
                gameState.currentLevelIndex++;
                var nextLevel = gameState.customLevels[gameState.currentLevelIndex];
                console.log('Loading next custom level:', nextLevel.name);
                console.log('Level data:', nextLevel.data);
                // Ensure we're using the latest data from localStorage
                var latestLevelData = localStorage.getItem("level_".concat(nextLevel.id));
                var parsedData = latestLevelData ? JSON.parse(latestLevelData) : nextLevel.data;
                setLevel(parsedData);
                gameState.initializeLevel(parsedData);
                setGameStatus(null);
                setCurrentLevelName(nextLevel.name);
                return true;
            }
        }
        return false;
    }, [
        level,
        setLevel,
        gameState
    ]);
    var handleGameStatus = useCallback(function() {
        if (gameStatus === 'game_complete') {
            setCurrentScreen('end');
        } else if (gameStatus === 'level_complete' && !isEditing) {
            loadNextLevel();
        } else {
            // Clear all current key states
            Object.keys(keysRef.current).forEach(function(key) {
                keysRef.current[key] = false;
            });
            // Reset the game state after a short delay
            setTimeout(function() {
                gameState.initializeLevel(level);
                gameState.isPlaying = true;
                setGameStatus(null);
                setFadeIn(false);
            }, 300);
        }
    }, [
        gameStatus,
        level,
        loadNextLevel,
        setCurrentScreen,
        gameState,
        isEditing
    ]);
    var handleKeyDown = useCallback(function(e) {
        if ([
            'ArrowUp',
            'ArrowDown',
            'ArrowLeft',
            'ArrowRight',
            ' ',
            'w',
            'a',
            's',
            'd'
        ].includes(e.key)) {
            e.preventDefault();
        }
        if (gameStatus) {
            // Only handle non-movement keys for game status
            if (![
                'ArrowUp',
                'ArrowDown',
                'ArrowLeft',
                'ArrowRight',
                'w',
                'a',
                's',
                'd'
            ].includes(e.key)) {
                handleGameStatus();
            }
            return;
        }
        if (gameState.isPlaying) {
            keysRef.current[e.key] = true;
        }
    }, [
        gameStatus,
        gameState.isPlaying,
        handleGameStatus
    ]);
    var handleKeyUp = useCallback(function(e) {
        keysRef.current[e.key] = false;
    }, []);
    useEffect(function() {
        var handleGamepadConnected = function(e) {
            setGamepads(function(prev) {
                return _object_spread_props(_object_spread({}, prev), _define_property({}, e.gamepad.index, e.gamepad));
            });
        };
        var handleGamepadDisconnected = function(e) {
            setGamepads(function(prev) {
                var updated = _object_spread({}, prev);
                delete updated[e.gamepad.index];
                return updated;
            });
        };
        window.addEventListener('gamepadconnected', handleGamepadConnected);
        window.addEventListener('gamepaddisconnected', handleGamepadDisconnected);
        return function() {
            window.removeEventListener('gamepadconnected', handleGamepadConnected);
            window.removeEventListener('gamepaddisconnected', handleGamepadDisconnected);
        };
    }, []);
    useEffect(function() {
        var lastGamepadState = {};
        var checkGamepadInput = function() {
            var gamepadsNow = navigator.getGamepads();
            var gamepad = gamepadsNow[0];
            if (gamepad && gameStatus) {
                // Check all buttons
                for(var i = 0; i < gamepad.buttons.length; i++){
                    var isPressed = gamepad.buttons[i].pressed;
                    var wasPressed = lastGamepadState["button".concat(i)];
                    if (isPressed && !wasPressed) {
                        handleGameStatus();
                        break;
                    }
                    lastGamepadState["button".concat(i)] = isPressed;
                }
            }
        };
        var handleKeyPress = function(e) {
            if (gameStatus) {
                handleGameStatus();
            }
        };
        var gamepadInterval = setInterval(checkGamepadInput, 16); // ~60fps
        var handleEscape = function(e) {
            if (e.key === 'Escape' && !gameStatus) {
                setCurrentScreen('home');
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        window.addEventListener('keypress', handleKeyPress);
        window.addEventListener('keydown', handleEscape);
        return function() {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('keypress', handleKeyPress);
            window.removeEventListener('keydown', handleEscape);
            clearInterval(gamepadInterval);
        };
    }, [
        handleKeyDown,
        handleKeyUp,
        handleGameStatus,
        gameStatus
    ]);
    useEffect(function() {
        if (!canvasRef.current) return;
        var canvas = canvasRef.current;
        var ctx = canvas.getContext('2d');
        gameState.initializeLevel(level);
        setDeathSoundPlayed(false);
        // Update the current level name
        if (isEditing) {
            setCurrentLevelName('Testing Level');
        } else if (gameState.customLevels && gameState.customLevels[gameState.currentLevelIndex]) {
            setCurrentLevelName(gameState.customLevels[gameState.currentLevelIndex].name);
        } else {
            setCurrentLevelName("Level ".concat(gameState.currentLevelIndex + 1));
        }
        var animationFrameId;
        var gameLoop = function() {
            var gamepadsNow = navigator.getGamepads();
            var gamepad = gamepadsNow[0];
            if (gamepad) {
                if (gameStatus) {
                    var _gamepad_buttons_, _gamepad_buttons_1;
                    // Handle gamepad input for game over/success screen
                    if (((_gamepad_buttons_ = gamepad.buttons[0]) === null || _gamepad_buttons_ === void 0 ? void 0 : _gamepad_buttons_.pressed) || ((_gamepad_buttons_1 = gamepad.buttons[2]) === null || _gamepad_buttons_1 === void 0 ? void 0 : _gamepad_buttons_1.pressed)) {
                        handleGameStatus();
                    }
                } else if (gameState.isPlaying) {
                    var _gamepad_buttons_2, _gamepad_buttons_3, _gamepad_buttons_4, _gamepad_buttons_5;
                    // Handle regular gameplay gamepad input
                    var moveX = gamepad.axes[0] || (((_gamepad_buttons_2 = gamepad.buttons[14]) === null || _gamepad_buttons_2 === void 0 ? void 0 : _gamepad_buttons_2.pressed) ? -1 : ((_gamepad_buttons_3 = gamepad.buttons[15]) === null || _gamepad_buttons_3 === void 0 ? void 0 : _gamepad_buttons_3.pressed) ? 1 : 0);
                    if (Math.abs(moveX) > 0.1) {
                        keysRef.current.ArrowRight = moveX > 0;
                        keysRef.current.ArrowLeft = moveX < 0;
                    } else {
                        keysRef.current.ArrowRight = false;
                        keysRef.current.ArrowLeft = false;
                    }
                    keysRef.current.ArrowUp = ((_gamepad_buttons_4 = gamepad.buttons[0]) === null || _gamepad_buttons_4 === void 0 ? void 0 : _gamepad_buttons_4.pressed) || ((_gamepad_buttons_5 = gamepad.buttons[2]) === null || _gamepad_buttons_5 === void 0 ? void 0 : _gamepad_buttons_5.pressed);
                }
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Draw sky background (light blue)
            ctx.fillStyle = '#4A90C7'; // Lighter blue sky color (a medium-light blue)
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            // Draw and update clouds
            clouds.forEach(function(cloud) {
                // Move cloud
                cloud.x += cloud.speed;
                if (cloud.x > canvas.width + cloud.size) {
                    cloud.x = -cloud.size;
                    cloud.y = Math.random() * (canvas.height * 0.6);
                }
                // Draw cloud
                ctx.save();
                ctx.globalAlpha = cloud.opacity;
                ctx.fillStyle = '#ffffff';
                // Main cloud circle
                ctx.beginPath();
                ctx.arc(cloud.x, cloud.y, cloud.size * 0.5, 0, Math.PI * 2);
                ctx.arc(cloud.x + cloud.size * 0.4, cloud.y - cloud.size * 0.1, cloud.size * 0.4, 0, Math.PI * 2);
                ctx.arc(cloud.x + cloud.size * 0.7, cloud.y, cloud.size * 0.3, 0, Math.PI * 2);
                ctx.arc(cloud.x + cloud.size * 0.4, cloud.y + cloud.size * 0.1, cloud.size * 0.4, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });
            if (gameState.isPlaying) {
                var status = gameState.update(keysRef.current);
                if (status) {
                    if (status === 'player_died' && !deathSoundPlayed) {
                        gameState.failSound.currentTime = 0;
                        gameState.failSound.play().catch(function(err) {
                            return console.log('Audio play failed:', err);
                        });
                        setDeathSoundPlayed(true);
                    }
                    setGameStatus(status);
                    gameState.isPlaying = false;
                    setFadeIn(false);
                    setTimeout(function() {
                        return setFadeIn(true);
                    }, 800); // Longer delay to see death animation
                }
            }
            // Remove redundant background fill
            // Draw regular tiles
            for(var y = 0; y < level.length; y++){
                for(var x = 0; x < level[y].length; x++){
                    var tile = level[y][x];
                    if (tile !== TILE_TYPES.EMPTY && tile !== TILE_TYPES.HAMMER && tile !== TILE_TYPES.WALKER) {
                        if (tile === TILE_TYPES.COLLECTIBLE) {
                            var isCollected = gameState.currentLevel[y][x] !== TILE_TYPES.COLLECTIBLE;
                            if (!isCollected) {
                                var time = Date.now() / 1000;
                                var scale = 0.8 + Math.sin(time * 4) * 0.1;
                                var size = TILE_SIZE * 0.4;
                                var x1 = x * TILE_SIZE + (TILE_SIZE - size) / 2;
                                var y1 = y * TILE_SIZE + (TILE_SIZE - size) / 2;
                                ctx.save();
                                var gradient = ctx.createLinearGradient(x1, y1, x1 + size, y1 + size);
                                gradient.addColorStop(0, '#FFD700');
                                gradient.addColorStop(1, '#FFA500');
                                ctx.fillStyle = gradient;
                                // Draw the square with rotation
                                ctx.translate(x * TILE_SIZE + TILE_SIZE / 2, y * TILE_SIZE + TILE_SIZE / 2);
                                ctx.scale(scale, scale);
                                ctx.fillRect(-size / 2, -size / 2, size, size);
                                ctx.strokeStyle = '#B8860B';
                                ctx.lineWidth = 2;
                                ctx.strokeRect(-size / 2, -size / 2, size, size);
                                ctx.restore();
                            }
                        } else if (tile === TILE_TYPES.SPIKE) {
                            var xPos = x * TILE_SIZE;
                            var yPos = y * TILE_SIZE;
                            // Main square
                            var gradient1 = ctx.createLinearGradient(xPos, yPos, xPos + TILE_SIZE, yPos + TILE_SIZE);
                            gradient1.addColorStop(0, '#C0C0C0');
                            gradient1.addColorStop(0.5, '#808080');
                            gradient1.addColorStop(1, '#A8A8A8');
                            ctx.fillStyle = gradient1;
                            ctx.fillRect(xPos, yPos, TILE_SIZE, TILE_SIZE);
                            // Add diagonal lines for edgy detail
                            ctx.beginPath();
                            ctx.strokeStyle = '#666666';
                            ctx.lineWidth = 2;
                            // Draw diagonal lines
                            ctx.moveTo(xPos + 10, yPos + 10);
                            ctx.lineTo(xPos + TILE_SIZE - 10, yPos + TILE_SIZE - 10);
                            ctx.moveTo(xPos + TILE_SIZE - 10, yPos + 10);
                            ctx.lineTo(xPos + 10, yPos + TILE_SIZE - 10);
                            ctx.stroke();
                            // Add border
                            ctx.strokeStyle = '#404040';
                            ctx.lineWidth = 2;
                            ctx.strokeRect(xPos, yPos, TILE_SIZE, TILE_SIZE);
                        } else {
                            if (tile === TILE_TYPES.PLATFORM) {
                                // Create grass gradient
                                var gradient2 = ctx.createLinearGradient(x * TILE_SIZE, y * TILE_SIZE, x * TILE_SIZE, y * TILE_SIZE + TILE_SIZE);
                                gradient2.addColorStop(0, '#58D68D'); // Light grass green
                                gradient2.addColorStop(1, '#2ECC71'); // Darker grass green
                                // Draw main platform
                                ctx.fillStyle = gradient2;
                                ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                                // Draw grass details
                                ctx.fillStyle = '#82E0AA'; // Light grass tips
                                for(var i = 0; i < 8; i++){
                                    var grassX = x * TILE_SIZE + i * 8 + 4;
                                    var grassHeight = Math.sin(i * 0.8) * 4 + 6;
                                    ctx.fillRect(grassX, y * TILE_SIZE - grassHeight + 4, 2, grassHeight);
                                }
                                // Draw platform border
                                ctx.strokeStyle = '#196F3D'; // Dark green border
                                ctx.lineWidth = 2;
                                ctx.strokeRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                            } else if (tile === TILE_TYPES.PLATFORM_ICE) {
                                // Create ice gradient
                                var gradient3 = ctx.createLinearGradient(x * TILE_SIZE, y * TILE_SIZE, x * TILE_SIZE, y * TILE_SIZE + TILE_SIZE);
                                gradient3.addColorStop(0, '#E0FFFF'); // Bright cyan
                                gradient3.addColorStop(0.4, '#00CED1'); // Dark turquoise
                                gradient3.addColorStop(1, '#B0E0E6'); // Powder blue highlight
                                // Draw main ice platform
                                ctx.fillStyle = gradient3;
                                ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                                // Add glossy highlight
                                var highlightGradient = ctx.createLinearGradient(x * TILE_SIZE, y * TILE_SIZE, x * TILE_SIZE, y * TILE_SIZE + TILE_SIZE / 2);
                                highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
                                highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
                                ctx.fillStyle = highlightGradient;
                                ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE / 2);
                                // Add crystalline details
                                ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(x * TILE_SIZE + 10, y * TILE_SIZE + 10);
                                ctx.lineTo(x * TILE_SIZE + 20, y * TILE_SIZE + 5);
                                ctx.moveTo(x * TILE_SIZE + 40, y * TILE_SIZE + 15);
                                ctx.lineTo(x * TILE_SIZE + 50, y * TILE_SIZE + 8);
                                ctx.stroke();
                                // Add ice platform border
                                ctx.strokeStyle = '#87CEEB'; // Sky blue border
                                ctx.lineWidth = 2;
                                ctx.strokeRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                            } else if (tile === TILE_TYPES.PLATFORM_MUD) {
                                // Create mud gradient
                                var gradient4 = ctx.createLinearGradient(x * TILE_SIZE, y * TILE_SIZE, x * TILE_SIZE, y * TILE_SIZE + TILE_SIZE);
                                gradient4.addColorStop(0, '#8B4513'); // Saddle brown
                                gradient4.addColorStop(0.4, '#754719'); // Mid brown
                                gradient4.addColorStop(1, '#654321'); // Dark brown
                                // Draw main mud platform
                                ctx.fillStyle = gradient4;
                                ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                                // Add subtle mud texture with transparency
                                var mudGradient = ctx.createLinearGradient(x * TILE_SIZE, y * TILE_SIZE, x * TILE_SIZE, y * TILE_SIZE + TILE_SIZE / 2);
                                mudGradient.addColorStop(0, 'rgba(139, 69, 19, 0.2)'); // Semi-transparent brown
                                mudGradient.addColorStop(1, 'rgba(139, 69, 19, 0)');
                                ctx.fillStyle = mudGradient;
                                ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                                // Add mud smudge at the top
                                var smudgeGradient = ctx.createLinearGradient(x * TILE_SIZE, y * TILE_SIZE, x * TILE_SIZE, y * TILE_SIZE + 15);
                                smudgeGradient.addColorStop(0, 'rgba(205, 133, 63, 0.4)'); // Peru brown with transparency
                                smudgeGradient.addColorStop(1, 'rgba(139, 69, 19, 0)'); // Fade to transparent
                                ctx.fillStyle = smudgeGradient;
                                ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, 15);
                                // Add platform border
                                ctx.strokeStyle = '#5D3915'; // Darker brown border
                                ctx.lineWidth = 2;
                                ctx.strokeRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                            } else {
                                if (tile === TILE_TYPES.EXIT) {
                                    var doorX = x * TILE_SIZE;
                                    var doorY = y * TILE_SIZE;
                                    var isOpen = gameState.collectibles === gameState.totalCollectibles;
                                    // Draw door frame
                                    ctx.fillStyle = '#8B4513'; // Brown frame
                                    ctx.fillRect(doorX, doorY, TILE_SIZE, TILE_SIZE);
                                    if (!isOpen) {
                                        // Draw closed door
                                        ctx.fillStyle = '#4B4B4B'; // Door color
                                        var padding = 4;
                                        ctx.fillRect(doorX + padding, doorY + padding, TILE_SIZE - padding * 2, TILE_SIZE - padding * 2);
                                        // Draw door handle
                                        ctx.fillStyle = '#FFD700'; // Gold handle
                                        ctx.beginPath();
                                        ctx.arc(doorX + TILE_SIZE - 16, doorY + TILE_SIZE / 2, 4, 0, Math.PI * 2);
                                        ctx.fill();
                                    } else {
                                        // Draw open door (black opening)
                                        ctx.fillStyle = '#000000';
                                        var padding1 = 4;
                                        ctx.fillRect(doorX + padding1, doorY + padding1, TILE_SIZE - padding1 * 2, TILE_SIZE - padding1 * 2);
                                    }
                                    // Draw frame border
                                    ctx.strokeStyle = '#6B3E26'; // Darker brown
                                    ctx.lineWidth = 2;
                                    ctx.strokeRect(doorX, doorY, TILE_SIZE, TILE_SIZE);
                                } else {
                                    if (tile === TILE_TYPES.PLAYER_START) {
                                        var doorX1 = x * TILE_SIZE;
                                        var doorY1 = y * TILE_SIZE;
                                        // Draw door frame
                                        ctx.fillStyle = '#8B4513'; // Brown frame
                                        ctx.fillRect(doorX1, doorY1, TILE_SIZE, TILE_SIZE);
                                        // Draw open door (black opening)
                                        ctx.fillStyle = '#000000';
                                        var padding2 = 4;
                                        ctx.fillRect(doorX1 + padding2, doorY1 + padding2, TILE_SIZE - padding2 * 2, TILE_SIZE - padding2 * 2);
                                        // Draw frame border
                                        ctx.strokeStyle = '#6B3E26'; // Darker brown
                                        ctx.lineWidth = 2;
                                        ctx.strokeRect(doorX1, doorY1, TILE_SIZE, TILE_SIZE);
                                    } else {
                                        ctx.fillStyle = TILE_COLORS[tile];
                                        ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                                        ctx.strokeStyle = '#000';
                                        ctx.lineWidth = 2;
                                        ctx.strokeRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            gameState.visualPosition.x += (gameState.playerPosition.x - gameState.visualPosition.x) * 0.3;
            gameState.visualPosition.y += (gameState.playerPosition.y - gameState.visualPosition.y) * 0.3;
            ctx.fillStyle = '#FF9800';
            ctx.fillRect(Math.round(gameState.visualPosition.x), Math.round(gameState.visualPosition.y), TILE_SIZE, TILE_SIZE);
            ctx.strokeStyle = '#E65100';
            ctx.lineWidth = 3;
            ctx.strokeRect(Math.round(gameState.visualPosition.x), Math.round(gameState.visualPosition.y), TILE_SIZE, TILE_SIZE);
            // Render collectible effects after player
            if (gameState.collectibleEffects) {
                gameState.collectibleEffects = gameState.collectibleEffects.filter(function(effect) {
                    effect.alpha -= 0.05;
                    if (effect.alpha <= 0) return false;
                    effect.particles.forEach(function(particle) {
                        particle.x += Math.cos(particle.angle) * particle.speed;
                        particle.y += Math.sin(particle.angle) * particle.speed;
                        ctx.save();
                        ctx.globalAlpha = effect.alpha;
                        ctx.fillStyle = '#FFD700';
                        ctx.translate(effect.x + particle.x, effect.y + particle.y);
                        ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
                        ctx.restore();
                    });
                    return true;
                });
            }
            ctx.fillStyle = 'white';
            var eyeOffset = gameState.playerFacing === 'right' ? 8 : -8;
            ctx.beginPath();
            ctx.arc(Math.round(gameState.visualPosition.x) + TILE_SIZE / 2 + eyeOffset, Math.round(gameState.visualPosition.y) + TILE_SIZE / 3, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = 'black';
            ctx.beginPath();
            ctx.arc(Math.round(gameState.visualPosition.x) + TILE_SIZE / 2 + eyeOffset, Math.round(gameState.visualPosition.y) + TILE_SIZE / 3, 2, 0, Math.PI * 2);
            ctx.fill();
            var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
            try {
                // Draw mud drops in front of player
                for(var _iterator = gameState.mudDrops[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                    var drop = _step.value;
                    ctx.fillStyle = "rgba(101, 67, 33, ".concat(drop.opacity, ")");
                    ctx.beginPath();
                    ctx.arc(drop.x, drop.y, drop.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion && _iterator.return != null) {
                        _iterator.return();
                    }
                } finally{
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
            if (gameState.isDead) {
                ctx.beginPath();
                ctx.arc(Math.round(gameState.visualPosition.x) + TILE_SIZE / 2, Math.round(gameState.visualPosition.y) + TILE_SIZE / 2 + 10, 8, Math.PI, 0);
                ctx.stroke();
                var bubbleWidth = 60;
                var bubbleHeight = 30;
                var bubbleX = Math.round(gameState.visualPosition.x) + TILE_SIZE / 2 - bubbleWidth / 2;
                var bubbleY = Math.round(gameState.visualPosition.y) - bubbleHeight - 10;
                ctx.fillStyle = 'white';
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(bubbleX, bubbleY);
                ctx.lineTo(bubbleX + bubbleWidth, bubbleY);
                ctx.lineTo(bubbleX + bubbleWidth, bubbleY + bubbleHeight);
                ctx.lineTo(bubbleX + bubbleWidth / 2 + 10, bubbleY + bubbleHeight);
                ctx.lineTo(bubbleX + bubbleWidth / 2, bubbleY + bubbleHeight + 10);
                ctx.lineTo(bubbleX + bubbleWidth / 2 - 10, bubbleY + bubbleHeight);
                ctx.lineTo(bubbleX, bubbleY + bubbleHeight);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                ctx.fillStyle = 'black';
                ctx.font = 'bold 16px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('Awww!', bubbleX + bubbleWidth / 2, bubbleY + bubbleHeight / 2);
            } else {
                ctx.beginPath();
                ctx.arc(Math.round(gameState.visualPosition.x) + TILE_SIZE / 2, Math.round(gameState.visualPosition.y) + TILE_SIZE / 2 + 5, 8, 0, Math.PI);
                ctx.stroke();
            }
            var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
            try {
                // Draw hammers
                for(var _iterator1 = gameState.hammers[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                    var hammer = _step1.value;
                    // Create metallic gradient for hammer head
                    var hammerGradient = ctx.createLinearGradient(hammer.x, hammer.visualY, hammer.x + TILE_SIZE, hammer.visualY + TILE_SIZE);
                    hammerGradient.addColorStop(0, '#888888');
                    hammerGradient.addColorStop(0.4, '#666666');
                    hammerGradient.addColorStop(0.6, '#444444');
                    hammerGradient.addColorStop(1, '#333333');
                    // Draw hammer head
                    ctx.fillStyle = hammerGradient;
                    ctx.fillRect(hammer.x, hammer.visualY, TILE_SIZE, TILE_SIZE);
                    // Add metallic shine
                    var shineGradient = ctx.createLinearGradient(hammer.x, hammer.visualY, hammer.x + TILE_SIZE / 2, hammer.visualY + TILE_SIZE / 2);
                    shineGradient.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
                    shineGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
                    ctx.fillStyle = shineGradient;
                    ctx.fillRect(hammer.x, hammer.visualY, TILE_SIZE, TILE_SIZE);
                    // Add hammer details
                    ctx.strokeStyle = '#222222';
                    ctx.lineWidth = 2;
                    ctx.strokeRect(hammer.x, hammer.visualY, TILE_SIZE, TILE_SIZE);
                    // Add rivets
                    ctx.fillStyle = '#222222';
                    ctx.beginPath();
                    ctx.arc(hammer.x + TILE_SIZE / 4, hammer.visualY + TILE_SIZE / 4, 3, 0, Math.PI * 2);
                    ctx.arc(hammer.x + TILE_SIZE * 3 / 4, hammer.visualY + TILE_SIZE / 4, 3, 0, Math.PI * 2);
                    ctx.fill();
                }
            } catch (err) {
                _didIteratorError1 = true;
                _iteratorError1 = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                        _iterator1.return();
                    }
                } finally{
                    if (_didIteratorError1) {
                        throw _iteratorError1;
                    }
                }
            }
            var _iteratorNormalCompletion2 = true, _didIteratorError2 = false, _iteratorError2 = undefined;
            try {
                // Draw walkers
                for(var _iterator2 = gameState.walkers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true){
                    var walker = _step2.value;
                    var walkerGradient = ctx.createLinearGradient(walker.visualX, walker.y, walker.visualX + TILE_SIZE, walker.y + TILE_SIZE);
                    walkerGradient.addColorStop(0, '#FF6B6B');
                    walkerGradient.addColorStop(1, '#FF4949');
                    ctx.fillStyle = walkerGradient;
                    ctx.fillRect(walker.visualX, walker.y, TILE_SIZE, TILE_SIZE);
                    // Draw eyes
                    ctx.fillStyle = 'white';
                    var eyeOffset1 = walker.direction === 'right' ? 8 : -8;
                    ctx.beginPath();
                    ctx.arc(Math.round(walker.visualX) + TILE_SIZE / 2 + eyeOffset1, walker.y + TILE_SIZE / 3, 5, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.fillStyle = 'black';
                    ctx.beginPath();
                    ctx.arc(Math.round(walker.visualX) + TILE_SIZE / 2 + eyeOffset1, walker.y + TILE_SIZE / 3, 2, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.strokeStyle = '#000';
                    ctx.lineWidth = 2;
                    ctx.strokeRect(walker.visualX, walker.y, TILE_SIZE, TILE_SIZE);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                        _iterator2.return();
                    }
                } finally{
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
            if (gameState.showCollectText && !gameState.isDead) {
                var bubbleWidth1 = 50;
                var bubbleHeight1 = 30;
                var bubbleX1 = Math.round(gameState.visualPosition.x) + TILE_SIZE / 2 - bubbleWidth1 / 2;
                var bubbleY1 = Math.round(gameState.visualPosition.y) - bubbleHeight1 - 10;
                ctx.fillStyle = 'white';
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(bubbleX1, bubbleY1);
                ctx.lineTo(bubbleX1 + bubbleWidth1, bubbleY1);
                ctx.lineTo(bubbleX1 + bubbleWidth1, bubbleY1 + bubbleHeight1);
                ctx.lineTo(bubbleX1 + bubbleWidth1 / 2 + 10, bubbleY1 + bubbleHeight1);
                ctx.lineTo(bubbleX1 + bubbleWidth1 / 2, bubbleY1 + bubbleHeight1 + 10);
                ctx.lineTo(bubbleX1 + bubbleWidth1 / 2 - 10, bubbleY1 + bubbleHeight1);
                ctx.lineTo(bubbleX1, bubbleY1 + bubbleHeight1);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                ctx.fillStyle = 'black';
                ctx.font = 'bold 16px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('Yay!', bubbleX1 + bubbleWidth1 / 2, bubbleY1 + bubbleHeight1 / 2);
            }
            // Draw collectible icon and count
            var collectibleSize = 24;
            var padding3 = 10;
            var centerX = padding3 + collectibleSize / 2;
            var centerY = padding3 + collectibleSize / 2;
            // Draw collectible icon
            ctx.save();
            var size1 = collectibleSize * 0.8;
            // Create gradient for the square
            var gradient5 = ctx.createLinearGradient(centerX - size1 / 2, centerY - size1 / 2, centerX + size1 / 2, centerY + size1 / 2);
            gradient5.addColorStop(0, '#FFD700');
            gradient5.addColorStop(1, '#FFA500');
            // Draw static square
            ctx.translate(centerX, centerY);
            ctx.fillStyle = gradient5;
            ctx.fillRect(-size1 / 2, -size1 / 2, size1, size1);
            ctx.strokeStyle = '#B8860B';
            ctx.lineWidth = 2;
            ctx.strokeRect(-size1 / 2, -size1 / 2, size1, size1);
            ctx.restore();
            // Draw count
            ctx.fillStyle = '#000';
            ctx.font = 'bold 24px Arial';
            ctx.textBaseline = 'middle';
            ctx.fillText("".concat(gameState.collectibles, "/").concat(gameState.totalCollectibles), centerX + collectibleSize + 15, centerY);
            animationFrameId = requestAnimationFrame(gameLoop);
        };
        animationFrameId = requestAnimationFrame(gameLoop);
        return function() {
            cancelAnimationFrame(animationFrameId);
        };
    }, [
        level,
        gameState
    ]);
    // Remove the duplicate loadNextLevel function here
    return /*#__PURE__*/ _jsxDEV("div", {
        style: {
            textAlign: 'center',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '100vh',
            boxSizing: 'border-box',
            background: 'linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)',
            color: 'white',
            position: 'relative' // Add this to allow absolute positioning of children
        },
        children: [
            /*#__PURE__*/ _jsxDEV("div", {
                style: {
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    zIndex: 10
                },
                children: currentLevelName
            }, void 0, false, {
                fileName: "main.js",
                lineNumber: 2256,
                columnNumber: 7
            }, _this),
            /*#__PURE__*/ _jsxDEV("div", {
                style: {
                    marginBottom: '20px'
                },
                children: /*#__PURE__*/ _jsxDEV("h1", {
                    className: "title-glow",
                    style: {
                        fontSize: '24px',
                        color: '#fff',
                        marginBottom: '20px',
                        marginTop: '20px',
                        textAlign: 'center',
                        fontFamily: "'Press Start 2P', Arial, sans-serif",
                        letterSpacing: '2px',
                        transform: 'perspective(500px) rotateX(10deg)',
                        textShadow: '0 0 20px rgba(255, 255, 255, 0.5)'
                    },
                    children: "SQUARE JUMP!"
                }, void 0, false, {
                    fileName: "main.js",
                    lineNumber: 2270,
                    columnNumber: 9
                }, _this)
            }, void 0, false, {
                fileName: "main.js",
                lineNumber: 2269,
                columnNumber: 7
            }, _this),
            gameStatus && (isEditing ? // Editor Death Screen
            /*#__PURE__*/ _jsxDEV("div", {
                style: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(244, 67, 54, 0.95)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000,
                    gap: '20px',
                    opacity: fadeIn ? 1 : 0,
                    transition: 'opacity 0.5s ease-in',
                    pointerEvents: fadeIn ? 'auto' : 'none'
                },
                children: [
                    /*#__PURE__*/ _jsxDEV("h1", {
                        style: {
                            color: 'white',
                            fontSize: '48px',
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                            textAlign: 'center',
                            marginBottom: '20px'
                        },
                        children: gameStatus === 'level_complete' ? '🎉 Level Test Successful!' : '💀 Testing Failed'
                    }, void 0, false, {
                        fileName: "main.js",
                        lineNumber: 2304,
                        columnNumber: 13
                    }, _this),
                    /*#__PURE__*/ _jsxDEV("div", {
                        style: {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '15px'
                        },
                        children: [
                            /*#__PURE__*/ _jsxDEV("button", {
                                onClick: function() {
                                    return setCurrentScreen('editor');
                                },
                                className: "game-button",
                                style: {
                                    padding: '15px 30px',
                                    fontSize: '20px',
                                    backgroundColor: '#2196F3',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '15px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    letterSpacing: '2px',
                                    textTransform: 'uppercase',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                    transition: 'all 0.3s ease'
                                },
                                children: "Back to Editor"
                            }, void 0, false, {
                                fileName: "main.js",
                                lineNumber: 2318,
                                columnNumber: 15
                            }, _this),
                            /*#__PURE__*/ _jsxDEV("button", {
                                onClick: handleGameStatus,
                                className: "game-button",
                                style: {
                                    padding: '15px 30px',
                                    fontSize: '20px',
                                    backgroundColor: '#4CAF50',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '15px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    letterSpacing: '2px',
                                    textTransform: 'uppercase',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                    transition: 'all 0.3s ease'
                                },
                                children: "Try Again"
                            }, void 0, false, {
                                fileName: "main.js",
                                lineNumber: 2338,
                                columnNumber: 15
                            }, _this)
                        ]
                    }, void 0, true, {
                        fileName: "main.js",
                        lineNumber: 2313,
                        columnNumber: 13
                    }, _this)
                ]
            }, void 0, true, {
                fileName: "main.js",
                lineNumber: 2287,
                columnNumber: 11
            }, _this) : // Game Death Screen
            /*#__PURE__*/ _jsxDEV("div", {
                style: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: gameStatus === 'level_complete' ? 'rgba(76, 175, 80, 0.95)' : 'rgba(244, 67, 54, 0.95)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000,
                    gap: '20px',
                    opacity: fadeIn ? 1 : 0,
                    transition: 'opacity 0.5s ease-in',
                    pointerEvents: fadeIn ? 'auto' : 'none'
                },
                children: [
                    /*#__PURE__*/ _jsxDEV("h1", {
                        style: {
                            color: 'white',
                            fontSize: '48px',
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                            textAlign: 'center',
                            marginBottom: '20px'
                        },
                        children: gameStatus === 'level_complete' ? '🎉 LEVEL COMPLETE!' : '💀 GAME OVER'
                    }, void 0, false, {
                        fileName: "main.js",
                        lineNumber: 2379,
                        columnNumber: 13
                    }, _this),
                    /*#__PURE__*/ _jsxDEV("div", {
                        style: {
                            color: 'white',
                            fontSize: '24px',
                            marginBottom: '20px',
                            textAlign: 'center'
                        },
                        children: /*#__PURE__*/ _jsxDEV("p", {
                            children: [
                                "Press any key to ",
                                gameStatus === 'level_complete' ? 'continue' : 'try again'
                            ]
                        }, void 0, true, {
                            fileName: "main.js",
                            lineNumber: 2394,
                            columnNumber: 15
                        }, _this)
                    }, void 0, false, {
                        fileName: "main.js",
                        lineNumber: 2388,
                        columnNumber: 13
                    }, _this)
                ]
            }, void 0, true, {
                fileName: "main.js",
                lineNumber: 2362,
                columnNumber: 11
            }, _this)),
            /*#__PURE__*/ _jsxDEV("canvas", {
                ref: canvasRef,
                width: GRID_SIZE.WIDTH * TILE_SIZE,
                height: GRID_SIZE.HEIGHT * TILE_SIZE,
                style: {
                    border: '3px solid black',
                    backgroundColor: '#f0f0f0',
                    borderRadius: '5px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    maxHeight: 'calc(95vh - 80px)',
                    width: 'auto',
                    height: 'auto'
                }
            }, void 0, false, {
                fileName: "main.js",
                lineNumber: 2400,
                columnNumber: 7
            }, _this)
        ]
    }, void 0, true, {
        fileName: "main.js",
        lineNumber: 2244,
        columnNumber: 5
    }, _this);
};
/**
 * Home Screen Component
 */ var HomeScreen = function(param) {
    var setLevel = param.setLevel, setIsEditing = param.setIsEditing, setCurrentScreen = param.setCurrentScreen, gameState = param.gameState, onOpenEditor = param.onOpenEditor;
    var _useState = _sliced_to_array(useState(function() {
        return new Audio('https://play.rosebud.ai/assets/homemusic.mp3?mfxF');
    }), 1), backgroundMusic = _useState[0];
    useEffect(function() {
        // Configure and play background music
        backgroundMusic.loop = true;
        backgroundMusic.volume = 0.2;
        backgroundMusic.play().catch(function(err) {
            return console.log('Audio play failed:', err);
        });
        return function() {
            backgroundMusic.pause();
            backgroundMusic.currentTime = 0;
        };
    }, [
        backgroundMusic
    ]);
    useEffect(function() {
        var createSquare = function() {
            var square = document.createElement('div');
            square.classList.add('floating-square');
            square.style.left = Math.random() * 100 + 'vw';
            square.style.animationDuration = Math.random() * 3 + 2 + 's';
            square.style.opacity = Math.random() * 0.3;
            square.style.transform = "scale(".concat(Math.random() * 0.5 + 0.5, ")");
            document.querySelector('.home-container').appendChild(square);
            square.addEventListener('animationend', function() {
                square.remove();
            });
        };
        var interval = setInterval(createSquare, 2000);
        return function() {
            return clearInterval(interval);
        };
    }, []);
    var handleOriginsMode = useCallback(function() {
        setLevel(ORIGINS_LEVELS[0]);
        gameState.currentLevelIndex = 0;
        setIsEditing(false);
        gameState.isEditing = false;
        setCurrentScreen('game');
    }, [
        setLevel,
        setIsEditing,
        gameState,
        setCurrentScreen
    ]);
    var handleCustomLevels = useCallback(function() {
        setIsEditing(false);
        gameState.isEditing = false;
        gameState.customLevels = null; // Reset custom levels
        var availableLevels = [];
        console.log("Fetching custom levels from localStorage...");
        // First, collect all level IDs and orders
        var levelIds = [];
        for(var i = 1; i <= 10; i++){
            var levelName = localStorage.getItem("levelName_".concat(i));
            var levelOrder = localStorage.getItem("levelOrder_".concat(i));
            if (levelName) {
                levelIds.push({
                    id: i,
                    order: parseInt(levelOrder) || i
                });
            }
        }
        // Sort by order
        levelIds.sort(function(a, b) {
            return a.order - b.order;
        });
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            // Now load levels in correct order
            for(var _iterator = levelIds[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var id = _step.value.id;
                var levelName1 = localStorage.getItem("levelName_".concat(id));
                var levelOrder1 = localStorage.getItem("levelOrder_".concat(id));
                var levelData = localStorage.getItem("level_".concat(id));
                if (levelName1 && levelData) {
                    try {
                        var parsedData = JSON.parse(levelData);
                        availableLevels.push({
                            id: id,
                            name: levelName1,
                            order: parseInt(levelOrder1) || id,
                            data: parsedData
                        });
                        console.log("Level ".concat(id, " (").concat(levelName1, ") loaded with order ").concat(levelOrder1));
                    } catch (error) {
                        console.error("Error parsing level ".concat(id, " data:"), error);
                    }
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
        console.log("Total levels loaded: ".concat(availableLevels.length));
        if (availableLevels.length === 0) {
            alert("No custom levels available. Please create some levels in the Level Editor first!");
            return;
        }
        // Sort levels by order
        availableLevels.sort(function(a, b) {
            return a.order - b.order;
        });
        // Set up the first level
        gameState.currentLevelIndex = 0;
        gameState.customLevels = availableLevels;
        setLevel(availableLevels[0].data);
        console.log("Starting custom levels mode with level:", availableLevels[0].name);
        setCurrentScreen('game');
    }, [
        setLevel,
        setIsEditing,
        gameState,
        setCurrentScreen
    ]);
    return /*#__PURE__*/ _jsxDEV("div", {
        className: "home-container",
        style: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)',
            overflow: 'hidden'
        },
        children: [
            /*#__PURE__*/ _jsxDEV("style", {
                children: "\n        @keyframes float-up {\n          0% { transform: translateY(100vh) rotate(0deg); }\n          100% { transform: translateY(-100px) rotate(360deg); }\n        }\n        .floating-square {\n          position: absolute;\n          width: 30px;\n          height: 30px;\n          background: rgba(255, 255, 255, 0.1);\n          animation: float-up linear forwards;\n          borderRadius: 4px;\n        }\n        .title-glow {\n          animation: glow 2s ease-in-out infinite alternate;\n        }\n        @keyframes glow {\n          from { text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e60073; }\n          to { text-shadow: 0 0 20px #ff4da6, 0 0 30px #ff4da6, 0 0 40px #ff4da6; }\n        }\n        .game-button {\n          position: relative;\n          overflow: hidden;\n          transition: all 0.3s ease;\n        }\n        .game-button:hover {\n          transform: translateY(-5px);\n          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);\n        }\n        .game-button::after {\n          content: '';\n          position: absolute;\n          top: -50%;\n          left: -50%;\n          width: 200%;\n          height: 200%;\n          background: linear-gradient(\n            45deg,\n            transparent,\n            rgba(255, 255, 255, 0.1),\n            transparent\n          );\n          transform: rotate(45deg);\n          transition: all 0.3s ease;\n        }\n        .game-button:hover::after {\n          left: 100%;\n        }\n      "
            }, void 0, false, {
                fileName: "main.js",
                lineNumber: 2538,
                columnNumber: 7
            }, _this),
            /*#__PURE__*/ _jsxDEV("h1", {
                className: "title-glow",
                style: {
                    fontSize: '72px',
                    color: '#fff',
                    marginBottom: '100px',
                    marginTop: '-100px',
                    textAlign: 'center',
                    fontFamily: "'Press Start 2P', Arial, sans-serif",
                    letterSpacing: '4px',
                    transform: 'perspective(500px) rotateX(10deg)',
                    textShadow: '0 0 20px rgba(255, 255, 255, 0.5)'
                },
                children: "SQUARE JUMP!"
            }, void 0, false, {
                fileName: "main.js",
                lineNumber: 2587,
                columnNumber: 7
            }, _this),
            /*#__PURE__*/ _jsxDEV("div", {
                style: {
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '30px',
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: '500px',
                    margin: '0 auto'
                },
                children: [
                    /*#__PURE__*/ _jsxDEV("button", {
                        onClick: handleOriginsMode,
                        className: "game-button",
                        style: {
                            padding: '25px 40px',
                            fontSize: '24px',
                            backgroundColor: '#FF6B6B',
                            color: 'white',
                            border: 'none',
                            borderRadius: '15px',
                            cursor: 'pointer',
                            width: '100%',
                            fontWeight: 'bold',
                            letterSpacing: '2px',
                            textTransform: 'uppercase',
                            boxShadow: '0 4px 15px rgba(255, 107, 107, 0.4)',
                            transition: 'all 0.3s ease'
                        },
                        children: "Play the GAME!"
                    }, void 0, false, {
                        fileName: "main.js",
                        lineNumber: 2609,
                        columnNumber: 9
                    }, _this),
                    /*#__PURE__*/ _jsxDEV("button", {
                        onClick: handleCustomLevels,
                        className: "game-button",
                        style: {
                            padding: '25px 40px',
                            fontSize: '24px',
                            backgroundColor: '#4ECDC4',
                            color: 'white',
                            border: 'none',
                            borderRadius: '15px',
                            cursor: 'pointer',
                            width: '100%',
                            fontWeight: 'bold',
                            letterSpacing: '2px',
                            textTransform: 'uppercase',
                            boxShadow: '0 4px 15px rgba(78, 205, 196, 0.4)',
                            transition: 'all 0.3s ease'
                        },
                        children: "PLAY MY LEVELS!"
                    }, void 0, false, {
                        fileName: "main.js",
                        lineNumber: 2630,
                        columnNumber: 9
                    }, _this),
                    /*#__PURE__*/ _jsxDEV("button", {
                        onClick: function() {
                            return setCurrentScreen('custom');
                        },
                        className: "game-button",
                        style: {
                            padding: '25px 40px',
                            fontSize: '24px',
                            backgroundColor: '#9C27B0',
                            color: 'white',
                            border: 'none',
                            borderRadius: '15px',
                            cursor: 'pointer',
                            width: '100%',
                            fontWeight: 'bold',
                            letterSpacing: '2px',
                            textTransform: 'uppercase',
                            boxShadow: '0 4px 15px rgba(156, 39, 176, 0.4)',
                            transition: 'all 0.3s ease'
                        },
                        children: "PLAY CUSTOM LEVEL!"
                    }, void 0, false, {
                        fileName: "main.js",
                        lineNumber: 2651,
                        columnNumber: 9
                    }, _this),
                    /*#__PURE__*/ _jsxDEV("button", {
                        onClick: onOpenEditor,
                        className: "game-button",
                        style: {
                            padding: '20px 30px',
                            fontSize: '20px',
                            backgroundColor: '#FFE66D',
                            color: '#2C3E50',
                            border: 'none',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            width: '80%',
                            fontWeight: 'bold',
                            letterSpacing: '2px',
                            textTransform: 'uppercase',
                            boxShadow: '0 4px 15px rgba(255, 230, 109, 0.4)',
                            transition: 'all 0.3s ease'
                        },
                        children: "Level Editor"
                    }, void 0, false, {
                        fileName: "main.js",
                        lineNumber: 2672,
                        columnNumber: 9
                    }, _this)
                ]
            }, void 0, true, {
                fileName: "main.js",
                lineNumber: 2600,
                columnNumber: 7
            }, _this)
        ]
    }, void 0, true, {
        fileName: "main.js",
        lineNumber: 2525,
        columnNumber: 5
    }, _this);
};
/**
 * End Screen Component
 */ var EndScreen = function(param) {
    var onOpenEditor = param.onOpenEditor;
    useEffect(function() {
        var createSquare = function() {
            var square = document.createElement('div');
            square.classList.add('floating-square');
            square.style.left = Math.random() * 100 + 'vw';
            square.style.animationDuration = Math.random() * 3 + 2 + 's';
            square.style.opacity = Math.random() * 0.3;
            square.style.transform = "scale(".concat(Math.random() * 0.5 + 0.5, ")");
            document.querySelector('.end-container').appendChild(square);
            square.addEventListener('animationend', function() {
                square.remove();
            });
        };
        var interval = setInterval(createSquare, 2000);
        return function() {
            return clearInterval(interval);
        };
    }, []);
    return /*#__PURE__*/ _jsxDEV("div", {
        className: "end-container",
        style: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)',
            overflow: 'hidden'
        },
        children: [
            /*#__PURE__*/ _jsxDEV("h1", {
                className: "title-glow",
                style: {
                    fontSize: '72px',
                    color: '#fff',
                    marginBottom: '50px',
                    textAlign: 'center',
                    fontFamily: "'Press Start 2P', Arial, sans-serif",
                    letterSpacing: '4px',
                    transform: 'perspective(500px) rotateX(10deg)',
                    textShadow: '0 0 20px rgba(255, 255, 255, 0.5)'
                },
                children: "CONGRATULATIONS!"
            }, void 0, false, {
                fileName: "main.js",
                lineNumber: 2732,
                columnNumber: 7
            }, _this),
            /*#__PURE__*/ _jsxDEV("div", {
                style: {
                    textAlign: 'center',
                    marginBottom: '50px',
                    color: '#fff',
                    fontSize: '24px',
                    maxWidth: '800px',
                    padding: '0 20px',
                    lineHeight: '1.6'
                },
                children: [
                    /*#__PURE__*/ _jsxDEV("p", {
                        children: "You've completed all the levels!"
                    }, void 0, false, {
                        fileName: "main.js",
                        lineNumber: 2753,
                        columnNumber: 9
                    }, _this),
                    /*#__PURE__*/ _jsxDEV("p", {
                        style: {
                            fontSize: '20px',
                            marginTop: '20px'
                        },
                        children: "Now it's time to create your own adventures with the Level Editor!"
                    }, void 0, false, {
                        fileName: "main.js",
                        lineNumber: 2754,
                        columnNumber: 9
                    }, _this)
                ]
            }, void 0, true, {
                fileName: "main.js",
                lineNumber: 2744,
                columnNumber: 7
            }, _this),
            /*#__PURE__*/ _jsxDEV("div", {
                style: {
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    marginTop: '20px'
                },
                children: /*#__PURE__*/ _jsxDEV("button", {
                    onClick: onOpenEditor,
                    className: "game-button",
                    style: {
                        padding: '25px 40px',
                        fontSize: '24px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '15px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        boxShadow: '0 4px 15px rgba(76, 175, 80, 0.4)',
                        transition: 'all 0.3s ease'
                    },
                    children: "Open Level Editor"
                }, void 0, false, {
                    fileName: "main.js",
                    lineNumber: 2764,
                    columnNumber: 9
                }, _this)
            }, void 0, false, {
                fileName: "main.js",
                lineNumber: 2758,
                columnNumber: 7
            }, _this)
        ]
    }, void 0, true, {
        fileName: "main.js",
        lineNumber: 2719,
        columnNumber: 5
    }, _this);
};
/**
 * Custom Level Screen Component
 */ var CustomLevelScreen = function(param) {
    var setLevel = param.setLevel, setIsEditing = param.setIsEditing, setCurrentScreen = param.setCurrentScreen, gameState = param.gameState;
    var _useState = _sliced_to_array(useState(''), 2), error = _useState[0], setError = _useState[1];
    var handleCustomLevel = function() {
        var levelInput = document.getElementById('customLevelInput').value;
        try {
            var customLevel = JSON.parse(levelInput);
            // Validate level dimensions
            if (!Array.isArray(customLevel) || customLevel.length !== GRID_SIZE.HEIGHT || !customLevel.every(function(row) {
                return Array.isArray(row) && row.length === GRID_SIZE.WIDTH;
            })) {
                throw new Error("Level must be ".concat(GRID_SIZE.WIDTH, "x").concat(GRID_SIZE.HEIGHT, " array"));
            }
            // Check for player start position
            var hasPlayerStart = false;
            var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
            try {
                for(var _iterator = customLevel[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                    var row = _step.value;
                    if (row.includes(TILE_TYPES.PLAYER_START)) {
                        hasPlayerStart = true;
                        break;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion && _iterator.return != null) {
                        _iterator.return();
                    }
                } finally{
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
            if (!hasPlayerStart) {
                throw new Error('Level must include a player start position (7)');
            }
            // If all validation passes, start the game
            setLevel(customLevel);
            gameState.currentLevelIndex = 0;
            setIsEditing(false);
            gameState.isEditing = false;
            setCurrentScreen('game');
        } catch (err) {
            setError(err.message);
        }
    };
    return /*#__PURE__*/ _jsxDEV("div", {
        style: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)',
            padding: '20px',
            color: 'white'
        },
        children: [
            /*#__PURE__*/ _jsxDEV("h1", {
                className: "title-glow",
                style: {
                    fontSize: '48px',
                    marginBottom: '40px',
                    textAlign: 'center'
                },
                children: "PLAY CUSTOM LEVEL"
            }, void 0, false, {
                fileName: "main.js",
                lineNumber: 2845,
                columnNumber: 7
            }, _this),
            /*#__PURE__*/ _jsxDEV("div", {
                style: {
                    width: '80%',
                    maxWidth: '800px',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    padding: '20px',
                    borderRadius: '15px',
                    marginBottom: '20px'
                },
                children: /*#__PURE__*/ _jsxDEV("textarea", {
                    id: "customLevelInput",
                    placeholder: "Paste your level array here...",
                    style: {
                        width: '100%',
                        height: '200px',
                        padding: '15px',
                        borderRadius: '10px',
                        border: '2px solid #fff',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        fontSize: '16px',
                        fontFamily: 'monospace',
                        resize: 'vertical'
                    }
                }, void 0, false, {
                    fileName: "main.js",
                    lineNumber: 2861,
                    columnNumber: 9
                }, _this)
            }, void 0, false, {
                fileName: "main.js",
                lineNumber: 2853,
                columnNumber: 7
            }, _this),
            error && /*#__PURE__*/ _jsxDEV("div", {
                style: {
                    color: '#ff4444',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    marginBottom: '20px',
                    fontSize: '16px'
                },
                children: error
            }, void 0, false, {
                fileName: "main.js",
                lineNumber: 2879,
                columnNumber: 9
            }, _this),
            /*#__PURE__*/ _jsxDEV("div", {
                style: {
                    display: 'flex',
                    gap: '20px'
                },
                children: [
                    /*#__PURE__*/ _jsxDEV("button", {
                        onClick: function() {
                            return setCurrentScreen('home');
                        },
                        className: "game-button",
                        style: {
                            padding: '15px 30px',
                            fontSize: '20px',
                            backgroundColor: '#ff4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        },
                        children: "Back"
                    }, void 0, false, {
                        fileName: "main.js",
                        lineNumber: 2894,
                        columnNumber: 9
                    }, _this),
                    /*#__PURE__*/ _jsxDEV("button", {
                        onClick: handleCustomLevel,
                        className: "game-button",
                        style: {
                            padding: '15px 30px',
                            fontSize: '20px',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        },
                        children: "Play Level"
                    }, void 0, false, {
                        fileName: "main.js",
                        lineNumber: 2911,
                        columnNumber: 9
                    }, _this)
                ]
            }, void 0, true, {
                fileName: "main.js",
                lineNumber: 2890,
                columnNumber: 7
            }, _this)
        ]
    }, void 0, true, {
        fileName: "main.js",
        lineNumber: 2831,
        columnNumber: 5
    }, _this);
};
/**
 * Main App Component
 */ var App = function() {
    var _useState = _sliced_to_array(useState(true), 2), isLoading = _useState[0], setIsLoading = _useState[1];
    var _useState1 = _sliced_to_array(useState('home'), 2), currentScreen = _useState1[0], setCurrentScreen = _useState1[1];
    var _useState2 = _sliced_to_array(useState(function() {
        return Array(GRID_SIZE.HEIGHT).fill().map(function() {
            return Array(GRID_SIZE.WIDTH).fill(TILE_TYPES.EMPTY);
        });
    }), 2), level = _useState2[0], setLevel = _useState2[1];
    var _useState3 = _sliced_to_array(useState(false), 2), isEditing = _useState3[0], setIsEditing = _useState3[1];
    var gameState = useRef(new GameState()).current;
    useEffect(function() {
        var timer = setTimeout(function() {
            setIsLoading(false);
        }, 1000);
        return function() {
            return clearTimeout(timer);
        };
    }, []);
    var startGame = function() {
        setIsEditing(true);
        gameState.isEditing = true;
        var hasPlayerStart = false;
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = level[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var row = _step.value;
                if (row.includes(TILE_TYPES.PLAYER_START)) {
                    hasPlayerStart = true;
                    break;
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
        if (!hasPlayerStart) {
            alert("Please add a player start position (green) before playing!");
            return;
        }
        setCurrentScreen('game');
    };
    var returnToEditor = function() {
        setCurrentScreen('editor');
    };
    if (isLoading) {
        return /*#__PURE__*/ _jsxDEV("div", {
            style: {
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f9f9f9',
                zIndex: 1000
            },
            children: [
                /*#__PURE__*/ _jsxDEV("div", {
                    style: {
                        width: '50px',
                        height: '50px',
                        border: '5px solid #f3f3f3',
                        borderTop: '5px solid #3498db',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        marginBottom: '20px'
                    }
                }, void 0, false, {
                    fileName: "main.js",
                    lineNumber: 2988,
                    columnNumber: 9
                }, _this),
                /*#__PURE__*/ _jsxDEV("h2", {
                    style: {
                        color: '#333'
                    },
                    children: "Loading Game..."
                }, void 0, false, {
                    fileName: "main.js",
                    lineNumber: 2997,
                    columnNumber: 9
                }, _this),
                /*#__PURE__*/ _jsxDEV("style", {
                    children: "\n          @keyframes spin {\n            0% { transform: rotate(0deg); }\n            100% { transform: rotate(360deg); }\n          }\n        "
                }, void 0, false, {
                    fileName: "main.js",
                    lineNumber: 2998,
                    columnNumber: 9
                }, _this)
            ]
        }, void 0, true, {
            fileName: "main.js",
            lineNumber: 2975,
            columnNumber: 7
        }, _this);
    }
    return /*#__PURE__*/ _jsxDEV("div", {
        style: {
            fontFamily: "'Press Start 2P', Arial, sans-serif",
            width: '100%',
            margin: '0',
            padding: '0',
            minHeight: '100vh',
            boxSizing: 'border-box',
            overflow: 'hidden',
            background: currentScreen === 'home' ? 'transparent' : 'linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)'
        },
        onDragOver: function(e) {
            e.preventDefault();
            e.stopPropagation();
        },
        onDrop: function(e) {
            e.preventDefault();
            e.stopPropagation();
            var file = e.dataTransfer.files[0];
            if (file && file.type === 'text/csv') {
                var reader = new FileReader();
                reader.onload = function(event) {
                    var csvData = event.target.result;
                    var lines = csvData.split('\n');
                    // Skip header
                    for(var i = 1; i < lines.length; i++){
                        if (!lines[i].trim()) continue;
                        // Parse CSV line (handling quoted strings properly)
                        var matches = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
                        if (!matches || matches.length < 4) continue;
                        var levelId = matches[0];
                        var levelName = matches[1].replace(/"/g, '');
                        var levelOrder = matches[2];
                        var levelData = matches[3].replace(/"/g, '');
                        try {
                            // Store in localStorage
                            localStorage.setItem("levelName_".concat(levelId), levelName);
                            localStorage.setItem("levelOrder_".concat(levelId), levelOrder);
                            localStorage.setItem("level_".concat(levelId), levelData);
                        } catch (error) {
                            console.error('Error storing level:', error);
                        }
                    }
                    alert('Levels imported successfully! Refresh the editor to see the imported levels.');
                };
                reader.readAsText(file);
            } else {
                alert('Please drop a valid CSV file.');
            }
        },
        children: [
            currentScreen === 'editor' ? /*#__PURE__*/ _jsxDEV("h1", {
                className: "title-glow",
                style: {
                    fontSize: '16px',
                    color: '#fff',
                    marginBottom: '10px',
                    textAlign: 'center',
                    fontFamily: "'Press Start 2P', Arial, sans-serif",
                    letterSpacing: '1px',
                    transform: 'perspective(500px) rotateX(10deg)',
                    padding: '5px'
                },
                children: "SQUARE JUMP! LEVEL EDITOR"
            }, void 0, false, {
                fileName: "main.js",
                lineNumber: 3067,
                columnNumber: 9
            }, _this) : null,
            currentScreen === 'home' && /*#__PURE__*/ _jsxDEV(HomeScreen, {
                setLevel: setLevel,
                setIsEditing: setIsEditing,
                setCurrentScreen: setCurrentScreen,
                gameState: gameState,
                onOpenEditor: function() {
                    setIsEditing(true);
                    gameState.isEditing = true;
                    setCurrentScreen('editor');
                }
            }, void 0, false, {
                fileName: "main.js",
                lineNumber: 3082,
                columnNumber: 9
            }, _this),
            currentScreen === 'custom' && /*#__PURE__*/ _jsxDEV(CustomLevelScreen, {
                setLevel: setLevel,
                setIsEditing: setIsEditing,
                setCurrentScreen: setCurrentScreen,
                gameState: gameState
            }, void 0, false, {
                fileName: "main.js",
                lineNumber: 3095,
                columnNumber: 9
            }, _this),
            currentScreen === 'end' && /*#__PURE__*/ _jsxDEV(EndScreen, {
                onOpenEditor: function() {
                    setIsEditing(true);
                    gameState.isEditing = true;
                    setCurrentScreen('editor');
                }
            }, void 0, false, {
                fileName: "main.js",
                lineNumber: 3103,
                columnNumber: 9
            }, _this),
            currentScreen === 'editor' && /*#__PURE__*/ _jsxDEV(LevelEditor, {
                level: level,
                setLevel: setLevel,
                startGame: startGame,
                returnToMainMenu: function() {
                    return setCurrentScreen('home');
                }
            }, void 0, false, {
                fileName: "main.js",
                lineNumber: 3112,
                columnNumber: 9
            }, _this),
            currentScreen === 'game' && /*#__PURE__*/ _jsxDEV(GameCanvas, {
                level: level,
                gameState: gameState,
                returnToEditor: returnToEditor,
                setLevel: setLevel,
                setCurrentScreen: setCurrentScreen,
                isEditing: isEditing
            }, void 0, false, {
                fileName: "main.js",
                lineNumber: 3120,
                columnNumber: 9
            }, _this)
        ]
    }, void 0, true, {
        fileName: "main.js",
        lineNumber: 3009,
        columnNumber: 5
    }, _this);
};
// Render the App
var container = document.getElementById('renderDiv');
var root = ReactDOM.createRoot(container);
root.render(/*#__PURE__*/ _jsxDEV(App, {}, void 0, false, {
    fileName: "main.js",
    lineNumber: 3136,
    columnNumber: 13
}, this));
