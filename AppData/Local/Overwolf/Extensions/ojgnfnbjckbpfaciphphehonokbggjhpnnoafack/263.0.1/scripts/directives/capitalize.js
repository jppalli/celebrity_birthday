/**
 * Created by Yoske on 20/10/2014.
 */
(function (angular) {
    'use strict';

    angular.module('overwolf')
        .directive('owCapitalize', function () {
            return {
                require: 'ngModel',
                link: function (scope, element, attrs, modelCtrl) {
                    var capitalize = function (inputValue) {
                        if (inputValue == undefined) inputValue = '';
                        var capitalized = inputValue.toUpperCase();
                        if (capitalized !== inputValue) {
                            modelCtrl.$setViewValue(capitalized);
                            modelCtrl.$render();
                        }
                        return capitalized;
                    }
                    modelCtrl.$parsers.push(capitalize);
                    capitalize(scope[attrs.ngModel]);  // capitalize initial value
                }
            };
        })
})(angular);