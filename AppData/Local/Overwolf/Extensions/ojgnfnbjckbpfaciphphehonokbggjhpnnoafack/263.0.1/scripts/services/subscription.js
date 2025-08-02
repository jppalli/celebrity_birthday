(function (angular) {
    'use strict';

    const appIdToAssociatedAppIds = {
        flkgdpkkjcoapbgmgpidhepajgkhckpgpibmlclb: [
            "nafihghfcpikebhfhdhljejkcifgbdahdhngepfb"
        ]
    };

    angular.module('overwolf')
        .service('SubscriptionService', function ($q, $timeout, Event, $http, TrackingService, UserService) {
            var self = this;

            function getAllSubscriptions() {
                return $q(function (resolve, reject) {
                    OverwolfStore.subscriptions.getAllSubscriptions(function(response){
                        if(response.status === 'success'){
                            resolve(response.data);
                        } else {
                            reject(new Error(response.error));
                        }
                    });
                });
            }

            this.events = {
                subscriptionUpdated: new Event()
            };


            this.getActiveSubscriptionByExtensionId = function(extensionId){
                return getAllSubscriptions()
                  .then(function(data) {
                    return data.find(function(subscription) {
                        if (subscription.expired) {
                            return false;
                        }

                        return self.isSubscriptionRelatedToApp(subscription, extensionId);
                    });
                  })
                  .catch(function(e) {
                    if (e.message === 'user is logged out') {
                      return null;
                    } else {
                      throw e;
                    }
                  });
            };

            this.getPlans = function(extensionId) {
                var req = {
                  method: 'GET',
                  url: 'https://console-api.overwolf.com/v2/subscription-plans/app/' + extensionId,
                };

                if (UserService.developer) {
                  req.headers = {
                    Authorization: 'Bearer ' + UserService.token
                  };
                }

                return $http(req).then(function(response){
                    return response.data;
                });
            };

            this.isSubscriptionRelatedToApp = function(subscription, appId){
                if(subscription.extid === appId){
                    return true
                }

                if(appIdToAssociatedAppIds[appId]){
                    var foundByAssociatedAppId = appIdToAssociatedAppIds[appId]
                        .find(function(associatedAppId){
                            return subscription.extid === associatedAppId;
                        });

                    return !!foundByAssociatedAppId;
                }

                return false;
            };

            this.subscribe = function (planId, connectCallback, subscribeCallback) {
                // return $q(function (resolve, reject) {
                    OverwolfStore.subscriptions.subscribe(
                      planId,
                      connectCallback,
                      function(response) {
                        if (response.status === 'success') {
                            self.events.subscriptionUpdated.fire(response.data);
                            self.trackSubscriptionFinished(response.data);
                        }
                        subscribeCallback(response);
                      }
                    );
                // });
            };

          this.trackSubscriptionFinished = function(subscription) {
            var extra = {
              app_id: subscription.extid,
              plan_id: subscription.pid,
              in_app: false              
            };
            TrackingService.trackEvent(
              "subscription_finished_successfully",
              null,
              null,
              1,
              null,
              extra
            );
          };
      });
})(angular);
