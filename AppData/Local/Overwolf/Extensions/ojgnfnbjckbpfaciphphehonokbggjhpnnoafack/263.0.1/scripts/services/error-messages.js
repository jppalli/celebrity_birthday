(function(angular) {
    'use strict';

    angular.module('overwolf')
        .service('ErrorMessagesService', function() {

            var errorMessageService = {
                data: {
                    "__MSG_NoConnection__": {
                        "message": "Can't load this page...",
                        "description": ""
                    },
                    "__MSG_General__": {
                        "message": "A general error has occurred",
                        "description": ""
                    },
                    "__MSG_DockLaunchError__": {
                        "message": "Whoops... unable to load Overwolf. <br>Please restart to try again",
                        "description": ""
                    }
                },


                getError: function (errorCode) {
                    if (this.data[errorCode]) {
                        return this.data[errorCode]
                    }
                    else {
                        return this.data["__MSG_General__"];
                    }
                }
            }

            return errorMessageService;

        });
})(angular);