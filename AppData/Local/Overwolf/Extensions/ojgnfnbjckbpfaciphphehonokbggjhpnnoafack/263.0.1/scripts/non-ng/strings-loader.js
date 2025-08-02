/**
 * This is a non-angular service, as it is initlized prior to angular's bootstrap.
 * It is still to be regarded as a singleton.
 */
var StringsLoader = (function(){

    var DEFAULT_LOCALE = "en";
    var locale;
    var loadedStrings = null;


    function init(){
        return new Promise(function(resolve,reject) {

            try {
                OverwolfStore.getOverwolfLanguage(function (langRes) {
                    if (langRes.status == 'success') {
                        locale = langRes.language;

                    }
                    else {
                        console.error("call to OverwolfStore.getOverwolfLanguage failed", langRes, "Loading default locale");
                        locale = DEFAULT_LOCALE;
                    }


                    getStringsForLocale(locale).then(function (res) {
                            loadedStrings = res;
                            resolve();
                        },
                        function (err) {
                            if(locale != DEFAULT_LOCALE){
                                loadDefaultStringsOnError(resolve, reject, err);
                            }
                            else {
                                console.error("Couldn't load strings for default locale either. This sucks...");
                                reject();
                            }

                        });
                })
            }
            catch(err){
                console.log('Exception trying to load locale strings', err);
                loadDefaultStringsOnError(resolve, reject, err);
            }
        })
    }

    function loadDefaultStringsOnError(resolve, reject, err){
        console.error('Error loaded requested locale.', err, "Loading default", DEFAULT_LOCALE);
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
            throw "get messages called before StringsLoader finished. Are you sure you've made a correct async call to StringsLoader.init() ?"
        }
    }

    function getString(stringKey){
        return loadedStrings[stringKey];
    }

    function getStringsForLocale(locale){

        var stringsUrl = "/locales/"+locale+"/messages.json";
        var promise = new Promise(function(resolve,reject){
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("GET", stringsUrl);
            xmlhttp.onreadystatechange = function(res){
                if(xmlhttp.readyState == 4){
                    if(xmlhttp.status == 200) {
                        try {
                            var languageStringsObj = JSON.parse(xmlhttp.responseText);
                            resolve(languageStringsObj)
                        }
                        catch(exp){
                            reject("invalid JSON format for strings file in " + stringsUrl)
                        }
                    }
                    else {
                        reject("unable to load strings from" + stringsUrl);
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
         getCurrentLocale: getCurrentLocale
     }


}());