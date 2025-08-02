(function (angular) {
  'use strict';

  angular.module('overwolf')
    .controller('SearchController', ['$scope', '$timeout', 'SearchService', 'UserService', 'AppsService', 'GamesService',
      function ($scope, $timeout, SearchService, UserService, AppsService, GamesService) {
        var _this = this;

        _this.init = function () {
          _this.filter = 'all';
          _this.query = '';
          _this.searchTimeout;
          //_this.shownItems = [];
          $scope.apps = [];
          $scope.hasError = false;

          $scope.apps = [];
          $scope.giveaways = [];
          $scope.skins = [];
          $scope.userService = UserService;
          $scope.appsService = AppsService;
          $scope.gamesService = GamesService;

          var lastSearchInfo = SearchService.getLastSearchInfo();
          if (lastSearchInfo != null) {
            _this.processSearchResults(lastSearchInfo.result);
            _this.query = lastSearchInfo.query;
            var lastFilter = lastSearchInfo.filter;
            $timeout(function () {
              _this.filter = lastFilter
            }, 100);
          }

          $scope.$watch("search.filter", function (val) {
            SearchService.updateLastSearchFilter(val);
          })
        };

        _this.fetchData = function () {
          if (_this.query === "" ) {
            SearchService.clearLastSearch();
            $scope.apps = [];
            $scope.giveaways = [];
            return;//don't search an empty string;
          }

          if ( _this.query.length <= 1) {
            return;//don't search when only one char is provided;
          }

          SearchService.search({ query: _this.query, filter: 'all' }).then(
            // success
            function (response) {
              _this.processSearchResults(response);
            },
            // fail
            function (data) {
              $scope.hasError = true;
            }
          );
        };

        $scope.$watch("appsService.numOfHiddenItems", function (newVal) {
          $scope.numOfResults -= newVal
        });

        $scope.$watch("gamesService.numOfHiddenItems", function (newVal) {
          $scope.numOfResults -= newVal
        });

        $scope.$watch("numOfResults", function (newVal) {
          if (newVal == 0) {
            $scope.apps = [];
            $scope.giveaways = [];
            $scope.skins = [];
            $timeout(function () {
              _this.filter = 'all';
            }, 100);

          }

        });

        _this.processSearchResults = function (response) {
          if (!response) {
            return;
          }

          if (window.storePlatform == 'Client' && response.data.Apps) {
            response.data.Apps = response.data.Apps.filter(app => !app.includes('appItem app-tile web-only'))
          }

          $scope.hasError = false;
          $scope.apps = (response.data.Apps ? response.data.Apps : []);
          $scope.giveaways = (response.data.Giveaways ? response.data.Giveaways : []);
          $scope.skins = (response.data.Skins ? response.data.Skins : []);

          $scope.numOfResults = $scope.apps.length + $scope.giveaways.length + $scope.skins.length;

          console.log("NUM OF RESULTS", $scope.numOfResults);

          switch ($scope.numOfResults) {
            case 0: _this.filter = 'all'; break;
            case $scope.apps.length: _this.filter = 'apps'; break;
            case $scope.giveaways.length: _this.filter = 'giveaways'; break;
          }

          if ($scope[_this.filter] && $scope[_this.filter].length == 0) {
            _this.filter = 'all';
          }
        };

        //$scope.$watch(function () {
        //    return _this.filter;
        //}, _this.fetchData);

        $scope.$watch(function () {
          return _this.query
        }, function () {
          ;
          $timeout.cancel(_this.searchTimeout);
          _this.searchTimeout = $timeout(_this.fetchData, 300);
        });

        _this.init();
      }]);

})(angular);