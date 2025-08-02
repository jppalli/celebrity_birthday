(function(angular) {
    'use strict';

    angular.module('overwolf')
        .service('owPosition', function() {
            return function position(viewport, source, options) {
                var viewportWidth = viewport.width,
                    viewportHeight = viewport.height,
                    imageWidth = source.width || source.videoWidth,
                    imageHeight = source.height || source.videoHeight,
                    viewportRatio = viewportHeight / viewportWidth,
                    imageRatio = imageHeight / imageWidth,
                    newWidth, newHeight,
                    pos;

                if (viewportRatio > imageRatio) {
                    newWidth = viewportHeight / imageRatio;
                    newHeight = viewportHeight;
                } else {
                    newWidth = viewportWidth;
                    newHeight = viewportWidth * imageRatio;
                }

                pos = {
                    width: newWidth,
                    height: newHeight,
                    left: 0,
                    top: 0
                };

                options || (options = {});
                options.x || (options.x = 'center');
                options.y || (options.y = 'top');

                switch (options.x) {
                    case 'left':
                        pos.left = 0;
                        break;

                    case 'right':
                        pos.left = viewportWidth - newWidth;
                        break;

                    case 'center':
                        pos.left = (viewportWidth - newWidth) / 2 ;
                        break;
                }

                switch (options.y) {
                    case 'top':
                        pos.top = 0;
                        break;

                    case 'bottom':
                        pos.top = viewportHeight - newHeight;
                        break;

                    case 'center':
                        pos.top = (viewportHeight - newHeight) / 2;
                        break;
                }

                return pos;
            };
        });

})(angular);