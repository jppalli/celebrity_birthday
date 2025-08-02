angular.module('PrivacyControlPanel')
  .directive('owOverview', function() {
    return {
      restrict: 'A',
      templateUrl: 'templates/overview.html'
    };
  });