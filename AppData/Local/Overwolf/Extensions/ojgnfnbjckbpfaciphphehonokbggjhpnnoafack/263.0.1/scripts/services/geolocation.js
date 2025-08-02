/**
 * Created by Yoske on 04/12/2014.
 */

(function (angular) {
    'use strict';

    angular.module('overwolf')
        .service('GeolocationService', function () {

            var _this = this;

            _this.currentUserCountry = null;
            _this.currentUserContinent = null;
            _this.shouldShowToUsersGeoQueue = [];

            _this.currentUserCountry = 'US';
            _this.currentUserContinent = 'NA';

            while(_this.shouldShowToUsersGeoQueue.length > 0){
              var curItem = _this.shouldShowToUsersGeoQueue.pop();
              _this.shouldShowToUsersGeo(curItem.filter, curItem.callback);
            }

            _this.getCurrentUserLocation = function () {
                return _this.currentUserLocation;
            }


            _this.openLinkAccordingToLocation = function (linkObj) {
                if (typeof linkObj == 'string') {
                    OverwolfStore.openUrlInDefaultBrowser(linkObj);
                }
                else {
                    var defaultGeo;
                    for (var i = 0; i < linkObj.length; i++) {
                        var geos = linkObj[i].geos;
                        for (var j = 0; j < geos.length; j++) {
                            if (geos[j] == 'default') {
                                defaultGeo = linkObj[i];
                            }
                            var curGeo = geos[j].split("/");
                            if (curGeo.length == 1) {
                                if (curGeo[0] == _this.currentUserContinent) {
                                    OverwolfStore.openUrlInDefaultBrowser(linkObj[i].link);
                                    return;
                                }
                            }
                            else if (curGeo.length == 2) {
                                if (curGeo[0] == _this.currentUserContinent && curGeo[1] == _this.currentUserCountry) {
                                    OverwolfStore.openUrlInDefaultBrowser(linkObj[i].link);
                                    return;
                                }
                            }
                        }
                    }
                    if (defaultGeo) {
                        OverwolfStore.openUrlInDefaultBrowser(defaultGeo.link);
                    }
                }
            };

            _this.shouldShowToUsersGeoSync = function(geoFilter) {
                var curFilter = geoFilter;
                for (var j = 0; j < curFilter.geos.length; j++) {
                    var curGeo = curFilter.geos[j].split("/");
                    if (curGeo.length === 1) {
                        if (curGeo[0] == _this.currentUserContinent) {
                            return (geoFilter.filterAction == "Include");
                        }
                    } else if (curGeo.length === 2) {
                        if (curGeo[0] == _this.currentUserContinent && curGeo[1] == _this.currentUserCountry) {
                            return (geoFilter.filterAction == "Include");
                        }
                    }
                }

                return (geoFilter.filterAction != "Include")
            };

            _this.shouldShowToUsersGeo = function (geoFilter, callback) {

                if(_this.currentUserContinent === null || _this.currentUserCountry === null){
                    _this.shouldShowToUsersGeoQueue.push({filter: geoFilter, callback: callback});
                    return;
                }

                var curFilter = geoFilter
                for (var j = 0; j < curFilter.geos.length; j++) {
                    var curGeo = curFilter.geos[j].split("/");
                    if (curGeo.length == 1) {
                        if (curGeo[0] == _this.currentUserContinent) {
                            return callback(geoFilter.filterAction == "Include");
                        }
                    }
                    else if (curGeo.length == 2) {
                        if (curGeo[0] == _this.currentUserContinent && curGeo[1] == _this.currentUserCountry) {
                            return callback(geoFilter.filterAction == "Include");
                        }
                    }
                }

                return callback(geoFilter.filterAction != "Include")

            };
        });
})(angular);