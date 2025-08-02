/**
 * Created by Yoske on 14/12/2014.
 */
(function (angular) {
    'use strict';

    const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    /*****
     * Uses Moment.js but changes functionality a bit to comply with product specs.
     */
    angular.module('overwolf')
        .service('MomentService', function () {

            moment.relativeTimeThreshold('s', 60);
            moment.relativeTimeThreshold('m', 60);
            moment.relativeTimeThreshold('h', 24);
            moment.relativeTimeThreshold('d', 30);
            moment.relativeTimeThreshold('M', 10);

            moment.locale('en', {
                relativeTime : {
                    future: "in %s",
                    past:   "%s ago",
                    s:  "seconds",
                    m:  "a minute",
                    mm: "%d minutes",
                    h:  "an hour",
                    hh: "%d hours",
                    d:  "yesterday",
                    dd: "%d days",
                    M:  "a month",
                    MM: "%d months",
                    y:  "a year",
                    yy: "%d years"
                }
            });

            this.getHumanTimeFromNow = function(compareTimeEpoch){
                var res = moment(compareTimeEpoch, "X").fromNow();
                var now = new Date();
                if((now.getTime() / 1000) - compareTimeEpoch > 2592000){
                    return moment.unix(compareTimeEpoch).format("DD MMM YY")
                }
                if(res == "yesterday ago"){
                    return "yesterday";
                }

                return res;
            };

            this.getHumanizedDuration = function(durationInSections){
                if(durationInSections == 0){
                    return "nada";
                }
                if(durationInSections < 60){
                   return "seconds";
                }
                else if(durationInSections < 120){
                    return "a minute";
                }
                else if(durationInSections < 3600){
                    return Math.floor(durationInSections / 60) + " minutes"
                }
                else {
                    return Math.floor(durationInSections / 3600).toLocaleString() + " hours";
                }
            };

            this.getMonthText = function(date){
                return months[date.getMonth()];
            }
        });
})(angular);