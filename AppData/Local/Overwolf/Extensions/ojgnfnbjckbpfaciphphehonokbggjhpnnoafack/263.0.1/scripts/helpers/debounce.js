(function(angular) {
    'use strict';

    angular.module('overwolf')
        .service('owDebounce', function($timeout) {
            return function debounce(fn, delay, context) {
                var timer = null;
                return function() {
                    var _this = context || this,
                        args = arguments;

                    $timeout.cancel(timer);
                    timer = $timeout(function() {
                        fn.apply(_this, args);
                    }, delay);
                };
            };
        });

})(angular);