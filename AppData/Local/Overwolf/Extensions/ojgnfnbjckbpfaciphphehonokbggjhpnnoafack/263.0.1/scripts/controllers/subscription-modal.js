(function (angular) {
  'use strict';

  angular.module('overwolf')
    .controller('SubscriptionController', ['AppsService', 'SubscriptionService',
       'UserService', 'MomentService', 'OWModalService', '$scope', '$rootScope',
       '$q','TrackingService',
      function (AppsService, SubscriptionService, UserService, MomentService,
                OWModalService, $scope, $rootScope, $q, TrackingService) {
        var _this = this;
        // var _SUBSCRIPTION_STATES = {
        //     0: 'ACTIVE',
        //     1: 'CANCELED',
        //     2: 'REVOKED',
        //     3: 'INVALID',
        // };

        const _SUBS_TRACKING_EVENTS = {
          view_loaded: 'platform_subscription_offering_view',
          subscribe_button_click :'platform_subscription_subscribe_link'
        };

        const _SUBSCRIPTION_STATES = {
          ACTIVE: 0,
          CANCELED: 1,
          REVOKED: 2,
          INVALID: 3
        };

        function delay(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
        }

        function setActiveSubscription(subscription) {
          $scope.isSubscribed = !!subscription;
          if ($scope.isSubscribed) {
            // calculate date without grace for display
            var date = new Date(subscription.exp - subscription.grc);
            $scope.subscriptionExpiryText = MomentService.getMonthText(date) + ' ' + date.getDate() + ', ' + date.getFullYear();

            let subscribedPlan = $scope.plans.find(function (plan) {
              return plan.id === subscription.pid;
            });
            $scope.subscriptionPrice = subscribedPlan && subscribedPlan.price;

            if (subscription.state === _SUBSCRIPTION_STATES.ACTIVE) {
              $scope.endOfPeriodAction = 'renews';
            } else {
              $scope.endOfPeriodAction = 'ends';
            }
          }
        }

        function init() {
          SubscriptionService.events.subscriptionUpdated.register(function (subscription) {
            $scope.isInProgress = false;
            // $scope.isShowingActionInfo = false;
            if (SubscriptionService.isSubscriptionRelatedToApp(subscription, $scope.appId)) {
              setActiveSubscription(subscription);
            }
          });

          $scope.actionInfo = "&nbsp;";
          $scope.errorText = '';

          setActiveSubscription($scope.activeSubscription);

          $scope.isTileActive = new Array($scope.plans[0].tiles.length).fill(false);

          $scope.closeSubscription = () => {
            _this._doClose();
            $rootScope.$broadcast("closeAppModal");
          };

          $scope.goBack = () => {
            _this._doClose();
            $rootScope.$broadcast("showAppModal");
          };

          $scope.onClickSubscribe = () => {
            $scope.isInProgress = true;
            // $scope.actionInfo = 'Waiting for transaction to complete on PayPal';
            // $scope.isShowingActionInfo = true;
            $scope.errorText = '';
            var loginPrerequisitePromise = UserService.isLoggedIn ?
              $q.when() :
              OWModalService.show('login',
                'templates/login-modal.html',
                {
                  openState: $rootScope.loginopenState,
                  source: "welcome"
                });

            SendTracking(_SUBS_TRACKING_EVENTS.subscribe_button_click);

            loginPrerequisitePromise
              .then(function () {
                return SubscriptionService.getActiveSubscriptionByExtensionId($scope.appId);
              })
              .then(function (activeSubscription) {
                if (activeSubscription) {
                  // user already subscribed to the app,
                  // we reached here probably because the user was
                  // signed out when clicking "subscribe" button
                  $scope.isInProgress = false;
                  setActiveSubscription(activeSubscription);
                  return;
                }

                console.log('subscribing to plan: ' + $scope.plans[0].id);
                // $scope.isInProgress = true;
                SubscriptionService.subscribe(
                  $scope.plans[0].id,
                  // connect callback
                  function (response) {
                    // re-enable button
                    $scope.isInProgress = false;
                    if (response.status === 'error') {
                      $scope.errorText = 'Something went wrong. Try again. (' + response.reason + ')';
                      console.error('failed to connect to pubsub: ' + response.reason);
                      OverwolfStore.window.restore();
                      OverwolfStore.requestFocus();
                    }
                  },
                  // subscribe callback
                  function (response) {
                    if (response.status === 'error') {
                      console.error('failed to finish subscription flow: ' + response.reason);
                      $scope.errorText = 'Something went wrong. Try again. (' + response.reason + ')';
                    }

                    $scope.isInProgress = false;
                    OverwolfStore.window.restore();
                    OverwolfStore.requestFocus();
                  }
                );
              })
              .catch(function (e) {
                console.error('error in onClickSubscribe(): ' + e.message);
                $scope.errorText = 'Something went wrong. Try again.';
              });
          };

          $scope.onClickManage = () => {
            location.href = 'overwolf://settings/subscriptions';
          };

          _this._doClose = () => {
            $scope.active = false;
            $scope.owModal.close();
          };

          // animate tiles one by one
          $scope.plans[0].tiles.forEach(/*async*/ (tile, i) => {
            if (!tile.enabled) {
              return;
            }

            const delayMs = 1000 + (750 * i);
            // await delay(delayMs);
            setTimeout(() => $scope.isTileActive[i] = true, delayMs);
          });
          
          $scope.hoverOverSprite = ($event, isSmall) => {
            const el = $event.currentTarget;
            const className = isSmall ? 'small-is-active' : 'is-active';

            el.classList.remove(className);
            el.offsetHeight; // reflow
            el.classList.add(className);
          }

          SendTracking(_SUBS_TRACKING_EVENTS.view_loaded);
          if (typeof mixpanel !== 'undefined') {
            mixpanel.track('overwolf_client_subscription_initialized', {
              'App name':  $scope.appName,
            })
          }
        }


        function SendTracking(eventName) {
          try {
            var extra = {
              app_id: $scope.appId,
              in_app: false,
              is_subscribed: $scope.isSubscribed,
              is_logged_in: UserService.isLoggedIn,
              plan_id: getPlanId()
            };
            
            TrackingService.trackEvent(
              eventName,
              null,
              null,
              1,
              null,
              extra
            );
          } catch (err) {
            console.error(`send subs '${eventName}' tracking error`, err);
          }
        }

        function getPlanId() {
          try {
            return $scope.plans[0].id
          } catch (err) {
            console.error('error reading plan id');
            return "";
          }
        }

        init();
      }]);

})(angular);