/**
 * Created by Yoske on 01/10/2014.
 */
(function (angular) {
  'use strict';

  angular.module('overwolf')
    .controller('PageController',[
      '$scope', '$http', '$compile', '$rootScope', '$route', '$routeParams',
      'UserService',
      function ($scope, $http, $compile, $rootScope, $route, $routeParams, UserService) {

      var _this = this;
      _this.nextPageCache = null;
      _this.endReached = false;
      _this.busy = false;
      _this.waiting = false;
      _this.uuid;

      $rootScope.supportedFeatures = {
        search: true,
        reviews: true,
        skins: true
      };

      _this.init = function () {
        _this.uuid = UserService.getOverwolfUUID();
        console.log('page controller init');
        console.log('Route params: ' + JSON.stringify($routeParams));
        _this.pageNum = 2;
        //                _this.cacheNextPage();
        _this.openItemModalIfNeeded();
        _this.localizationUrlPart = (StringsLoader.getCurrentLocale() == 'en' ? '' : '.locales/' + StringsLoader.getCurrentLocale() + '/');

        // MIXPANEL tracking
        if (location.href.includes('game/')) {
          console.log('MIXPANEL --- Game_page_Initialized')
          console.log('Platform' + window.storePlatform);
          console.log('Game name ' + location.href.substring(location.href.indexOf('game/') + 5));
          if (typeof(mixpanel) !== 'undefined') {
            mixpanel.track('Game_page_Initialized', {
              'Platform': window.storePlatform,
              'Game name': location.href.substring(location.href.indexOf('game/') + 5)
            });
          }
        } else if (location.pathname.endsWith("index.html") || location.href.includes("appstore")) {
          console.log('Main_page_Initialized ' + window.storePlatform);

          _this.mixpanelMainPageInit = function(appCount) {
            if (typeof(mixpanel) !== 'undefined') {
              mixpanel.register({
              'installedApps': appCount,
              'logged_in': UserService.isLoggedIn,
            });
              mixpanel.track('Main_page_Initialized', {
                'Platform': window.storePlatform,
              });
            }

          }

          _this.mixpanelRegisterIdentifier = function(userId) {
            if (!userId) return;

            if (typeof(mixpanel) !== 'undefined') {
              mixpanel.identify(userId)
            }
          };

          _this.getUserId(_this.mixpanelRegisterIdentifier);

          _this.getDownloadedExtensionsCount(_this.mixpanelMainPageInit);

 
        }
      };

      _this.openItemModalIfNeeded = function () {
        _this.localizationUrlPart = (StringsLoader.getCurrentLocale() == 'en' ? '' : '.locales/' + StringsLoader.getCurrentLocale() + '/');

        if ($rootScope.isModalOpen) {
          if ($rootScope.totalRouteChanges > 1) {
            $rootScope.$broadcast('closeAllModals');
          }
          return;
        }

        if ($routeParams.appid) {
          try {
            $rootScope.removeSplash();
            $rootScope.preventSplash = true;
          } catch (e) {
          }

          var appId = $routeParams.appid;
          if (appId === 'nafihghfcpikebhfhdhljejkcifgbdahdhngepfb') {
            appId = 'flkgdpkkjcoapbgmgpidhepajgkhckpgpibmlclb';
          }

          var subscription = false;
          var section = '';
          if (location.href.indexOf('/subscriptions') >= 0) {
            section = 'subscriptions'
            subscription = true;
          } else if (location.href.indexOf('/reviews') >= 0) {
            section = 'reviews';
          }

          $rootScope.$broadcast('owModal.open', {
            templateUrl: $rootScope.serverBase + 'ContentExtract/SingleAppPageById/' + _this.localizationUrlPart + 'app-editor/' + appId,
            container: 'app',
            section: section,
            subscription: subscription
          });
        } else if ($routeParams.skinid) {
          try {
            $rootScope.removeSplash();
            $rootScope.preventSplash = true;
          } catch (e) {
          }

          $rootScope.$broadcast('owModal.open', {
            templateUrl: $rootScope.serverBase + 'ContentExtract/SingleSkinPage/' + _this.localizationUrlPart + 'skin-editor/' + $routeParams.skinid,
            container: 'app'
          });
        } else if ($routeParams.gameid) {
          try {
            $rootScope.removeSplash();
            $rootScope.preventSplash = true;
          } catch (e) {
          }

          $rootScope.$broadcast('owModal.open', {
            templateUrl: $rootScope.serverBase + 'ContentExtract/SingleAppPage/' + _this.localizationUrlPart + 'game-editor/' + $routeParams.gameid,
            container: 'app'
          });
        } else if ($routeParams.section) {

          if ($routeParams.category === 'reviews') {
            $rootScope.removeSplash();
            $rootScope.preventSplash = true;
            var extensionId = $routeParams.section;
            setTimeout(function () {
              $rootScope.$broadcast('owModal.open', {
                templateUrl: $rootScope.serverBase + "ContentExtract/SingleAppPageById/" + _this.localizationUrlPart + "app-editor/" + extensionId,
                container: 'app',
                section: 'reviews'
              });
            }, 500);
          } else if ($routeParams.section === 'verification') {
            $rootScope.removeSplash();
            $rootScope.preventSplash = true;
            setTimeout(function () {
              $rootScope.$broadcast('owModal.open', {
                templateUrl: 'templates/login-modal.html',
                container: 'login',
                controllerScopeParams: {
                  openState: 'verification',
                  source: 'welcome'
                }
              });
            }, 500);
          }
        }
      };

      $scope.loadNextPage = function () {
        if (_this.endReached) {
          return;
        }
        if (_this.nextPageCache) {
          $('#dvInfiniscroll').append($compile(_this.nextPageCache)($scope));
        }
        _this.nextPageCache = null;
        if (!_this.busy) {
          _this.cacheNextPage();
        } else {
          _this.waiting = true;
        }
      };


      _this.cacheNextPage = function () {

        _this.busy = true;
        var nextPageUrl = 'templates/page_mock.html?page=' + _this.pageNum;
//                var nextPageUrl = "http://urlecho.appspot.com/echo?status=200&Content-Type=text%2Fhtml&body=%3Cdiv%20style%3D%27height%3A300px%3B%20font-size%3A150px%3B%20z-index%3A30000%3B%20position%3Arelative%3B%20color%3Awhite%3B%27%3E !!!!!!PAGE " +_this.pageNum + "!!!!!!!!!!!!!%3C%2Fdiv%3E";
        $http({method: 'GET', url: nextPageUrl}).success(function (data) {
          _this.nextPageCache = data;
          _this.pageNum++;
          _this.busy = false;
          if (_this.waiting) {
            _this.waiting = false;
            $scope.loadNextPage();
          }

        }).error(function (data) {
          console.error('could not load next page data. assuming end eached');
          /* We might want to change this not to conclude that end is reached on every error,
          Instead, get a notification from the server about end. This means that server will return JSON
          with number of items left, plus the HTML of the items. Then we append we do something like if(data.numOfItems < pageSize) endReached = true
          also means that HTML should be a parameter in the JSON response*/
          _this.endReached = true;
        });
      };

      _this.getDownloadedExtensionsCount = function (callback) {
          let installedApps = [];
          let appsCount = 0;
          if (typeof overwolf !== 'undefined') {
            overwolfInternal.extensions.getDownloadedExtensions((res) => {
              installedApps = res.extensions;
              installedApps.forEach(element => {
                if (!element.is_bundled && element.is_installed) {
                  appsCount++;
                }
              });
              callback(appsCount);
            })

          } else {
            callback(appsCount);
          }
      };

      _this.getUserId = function(callback) {
        if ( typeof overwolf === 'undefined') return;

        overwolf.profile.getCurrentUser((res) => {
          if (res.status === 'success') {
            callback(res.userId);
          }
        });
      }


      _this.init();
    }]);



})(angular);
