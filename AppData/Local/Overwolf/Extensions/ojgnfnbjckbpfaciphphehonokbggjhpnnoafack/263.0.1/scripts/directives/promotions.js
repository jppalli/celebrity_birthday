/**
 * Created by Yoske on 06/11/2014.
 */

(function (angular) {
    'use strict';

    angular.module('overwolf')
        .directive('owPromotions', function ($window, $interval, $document, $rootScope) {
            return {
                restrict: 'A',
                transclude: true,
                scope: true,
                controller: function ($scope ) {

                },
                link: function ($scope, $el, attrs, ctrl, transclude) {

                    var body = $document.find('body');

                    $rootScope.$on("splashRemoved", function () {
                        OverwolfStore.onStoreShown.addListener(function(info){
                            console.log("store shown event recieved from OW API", info);
                            checkForPromotion()
                        });

                        if(localStorage["FirstRun_owpromo"] && localStorage["FirstRun_owpromo"] == "false") {
                            checkForPromotion();
                        }
                        localStorage["FirstRun_owpromo"] = "false";
                    });



                    function checkForPromotion() {
                        OverwolfStore.promotions.getReadyPromotion(function (promotionInfo) {
                            if (promotionInfo && angular.isUndefined(promotionInfo.error)) {
                                showPromotion(promotionInfo)
                            }
                        })
                    }

                    function showPromotion(promotionInfo) {

                        var dvLightbox = $("<div class='lightbox-wrap'></div>");
                        var iframe = $("<iframe>");
                        dvLightbox.css("position", "absolute");
                        dvLightbox.css("z-index", "11");
                        dvLightbox.css("width", "100%");
                        dvLightbox.css("height", "100%");
                        dvLightbox.css("overflow", "hidden");
                        dvLightbox.css("top", "0px");
                        dvLightbox.css("left", "0px");

                        iframe.width("100%");
                        iframe.height("100%");
                        iframe.attr("src", promotionInfo.Url)
                        dvLightbox.css("visibility", "hidden");
                        iframe.attr("id", "iframe_promo");

                        dvLightbox.append(iframe);
                        $el.append(dvLightbox);

                        OverwolfStore.promotions.onPromotionContentReady.addListener(function () {
                            dvLightbox.css("visibility", "visible");
                        })

                        body.on('keydown', keyDownEscape);
                        OverwolfStore.promotions.onClosePromotion.addListener(function (evt) {
                            removePromotion();
                        })
                    }

                    function keyDownEscape(event) {
                        if (event.keyCode === 27) {
                            removePromotion()
                            body.off('keydown', keyDownEscape)
                        }

                    }

                    function removePromotion() {
                        setTimeout(function () {
                            $el.empty();
                        }, 50);

                    }

                    window.owShowPromotion = function () {
                        console.log("ow Show Promotion called ");
                        showPromotion({"Url": "promo://overwolf/MadOrcPromo15robocraftwolfcopter.html", "HorizontalMarginPercentage": 0, "VerticalMarginPercentage": 0})
                    }

                }
            };
        })

})(angular);