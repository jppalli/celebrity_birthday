(function(angular) {
  'use strict';

  angular.module('overwolf')
    .controller('AppsController',
      ['$scope', '$rootScope', '$attrs', 'AppsService', 'GeolocationService',
        'TrackingService', 'GamesService', 'UserService',
      function ($scope, $rootScope, $attrs, AppsService, GeolocationService,
                TrackingService, GamesService, UserService) {
        let _this = this;

        $scope.appsService = AppsService;
        $scope.curApp = {};
        $scope.curApp.isInstalling = false;
        $scope.usedService = null;
        $scope.userService = UserService;

        let _installingTextTimeout = null;

        _this.init = function () {
          $scope.$on("ItemsUpdated", function(){
            AppsService.getAppById($scope.curApp.UID, function (app) {
              _this.reserveAppOrigin(app);
              $scope.curApp.isInstalled = ($scope.curApp.InstallState == "Installed");
            })
          })
        };

        _this.openLoginPage = function openLoginPage(openState){
          $rootScope.$broadcast('owModal.open', {
            templateUrl: "templates/login-modal.html",
            container: "login",
            controllerScopeParams: {openState: openState, source: "app"}
          });
        };

        _this.reserveAppOrigin = function (app) {
          var origin = $scope.curApp.origin;
          var _app = JSON.parse(JSON.stringify($scope.curApp));
          const appName = _app.appName ? _app.appName : _app.Name;
          $scope.curApp = app;
          $scope.curApp.origin = origin;
          if (!$scope.curApp.Name) {
            $scope.curApp.Name = appName;
          }

        };

        $scope.setApp = function (uid, appFilterObj, appInfo) {

          $scope.usedService = AppsService;

          if(appFilterObj.geoFilter) {
            _this.setGeoVisibility(appFilterObj.geoFilter)
          }

          $scope.curApp.UID = uid;
          if(appInfo) {
            $scope.curApp.appName = appInfo.title;
            $scope.curApp.origin = { 
              shelf: appInfo.shelf,
              page: appInfo.page,
              carousel: appInfo.carousel,
              isOneApp: false
            };
          }

          AppsService.getAppById(uid, function (app) {
            _this.reserveAppOrigin(app);
            $scope.curApp.isInstalled = ($scope.curApp.InstallState == "Installed");

            AppsService.getAppTotalDownloads(uid, function (appDownloads) {
              $scope.curApp.totalDownloads = parseInt(appDownloads).toLocaleString('en') + " ";
              //$scope.$apply();
            })

          });

          $scope.$on("appInstallStarted", function(evt, appId){
            if(appId == $scope.curApp.UID){

              $scope.curApp.isInstalling = true;
              $scope.curApp.isUninstalling = false;
              $scope.curApp.installError = false;

              console.log("APP INSTALL EVENT FOR " + $scope.curApp.UID);
            }
          });

          $scope.$on("appInstallFailed", function(evt, appId){
            if(appId == $scope.curApp.UID){

              $scope.curApp.isInstalling = false;
              $scope.curApp.isUninstalling = false;
              $scope.curApp.installError = false;

              console.log("APP INSTALL FAIL EVENT FOR " + $scope.curApp.UID);
            }
          });

          $scope.$on("appUninstallStarted", function(evt, appId){
            if(appId == $scope.curApp.UID){

              $scope.curApp.isUninstalling = true;
              $scope.curApp.isInstalling = false;
              $scope.curApp.installError = false;

              console.log("APP UNINSTALL EVENT FOR", $scope.curApp.UID);
            }
          });

          $scope.$on("appRemoveFromDockStarted", function(evt, appId){
            if(appId == $scope.curApp.UID){
              console.log("APP REMOVE FROM DOCK EVENT FOR", $scope.curApp.UID);
            }
          });

          $scope.$on("appAddToDockStarted", function(evt, appId){
            if(appId == $scope.curApp.UID){
              console.log("APP ADD TO DOCK EVENT FOR", $scope.curApp.UID);
            }
          });

          $scope.$watch("curApp", function(newVal, oldVal){
            if(!newVal.totalDownloads){
              newVal.totalDownloads = oldVal.totalDownloads;
            }
          });

        };

        $scope.installApp = function () {
          console.log("Trying to install app " + $scope.curApp.UID + "from" +
            " app tile");

          _installingTextTimeout = setTimeout(function () {
            $scope.curApp.isInstalling = true;
          }, 500);
          let extra = {
            appId: $scope.curApp.UID,
          }
          TrackingService.trackEvent("App","Install",null, 0, "tile", extra, false);
          if (typeof(mixpanel) !== 'undefined') {
            mixpanel.track('Download_Clicked', {
              'App ID': $scope.curApp.UID,
              'App name':  $scope.curApp.Name,
              'Component': "App preview",
              'Platform': window.storePlatform
            });
          }
          AppsService.installApp($scope.curApp.UID, function (result) {
            console.log("Install app result " + JSON.stringify(result));
            clearTimeout(_installingTextTimeout);
            $scope.curApp.isInstalling = false;
            if (result.status === "success") {
              $scope.curApp.isInstalled = true;
              $scope.curApp.installError = false;
            }
            else {
              $scope.curApp.isInstalled = false;
              if(result.error === "Not signed in.") {
                console.log("Not logged in - opening log in window");
                $rootScope.installAppLoginFlow = true;
                $scope.appWaitingForLogin = $scope.curApp.UID;
                _this.openLoginPage("login");
              }
              else if(result.error === "Unverified") {
                console.log("Not verified - opening log in window");
                $rootScope.installAppLoginFlow = true;
                $scope.appWaitingForVerification = $scope.curApp.UID;
                _this.openLoginPage("verification");
              }
              else if(result.error === "Suspended") {
                $rootScope.$broadcast('owModal.open', {
                  templateUrl: "templates/login-modal.html",
                  container: "login",
                  strictClose: true,
                  controllerScopeParams: {openState: "suspended", source: "welcome"}
                });
              }
              else {
                $scope.curApp.installError = true;
                console.error("Unable to install app");
              }
            }
            $scope.$digest();
            $scope.curApp.isInstalling = false;
          },
          $scope.curApp.origin);
        };

        $scope.launchApp = function () {
          AppsService.launchApp($scope.curApp.UID);
        };

        $scope.openGamePageUrl = function (linkObj) {
          GeolocationService.openLinkAccordingToLocation(linkObj);
        };


        $scope.setGame = function (gameFilterObj, gameId) {
          $scope.usedService = GamesService;
          let extra = {
            appId: "N/A"
          }

          TrackingService.trackEvent("OneApp","Open",null, 2, null, extra, false);
          if (gameFilterObj.geoFilter) {
            _this.setGeoVisibility(gameFilterObj.geoFilter)
          }

          GamesService.getGameById(gameId, function(game){
            if(!game.notLocal) {
              console.log("SETTING");
              $scope.curGame = game;
            }
          });
        };

        $scope.launchGame = function(){
          OverwolfStore.games.launchGame($scope.curGame.GameId, function(result){
            console.log("Game launch result", result);
          });
        };

        $scope.resetInstallError = function(){
          $scope.curApp.installError = false;
          $scope.curApp.isInstalled = false;
          $scope.curApp.isInstalling = false;
          AppsService.resetInstallError($scope.curApp.UID);
        };

        _this.setGeoVisibility = function (geoFilter) {
          GeolocationService.shouldShowToUsersGeo(geoFilter, function (result) {
            if(!result){
              $scope.usedService.numOfHiddenItems++;
            }
            $scope.shouldShowToGeo = result;
          });
        };

        $scope.$on("$destroy", function(){
          if($scope.shouldShowToGeo === false){
            $scope.usedService.numOfHiddenItems--;
          }
        });

        //Web download

        $scope.web_installApp = function(){
          let extra = {
            appId: $scope.curApp.UID,
          }
          TrackingService.trackEvent("App","Web_Install",null, 0, "tile", extra);
          if (typeof(mixpanel) !== 'undefined') {
            mixpanel.track('Download_Clicked', {
              'App ID': $scope.curApp.UID,
              'App name': $scope.curApp.appName,
              'Component': "App preview",
              'Platform': 'Web'
            });
          }
          $scope.appsService.webAppInstall($scope.curApp.UID, $scope.curApp.appName);

        };

        $scope.$watch("userService.isLoggedIn", function (newVal) {
          if(typeof newVal !== 'undefined' && newVal !== null){
            _readyForInstall(newVal);
          }
        });

        $scope.$watch("userService.verified", function (newVal) {
          if(typeof newVal !== 'undefined' && newVal !== null){
            _readyForInstall(newVal);
          }
        });

        function _readyForInstall(newVal) {
          if(newVal) {
            if ($scope.appWaitingForVerification && $scope.appWaitingForVerification === $scope.curApp.UID) {
              console.log("app " + $scope.curApp.UID + " was waiting for" +
                " verification, installing");
              $scope.appWaitingForVerification = null;
              $scope.installApp();
            }

            if ($scope.appWaitingForLogin && $scope.appWaitingForLogin === $scope.curApp.UID) {
              console.log("app " + $scope.curApp.UID + " was waiting for" +
                " login, installing");
              $scope.appWaitingForLogin = null;
              $scope.installApp();
            }
          }
        }

        $rootScope.$on("closeAppModal", function () {
          $scope.appWaitingForLogin = null;
          $scope.appWaitingForVerification = null;
        });

        _this.init();
      }
      ])
})(angular);
