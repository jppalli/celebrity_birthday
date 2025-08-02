(function(angular) {
    'use strict';

    angular.module('overwolf')
        .directive('owTrimText', function($window, owDebounce) {
            return {
                restrict: 'A',
                transclude: true,
                link: function($scope, $el, attrs, ctrl, transclude) {
                    transclude($scope, function(clone) {
                        $el.append(clone);
                    });

                    var _this = {},
                        $win = angular.element($window);

                    _this.init = function() {
                        $el.dotdotdot();
                    };

                    if (attrs.owTrimText === 'dynamic') {
                        // call init method after ng-repeat
                        setTimeout(_this.init, 10);
                    } else {
                        _this.init();
                    }

                    var onLoad = owDebounce(function() {
                        $el.trigger('update');
                    }, 100);

                    $win.on('load', onLoad);

                    $scope.$on('$destroy', function() {
                        $win.off('resize', onLoad);
                        $el.trigger('destroy');
                    });
                }
            };
        });

})(angular);