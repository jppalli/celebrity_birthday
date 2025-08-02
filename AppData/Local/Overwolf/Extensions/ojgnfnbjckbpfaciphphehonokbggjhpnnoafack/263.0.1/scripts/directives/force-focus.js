/**
 * Created by Yoske on 06/01/2015.
 */
/**
 * Created by Yoske on 11/12/2014.
 */
(function (angular) {
    'use strict';

    angular.module('overwolf')
        .directive('owForceFocus', function ($window, $document, $timeout) {
            var _this = this;
            return {
                restrict: 'AEC',
                link: function ($scope, $el, attrs) {
                  if (!$el.is(":focus") && !document.querySelector(".lightbox-wrap")) {
                    $el.focus();
                  }
                }
            };
        });

})(angular);
