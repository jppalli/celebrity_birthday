(function(angular) {
    'use strict';

    angular.module('overwolf')
        .service('GamesService', function ($timeout, $http, $rootScope, TrackingService, ItemsServiceBase) {
            var _this = ItemsServiceBase.init(OverwolfStore.games.getMyGames,[],"games","GameId");
            //_this.apps = _this.items;

            _this.currentGeoHiddenGamesNumber = 0;


            _this.getGameById = function (appId, callback) {

                return _this.getItemById(appId,callback)
            };


            _this.getAllGame = function(callback){
                return _this.getAllItems(callback);
            };

            _this.getAllGamesAsArray = function(callback) {
                return _this.getItemsAsArray(callback);
            };


            _this.launchGame = function (appId, callback) {



            };

            return _this;
        }
    )
})(angular);
