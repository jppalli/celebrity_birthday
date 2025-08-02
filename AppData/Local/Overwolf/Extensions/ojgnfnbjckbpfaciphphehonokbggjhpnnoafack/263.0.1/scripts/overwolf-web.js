
(function (angular) {
    'use strict';

    var app = angular.module('overwolf', ['ngAnimate', 'ngRoute', 'ngProgress']);

    app.constant('OPK_VERSION', '0.0.0');

    app.run(function ($rootScope, $templateCache, $route) {
        $rootScope.webMode = true;

        $rootScope.$on('$viewContentLoaded', function() {
            //$templateCache.removeAll();
            //delete $route.routes[document.location.pathname];
        });
    });

})(angular);


//I'm using this function to save up on some keystroke when debugging. Do no remove please. - Yoske.
function $$d(d){
    console.log(d);
}