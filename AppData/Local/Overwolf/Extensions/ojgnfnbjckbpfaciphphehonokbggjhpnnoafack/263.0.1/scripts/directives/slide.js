(function (angular) {
    'use strict';

    angular.module('overwolf')
        .directive('owSlide', function ($window, $document, owPreload, $timeout, $rootScope, $sce) {
            return {
                restrict: 'AE',
                require: "^?owSlider",
                link: function ($scope, $el, attrs, owSliderController) {
                    var slide,
                        video,
                        image,
                        id,
                        closeListener,
                        $win = angular.element($window);
//

                    id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                        return v.toString(16);
                    });
                    function render(source) {


                    }


                    var onResize = function () {
                        //if (!image) {
                        //    return;
                        //}
                        //if ($el.width() >= document.body.clientWidth && image.width >= $el.width()) {
                        //    var diff = image.width - $el.width();
                        //
                        //    image.style.position = "absolute";
                        //    image.style.left = -(diff / 2) + "px";
                        //
                        //} else {
                        //    image.style.position = "relative";
                        //    image.style.width = "100%"
                        //    image.style.height = "100%"
                        //}
                    };

                    var killVideoOnStoreClose = function() {
                        $("#ytframe").remove();
                    };
//
//
                    var onPlay = function () {

                    };

                    var onMessage = function(evt){
                        if(evt.data && evt.data.sliderId == id && evt.data.source == "video" && evt.data.type == "state_changed"){
                            if(evt.data.state == 1){
                                owSliderController.stopAutoRotate();
                                console.log("VIDEO PLAYING STOPING AUTO ROTATE");
                            }
                            else if(evt.data.state == 2) {
                                owSliderController.startAutoRotate();
                                console.log("VIDEO NOT PLAYING STARTING AUTO ROTATE");
                            }
                        }
                    };

                    window.addEventListener("message", onMessage);

                    // swap images for appstore-header-background
                    var replaceTopBlur = function(){
                        // var newImg = $el.parent().find(".top-blur>img:not(.active)");
                        // var oldImg = $el.parent().find(".top-blur>img.active")
                      if (owSliderController && owSliderController.sliderBlurElement) {
                        // var newImg = $document.find(".appstore-header-background>img:not(.active)");
                        // var oldImg = $document.find(".appstore-header-background>img.active");
                        var newImg =
                          owSliderController.sliderBlurElement.find("img:not(.active)");
                        var oldImg =
                          owSliderController.sliderBlurElement.find("img.active");
                        newImg.attr("src", slide.blurredImg);
                        newImg.addClass("active");
                        oldImg.removeClass("active");
                      }

                    };

                    $win.on('resize', onResize);
                    $scope.$watch(attrs.owSlideData, function (value) {
                        slide = value;
                        if(slide && angular.isDefined(slide.description)) {
                            slide.safeDescription = $sce.trustAsHtml(slide.description);
                        }
                        if (slide) {
                            if (slide.video) {
                                $el.html("<video src='" + slide.video + "' autoplay loop>");

                            }
                            else if(slide.youtubeId || slide.vimeoId){
                                var paramName = (slide.youtubeId ? "youtubeid" : "vimeoid");
                                var paramValue = (slide.youtubeId ?  slide.youtubeId :  slide.vimeoId);
                                var autoPlayState = (slide.autoplay).toString();

                                $el.html('<iframe id="ytframe" scrolling="no" src="https://content.overwolf.com/videoslideframe.html?sliderId=' + id + '&'+ paramName +'=' + paramValue+ '&autoplay=' +autoPlayState+ '" style="width:100%; height:100%; overflow: hidden;">')
                                closeListener = $scope.$on("StoreIsClosing", killVideoOnStoreClose);
                            }

                            else {
                                owPreload(slide.img).then(function (img) {

                                    image = img;
                                    $el.append(image);
                                    $timeout(function(){
                                        angular.element(image).css("opacity", 1)
                                    },100)

                                    $el.css("background-color","rgba(0,0,0,0)");

                                })
                            }
                        }
                    });

                    $scope.$watch(attrs.owSlideActive, function (value, oldValue) {
                        if ((value != oldValue) && value) {
                            replaceTopBlur();
                        }
                        else if(slide && (slide.youtubeId || slide.vimeoId)){
                            $("#ytframe")[0].contentWindow.postMessage({type:"pause"}, "*");
                        }

                    });


                    $scope.$on('$destroy', function () {
                        $win.off('resize', onResize);
//                        $video.off('play', onPlay);
                        image = null;
                        slide = null;
                        window.removeEventListener("message", onMessage);

                        if(typeof closeListener == "function"){//remove listener
                            closeListener();
                        }

                    });

                }
//                template: '<canvas></canvas>'
            };
        });

})(angular);