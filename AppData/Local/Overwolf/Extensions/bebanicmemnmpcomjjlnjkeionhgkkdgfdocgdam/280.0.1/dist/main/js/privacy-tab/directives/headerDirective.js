angular.module('PrivacyControlPanel')
  .directive('owHeader', function() {
    return {
      restrict: 'A',
      templateUrl: 'templates/header.html'
    };
  });