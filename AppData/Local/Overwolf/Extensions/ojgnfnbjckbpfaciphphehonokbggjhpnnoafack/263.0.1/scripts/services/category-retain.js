/**
 * Created by Yoske on 06/04/2015.
 */
(function(angular) {
    'use strict';

    angular.module('overwolf')
        .service('CategoryRetainService', function () {

            return {
                storage: {},
                lastStoreCategory: null,
                get: function(sectionName){
                    return this.storage[sectionName];
                },
                set: function(sectionName, categoryName) {
                    this.storage[sectionName] = categoryName;

                    //due to some ugliness store isn't a cateogry but a combination of few (apps/games/skins/giveways). For the time being, nasty specific code to overcome this.
                    if(sectionName == "apps" || sectionName == "games" || sectionName == "skins" || sectionName == "giveaways" || sectionName == "search"){
                        this.lastStoreCategory = sectionName;
                    }
                }
            }


        }
    )
})(angular);
