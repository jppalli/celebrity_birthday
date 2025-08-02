/**
 * Created by Yoske on 02/10/2014.
 */
//used to get the routeProvider to keep the content of the loaded page. see http://stackoverflow.com/questions/20617976/stop-angular-js-ng-view-from-wiping-the-page-out
(function (angular) {
    'use strict';

    angular.module('overwolf')
        .directive('owKeepContent', ['$templateCache', function ($templateCache) {
            return {
                restrict: 'A',
                compile: function (element) {
                    var templateName = (element.context.attributes['template-name'] ? element.context.attributes['template-name'] : "initialTemplate.html")
                    $templateCache.put(templateName, element.html());
                }
            };
        }])
})(angular);