(function (angular) {
  'use strict';

  angular.module('overwolf')
    .controller('ConnectionController', [
      '$scope', '$rootScope', '$interval', '$route',
      '$routeParams', '$location', 'ngProgress', '$timeout', 'TrackingService',
      'CategoryRetainService', 'AppsService', 'SkinsService',
      function ($scope, $rootScope, $interval, $route,
      $routeParams, $location, ngProgress, $timeout, TrackingService,
      CategoryRetainService, AppsService, SkinsService) {
      var _this = this;

      $scope.retryTimeLeft = 60;
      $scope.hasConnection = true;
      _this.retryInterval = null;
      _this.tries = 0;
      _this.retryTimeStep = 60;


      _this.init = function () {

        $rootScope.serverBase = (window.owStoreUseServerBase ? window.owStoreUseServerBase : "https://storeclient.overwolf.com/");
        $rootScope.apiBase = (window.owStoreUseApiBase ? window.owStoreUseApiBase : "https://storeapi.overwolf.com/");
        $rootScope.webResourceBase = window.owResourceBase || "";
        $rootScope.urlLocalizationPart = (StringsLoader.getCurrentLocale() == "en" ? "" : '.locales/' + StringsLoader.getCurrentLocale() + "/");

        if (sessionStorage.environmentInfo) {
          info = JSON.parse(sessionStorage.environmentInfo);
          console.log("USING STORED CONFIGURATION PARAMS" + JSON.stringify(info));
        }

        if (localStorage.forceServerBase) {
          $rootScope.serverBase = localStorage.forceServerBase;
        }

        setTimeout(function () {
          if (OverwolfStore.launchedWithServerTesting) {
            sessionStorage.launchedWithServerTesting = OverwolfStore.launchedWithServerTesting
          }

          if (sessionStorage.launchedWithServerTesting) {
            $route.reload();
            $rootScope.currentEnv = sessionStorage.launchedWithServerTesting.substring(3);
          }
        }, 1000)

        $(document).ready(function () {
          var date = new Date();
          console.log("DOCUMENT READY " + date.toLocaleString() + "." + date.getMilliseconds());
        });
        $(window).load(function () {
          var date = new Date();
          console.log("WINDOW LOAD " + date.toLocaleString() + "." + date.getMilliseconds());
        });
      };

      _this.init();


      $rootScope.$on("$routeChangeStart", function (e) {
        console.log("ROUTE CHANGE STARTED");
        $interval.cancel(_this.retryInterval);
        $scope.hasConnection = true;
        $scope.retryTimeLeft = 60;
        if (!$rootScope.splashShowing) {
          console.log("Starting progress from connection controller route change start");
          ngProgress.start();
        }

      });

      $rootScope.$on("$routeChangeError", function (e, info) {
        console.log("Route change error", e);
        if ($("div[ng-view]").length == 0) {
          $rootScope.$emit("errorOccurred", { error: "__MSG_NoConnection__" });
        }

        _this.resetOtherPendingActions();
        _this.onConnectionLost()

        console.error("route error: " + info.$$route.originalPath + " | " + info.$$route.templateUrl);
        console.log("Complete progress from connection ctrl route change error");
      });

      $rootScope.$on("$routeChangeSuccess", function () {
        console.log("route " + JSON.stringify($route.current.params));
        console.log("location " + $location.path());
        if ($route.current) {
          let extra = {
            page: $scope.curApp ? $scope.curApp.UID :  null,
          }

          TrackingService.trackEvent("Page", "Load", null, 1, null, extra, false);
          CategoryRetainService.set($route.current.params.section, $route.current.params.category);
        }

        _this.onConnectionRestored();

        let path = $location.path();
        // console.log(`isHomePage ${path}`)
        //hide/show create banner using js === $scope state not working...
        if(path === '/search' || path.includes('library')){
          document.getElementById('createBanner').style.display = 'none';
        } else {
          document.getElementById('createBanner').removeAttribute("style");
        }

      });

      $rootScope.$on("owModal.loaded", function () {
        _this.pendingModalInfo = null;
        _this.onConnectionRestored();
      });

      OverwolfStore.apps.onAppInstallationProgressChanged.addListener(function () {
        //for now this function doesn't really work as described by its name. Only called once with 0 per cent once app is starting to install.
        //in the future we MIGHT want to only register to listener once we have app install connection error, and unregister once connection was restored.
        _this.onConnectionRestored();
      });

      OverwolfStore.skins.onSkinInstalled.addListener(function () {
        _this.onConnectionRestored();
      });

      _this.onConnectionRestored = function () {
        $scope.hasConnection = true;
        _this.tries = 0;
        if (!$rootScope.splashShowing) {
          ngProgress.complete();
          console.log("Stopping progress from connection ctrl route change success");
        }
        if (!$rootScope.navBarLoaded) {
          $timeout(function () {
            var oldBase = $rootScope.serverBase;
            $rootScope.serverBase = null;
            $scope.$apply();
            $rootScope.serverBase = oldBase;
          }, 500)

        }

      }

      $rootScope.$on("modalLoadError", function (evt, modalInfo) {
        _this.resetOtherPendingActions();
        _this.pendingModalInfo = modalInfo;
        _this.onConnectionLost();
      });

      $rootScope.$on("appInstallConnectionError", function (evt, appInfo) {
        $rootScope.$broadcast("owModal.deactivateAll");
        _this.resetOtherPendingActions();
        _this.pendingAppInstall = appInfo;
        _this.onConnectionLost();
      });


      _this.onConnectionLost = function () {
        ngProgress.complete();
        $scope.hasConnection = false;
        $scope.retryTimeLeft = ++_this.tries * _this.retryTimeStep;

        $interval.cancel(_this.retryInterval);
        _this.retryInterval = $interval(function () {
          --$scope.retryTimeLeft;
          if ($scope.retryTimeLeft < 0) {
            $scope.tryNow();
            $interval.cancel(_this.retryInterval);
          }
        }, 1000)
      };

      _this.resetOtherPendingActions = function () {
        if (_this.pendingAppInstall) {
          AppsService.resetInstallError(_this.pendingAppInstall.UID);
        }
        _this.pendingAppInstall = null;
        _this.pendingModalInfo = null;
      };

      $scope.tryNow = function () {
        if (_this.pendingModalInfo) {
          $rootScope.$broadcast('owModal.open', {
            templateUrl: _this.pendingModalInfo.url,
            container: _this.pendingModalInfo.container
          });
        }
        else if (_this.pendingAppInstall) {
          var installFunction = (_this.pendingAppInstall.type == "app" ? AppsService.installApp : SkinsService.installSkin);
          installFunction(_this.pendingAppInstall.UID, function (info) {

            if (info.status != "error") {
              _this.pendingAppInstall = null;
              _this.onConnectionRestored();
            }

          });
        }
        else {
          $route.reload();
        }
      }
    }]);

})(angular);