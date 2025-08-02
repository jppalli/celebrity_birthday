/**
 * Created by Yoske on 21/04/2015.
 */

angular.module('overwolf')
    .directive('owScrollColumnsWorkaround', function ($timeout, $rootScope) {
        return {
            restrict: 'AE',
            link: function ($scope, $el, attrs) {
                $rootScope.$on("readLessPressed", function(evt, info){
                    //***********************
                    /*
                        This is awfully specific code so at least I isoloated it in it's own directive. This directive has two purposes:
                        1. work around a chrome bug with -webkit-colums which is used to display the user reviews in two columns. It appears that some DOM modications
                        cause the columns not to work properly (switches to one columns). We are fixing it by briefly toggling display:none; on the element, which forces a redraw
                        and makes the column look good.

                        2. Scroll back to the top of the element on which the "Read less" was pressed on. This happens outside of the read-more directive because
                         it is done on an ancestor element.
                     */

                    $el.css("display","none");
                    $timeout(function(){
                        $el.css("display","block")

                        $el.scrollTop(info.scrollToEl.get(0).offsetTop - 80);
                    },20);
                    //*************************
                });
            }
        }
    }
);
