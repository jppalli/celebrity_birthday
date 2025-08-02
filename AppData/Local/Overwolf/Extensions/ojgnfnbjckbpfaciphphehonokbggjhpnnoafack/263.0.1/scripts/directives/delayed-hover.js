
(function (angular) {
    'use strict';
    var DELAY_IN_MS = 75;

    angular.module('overwolf')
        .directive('owDelayedHover', function ($timeout) {
            return {                
                link: function (scope, element, attrs) {
                    var hoverTimeout;
    
                    element.on("mousemove", function(){
                        $timeout.cancel(hoverTimeout);
                        hoverTimeout = $timeout(function(){
                          if (!element.hasClass("hovered")) {
                            if (typeof(mixpanel) !== 'undefined') {
                              mixpanel.track('App_small_preview_Initialized', { 
                                'App ID': scope.curApp ? scope.curApp.UID : scope.curSkin.UID || null,
                                'App Name': scope.curApp ? scope.curApp.Name : scope.curSkin.appName || null,
                                'Platform': window.storePlatform
                              });
                            }
                          }
                          element.addClass("hovered");
                        },DELAY_IN_MS);
                    });

                    element.on("mouseleave", function(){
                        $timeout.cancel(hoverTimeout);
                        element.removeClass("hovered");
                    });

                }
            };
        })
})(angular);