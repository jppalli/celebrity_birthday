angular.module('PrivacyControlPanel')
  .directive('owAccount', function() {
    return {
      restrict: 'A',
      templateUrl: 'templates/account.html'
    };
  });