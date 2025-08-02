(function (angular) {
  'use strict';

  angular.module('overwolf')
    .controller('WindowController', ['$scope', '$rootScope', '$location', 'TrackingService', 'CategoryRetainService', 'UserService',
      function ($scope, $rootScope, $location,
        TrackingService, CategoryRetainService,
        UserService) {
        function _isSignificantMouseMove(event) {
          if (!_this.initialMousePosition) {
            return false;
          }

          var x = event.clientX;
          var y = event.clientY;
          var diffX = Math.abs(x - _this.initialMousePosition.x);
          var diffY = Math.abs(y - _this.initialMousePosition.y);
          var isSignificant = (diffX > SIGNIFICANT_MOUSE_MOVE_THRESHOLD) ||
            (diffY > SIGNIFICANT_MOUSE_MOVE_THRESHOLD);

          return isSignificant;
        }

        var SIGNIFICANT_MOUSE_MOVE_THRESHOLD = 8;
        var kAppModalSections = ["subscriptions", "reviews"];
        var _this = this;
        _this.localizationUrlPart = (StringsLoader.getCurrentLocale() == "en" ? "" : '.locales/' + StringsLoader.getCurrentLocale() + "/");
        _this.doDrag = true;

        $scope.isMaximized = false;
        $scope.isDockVisibile = false;

        _this.init = function () {
          console.log(`window init. location: ${$location.path()}`);

          const keys = Object.keys($location.$$search);
          for (const key in keys) {
            if (keys[key].startsWith('overwolfstore://')) {
              setTimeout(() => {
                _this.onAppLaunchTriggered({
                  origin: 'urlscheme',
                  parameter: keys[key]
                });
              }, 1000);
            }
          }

          _this.isMouseDown = false;
          _this.isDragging = false;
          _this.initialMousePosition = null;

          TrackingService.trackEvent("Store", "Action", "open");
          $scope.updateDockVisibilityState();

          $rootScope.overlaySettingsSupported = true;
          $rootScope.$on('openOverlaySettings', function (evt, app) {
            window.location.href =
              'overwolf://settings/games-overlay/#trigger=one_app_page&app-id=' + app.UID;
          });

          $rootScope.$on('openGameAppsPage', function (evt, link) {
            $scope.changeSection("store");
            _this.onNavigationRequest({
              section: link
            });
          });

          $rootScope.$on('ShowFpsSettings', function (evt) {
            $scope.showSettings("hotkeys#Enable_Disable_FPS_Monitor");
          });

          OverwolfStore.onNavigateToSectionRequired.removeListener(_this.onNavigationRequest);
          OverwolfStore.onNavigateToSectionRequired.addListener(_this.onNavigationRequest);

          if (typeof(overwolf) !== 'undefined') {
            overwolf.extensions.onAppLaunchTriggered.removeListener(_this.onAppLaunchTriggered);
            overwolf.extensions.onAppLaunchTriggered.addListener(_this.onAppLaunchTriggered);
          }

          OverwolfStore.onDockVisibilityChanged.addListener(function (state) {
            $scope.isDockVisibile = state.is_visible;
            $scope.$apply()
          });

          OverwolfStore.window.onWindowStateChanged.addListener(function (info) {
            $scope.isMaximized = (info.window_state == "Maximized" ? true : false);
            $scope.$apply();
          });



          OverwolfStore.window.getWindowRestoreState(function (info) {
            $scope.isMaximized = (info.window_state == "maximized" ? true : false);
          });

          // catch location used to open the store, for flows where we want to
          // open the store with login window
          let path = $location.path();
          let isLogin = path.indexOf("login") >= 0;
          let isSignup = path.indexOf("signup") >= 0;
          let isChangePassword = path.indexOf("change-password") >= 0;
          if (isLogin || isSignup || isChangePassword) {
            $rootScope.loginopenState = isLogin ? "login" : isSignup ? "signup" : isChangePassword ? "change-password" : "login";
            // console.log(`$rootScope.loginopenState: ${$rootScope.loginopenState}`);

            // the current location is /login/, so navigate to store main page
            console.log("CHANGING STATE TO STORE");
            $scope.changeSection("store");
          }

          if (typeof(overwolf) !== 'undefined') {
            overwolf.windows.bringToFront(true, console.log);
          }
        };

        _this.onNavigationRequest = function (info) {
          let newPath = '/' + info.section;
          console.log("Navigate to section called", info, "opener", OverwolfStore.opener);
          if (info && typeof(overwolf) !== 'undefined') {
            overwolf.windows.bringToFront(true, console.log);
          }

          let owModalOpenOptions = {};
          let shouldOpenModal = false;

          // Check if we need to open one app page, and whether we want to see
          // subscription or reviews sections.
          // The info object structure is a bit confusing: for opening one app
          // modal, info.section will be "app" and info.category will be the
          // extension id. For subscriptions and reviews, info.section will be
          // "subscriptions" or "reviews", and info.category will be the extension
          // id
          if (_isAppModalSection(info)) {
            let appId;
            let section

            if (info.section === "app") {
              section = "app";
              appId = info.category;
            } else {
              section = info.category;
              appId = info.section;
            }

            if (appId === 'nafihghfcpikebhfhdhljejkcifgbdahdhngepfb') {
              appId = 'flkgdpkkjcoapbgmgpidhepajgkhckpgpibmlclb';
            }

            owModalOpenOptions.templateUrl =
              `${$rootScope.serverBase}ContentExtract/SingleAppPageById/${_this.localizationUrlPart}app-editor/${appId}`;
            owModalOpenOptions.container = 'app';
            owModalOpenOptions.section = section;
            owModalOpenOptions.extra = info.extra;
            owModalOpenOptions.origin = info.origin != null ? {
              isOneApp: true,
              extension: info.origin
            } : null;
            shouldOpenModal = true;
          }

          if (info.section === "login" || info.section === "signup" ||
            info.section === "change-password" ||
            info.section === "verification") {

            if (UserService.isLoggedIn &&
              (info.section !== "change-password") &&
              (info.section !== "verification")) {
              return;
            }

            owModalOpenOptions.templateUrl = 'templates/login-modal.html';
            owModalOpenOptions.container = 'login';
            owModalOpenOptions.controllerScopeParams = {
              openState: info.section,
              source: "welcome"
            };

            shouldOpenModal = true;

            $rootScope.$broadcast("loginModalRequest");
          }

          if (owModalOpenOptions.templateUrl &&
            $rootScope.lastModalTemplateUrl &&
            owModalOpenOptions.templateUrl === $rootScope.lastModalTemplateUrl) {
            return;
          }

          $rootScope.$broadcast("closeAllModals");

          if ($rootScope.splashShowing) {
            $rootScope.removeSplash();
          }

          if (info.section === 'apps') {
            $scope.changeSection('store');
            setTimeout(() => {
              $location.path(info.section + "/" + info.category);
            }, 100);

            return;
          }

          if (info.category === 'skins' && info.section === 'library') {
            $scope.changeSection('library');
            setTimeout(() => {
              $rootScope.$broadcast('openSkinsLibraryPage');
            }, 100);

            return;
          }

          if (shouldOpenModal) {
            $rootScope.$broadcast('owModal.open', owModalOpenOptions);
          }

          if (info.category) {
            newPath += "/" + info.category + "/";
          }

          $scope.$apply();
        };

        $scope.updateDockVisibilityState = function () {
          $scope.dockVisibilityUpdating = true;
          OverwolfStore.getDockVisibilityStatus(function (dockStatus) {
            $scope.isDockVisibile = dockStatus.isVisible;
            $scope.dockVisibilityUpdating = false;
            $scope.$apply();
          });
        };

        $scope.close = function () {
          // calling OverwolfStore.window.close() immediately as the
          // OverwolfStore API does not close the window but
          // only hides it for a few seconds and then close it
          // so the tracking will still pass through.
          // we call OverwolfStore.window.close() right away
          // for UX reasons.
          OverwolfStore.window.close();

          if ($rootScope.signupOrLoginOpen) {
            TrackingService.trackOnce('nu_store_window_closed');
          }

          TrackingService.trackEvent("Store", "action", "exit");
          $rootScope.$broadcast("StoreIsClosing");
        };

        $scope.shutDownOverwolf = function () {
          OverwolfStore.shutDownOverwolf(true);
        };

        $scope.minimize = function (evt) {
          OverwolfStore.window.minimize();
        };

        $scope.toggleMaximize = function () {
          if (!$scope.isMaximized) {
            OverwolfStore.window.maximize()
          }
          else {
            OverwolfStore.window.restore()
          }
        };

        $scope.showDock = function () {
          $rootScope.$emit("UserActionStarted");
          OverwolfStore.showDock();
          $scope.isDockVisibile = true;
        };

        $scope.hideDock = function () {
          $rootScope.$emit("UserActionStarted");
          OverwolfStore.hideDock();
          $scope.isDockVisibile = false;
        };

        $scope.onMouseDown = function (evt) {
          if (evt.button == 0) {
            _this.isMouseDown = true;
            _this.initialMousePosition = {
              x: evt.clientX,
              y: evt.clientY
            };
          }
        };

        $scope.onMouseUp = function () {
          _this.isDragging = false;
          _this.isMouseDown = false;
          _this.initialMousePosition = null;
        };

        $scope.onMouseMove = function (evt) {
          if (_this.isMouseDown && _isSignificantMouseMove(evt)) {
            _this.isDragging = true;
            _this.isMouseDown = false;
            OverwolfStore.window.dragMove();
          }
        };

        $scope.showSettings = function (path) {
          TrackingService.trackEvent("Store", "action", "settings");
          $rootScope.$emit("UserActionStarted");
          let href = "overwolf://settings";
          if (path) {
            href += "/" + path;
          }
          window.location.href = href;
        };

        $scope.showSupport = function () {
          TrackingService.trackEvent("Store", "action", "support");
          $rootScope.$emit("UserActionStarted");
          OverwolfStore.apps.launchApp("geajlfbgmkaklkojofefpgnnjcceibhakfjhfefk");
        };

        //not working
        // $scope.openCreateBanner = function () {
        //   OverwolfStore.openUrlInDefaultBrowser("https://www.overwolf.com/creators/build-an-app/?utm_source=web_appstore&utm_medium=banner&utm_campaign=devrel_0622");
        //   console.log('banner bap')
        // }

        $scope.showDiscord = function () {
          OverwolfStore.openUrlInDefaultBrowser("https://discord.gg/yChRMBQ");
        }

        $scope.changeSection = function (section) {
          if (section === "store") {
            $rootScope.$broadcast("owSelectMenuItem", "store");
            section = CategoryRetainService.lastStoreCategory ? CategoryRetainService.lastStoreCategory : null;
          }
          else {
            $rootScope.$broadcast("owSelectMenuItem", "library");
          }

          if (!section) {
            $location.path('/');
            return;
          }

          var retainedCategory = CategoryRetainService.get(section);
          if (retainedCategory) {
            console.log("passing to retain category", retainedCategory);
            //$location.path("//files/" + section + "/" + retainedCategory);
            $location.path(section + "/" + retainedCategory);
          }
          else {
            //$location.path("//files/" + section);
            $location.path(section);
          }
        };

        $scope.resendVerification = function () {
          UserService.resendVerification(UserService.email, function (result) {
            $rootScope.$broadcast('owModal.open', {
              templateUrl: "templates/login-modal.html",
              container: "login",
              controllerScopeParams: { openState: "verification", source: "welcome" }
            });
          });
        };

        function _isAppModalSection(info) {
          return info.section === "app" || kAppModalSections.indexOf(info.category) >= 0;
        }

        _this.onAppLaunchTriggered = function (info) {
          console.log("onAppLaunchTriggered", info);
          if (info == null || info.origin !== 'urlscheme') {
            return;
          }

          const params = _this.decodeUrlSchemeParams(info);
          if (!params) {
            return;
          }

          _this.onNavigationRequest(params);
        }

        _this.decodeUrlSchemeParams = function (info) {
          const decodedUrl = decodeURIComponent(info.parameter);
          const url = new URL(decodedUrl);
          const urlParts = url.pathname.split('/');
          const params = {origin: info.origin};
          if (urlParts[2] !== 'app') {
            return null;
          }

          if (urlParts[3]) {
            params.section = urlParts[3];
            if (isUnsupportedUrlPart(params.section)) {
              return null;
            }
          }

          if (urlParts[4]) {
            params.category = urlParts[4];
            if (isUnsupportedUrlPart(params.category)) {
              return null;
            }
          }

          if (urlParts[5]) {
            params.extra = {
              id: urlParts[5]
            };
          }

          return params;
        }

        function isUnsupportedUrlPart(part) {
          if (!part || part.length > 40) {
            return true;
          }

          if (part.length === 40 && !/^[a-z]+$/.test(part)) {
            return true;
          }

          if (part.includes('.')) {
            return true;
          }

          return false;
        }

        _this.init();
      }]);
})(angular);
