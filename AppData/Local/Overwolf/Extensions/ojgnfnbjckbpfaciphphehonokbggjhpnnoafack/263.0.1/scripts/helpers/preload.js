(function(angular) {
    'use strict';

    angular.module('overwolf')
        .service('owPreload', function($q) {
            return function preload(src, callback) {
                var deffered = $q.defer(),
                    img = new Image();

                img.onload = function() {
                    callback && callback(img);
                    deffered.resolve(img);
                };
                img.onerror = function() {
                    deffered.reject();
                };

//                img.crossOrigin = 'Anonymous';      // CORS fix
                img.src = src;

                return deffered.promise;
            };
        });

})(angular);