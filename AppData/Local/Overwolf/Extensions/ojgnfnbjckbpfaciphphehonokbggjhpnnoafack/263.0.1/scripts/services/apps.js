(function(angular) {
    'use strict';

    angular.module('overwolf')
        .service('AppsService', function ($timeout, $http, $rootScope, TrackingService, ItemsServiceBase, UserService) {
            $rootScope.dockWasShownThisSession = false;

            function showDockIfNeeded() {
              console.log('$rootScope.dockWasShownThisSession = ' + $rootScope.dockWasShownThisSession)
              if ($rootScope.dockWasShownThisSession) {
                return;
              }

              OverwolfStore.wasOpenedByDock(function(response) {
                console.log('response.wasOpenedByDock = ' + response.wasOpenedByDock)

                if (response.wasOpenedByDock) {
                  return;
                }

                OverwolfStore.getDockVisibilityStatus(function(response) {
                  console.log('response.isVisible = ' + response.isVisible)

                  if (response.isVisible) {
                    return;
                  }

                  OverwolfStore.showDock();
                  $rootScope.dockWasShownThisSession = true;
                  console.log('showed dock')
                });
              });
            }

            function reinitLocalApps() {
              _this = ItemsServiceBase.init(OverwolfStore.apps.getLocalApps,[OverwolfStore.apps.onAppInstalled, OverwolfStore.apps.onAppUninstalled],"apps","UID");
              _this.apps = _this.items;
            }

            var _this = ItemsServiceBase.init(OverwolfStore.apps.getLocalApps,[OverwolfStore.apps.onAppInstalled, OverwolfStore.apps.onAppUninstalled],"apps","UID");
            _this.apps = _this.items;

            _this.downloadNumRequestsStack = []; //stack holding ids of apps requesting download info
            _this.downloadNumQueryTimeout = null; //timeout that is being reset whenever a new app is requesting data
            _this.pendingDownloadsCallbacks = []; //associative array of x number of callbacks PER app id
            _this.numOfPendingDownloadsCallbacks = 0;

            OverwolfStore.apps.onAppInstallationProgressChanged.addListener(function(d){
                console.log("app install update " + JSON.stringify(d));
            });

            OverwolfStore.apps.onAppRemovedFromDock.addListener(function(d){
                console.log("app removed from dock " + JSON.stringify(d));
                if (d.uid) {
                    _this.apps[d.uid].IsCurrentlyInDock = false;
                }
            });

            OverwolfStore.apps.onAppAddedToDock.addListener(function(d){
                console.log("app added to dock " + JSON.stringify(d));
                if (d.uid) {
                    _this.apps[d.uid].IsCurrentlyInDock = true;
                }
            });

            OverwolfStore.apps.onAppDesktopShortcutAdded.addListener(function (d) {
              console.log("app desktop shortcut added " + JSON.stringify(d));
              if (d.uid) {
                _this.apps[d.uid].HasDesktopShortcut = true;
              }
            });

            OverwolfStore.apps.onAppDesktopShortcutRemoved.addListener(function (d) {
              console.log("app desktop shortcut removed " + JSON.stringify(d));
              if (d.uid) {
                _this.apps[d.uid].HasDesktopShortcut = false;
              }
            });

            _this.getAppById = function (appId, callback) {

                return _this.getItemById(appId,callback)
            };


            _this.getAllApps = function(callback){
                return _this.getAllItems(callback);
            };

            _this.getAllAppsAsArray = function(callback) {
                return _this.getItemsAsArray(callback);
            };


            _this.installApp = function (appId, callback, origin) {
                console.log("Installing app " + appId);

                if(!_this.apps[appId]) {
                    _this.apps[appId] = {};
                }

                _this.apps[appId].isInstalling = true;
                _this.apps[appId].installError = false;
                _this.apps[appId].UID = appId;

                if (UserService.isLoggedIn) {
                  showDockIfNeeded();
                }

                OverwolfStore.apps.installApp(appId, function (result) {
                  _this.apps[appId].isInstalling = false;
                    if (result.status !== "success"){
                      _this.apps[appId] = {};

                        if(result.error !== "Not signed in." && result.error !== "Unverified"){
                          _this.apps[appId].installError = true;
                          if (result.status === "error" && result.error.toLowerCase() === "Can't download app - no connectivity".toLowerCase()) {
                            $rootScope.$broadcast("appInstallConnectionError", {
                              UID: appId,
                              type: "app"
                            })
                          }
                        }
                    }
                    else {
                        _this.apps[appId].installError = false;
                        _this.apps[appId].isInstalled = true;
                        reinitLocalApps();
                    }

                    if (typeof callback == 'function') {
                        callback(result);
                    };
                },
                origin)
            };

            _this.resetInstallError = function(appId){
                _this.apps[appId].installError = false;
                _this.apps[appId].isInstalled = false;
                _this.apps[appId].isInstalling = false;
            };

            _this.unInstallApp = function (appId, callback) {
                console.log("uninstallid app id", appId);
                showDockIfNeeded();
                OverwolfStore.apps.uninstallApp(appId, function (info) {
                    if (info.status == "success") {
                        console.log("REINIT APPS");
                        reinitLocalApps();
                    }
                })
            };

            _this.launchApp = function (appId, callback) {
                console.log("Launching app", appId);
                OverwolfStore.apps.launchApp(appId, function (info) {
                    if (info.status == "error") {
                        console.error("error launching app id", appId, info);
                    }
                    if (typeof callback == 'function') {
                        callback(info);
                    }
                });


            };


            _this.getAppTotalDownloads = function (appId, callback) {
              _this.getItemTotalDownloads(appId,callback)
            };

            _this.addToDock = function(appId, callback){

                OverwolfStore.apps.addAppToDock(appId, function(result) {
                    _this.apps[appId].IsCurrentlyInDock = true;
                    if(typeof callback == "function"){
                        callback(result);
                    }
                });

            };

            _this.removeFromDock = function(appId, callback){
                OverwolfStore.apps.removeAppFromDock(appId, function(result) {
                    _this.apps[appId].IsCurrentlyInDock = false;
                    if(typeof callback == "function"){
                        callback(result);
                    }
                });
            };

            _this.addDesktopShortcut = function (appId) {
              OverwolfStore.apps.addAppDesktopShortcut(appId);
            };

            _this.removeDesktopShortcut = function (appId) {
              OverwolfStore.apps.removeAppDesktopShortcut(appId);
            };

            _this.desktopShortCutSupported = function(app){
              return app.hasOwnProperty("HasDesktopShortcut") &&
                app.hasOwnProperty("CanHaveDesktopShortcut") &&
                app.InstallState === "Installed" &&
                app.CanHaveDesktopShortcut;
            };

            _this.hasDesktopShortcuts = function(app){
              return app.HasDesktopShortcut;
            };

            _this.getAppByIdInternal = function (uid, callback) {
              OverwolfStore.apps.getLocalApp(uid, callback);
            };

            return _this;
        }
    )
})(angular);
