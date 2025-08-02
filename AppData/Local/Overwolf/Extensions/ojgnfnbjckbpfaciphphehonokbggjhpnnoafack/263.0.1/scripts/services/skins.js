(function(angular) {
  'use strict';

  angular.module('overwolf')
    .service('SkinsService', function ($q, $timeout, $http, $rootScope, TrackingService, ItemsServiceBase) {
      var _this = ItemsServiceBase.init(OverwolfStore.skins.getLocalSkins,[OverwolfStore.skins.onSkinInstalled, OverwolfStore.skins.onSkinUninstalled],"skins","UID");
      _this.skins = _this.items;
      _this.finishedInit = false;
      _this.getItemsByIdQueue = [];
      _this.getAllSkinsQueue = [];


      _this.getSkinById = function (skinId, callback) {
        return _this.getItemById(skinId,callback)
      };

      _this.getAllSkins = function(callback) {
        _this.getAllItems(function(allSkins) {
          let filteredSkins = {};
          if (allSkins != null) {
            for (const skinId in allSkins){
              if (allSkins[skinId].AppType === 2) {
                filteredSkins[skinId] = allSkins[skinId];
              }
            }
          }

          callback(filteredSkins);
        });
      };

      _this.installSkin = function (skinId, callback) {
        console.log("Installing skin ", skinId);

        OverwolfStore.skins.installSkin(skinId, function (result) {
          if (result.status !== "success"){

            if(result.error !== "Not signed in." && result.error !== "Unverified") {
              _this.skins[skinId] = {};
              _this.skins[skinId].installError = true;
              if (result.status === "error" && result.error.toLowerCase() === "Can't download app - no connectivity".toLowerCase()) {
                $rootScope.$broadcast("appInstallConnectionError", {
                  UID: skinId,
                  type: "skin"
                })
              }
            }
          }
          else {
            if(_this.skins[skinId]) {
              _this.skins[skinId].isInstalled = true;
              _this.skins[skinId].InstallState = 'Installed'
            }
            else {
              _this.initLocalItems();
            }
          }
          if (typeof callback == 'function') {
            callback(result);
          }

        })
      };

      _this.resetInstallError = function(skinId){
        _this.skins[skinId].installError = false;
        _this.skins[skinId].isInstalled = false;
        _this.skins[skinId].isInstalling = false;
      };

      _this.unInstallSkin = function (skinId, callback) {
        console.log("uninstallid skin id", skinId);
        OverwolfStore.skins.uninstallSkin(skinId, function (info) {
          if (info.status == "success") {
            _this.skins[skinId].InstallState = 'Removed'
          }
          if (typeof callback == 'function') {
            callback(info);
          }
        })
      };

      _this.launchSkin = function (skinId, callback) {
        console.log("Launching skin", skinId);
        _this.markAllSkinsAsUnactive();
        OverwolfStore.skins.launchSkin(skinId, function (info) {
          _this.markAllSkinsAsUnactive();
          if (info.status == "error") {
            console.error("error launching skin id", skinId, info);
            _this.skins[skinId].isSelecting = false;
          }
          else{
            _this.skins[skinId].IsActive = true;
          }
          if (typeof callback == 'function') {
            callback(info);
          }

        });


      };


      _this.getSkinTotalDownloads = function (skinId, callback) {
        AppsService.getAppTotalDownloads(skinId,callback);
      };

      _this.markAllSkinsAsUnactive = function(){
        for(var key in _this.skins){
          _this.skins[key].IsActive = false;
          _this.skins[key].isSelecting = false;
        }
      };

      _this.reloadSkinsInfo = function () {
        var deferred = $q.defer();

        _this.initLocalItems(function () {
          deferred.resolve();
        });

        return deferred.promise;
      };

      return _this;
    })
})(angular);
