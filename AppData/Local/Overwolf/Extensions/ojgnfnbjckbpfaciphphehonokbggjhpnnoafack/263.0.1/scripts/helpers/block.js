(function(angular) {
    'use strict';

    angular.module('overwolf')
        .service('owBlock', function() {
            function position(modalBox, parentBox, options) {
                var position = options.align.split('-'),
                    offset = options.offset || {x: 0, y: 0};

                modalBox = angular.copy(modalBox);

                position = {
                    x: position[1],
                    y: position[0]
                };

                switch (position.x) {
                    case 'left':
                        // modalBox.left = parentBox.left - modalBox.width - offset;
                        modalBox.left = parentBox.left - offset.x;
                        break;

                    case 'right':
                        // modalBox.left = parentBox.left + parentBox.width + offset;
                        modalBox.left = parentBox.left + parentBox.width - modalBox.width + offset.x;
                        break;

                    case 'center':
                        modalBox.left = parentBox.left + (parentBox.width - modalBox.width) / 2;
                        break;
                }

                switch (position.y) {
                    case 'top':
                        modalBox.top = parentBox.top - modalBox.height - offset.y;
                        break;

                    case 'bottom':
                        modalBox.top = parentBox.top + parentBox.height + offset.y;
                        break;

                    case 'center':
                        modalBox.top = parentBox.top + (parentBox.height - modalBox.height) / 2;
                        break;
                }

                return modalBox;
            }

            return {
                position: position
            };
        });

})(angular);