/**
 * This is a non-angular service, as it is initialized prior to angular's
 * bootstrap.
 * It is still to be regarded as a singleton.
 */
let translationService = (function(){
  async function translateApp() {
    let allLocalizedElements = document.querySelectorAll('[data-locale-key]');
    // let allSpans = document.querySelectorAll('span');
    for (let element of allLocalizedElements) {
      let localeKey = element.dataset.localeKey || element.textContent;
      localeKey = localeKey.trim().replace(/[{}]/g, '');
      if (localeKey) {
        let tranlatedString = await _getTranslatedString(localeKey);
        if (tranlatedString) {
          // keep the default text if there is no translation
          // and replace the text only if a translation exists
          // element.textContent = tranlatedString;
          element.innerHTML = tranlatedString;
        }
      }
    }
  }

  async function _getTranslatedString(input, plaintext) {
    if (!input) {
      console.warn('translate requested with no key');
      return '';
    }

    let retVal;

    try {
      retVal = await localesService.getString(input);
    } catch (e) {
      console.error(e);
    }

    if (!retVal) {
      console.error(`Cannot find localized string for input ${input} for lang ${localesService.getCurrentLocale()}`);
      return null;
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
    // retVal = retVal.replace(/&/g, "<span class='ampersand'>&</span>");

    // if(plaintext && plaintext === "plaintext") {
      return retVal;
    // }
  }

  return {
    translateApp
  }

}());
