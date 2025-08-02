(function (angular) {
  'use strict';

  angular.module('overwolf')
    .controller('AppsLibraryCtrl',
      ['$scope', 'owDebounce', 'AppsLibraryService',
        function ($scope, owDebounce, AppsLibraryService) {
          var _this = this;

          _this.init = function () {
            _this.filter = 'all';
            _this.query = '';
            _this.fetchData();
          };

          _this.fetchData = function () {
            // test data. it will be replaced with api call
            AppsLibraryService
              .fetch({
                query: _this.query,
                filter: _this.filter
              })
              .then(
                // success
                function (data) {
                  _this.data = data;
                },
                // fail
                function (data) {
                  // empty
                }
              );
          };


          var debouncedFetchData = owDebounce(_this.fetchData, 100);

          $scope.$watch(function () {
            return _this.filter;
          }, debouncedFetchData);

          $scope.$watch(function () {
            return _this.query;
          }, debouncedFetchData);

          _this.init();
        }]);

})(angular);