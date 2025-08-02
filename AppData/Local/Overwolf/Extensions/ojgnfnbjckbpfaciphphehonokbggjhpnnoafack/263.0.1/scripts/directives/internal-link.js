(function (angular) {
    'use strict';

    angular.module('overwolf')
        .directive('owInternalLink', function ($window, $interval, $document, $rootScope) {
            return {
                restrict: 'A',

                link: function ($scope, $el, attrs, ctrl, transclude) {
                    if(!$rootScope.webMode) {
                        var oldHref = $el.attr("href");
                        if(oldHref.indexOf(".locales/") != -1){
                            var indexIfLocalePart = oldHref.indexOf("/.locales/")
                            oldHref = oldHref.substring(0, indexIfLocalePart) + oldHref.substring(indexIfLocalePart + "/.locales/en".length);
                        }
                        // $el.attr("href", "index.html#" + oldHref);
                        $el.attr("href", oldHref);
                    }
                }
            };
        })

})(angular);