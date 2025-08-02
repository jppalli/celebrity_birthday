/**
 * Created by Yoske on 02/10/2014.
 */
(function (angular) {
    'use strict';

    angular.module('overwolf')
        .service('ConnectionService', function ($http) {

            this.checkConnection = function (callback) {
                $http.get("https://api.overwolf.com/misc/Ping").success(function (info) {
                    if (info.Success) {
                        callback(true)
                    } else {
                        callback(false)
                    }

                }).error(function (info) {
                    callback(false);
                });
            }
        });
})(angular);