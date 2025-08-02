(function (angular) {
    'use strict';

    angular.module('overwolf')
        .service('TrackingService', function ($http, UserService, $timeout, $rootScope) {
            var iframeId = 0;

            var machindID;
            var userId;
            var partnerId;
            var sessionId;

            var finishedInit = false;
            var finishedLoadingGaIframe = false;
            var eventsQueue = [];
            var gaIframe;
            const trackingSubDomain =
             location.protocol === 'https:' ?
              'analyticssec' :
              'analyticsnew';

            function init(){
                //addGaIframe();
                if($rootScope.webMode){
                    finishedInit = true;
                }
                else {
                    OverwolfStore.getGlobalInformation(function (info) {
                        machindID = info.muid;
                        userId = info.ow_name;
                        partnerId = info.partner_id;
                        sessionId = userId + "." + (Math.random() * 10000000000000000);
                        finishedInit = true;
                        sendQueuedEventsIfReady();
                    })
                }
            }

            var TrackingService =  {

            };

            TrackingService.trackOnce = function (event, extra) {
              var sentEvents = localStorage.sentEvents;

              if (sentEvents) {
                sentEvents = JSON.parse(sentEvents);
              } else {
                sentEvents = [];
              }

              if (sentEvents.indexOf(event) < 0) {
                trackRedShiftEvent(event, null, null, null, null, extra);
                sentEvents.push(event);
                localStorage.sentEvents = JSON.stringify(sentEvents);
              }
            };

            TrackingService.trackEvent = function (category, action, label, value, custom, extra, trackRS) {
                trackGaEvent("send", "event", category, action, label, value, custom);
                if(typeof trackRS === 'undefined' || trackRS) {
                  trackRedShiftEvent(category, action, label, value, custom, extra);
                }
                console.log("Event Tracked", "Category:", category, "Action:", action, "Label:", label, "Value:", value, "Custom:", custom);
            };

            TrackingService.trackOWEvent = function (name, extra) {
              performAnalyticsEvent(name, extra);
              console.log('[Tracking event]', name, extra);
            };

            function sendQueuedEventsIfReady(){
                if (finishedInit && finishedLoadingGaIframe) {
                    for (var i=0; i < eventsQueue.length; i++) {
                        var event = eventsQueue[i];
                        TrackingService.trackEvent(event.category,
                          event.action,
                          event.label,
                          event.value,
                          event.custom,
                          event.extra);
                    }
                }
            }


            function trackGaEvent(send, event, category, action, label, value, custom) {
                ga(send, event, category, action, label, value);
            }

            function trackRedShiftEvent(category, action, label, value, custom, extras) {
                if ($rootScope.webMode) {
                    return;
                }

                var nameArray = [];
                var extra = [{"Name": "SessionId", "Value": sessionId}];

                if (category) {
                  nameArray.push(category);
                }

                if (action) {
                  nameArray.push(action);
                }

                if (label) {
                  nameArray.push(label);
                }

                if (extras) {
                  var key, extraValue;
                  for (key in extras) {
                    extraValue = extras[key];
                    extra.push({"Name": key, "Value": extraValue});
                  }
                }

                if (!value) {
                  value = 0;
                }

                var params = {
                    CurrentVersion: OverwolfStore.version,
                    PartnerId: partnerId,
                    Testing: OverwolfStore.launchedWithServerTesting,
                    UserName: (UserService.username ?  UserService.username : userId),
                    Value: (value ? value : custom),
                    MUID: machindID,
                    Extra: JSON.stringify(extra)
                };

                if (extras && extras.gameId) {
                  params.GameId = extras.gameId;
                  delete extras.gameId;
                }

                if (OverwolfStore.trackRSEvent) {
                  actualTrack(nameArray.join('_'), extras);
                } else {
                  params.name = nameArray.join('_');
                  $http({
                    method:"GET",
                    url: "http://analyticsnew.overwolf.com/analytics/Counter",
                    params: params
                  });

                }
            }

            function actualTrack(name, extra) {
              if (typeof OverwolfStore.trackRSEventV2 === 'undefined') {
                OverwolfStore.trackRSEvent(name, extra);
                return;
              }
          
              OverwolfStore.trackRSEventV2(name, extra);
            }

            function performAnalyticsEvent(name, extra) {
              const params = {
                Name: name,
                Extra: encodeURIComponent(JSON.stringify(extra)),
              }

              $http({
                method:"GET",
                url: "//" + trackingSubDomain +
                ".overwolf.com/analytics/Counter",
                params: params
              });
           }

            init();
            window.TrackingService = TrackingService;
            return TrackingService;
        });


})(angular);
