/*
 * @license
 * angular-modal v0.4.0
 * (c) 2013 Brian Ford http://briantford.com
 * (c) 2014 OverWolf Team (minor modifications)
 * License: MIT
 */
(function(angular) {
    'use strict';

    angular.module('overwolf')
        .factory('owModal', function ($rootScope, $animate, $compile, $controller, $q, $http, $templateCache, owBlock, ngProgress, $timeout) {
            var modalFactory = function(config) {
                var modalDeferredResult;

                if (!(!config.template ^ !config.templateUrl)) {
                    throw new Error('Expected modal to have exactly one of either `template` or `templateUrl`');
                }

                var template      = config.template,
                    controller    = config.controller || angular.noop,
                    controllerAs  = config.controllerAs,
                    $container    = angular.element(config.container || document.body),
                    $el           = null,
                    $scope,
                    waitForShowTimeout,
                    isLoading     = false,
                    html;

                if (config.template) {
                    var deferred = $q.defer();
                    deferred.resolve(config.template);
                    html = deferred.promise;
                } else {
                    isLoading = true;
                    if(!$rootScope.splashShowing) {
                        ngProgress.start();
                    }
                    html = $http.get(config.templateUrl, { cache: $templateCache })
                        .then(function(response) {
                            console.log("GET RESPONSE", response, "FOR ", config.templateUrl);
                            return response.data;
                        }, function(error){
                            $rootScope.$broadcast("modalLoadError", {url: config.templateUrl, container: $container[0].attributes["ow-modal"].value});
                            isLoading = false;
                            return error.data;
                        });
                }

                function replaceHtml(newTemplateUrl) {
                    isLoading = true;
                    ngProgress.start();
                    console.log("Starting splash from modal factory replacehtml");
                    html = $http.get(newTemplateUrl, {cache: $templateCache})
                        .then(function (response) {
                            return response.data;
                        },
                        function(error){
                            $rootScope.$broadcast("modalLoadError", {url: newTemplateUrl, container: $container[0].attributes["ow-modal"].value});
                            isLoading = false;
                            return error.data;
                        });

                }


                function isModalLoading(){
                    return isLoading;
                }

                /**
                 * activating the modal
                 * @param locals - of form {
                 *      owModal,  //the $public of the modal directive
                 *      controllerScopeParams //given by the opener
                 * }
                 * @returns - promise representing the modal result
                 */
                function activate(locals) {
                    if(modalDeferredResult){
                        console.warn('[factory.owModal.activate] - activated modal when one is already active');
                        modalDeferredResult.reject('modal reactivated');
                    }

                    modalDeferredResult = $q.defer();

                    html.then(function (html) {
                        attach(html, locals);
                    });

                    return modalDeferredResult.promise;
                }

                /**
                 *
                 * @param html
                 * @param locals
                 *
                 * @returns - promise representing the modal result
                 */
                function attach(html, locals) {

                    $el = angular.element(html);
                    if ($el.length === 0) {
                        console.warn('The template contains no elements; you need to wrap text nodes')
                        $el = null;
                        return;
                    }

                    $scope = $rootScope.$new();
                    if(locals.controllerScopeParams){
                        for(var key in locals.controllerScopeParams)
                        $scope[key] = locals.controllerScopeParams[key];
                    }
                    if (locals) {
                        for (var prop in locals) {
                            $scope[prop] = locals[prop];
                        }
                    }
                    var ctrl = $controller(controller, { $scope: $scope });

                    ctrl.deactivate = deactivate;
                    if (controllerAs) {
                        $scope[controllerAs] = ctrl;
                    }
                    $compile($el)($scope);

                    if (config.position) {
                        var options = config.position,
                            modalBox = {};

                        modalBox.width = $el.outerWidth();
                        modalBox.height = $el.outerHeight();

                        modalBox = owBlock.position(modalBox, options.box, options);

                        $el.css({
                            left: modalBox.left,
                            top: modalBox.top
                        });
                    }

                    //$el.removeClass("notransition")

                    $scope.$on('owModal.deactivateAll', deactivate);
                    show();
                }

                function show(){

                    ngProgress.complete();
                    console.log("complete progress from modal factory show");
                    $rootScope.$broadcast("owModal.loaded");

                    if(waitForShowTimeout){
                        $timeout.cancel(waitForShowTimeout);
                        waitForShowTimeout = null;
                    }
                    if ($container.find(".lightbox-wrap").length === 0) {
                        $animate.enter($el, $container);
                    }
                    else if($el){
                        console.log("ANIMATING REPLACE");
                        $el = $el.find(">div");
                        $animate.leave($container.find(".lightbox-wrap>div"));
                        $animate.enter($el, $container.find(".lightbox-wrap"));
                    }
                    isLoading = false;
                }


                function deactivate(result, isDismissed) {
                    isLoading = false;
                    var deferred = $q.defer();
                    if ($el) {
                        if ($el.parent().hasClass("lightbox-wrap")) {
                            $el = $el.parent();
                        }
                        $animate.leave($el, function() {
                            $scope.$destroy();
                            $el = null;
                            deferred.resolve();
                        });
                    } else {
                        console.warn("decativate modal called. But no element present. Trying to remove lightbox div the old-fashinged way.")
                        $(".lightbox-wrap").remove();
                        deferred.resolve();
                    }
                    $scope.$destroy();

                    if(modalDeferredResult){
                        if(isDismissed){
                            modalDeferredResult.reject(result);
                        } else {
                            modalDeferredResult.resolve(result);
                        }
                        modalDeferredResult = null;
                    }

                    return deferred.promise;
                }

                function active() {
                    return !!$el;
                }

                return {
                    activate: activate,
                    deactivate: deactivate,
                    active: active,
                    replaceHtml: replaceHtml,
                    isModalLoading: isModalLoading,
                    templateUrl : config.templateUrl
                };
            };

            modalFactory.deactivateAll = function() {
                $rootScope.$broadcast('owModal.deactivateAll');
            };

            return modalFactory;
        });

})(angular);