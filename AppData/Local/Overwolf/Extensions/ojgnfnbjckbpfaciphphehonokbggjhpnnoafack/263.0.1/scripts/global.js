/**
 * Created by Yoske on 22/12/2014.
 */
$(document).ready(function() {


    // bind on keydown
    $("body").on('keydown', function(e) {
        var inputs = $('input:visible, textarea:visible, select:visible, button:visible'), inputTo;
        // if we pressed the tab
        if (e.keyCode == 9 || e.which == 9) {
            // prevent default tab action
            e.preventDefault();

            var focused = $(':focus');
            if (e.shiftKey) {
                // get previous input based on the current input
                inputTo = inputs.get(inputs.index(focused) - 1);
            } else {
                // get next input based on the current input
                inputTo = inputs.get(inputs.index(focused) + 1);
            }

            // move focus to inputTo, otherwise focus first input
            if (inputTo) {
                inputTo.focus();
            } else if(angular.isDefined(inputs[0])) {
                inputs[0].focus();
            }
        }
    });

    $("body").on('click', function(e){
      if (e.button === 0 && e.shiftKey) {
        e.preventDefault();
      }
    });

    $("body").on('auxclick', e => {
      if (e.button === 1) {
        e.preventDefault();
      }
    });

    ( () => {
      // change the create banner variant on load
      const createBanner = document.querySelector('#createBanner');
      const imgNum = Math.floor((Math.random() * 3) + 1);
      const bannerSrc = `https://www.overwolf.com/system/modules/com.overwolf.store/resources/images/temp/cbaner-${imgNum}.webp`;
    
      if(createBanner) {
        createBanner.classList.add(`cbanner-${imgNum}`);
        createBanner.querySelector('img').src = bannerSrc;
      }
    
    } )();

});

window.onerror = function(errorMsg, url, linenum, col, errObj) {
    console.error(url + " | " + linenum + ":" + col + " - " + errorMsg);
};

//create banner onclick script, its not working from window.js using $scope...
function openCreateBanner() {
  const createBannerClassName = document.querySelector('#createBanner').className;
  OverwolfStore.openUrlInDefaultBrowser(`https://www.overwolf.com/creators/build-an-app/?utm_source=client_appstore&utm_medium=banner&utm_campaign=devrel_0622&utm_term=${createBannerClassName.slice(-1)}`);
}

