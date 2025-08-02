$(document).ready(function () {
  var hideTimeout = null;

  function gameInfoUpdated(info) {
    if (info == null) {
      return;
    }

    if (info.gameInfo == null) {
      return null;
    }

    overwolf.windows.changeSize("index", info.gameInfo.width, info.gameInfo.height);
  }

  function exclusiveModeUpdated(info) {
    console.log("exclusive mode updates", info);

    if (info.eventName === "enter") {
      if (hideTimeout) {
        clearTimeout(hideTimeout);
        hideTimeout = null;
      }

      $(".notification-text").addClass("hide");
      _updateLogo(info);
      switch(info.state){
        case "general":
          _updateHotkeyHtml(info, true);
          break;
        case "singleWindow":
          _updateHotkeyHtml(info, false);
          break;
        case "multipleWindows":
          $(".notification-text-apps").removeClass("hide");
          break;
      }

      $('body').addClass('active');
    }
    else if (info.eventName === "update"){
      $(".notification-text").addClass("hide");
      _updateLogo(info);
      switch(info.state){
        case "general":
          _updateHotkeyHtml(info, true);
          break;
        case "singleWindow":
          _updateHotkeyHtml(info, false);
          break;
        case "multipleWindows":
          $(".notification-text-apps").removeClass("hide");
          break;
      }
    }
    else if (info.eventName === "exit") {
      $('body').removeClass('active');

      hideTimeout = setTimeout(()=> {
        overwolf.windows.hide("index",function(){});
      }, 1000);
    }
  }

  function _updateHotkeyHtml(info, isDock){
    let className = isDock ? ".notification-text-dock" : ".notification-text-app";
    let label = isDock ? "<h1>to return to the game</h1>" : "<h1>to hide this app and return to the game</h1>";
    let html = "";
    if(info.hasOwnProperty("releaseHotkeyString") && info.releaseHotkeyString){
      let hotkeys = info.releaseHotkeyString.split("+");

      for(let hotkey of hotkeys){
        html += "<span class='hotkey'>" + hotkey + "</span>"
      }
      html += label;
    }
    else{
      html = label;
    }

    $(className).empty();
    $(className).html(html);
    $(className).removeClass("hide");
  }

  function _updateLogo(info){
    let logo = `<svg class="svg-icon-fill" viewBox="0 0 40 40"><use xlink:href="assets/svg/sprite.svg#logo" /></svg>`;
    if (info.state == "singleWindow"){
	logo = `<img src="overwolf://extension-resources/${info.appUID}/icon" alt="app_icon" style="width:40px;height:40px;">`;
    }
    $(".logo").empty();
    $(".logo").html(logo);
  }
    
  overwolfInternal.game.onExclusiveModeChanged.removeListener(exclusiveModeUpdated);
  overwolfInternal.game.onExclusiveModeChanged.addListener(exclusiveModeUpdated);

  overwolf.games.onGameInfoUpdated.removeListener(gameInfoUpdated);
  overwolf.games.onGameInfoUpdated.addListener(gameInfoUpdated);

  overwolf.games.getRunningGameInfo((gameInfo) => {
    let info = {
      'gameInfo': gameInfo
    };
    gameInfoUpdated(info);
  });

});
