(function (angular) {
  'use strict';

  OverwolfStore.getManifestData(function (data) {
    console.log("OVERWOLF STORE VERSION " + data.meta.version);
  });

  angular.module('overwolf')
    .controller('SplashController', ['$scope', '$rootScope', 'UserService', 'ngProgress', '$route', '$timeout', '$q', '$routeParams', 'TrackingService',
      function ($scope, $rootScope, UserService,
        ngProgress, $route, $timeout, $q, $routeParams,
        TrackingService) {

        let _this = this;
        this.routeInProgress = false;
        this.waitForRouteEndBeforeRemoving = false;

        _this.init = function () {
          _this.isMouseDown = false;
          _this.isDragging = false;

          $scope.userService = UserService;
          $rootScope.splashShowing = true;

          showFtueIfNeeded().then(function () {
            startSplashProgressBar();

            // login user if possible
            UserService.showLogginIfUserIsLoggedOut(
              false // but don't show login window after this check
            ).then(function () {
              if (_this.routeInProgress) {
                _this.waitForRouteEndBeforeRemoving = true;
                startSplashProgressBar();
              }
              else {
                removeSplash();
              }
            });
          });
        };


        $scope.onMouseDown = function (evt) {
          if (evt.button == 0) {
            _this.isMouseDown = true;
            _this.isDragging = false;
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
          if (_this.isMouseDown) {
            _this.isDragging = true;
            _this.isMouseDown = false;
            OverwolfStore.window.dragMove();
            evt.stopPropagation();
          }
        };

        $rootScope.$on("$routeChangeStart", function (e) {
          _this.routeInProgress = true;
        });

        $rootScope.$on("$routeChangeError", function (e) {
          _this.routeInProgress = false;
          if ($rootScope.splashShowing) {
            console.log("Completeing progress from connection route change error");
            ngProgress.complete();
            removeSplash();
          }
        });

        $rootScope.$on("$routeChangeSuccess", function (e) {
          _this.routeInProgress = false;
          if ($rootScope.splashShowing && $route.current && $route.current.loadedTemplateUrl) {
            ngProgress.stop();
          }
          if (_this.waitForRouteEndBeforeRemoving) {
            _this.waitForRouteEndBeforeRemoving = false;
            removeSplash();
          }
        });

        function showFtueIfNeeded() {
          let deffered = $q.defer();
          let fallbackTimeout = null;
          let windowElement = angular.element(window);
          let vidSplash;
          let vidSplashElement;

          function _ftueVideoEnded() {
            vidSplash.css("display", "none");
            deffered.resolve();
          }

          function _showFtueIfNeededInternal() {
            clearTimeout(fallbackTimeout);
            windowElement.off('load', _showFtueIfNeededInternal);

            UserService.getWasDockEverIntroduced(function (wasDockIntroducedAlready) {
              if (!wasDockIntroducedAlready || localStorage.forceFTUE == "true") {
                $timeout(function () {
                  ngProgress.hide();
                  vidSplash = angular.element('#vidSplash');
                  vidSplashElement = vidSplash[0];

                  vidSplashElement.addEventListener("ended", _ftueVideoEnded);
                  vidSplashElement.addEventListener("error", _ftueVideoEnded);

                  vidSplashElement.play().then(function () {
                    vidSplash.css("display", "block");
                    TrackingService.trackOnce('nu_splash');
                  }).catch(function () {
                    vidSplash.css("display", "none");
                    deffered.resolve();
                  });
                }, 1000);
              }
              else {
                deffered.resolve();
              }

              OverwolfStore.notifyStoreIsReady();
            });
          }

          // run starts here:
          windowElement.on('load', _showFtueIfNeededInternal);
          fallbackTimeout = setTimeout(_showFtueIfNeededInternal, 3000);

          return deffered.promise;
        }

        function startSplashProgressBar() {
          console.log("starting progress bar from splash controller function");
          ngProgress.setClass("ftue");
          ngProgress.start();
        }

        function removeSplash() {
          ngProgress.complete();
          console.log("completing progress from splash ctrl function");
          $timeout(function () {
            ngProgress.hide();
            ngProgress.setClass("default");
            $rootScope.splashShowing = false;
            $rootScope.$broadcast("splashRemoved");
            console.log("Splash removed");
          }, 600) // extra 600ms to allow progress bar animation to complete.
        }

        $rootScope.removeSplash = removeSplash;

        _this.init();

      }]);
})(angular);