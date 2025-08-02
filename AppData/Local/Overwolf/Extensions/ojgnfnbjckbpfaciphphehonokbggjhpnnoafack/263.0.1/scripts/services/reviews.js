(function (angular) {
  'use strict';

  angular.module('overwolf')
    .service('ReviewsService', function ($q, $http, $rootScope) {
      var ReviewsService = {};

      // create or update user review
      ReviewsService.getOwnReview = function (appId, userToken) {
        var deferred = $q.defer();

        $http({
          method: "GET",
          url: $rootScope.apiBase + "apps/comment/" + appId,
          headers: {
            'Authorization': "Bearer " + userToken
          }
        }).then(
          function (info) {
            if (info.data.success && info.data.comment) {
              var myReview = {
                stars: info.data.comment.rate,
                text: info.data.comment.comment_content

              };
              deferred.resolve(myReview);
            }
            else {
              deferred.reject(info);
            }
          },
          function (info) {
            deferred.reject(info);
          }
        )

        return deferred.promise;
      };

      // create or update user review
      ReviewsService.save = function (review, appId, userToken) {

        const getLocalApp = (appId) => {
          return new Promise(resolve => {
            OverwolfStore.apps.getLocalApp(appId, res => {
              resolve(res);
            });
          });
        };

        const getGepInfo = () => {
          return new Promise(resolve => {
            OverwolfStore.apps.getLocalApp('ggfmakpbllghoepnmfelddbminamnbmfelbahfdp', res => {
              resolve(res);
            });
          });
        };

        const getSystemInfo = () => {
          return new Promise(resolve => {
            OverwolfStore.getGlobalInformation(res => {
              resolve(res.system_information);
            });
          });
        };

        return new Promise(resolve => {
          const promises = [
            getLocalApp(appId),
            getGepInfo(),
            getSystemInfo()
          ];

          Promise.all(promises).then(values => {
            const manifest = values[0];
            const appVersion = manifest.data.Version;

            const owVersion = OverwolfStore.version;

            const gepData = values[1];
            const gepVersion = gepData.data.Version;

            const systemInfo = values[2];
            const os = systemInfo.OS;

            const monitors = systemInfo.Monitors;
            const mainMonitor = monitors.find(monitor => monitor.IsMain);
            const secondaryMonitor = monitors.find(monitor => !monitor.IsMain);

            var data = {
              content: review.text,
              rate: review.stars,
              extra: {
                appVersion: appVersion,
                owVersion: owVersion,
                gepVersion: gepVersion,
                os: os,
                mainResolution: mainMonitor.Resolution,
                mainScreenDpi: mainMonitor.Dpix.toString()
              }
            };

            if (secondaryMonitor) {
              data.extra.secondaryResolution = secondaryMonitor.Resolution;
              data.extra.secondaryScreenDpi = secondaryMonitor.Dpix.toString();
            }

            return resolve($http({
              method: "POST",
              url: $rootScope.apiBase + "apps/comment/" + appId,
              headers: {
                'Authorization': "Bearer " + userToken
              },
              data: data
            }));
          });
        });
      };

      ReviewsService.addLog = function (logId, appId, userToken) {
        var data = {
          logId: logId
        };
        // console.log('posting log', data);
        return $http({
          method: "POST",
          url: $rootScope.apiBase + "apps/comment/" + appId + "/log",
          headers: {
            'Authorization': "Bearer " + userToken
          },
          data: data
        });
      };

      // delete review
      ReviewsService.remove = function (appId, userToken) {

        return $http({
          method: "DELETE",
          url: $rootScope.apiBase + "apps/comment/" + appId,
          headers: {
            'Authorization': "Bearer " + userToken
          },
          data: { "app_id": appId }
        });
      };

      // undo deleted review
      ReviewsService.restore = function (restoreToken) {
        var deferred = $q.defer(),
          result;

        // start test code
        // todo: implement $http api call or use $resource service
        if (restoreToken) {
          result = ReviewsService._deletedReview;
          ReviewsService._deletedReview = null;
        }

        deferred.resolve(result);
        // end test code

        return deferred.promise;
      };

      ReviewsService.getReviewsForApp = function (appId, pageNum, pageSize) {
        var deferred = $q.defer();
        $http.get($rootScope.apiBase + "apps/comments/" + appId + "/" + pageNum + "/" + pageSize).then(
          function (response) {
            if (response.data.success == true) {
              response.data.average_score = getAverageRatingForApp(response.data);
              for (var i = 0; i < response.data.comments.length; i++) {
                response.data.comments[i] = getPresentableReview(response.data.comments[i]);
              }

              deferred.resolve(response.data);
            }
            deferred.reject(response)
          },
          function (response) {
            deferred.reject(response)
          }
        )

        return deferred.promise;
      };

      ReviewsService.getReviewForApp = function (appId, commentId) {
        var deferred = $q.defer();
        $http.get($rootScope.apiBase + "apps/comments/" + appId + "/" + commentId).then(
          function (response) {
            if (response.data.success == true && response.data.comment) {
              response.data.comment = getPresentableReview(response.data.comment);

              deferred.resolve(response.data);
            }
            deferred.reject(response)
          },
          function (response) {
            deferred.reject(response)
          }
        )

        return deferred.promise;
      };

      function getPresentableReview(review) {
        if ($rootScope.webMode) {
          review.comment_author_url = review.comment_author_url.substring(review.comment_author_url.indexOf("//"));
        }
        review.comment_content = removeTagsFromText(review.comment_content);
        review.comment_date = new Date(review.comment_date_gmt).toLocaleDateString();
        for (var i = 0; i < review.replies.length; i++) {
          review.replies[i] = getPresentableReply(review.replies[i]);
        }

        return review;
      };

      function getPresentableReply(reply) {
        reply.editedAt = new Date(reply.editedAt).toLocaleDateString();
        reply.body = removeTagsFromText(reply.body, ['a']);
        return reply;
      };

      function removeTagsFromText(text, allowedTags) {
        if (!text || text === '') {
          return '';
        }

        if (Array.isArray(allowedTags) && allowedTags.length > 0) {
          let tags = allowedTags.join("|");
          let regex = new RegExp(`(<\/?(?:${tags})[^>]*>)|<[^>]+>`, "ig")
          return text.toString().replace(regex, '$1');
        } else {
          return text.toString().replace(/(<([^>]+)>)/ig, '');
        }
      };

      function getAverageRatingForApp(appReviewResponse) {
        var averageRating = parseInt(appReviewResponse.rate_sum) / parseInt(appReviewResponse.rate_count);
        return Math.round(averageRating * 2) / 2; //round to nearest .5 score.
      };

      return ReviewsService;
    });
})(angular);
