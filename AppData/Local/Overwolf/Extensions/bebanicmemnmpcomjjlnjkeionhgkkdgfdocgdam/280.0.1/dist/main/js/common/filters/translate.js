(function(angular) {
  'use strict';

  angular.module('PrivacyControlPanel').filter('translate', function ($sce) {

    return function (input, plaintext) {

      if(input.trim().length === 0)
      {
        console.log("translate filter called with empty input");
        return;
      }

      var retVal;

      try {
        retVal = localesService.getStringSync(input);
      } catch (e) {
        console.error(e);
      }

      if(!retVal){
        console.error("Cannot find localized string for input", input, "for lang", localesService.getCurrentLocale());
        return input;
      }

      // replace tokens with context from arguments
      let regex = /(\[[^\]]+\])/g;
      let matches = retVal.match(regex);
      if(matches && arguments.length > 1){

        let context = {};
        let i = plaintext === "plaintext" || plaintext === "noplaintext" ? 2 : 1;
        for(i; i < arguments.length; i=i+2){
          let key = arguments[i].toLowerCase();
          let value = arguments[i+1];
          context[key] = value;
        }

        for(let match of matches){
          let lookup = match.replace("[", "").replace("]","").toLowerCase();
          let value = context[lookup];
          if(typeof value !== 'undefined'){
            retVal = retVal.replace(match, value);
          }
        }
      }

      // special treatment for ampersand
      retVal = retVal.replace(/&/g, "<span class='ampersand'>&</span>");

      if(plaintext && plaintext === "plaintext") {
        return retVal;
      }
      else{
        return $sce.trustAsHtml(retVal);
      }

    }

  });
}(angular));