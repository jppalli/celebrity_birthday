(function (angular) {
  angular.module('overwolf')
    .controller('LibraryController',
      ['$scope', '$rootScope', '$location', '$routeParams', '$q', 'UserService', '$timeout', 'MomentService',
        'ngProgress', 'TrackingService', 'SkinsService', 'AppsService', 'CategoryRetainService',
        function ($scope, $rootScope, $location, $routeParams, $q, UserService, $timeout, MomentService,
                                              ngProgress, TrackingService, SkinsService, AppsService, CategoryRetainService) {

        function showDockIfNeeded() {
          console.log('$rootScope.dockWasShownThisSession = ' + $rootScope.dockWasShownThisSession)
          if ($rootScope.dockWasShownThisSession) {
            return;
          }

          OverwolfStore.wasOpenedByDock(function (response) {
            console.log('response.wasOpenedByDock = ' + response.wasOpenedByDock)

            if (response.wasOpenedByDock) {
              return;
            }

            OverwolfStore.getDockVisibilityStatus(function (response) {
              console.log('response.isVisible = ' + response.isVisible)

              if (response.isVisible) {
                return;
              }

              OverwolfStore.showDock();
              $rootScope.dockWasShownThisSession = true;
              console.log('showed dock')
            });
          });
        }

        var _this = this;
        _this.updateAppFinishd = false;

        _this.init = function () {
          $scope.mode = 'loading';
          $scope.installFilter = "";
          $scope.skinInstallFilter = "";
          $scope.userService = UserService;
          $scope.displayMode = "";
          $scope.previewSkin = null;
          $scope.appIdFromRoute = $routeParams.appId;

          $scope.localSkins = [];

          $rootScope.$on("splashRemoved", function () {
            $rootScope.$broadcast("owSelectMenuItem", "library_" + $scope.displayMode);
          });

          $scope.$watch("userService.isLoggedIn", function (newVal, oldVal) {
            if(typeof newVal !== 'undefined' && newVal !== null) {
              _readyForInstall(newVal);
            }
          });

          $scope.$watch("userService.verified", function (newVal, oldVal) {
            if(typeof newVal !== 'undefined' && newVal !== null) {
              _readyForInstall(newVal);
            }
          });

          function _readyForInstall(newVal) {
            updateApps();
            updateSkins();

            if(newVal){
              if($scope.appWaitingForLogin){
                console.log("app " + $scope.appWaitingForLogin +
                  " was waiting for login, installing");
                $scope.installApp($scope.appWaitingForLogin);
                $scope.appWaitingForLogin = null;
              }

              if($scope.appWaitingForVerification){
                console.log("app " + $scope.appWaitingForVerification +
                  " was waiting for verification, installing");
                $scope.installApp($scope.appWaitingForVerification);
                $scope.appWaitingForVerification = null;
              }

              if($scope.skinWaitingForLogin){
                console.log("skin " + $scope.skinWaitingForLogin +
                  " was waiting for login, installing");
                $scope.installSkin($scope.skinWaitingForLogin);
                $scope.skinWaitingForLogin = null;
              }

              if($scope.skinWaitingForVerification){
                console.log("skin " + $scope.skinWaitingForVerification +
                  " was waiting for verification, installing");
                $scope.installSkin($scope.skinWaitingForVerification);
                $scope.skinWaitingForVerification = null;
              }
            }
          }

          $scope.getApps = function(){
            let apps = AppsService.getItemsAsArray();

            // NOTE (iter 119.1 - Game Summary as an App):
            // this is a hack to show the version of Game Summary instead
            // of the Game Summary launcher
            // the problem with the following loop is the async. nature of the
            // call to get the app data and it shows the correct version in the
            // library eventually because we're dealing with an array (the
            // function will return before getting the correct version)
            // it's a quick-and-dirty fix, consider changing this function (|getApps()|)
            // to be async. with callback/promise and change the references
            // accordingly
            for (let app of apps) {
              if (app.UID === "flkgdpkkjcoapbgmgpidhepajgkhckpgpibmlclb") {
                // this is the Game Summary Launcher app
                AppsService.getAppByIdInternal('nafihghfcpikebhfhdhljejkcifgbdahdhngepfb', function (response) {
                  // replace Game Summary Launcher version with Game Summary version
                  if (response.data) {
                    app.Version = response.data.Version
                  }
                });

                return apps;
              }
            }

            return apps;
          };

          $scope.getSkins = function() {
            let items = SkinsService.getItemsAsArray();
            let filteredSkins = [];

            if (items != null || items.length > 0) {
              filteredSkins = items.filter(item => item.AppType === 2)
            }

            return filteredSkins;
          };

          $scope.appOverlaySettingsClick = function (app) {
            window.location.href =
              'overwolf://settings/games-overlay/#trigger=app&app-id=' + app.UID;
          };

          $scope.openOneAppPage = function(uid) {
            if (typeof(overwolf) !== 'undefined') {
              overwolf.utils.openStoreOneAppPage(uid);
            }
          };

          OverwolfStore.getDockConnectionState(function (info) {
            if (info.connectionState == "Connected") {
              $scope.setMode($routeParams.category);
            }
            else {
              $scope.setMode("loading");

              ngProgress.reset();
              ngProgress.setClass("ftue");
              ngProgress.updateCount(0);
              ngProgress.start();
              console.log("Starting progress from library dock connection state changed");


              var onConnectionChanged = function (info) {
                if(info.connectionState == "Connected") {
                  console.log("Stopping progress from library connection state changed");
                  ngProgress.complete();

                  $timeout(function(){
                    OverwolfStore.onDockConnectionStateChanged.removeListener(onConnectionChanged);
                    ngProgress.setClass("default");
                    $scope.setMode($routeParams.category, 'onDockConnectionStateChanged');
                  }, 1000)
                }
              };
              OverwolfStore.onDockConnectionStateChanged.addListener(onConnectionChanged)
            }
          });

          $rootScope.$broadcast("owSelectMenuItem", "library");

          $scope.setMode($routeParams.category);

          // if ($rootScope.splashShowing) {
            // UserService.showLogginIfUserIsLoggedOut();
          // }
        };

        _this.openLoginPage = function openLoginPage(openState){
          $rootScope.$broadcast('owModal.open', {
            templateUrl: "templates/login-modal.html",
            container: "login",
            controllerScopeParams: {openState: openState, source: "app"}
          });
        };

        $scope.setMode = function (newMode) {
          newMode = newMode || 'apps';
          $scope.mode = newMode;
        };

        $scope.$watch("mode", function (newVal, oldVar) {
          $scope.search = "";
          $rootScope.$broadcast("changeScrollAreaHeight", "100%");
          $scope.displayMode = newVal;
          CategoryRetainService.set("library", $scope.mode);
          $rootScope.$broadcast("libraryMode", newVal);

          if (newVal === "skins") {
            $rootScope.$broadcast("changeScrollAreaHeight", "calc(100% - 180px)");
            updateSkins();
          } else {
            updateApps();
          }
        });

        $rootScope.hideMenuNav = true;

        function updateApps() {
          $rootScope.$broadcast("owSelectMenuItem", "library_" + $scope.displayMode);
        }

        function updateSkins(){
          console.log("Updating skins");
          $rootScope.$broadcast("owSelectMenuItem", "library_" + $scope.displayMode);
          SkinsService.reloadSkinsInfo().then(function () {
            var skinId;
            SkinsService.getAllSkins(function(allSkins){
              $scope.localSkins = allSkins;
              console.log("GOT SKINS", allSkins);
              for(skinId in allSkins){
                if(allSkins[skinId].IsActive){
                  $scope.selectedSkin = allSkins[skinId];
                  $scope.previewSkin = allSkins[skinId];
                }
              }
            });
          })
        }

        $scope.setPreviewSkin = function(skinUid){
          SkinsService.getSkinById(skinUid, function(skin){
            $scope.previewSkin = skin;
          });
        };

        //****************************************** APPS ***********************************
        $scope.launchApp = function (appId) {
          $rootScope.$emit("UserActionStarted");
          OverwolfStore.apps.launchApp(appId, function (info) {
            if (info.status == "error") {
              console.error(info);
            }
          });
        };

        $scope.launchGame = function (gameId) {
          $rootScope.$emit("UserActionStarted");
          OverwolfStore.games.launchGame(parseInt(gameId), function (info) {
            if (info.status == "error") {
              console.error(info);
            }
          });
        };

        $scope.uninstallApp = function (appId) {
          $rootScope.$emit("UserActionStarted");
          // TrackingService.trackEvent("App","Uninstall",appId);
          console.log("uninstalling ", appId);

          OverwolfStore.apps.uninstallApp(appId, (res) => {
            if (res.status == 'success') {
              console.log('app uninstalled successfully');
            } else {
              console.log(`error uninstalling app - ${res.error}`);
            }
          });
        };

        $scope.installApp = function (appId) {
          console.log("Trying to install app " + appId + "from" +
            " library");

          showDockIfNeeded();
          $rootScope.$emit("UserActionStarted");
          OverwolfStore.apps.installApp(appId, function (result) {
            console.log("install app API result " + JSON.stringify(result));
            if (result.status === "success") {
              $rootScope.installAppLoginFlow = false;
              updateApps()
            }
            else {
              if(result.error === "Not signed in.") {
                console.log("Not logged in - opening log in window");
                $scope.appWaitingForLogin = appId;
                $rootScope.installAppLoginFlow = true;
                _this.openLoginPage("login");
              }
              else if(result.error === "Unverified") {
                console.log("Not verified - opening log in window");
                $scope.appWaitingForVerification = appId;
                $rootScope.installAppLoginFlow = true;
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
              console.error("trying to install app " + appId + " returned" +
                " error " + JSON.stringify(result))
            }
          });
          console.log("installing ", appId);
        };

        $scope.addAppToDock= function(appId){
          AppsService.addToDock(appId, function(result){
            console.log("add app ", appId, "from dock. result:", result);
          });
        };

        $scope.removeAppFromDock = function(appId){
          AppsService.removeFromDock(appId, function(result){
            console.log("remove app ", appId, "from dock. result:", result);
          });
        };

        $scope.desktopShortCutSupported = function (app) {
          return AppsService.desktopShortCutSupported(app);
        };

        $scope.hasDesktopShortcuts = function(app){
          return AppsService.hasDesktopShortcuts(app);
        };

        $scope.addDesktopShortcutForApp = function(appId){
          AppsService.addDesktopShortcut(appId);
        };

        $scope.removeDesktopShortcutForApp = function(appId){
          AppsService.removeDesktopShortcut(appId);
        };

        $scope.$on("$destroy", function () {
          $rootScope.hideMenuNav = false;
          $rootScope.$broadcast("changeScrollAreaHeight", "100%");
        });

        $scope.filterUninstalledUnpackedApps = function(value, index){
          if(value.InstallState == "Removed" && value.IsUnpacked){
            return false;
          }
          else{
            return true;
          }
        };

        //skins
        $scope.installSkin = function(skinId) {
          SkinsService.installSkin(skinId, function (res) {
            console.log("Install skin " + skinId + " result " + JSON.stringify(res));

            if(res.status === "error") {
              if (res.error === "Not signed in.") {
                $scope.skinWaitingForLogin = skinId;
                _this.openLoginPage("login");
              }
              else if (res.error === "Unverified") {
                $scope.skinWaitingForVerification = skinId;
                _this.openLoginPage("verification");
              }
            }
            $scope.$apply()
          });
        };

        $scope.launchSkin = function(skinId){
          if($scope.localSkins[skinId].InstallState != "Installed"){
            console.log("Launch skin called for uninstalled skin doing nothing");
            return;
          }
          else if ($scope.localSkins[skinId].IsActive) {
            console.log("Launch skin called for active skin doing nothing");
            return;
          }

          for(key in $scope.localSkins){
            $scope.localSkins[key].isSelecting = false;
          }//reset all skins selecting status (in case user clicked on other skin while on is already loading)

          $scope.localSkins[skinId].isSelecting = true;
          SkinsService.launchSkin(skinId, function(res){
            console.log("Launch skin", skinId, "result", res, "all", $scope.localSkins);
            if(res.status == "success") {
              $scope.selectedSkin = $scope.localSkins[skinId];
            }
            $scope.$apply()
          });
        };

        OverwolfStore.skins.onSkinLaunched.addListener(function(info){
          $scope.$apply();
        });

        $scope.uninstallSkin = function(skinId){
          if($scope.localSkins[skinId].IsActive) {
            $scope.launchSkin("ailaineddbcggdilmfpocafpolgfgfahfnmdbnlb")
          }

          SkinsService.unInstallSkin(skinId, function(res){
            console.log("Uninstalled skin", skinId, "result", res);
            updateSkins();
            $scope.$apply()
          });
        };

        $scope.filterSkinsInstallState = function(key, value) {
          console.log("FILTER CALLED", key, value);
        };

        $scope.skinsAsArray = function(){
          var retVal = [];
          for(var key in $scope.localSkins){
            retVal.push($scope.localSkins[key])
          }
          return retVal;
        };


        _this.init();
        $rootScope.preventSplash = true;
        if ($rootScope.splashShowing) {
          $rootScope.removeSplash();
        }

      $rootScope.$on("closeAppModal", function () {
        $scope.appWaitingForLogin = null;
        $scope.skinWaitingForLogin = null;
      });

      $rootScope.$on('openSkinsLibraryPage', function () {
        $scope.setMode("skins");
      });

      }
      ])
})(angular);
