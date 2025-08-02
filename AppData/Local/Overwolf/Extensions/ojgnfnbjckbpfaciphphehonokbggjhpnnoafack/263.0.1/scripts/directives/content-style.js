/**
 * Created by Yoske on 08/12/2014.
 */
angular.module('overwolf')
    .directive('owContentStyle', function ($rootScope, $route) {
        return {
            restrict: 'AE',
            link: function ($scope, $el, attrs) {
                $rootScope.$on("$routeChangeSuccess", function (e) {
                    if ($route.current && $route.current.$$route.contentStyle) {
                        $el.removeAttr("class")
                        $el.addClass("main-content-" + $route.current.$$route.contentStyle)
                    }
                    else {
                        $el.removeAttr("class")
                        $el.addClass("main-content")
                    }
                })
            }
        }
    }
);
