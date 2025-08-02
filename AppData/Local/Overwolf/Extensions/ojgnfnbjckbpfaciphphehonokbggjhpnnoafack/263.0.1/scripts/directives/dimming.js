(function(angular) {
    'use strict';

    angular.module('overwolf')
        .directive('owDimming', function($window, $document) {
            return {
                restrict: 'AE',
                link: function($scope, $el, attrs) {
                    var $win = angular.element(document.getElementById("dvScrollWrapper")),
                        startY = (attrs.owDimming || 50) - 0,
                        dimmingMaxY = 600,
                        current;

                    function getDimmingValue() {
                        var doc = $document.get(0).documentElement,
                            scrollTop = ($window.pageYOffset || $("#dvScrollWrapper").scrollTop()) - ($("#dvScrollWrapper").get(0).clientTop || 0),
                            value = Math.min($("#dvScrollWrapper").scrollTop() / dimmingMaxY, 1);

                        return Math.min(1, value);
                    }

                    function redraw() {
                        // dimming background
                        var value = getDimmingValue();
                        if (current !== value) {
                            $el.css('opacity', value);
                            current = value;
                        }
                    }

                    redraw();

                    $win.on('scroll', redraw);

                    $scope.$on('$destroy', function() {
                        $win.off('scroll', redraw);
                    });
                }
            };
        });

})(angular);