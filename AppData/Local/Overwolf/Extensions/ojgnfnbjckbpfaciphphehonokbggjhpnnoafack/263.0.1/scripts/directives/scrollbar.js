(function (angular) {
    'use strict';

    angular.module('overwolf')
        .directive('owScrollbar', function ($window, owDebounce, $rootScope, $timeout) {
            return {
                restrict: 'A',
                transclude: true,
                scope:{nextPageFunction:"=", nextPageDistance:"="},
                link: function ($scope, $el, attrs, ctrl, transclude) {
                    transclude($scope, function (clone) {
                        $el.append(
                            angular.element('<div>').addClass('ow-scrollbar-content').append(clone)
                        );
                    });

                    var _this = {},
                        $win = angular.element($window);

                    var scrollbarOptions = {};
                    if (attrs.scrollTopYOffset) {
                        scrollbarOptions.topYOffset = parseInt(attrs.scrollTopYOffset);
                    }
                    $el.perfectScrollbar(scrollbarOptions);
                    if($scope.nextPageFunction) {
                        $el.scroll(function () {

                            if (($el.get()[0].scrollHeight - $el.height()) - $el.scrollTop() <= $scope.nextPageDistance) {
                                $scope.$apply($scope.nextPageFunction);

                            }
                        });
                    };

                    _this.refresh = function () {
                        $el.perfectScrollbar('update');
                    };


                    $timeout(_this.refresh, 1000); //workaround for scrollbar not showing on load. Probably because DOM not ready to calculate size correctly;

                    var onResize = owDebounce(_this.refresh, 100);

                    $win.on('resize', onResize);

                    $scope.$on('refresh', _this.refresh);

                    $scope.$on('$destroy', function () {
                        $win.off('resize', onResize);
                        $el.perfectScrollbar('destroy');
                    });

                    $rootScope.$on("$routeChangeSuccess", function () {
                        $el.scrollTop(0);
                    });

                    $rootScope.$on("changeScrollAreaHeight", function(evt, newHeight) {
                        $el.height(newHeight);
                    });
                }
            };
        });

})(angular);