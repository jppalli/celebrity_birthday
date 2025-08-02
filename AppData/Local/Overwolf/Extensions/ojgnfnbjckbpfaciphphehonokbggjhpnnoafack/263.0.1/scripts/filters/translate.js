(function(angular) {
    'use strict';

    angular.module('overwolf').filter('translate', function ($sce) {

        return function (input, type) {

            if(!input || input.trim() == "")
            {
                console.log("translate filter called with empty input");
                return;
            }

            var retVal;

            try {
                retVal = StringsLoader.getString(input);
            } catch (e) {
                console.error(e);
            }

            if(!retVal){
                console.error("Cannot find localized string for input", input, "for lang", StringsLoader.getCurrentLocale());
                return input;
            }

            if (type === 'plaintext') {
                return retVal;
            } else {
                return $sce.trustAsHtml(retVal);
            }

        }

    });
}(angular));