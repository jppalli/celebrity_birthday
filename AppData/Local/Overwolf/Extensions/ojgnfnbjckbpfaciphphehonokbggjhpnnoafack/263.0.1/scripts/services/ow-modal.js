(function (angular) {
    'use strict';

    var modalNameToOpener = {};
    angular.module('overwolf')
        .service('OWModalService', function () {
            this.registerModal = function(name, modalOpener){
                modalNameToOpener[name] = modalOpener;
            };

            this.show = function(name, templateUrl, controllerScopeParams){
                if(modalNameToOpener[name]){
                    return modalNameToOpener[name](templateUrl, controllerScopeParams);
                } else {
                    throw new Error('[OWModalService.show] - unknown modal, name=' + name);
                }
            }
        });

})(angular);