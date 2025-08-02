/**
 * This is a non-angular service, as it is initialized prior to angular's
 * bootstrap.
 * It is still to be regarded as a singleton.
 */
let localesService = (function(){

  const DEFAULT_LOCALE = "en";
  const Errors = {
    failLoadLocale: 1,
    failLoadDefaultLocale: 2
  };
  let locale;
  let loadedStrings = null;
  let defLoadedStrings = null;
  let _initialized = false;

  function init() {
    if (_initialized) {
      //return Promise.resolve();
    }

    return new Promise(function(resolve,reject) {
      try {
        overwolf.settings.language.get(function (langRes) {
          if (langRes.language) {
            locale = langRes.language;
          }
          else {
            console.error(`call to overwolf.settings.language.get`+
              ` failed. ${JSON.stringify(langRes)}. Loading default locale`);
            locale = DEFAULT_LOCALE;
          }

          let promises = [
            getStringsForLocale(DEFAULT_LOCALE).catch(error => {console.log(error); return Errors.failLoadDefaultLocale}),
          ];

          if(locale !== DEFAULT_LOCALE){
            promises.push(getStringsForLocale(locale).catch(error => {console.log(error); return Errors.failLoadLocale}));
          }


          Promise.all(promises).then(function (values) {
            if(values[0] === Errors.failLoadDefaultLocale){
              console.error("Couldn't load strings for default locale. This sucks...");
            }
            else{
              defLoadedStrings = values[0];
            }

            if(values.length === 2) {
              if (values[1] === Errors.failLoadLocale) {
                loadedStrings = defLoadedStrings ? defLoadedStrings : null;
              }
              else {
                loadedStrings = values[1];
              }
            }
            else{
              loadedStrings = defLoadedStrings;
            }

            _initialized = true;
            resolve();
          });
        })
      }
      catch(err){
        console.log(`Exception trying to load locale strings ${JSON.stringify(err)}`);
        loadDefaultStringsOnError(resolve, reject, err);
      }
    })
  }

  function loadDefaultStringsOnError(resolve, reject, err){
    console.error(`Error loaded requested locale. ${JSON.stringify(err)} Loading default ${JSON.stringify(DEFAULT_LOCALE)}`);
    getStringsForLocale(DEFAULT_LOCALE).then(function(res){
        loadedStrings = res;
        resolve();
      },
      function(err){
        console.error(err);
        reject(err);
      });

  }

  function getAllStrings(){
    if(loadedStrings != null){
      return loadedStrings;
    }
    else {
      throw "get messages called before localesService finished. Are you sure you've made a correct async call to localesService.init() ?"
    }
  }

  async function getString(stringKey){
    await init();

    if (loadedStrings[stringKey] && loadedStrings[stringKey].message) {
      return loadedStrings[stringKey].message;
    } else if (defLoadedStrings[stringKey] && defLoadedStrings[stringKey].message) {
      return defLoadedStrings[stringKey].message;
    } else {
      return `{${stringKey}}`;
      // return null;
    }
  }

  function getStringSync(stringKey){
    if (loadedStrings[stringKey] && loadedStrings[stringKey].message) {
      return loadedStrings[stringKey].message;
    } else if (defLoadedStrings[stringKey] && defLoadedStrings[stringKey].message) {
      return defLoadedStrings[stringKey].message;
    } else {
      return `{${stringKey}}`;
      // return null;
    }
  }

  function getStringsForLocale(locale){

    let stringsUrl = "/_locales/"+locale+"/messages.json";
    let promise = new Promise(function(resolve,reject){
      let xmlhttp = new XMLHttpRequest();
      xmlhttp.open("GET", stringsUrl);
      xmlhttp.onreadystatechange = function(res){
        if(xmlhttp.readyState == 4){
          if(xmlhttp.status == 200) {
            try {
              let languageStringsObj = JSON.parse(xmlhttp.responseText);
              resolve(languageStringsObj)
            }
            catch(exp){
              reject(`invalid JSON format for strings file in ${JSON.stringify(stringsUrl)}`)
            }
          }
          else {
            reject(`unable to load strings from ${JSON.stringify(stringsUrl)}`);
          }

        }
      };

      XMLHttpRequest.onerror = function(err){
        console.error(err);
        reject(err);
      };

      xmlhttp.send();
    });

    return promise;

  }

  function getCurrentLocale(){
    return locale;
  }

  return {
    init: init,
    getAllStrings: getAllStrings,
    getString: getString,
    getStringSync: getStringSync,
    getCurrentLocale: getCurrentLocale
  }

}());
