/**
 * Created by Yoske on 01/01/2015.
 */

(function (angular) {
    'use strict';

    angular.module('overwolf')
    .directive('bindHtmlCompile', ['$compile', function ($compile) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    scope.$watch(function () {
                        return scope.$eval(attrs.bindHtmlCompile);
                    }, function (value) {
                        element.html(value);
                        $compile(element.contents())(scope);
                    });
                }
            };
        }])

})(angular);