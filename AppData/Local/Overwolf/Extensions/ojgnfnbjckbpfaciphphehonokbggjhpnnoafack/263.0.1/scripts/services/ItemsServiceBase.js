/**
 * Created by Yoske on 25/02/2015.
 */

(function(angular) {
    'use strict';

    angular.module('overwolf')
        .factory('ItemsServiceBase', function ($timeout, $http, $rootScope, TrackingService) {
            return {
                init: function (getItemsFunction, updateFunctions, resultItemProperty, itemIdProperty) {

                    var _this = {};
                    _this.items = {};
                    _this.finishedInit = false;

                    _this.getItemsByIdQueue = [];
                    _this.getAllItemsQueue = [];

                    _this.getItemsFunction = null;
                    _this.updateFunctions = null;
                    _this.resultItemProperty = null;
                    _this.itemIdProperty = null;


                    _this.downloadNumRequestsStack = []; //stack holding ids of items requesting download info
                    _this.downloadNumQueryTimeout = null; //timeout that is being reset whenever a new app is requesting data
                    _this.pendingDownloadsCallbacks = []; //associative array of x number of callbacks PER items id
                    _this.numOfPendingDownloadsCallbacks = 0;

                    _this.numOfHiddenItems = 0;

                    _this.getItemsFunction = getItemsFunction;
                    _this.updateFunctions = updateFunctions;
                    _this.resultItemProperty = resultItemProperty;
                    _this.itemIdProperty = itemIdProperty;




                    OverwolfStore.onDockConnectionStateChanged.addListener(function (info) {
                        if (info.connectionState == "Connected") {
                            _this.initLocalItems();
                        }
                    });


                    for(var i=0;i<_this.updateFunctions.length;i++){
                        var curFunc = _this.updateFunctions[i];
                        curFunc.addListener(function(){
                           _this.initLocalItems(function(){
                               $rootScope.$broadcast("ItemsUpdated")
                           });

                        });
                    }

                    //TODO: update functions

                    _this.initLocalItems = function (callback) {
                        _this.getItemsFunction(function (result) {
                            console.log("inited local items", result);
                            if (result.status == "success") {

                                var localItems = result[_this.resultItemProperty];
                                for (var i = 0; i < localItems.length; i++) {
                                    var curItem = localItems[i];
                                    $rootScope.$apply(() => {
                                        _this.items[curItem[_this.itemIdProperty]] = angular.extend({}, _this.items[curItem[_this.itemIdProperty]], curItem);
                                    }); 
                                }
                                

                                _this.finishedInit = true;
                                //proccess pending requests
                                for (var i = 0; i < _this.getItemsByIdQueue.length; i++) {
                                    //if (!_this.items[_this.getItemsByIdQueue[i].id]) {
                                    //    _this.items[_this.getItemsByIdQueue[i].id] = {isInstalled: false}[_this.itemIdProperty] = _this.getItemsByIdQueue[i].id;
                                    //} //todo: simplify this shit


                                    _this.getItemById(_this.getItemsByIdQueue[i].id, _this.getItemsByIdQueue[i].callback)

                                }

                                _this.getItemsByIdQueue = [];

                                //process getAllItems requests
                                for (var i = 0; i < _this.getAllItemsQueue.length; i++) {
                                    _this.getAllItemsQueue[i](_this.items);
                                }

                                _this.getAllItemsQueue = [];
                            }

                            if(typeof callback == "function") {
                                callback();
                            };

                        });
                    }


                    _this.getItemById = function (itemId, callback) {

                        if (_this.finishedInit) {
                            if (!_this.items[itemId]) {
                                var returnItem = {isInstalled: false, notLocal: true};
                                returnItem[_this.itemIdProperty] = itemId
                                callback(returnItem);
                            }
                            else {
                                callback(_this.items[itemId]);
                            }
                        }
                        else {
                            _this.getItemsByIdQueue.push({id: itemId, "callback": callback});
                        }
                    };

                    _this.getAllItems = function (callback) {
                        if (Object.keys(this.items).length > 0) {
                            callback(this.items);
                        }
                        else {
                            _this.getAllItemsQueue.push(callback)
                        }

                    };

                    _this.getItemsAsArray = function (callback) {

                        var retVal = []
                        for (var key in _this.items) {
                            retVal.push(_this.items[key])
                        }
                        return retVal

                    };


                    /*
                     We do not know how many item tiles are requesting download info. But we do know they will ask it relatively together (on page change).
                     So what we're doing is filling a stack of requests, and issuing it 200ms after the last request has be "registered". Then calling all the callbacks.
                     */

                    _this.getItemTotalDownloads = function (appId, callback) {
                        _this.downloadNumRequestsStack.push(appId);
                        $timeout.cancel(_this.downloadNumQueryTimeout);
                        if (!Array.isArray(_this.pendingDownloadsCallbacks[appId])) {
                            _this.pendingDownloadsCallbacks[appId] = [];
                        }
                        _this.pendingDownloadsCallbacks[appId].push(callback);
                        _this.numOfPendingDownloadsCallbacks++;

                        _this.downloadNumQueryTimeout = $timeout(function () {
                            if(!$rootScope.apiBase){
                                $rootScope.$watch("$root.apiBase",function(newVal, oldVal){
                                    if(!oldVal && newVal){
                                        _this.queryEndpointForAppDownloadNumbers();
                                    }
                                })
                            }else {
                                _this.queryEndpointForAppDownloadNumbers();
                            }
                        }, 200)

                    }

                    _this.queryEndpointForAppDownloadNumbers = function () {
                        $http.get($rootScope.apiBase + "apps/download-counter?appids=" + JSON.stringify(_this.downloadNumRequestsStack), {appIds : _this.downloadNumRequestsStack}).
                            success(function (data, status, headers, config) {
                                for (var i=0; i<config.appIds.length; i++) {
                                    var appID = config.appIds[i];
                                    var curAppDownloads = 0;
                                    if(data[appID]) {
                                        curAppDownloads = data[appID]
                                    }
                                    _this.pendingDownloadsCallbacks[appID].pop()(curAppDownloads);
                                    _this.numOfPendingDownloadsCallbacks--;
                                }
                            });

                        _this.downloadNumRequestsStack = []; // query sent to server new ones will be executed afterwards
                    };


                    _this.webAppInstall = function(appId, appName, modalHideFunction){
                        $rootScope.$broadcast('owModal.open', {
                            templateUrl: $rootScope.webResourceBase + "partials/web-download-modal.html",
                            container: "web-dl",
                            controllerScopeParams: {appId:appId, appName: appName}
                        });
                        if(modalHideFunction) {
                            modalHideFunction();
                        }
                    };

                    _this.initLocalItems();

                    return Object.create(_this);
                }

            }
        }
    )
})(angular);
