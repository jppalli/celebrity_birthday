/**
 * Created by Yoske on 06/04/2015.
 * directive gets a angular variable at focus-param attr, and if watches its value. when its value matches the value of focus-value attr, set focus on element.
 */

(function (angular) {
    'use strict';

    angular.module('overwolf')
        .directive('owGetFocus', function ($timeout) {
            return {
                restrict: 'A',
                scope: {focusParam: "="},

                link: function ($scope, $el, attrs, ctrl, transclude) {

                    $scope.$watch("focusParam", function(newVal){
                        if(newVal == attrs.focusValue){
                           $el.focus();
                       }
                    });
                }
            };
        })

})(angular);