(function(angular) {
    'use strict';

    angular.module('overwolf')
        .factory('Event', function() {
            function Event(){
                this.callbacks = [];
            }

            Event.prototype.register = function(callback){
                this.callbacks.push(callback);
            };

            Event.prototype.fire = function(data){
                this.callbacks.forEach(function(callback){
                    callback(data);
                });
            };

            return Event;
        });

})(angular);
