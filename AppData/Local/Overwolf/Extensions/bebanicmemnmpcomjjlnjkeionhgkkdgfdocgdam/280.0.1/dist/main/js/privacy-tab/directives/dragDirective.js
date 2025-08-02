angular.module('PrivacyControlPanel')
  .directive('owDrag', function() {

    let _currentWindow;

    overwolf.windows.getCurrentWindow(function(result) {
      if (result.status === 'success') {
        _currentWindow = result.window;
      }
    });

    return {
      restrict: 'A',
      link: function ($scope, element) {
        element.on("mousedown", function () {
          overwolf.windows.dragMove(_currentWindow.id);
        })
      }
    };
  });