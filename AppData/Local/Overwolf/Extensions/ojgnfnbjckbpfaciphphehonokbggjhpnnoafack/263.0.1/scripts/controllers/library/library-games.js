(function (angular) {
  angular.module('overwolf')
    .controller('LibraryGamesController',
      ['AppsService', 'TrackingService', 'UserService', '$scope', '$rootScope', '$http', '$filter',
      function (AppsService, TrackingService, UserService, $scope, $rootScope, $http, $filter) {

      const LAUNCH_EVENTS = {
        "autoLaunch": {
          "LaunchEvents": [{
            "event": "AllGamesLaunch",
            "event_data": {
              "game_ids": []
            }
          }],
          "GameTargeting": {
            "type": "all"
          }
        },
        "noAutoLaunch": {
          "LaunchEvents": null,
          "GameTargeting": {
            "type": "all"
          }
        }
      };
      const APPS_TO_INCLUDE = {
        "jnabojaampcpfclojlbildognlnebnhfhibiielh": LAUNCH_EVENTS.autoLaunch,
        "jgbnfkaeklillfmfafgkodhlcnfdgkmjmjngaaof": LAUNCH_EVENTS.noAutoLaunch
      };
      const APP_PAGE_URL = `${$rootScope.apiBase}/solr/prop?name=navbar_alt_name&value="%GAME_NAME%"`;
      const FPS_HOTKEY_DELAY = 10000;

      let _fpsHotkeyTimeout;
      let _ignoreGSInput = false;

      $scope.filteredGames = [];
      $scope.apps = {
        autoLaunch: [],
        noAutoLaunch: []
      };
      $scope.gameSummarySettings = null;
      $scope.gameSummaryInput = {
        enabled: false,
        display: 'show'
      };
      $scope.selectedGame = null;
      $scope.settingsInnerHovered = false;
      $scope.fpsHotKey = "";

      function _start() {
        console.log("[LIBRARY GAMES] starting");
        OverwolfStore.apps.onAppInstalled.removeListener(_onAppInstalled);
        OverwolfStore.apps.onAppInstalled.addListener(_onAppInstalled);

        OverwolfStore.apps.onAppUninstalled.removeListener(_onAppUninstalled);
        OverwolfStore.apps.onAppUninstalled.addListener(_onAppUninstalled);

        OverwolfStore.gamesSettings.onGameSettingsModified.removeListener(_onGameSettingsModified);
        OverwolfStore.gamesSettings.onGameSettingsModified.addListener(_onGameSettingsModified);

        OverwolfStore.gamesSettings.onGameSummaryGameModified.removeListener(_onGameSummaryGameModified);
        OverwolfStore.gamesSettings.onGameSummaryGameModified.addListener(_onGameSummaryGameModified);

        UserService.getCurrentUser(function () {
          console.log('[LIBRARY GAMES] got current user')
        });
        _updateFpsHotkey();
        _updateApps();
      }

      function _stop() {
        console.log("[LIBRARY GAMES] stopping");
        _stopUpdateFpsHotkey();
        OverwolfStore.apps.onAppInstalled.removeListener(_onAppUninstalled);
        OverwolfStore.apps.onAppUninstalled.removeListener(_onAppUninstalled);
        OverwolfStore.gamesSettings.onGameSettingsModified.removeListener(_onGameSettingsModified);
        OverwolfStore.gamesSettings.onGameSummaryGameModified.removeListener(_onGameSummaryGameModified);
      }

      function _getGameSummarySettings(gameId) {
        AppsService.getAppByIdInternal('nafihghfcpikebhfhdhljejkcifgbdahdhngepfb', function (result) {
          if (result.data && result.data.InstallState !== "Installed") {
            $scope.gameSummarySettings = null;
          }
          else{
            OverwolfStore.gamesSettings.gameSummaryGetGame(gameId, function (response) {
              if (response.status !== 'success') {
                console.error('failed to get game summary data for game ' + gameId);
                return;
              }

              $scope.gameSummarySettings = null;

              if (response.data) {
                let settings = JSON.parse(response.data);
                $scope.gameSummarySettings = settings;

                if(!$scope.gameSummarySettings.input){
                  $scope.gameSummarySettings.input = {
                    enabled: $scope.selectedGame.settings.overlayEnabled && settings.active,
                    display: settings.display
                  };
                }
                // $scope.gameSummarySettings.input.display = settings.display;
                // $scope.gameSummarySettings.input.enabled = $scope.selectedGame.settings.overlayEnabled && settings.active;

                // $scope.gameSummaryInput.display = settings.display;
                // $scope.gameSummaryInput.enabled =
                //   $scope.selectedGame.settings.overlayEnabled && settings.active;
              }
            });
          }
        });
      }

      function _updateApps() {
        $scope.apps = {
          autoLaunch: [],
          noAutoLaunch: []
        };

        if(!$scope.selectedGame){
          return;
        }

        let appsList = $scope.getApps();

        let disabledApps = $scope.selectedGame.settings.autoLaunchDisabledExtensions;
        let gameId = $scope.getGameId();

        for(let i = 0; i < appsList.length; i++){
          let app = appsList[i];

          if(APPS_TO_INCLUDE.hasOwnProperty(app.UID)){
            let appToCopy = APPS_TO_INCLUDE[app.UID];
            app.LaunchEvents = appToCopy.LaunchEvents;
            app.GameTargeting = appToCopy.GameTargeting;
          }

          // don't show uninstalled apps, or apps with no game targeting
          if(app.InstallState !== "Installed" || !app.GameTargeting){
            continue;
          }

          let targetingType = app.GameTargeting.type;
          let targetedGames = app.GameTargeting.game_ids;

          // don't show apps which aren't targeted to the current selected game
          if(targetingType === "none" ||
            !(targetingType === "all" || targetedGames.indexOf(gameId) >= 0)){
            continue;
          }

          // an app's autolaunch is enabled for this game if it's not in the
          // disabled list
          app.autoLaunchEnabled = true;
          if(disabledApps && disabledApps.length > 0) {
            app.autoLaunchEnabled = disabledApps.indexOf(app.UID) < 0;
          }

          let isAutoLaunchSupported = _checkIsAppAutoLaunchSupported(app);
          if(isAutoLaunchSupported){
            $scope.apps.autoLaunch.push(app);
          }
          else{
            $scope.apps.noAutoLaunch.push(app);
          }
        }

        console.log("[LIBRARY GAMES] apps config: " + JSON.stringify($scope.apps));
      }

      function _checkIsAppAutoLaunchSupported(app) {
        let result = false;
        let gameId = $scope.getGameId();
        let launcherIds = $scope.getGameLauncherIds();
        if(app.hasOwnProperty("LaunchEvents") && app.LaunchEvents){
          let launchEvents = app.LaunchEvents;
          for(let eventConfig of launchEvents) {
            let event = eventConfig.event;
            if (event === "AllGamesLaunch") {
              result = true;
              break;
            }
            else if (event === "GameLaunch") {
              let data = eventConfig.event_data.game_ids;
              result = data.indexOf(gameId) >= 0 || _checkGameLaunchers(launcherIds, data);
              break;
            }
          }
        }
        return result;
      }

      function _checkGameLaunchers(launcherIds, appGameLaunchIds) {
        if(!launcherIds || launcherIds.length === 0){
          return false;
        }
        for(let launcherId of launcherIds){
          let launcherClassId = Math.floor(launcherId/10);
          if(appGameLaunchIds.indexOf(launcherClassId) >= 0){
            return true;
          }
        }
        return false;
      }

      function _onAppInstalled(event) {
        _waitForAppsUpdateAndUpdateApps();
        if(event && event.uid === "flkgdpkkjcoapbgmgpidhepajgkhckpgpibmlclb") {
          _getGameSummarySettings($scope.getGameId($scope.selectedGame));
          $scope.$apply();
        }

      }

        function _onAppUninstalled(event) {
          _waitForAppsUpdateAndUpdateApps();

          if(event && event.uid === "flkgdpkkjcoapbgmgpidhepajgkhckpgpibmlclb") {
            $scope.gameSummarySettings = null;
            $scope.$apply();
          }
        }

      function _waitForAppsUpdateAndUpdateApps() {
        let unbind = $rootScope.$on("ItemsUpdated", function () {
          _updateApps();


          unbind();
        });
      }

      function _onGameSummaryGameModified(newSettings) {
        let currentGameId = $scope.getGameId();
        if (newSettings.gameClassId !== currentGameId) {
          return;
        }

        let settings = JSON.parse(newSettings.data);
        $scope.gameSummarySettings = settings;
        if(!_ignoreGSInput) {

          if(!$scope.gameSummarySettings.input){
            $scope.gameSummarySettings.input = {
              enabled: settings.active,
              display: settings.display
            };
          }
          $scope.gameSummarySettings.input.display = settings.display;
          $scope.gameSummarySettings.input.enabled = settings.active;

          // $scope.gameSummaryInput.display = settings.display;
          // $scope.gameSummaryInput.enabled = settings.active;
        }
        _ignoreGSInput = false;

        if (settings.active) {
          OverwolfStore.gamesSettings.setOverlay(currentGameId, true);
        }

        $scope.$apply();
      }

      function _onGameSettingsModified(gameSettings) {
        console.log("[LIBRARY GAMES] _onGameSettingsModified: " + JSON.stringify(gameSettings));
        let gameId = $scope.getGameId(gameSettings);
        let gameToUpdate = null;
        let index = -1;
        for(let i = 0; i < $scope.localGames.length; i++){
          let game = $scope.localGames[i];
          let curGameId = $scope.getGameId(game);
          if(curGameId === gameId){
            index = i;
            gameToUpdate = game;
            console.log("[LIBRARY GAMES] game already exists");
            break;
          }
        }

        if (gameToUpdate) {
          console.log("[LIBRARY GAMES] updating game " + JSON.stringify(gameToUpdate));
          gameToUpdate.settings.overlayEnabled = !gameSettings.settings.overlayDisabled;
          gameToUpdate.settings.fpsSettings.enabled = !gameSettings.settings.fpsSettings.disabled;
          gameToUpdate.LastPlayed = new Date(gameSettings.settings.statistics.lastPlayTime);
          gameToUpdate.TotalTimeInSeconds = gameSettings.settings.statistics.localPlayTimes;

          console.log("[LIBRARY GAMES] game updated" + JSON.stringify(gameToUpdate));
          $scope.localGames[index] = gameToUpdate;
        }
        else{
          _addNewGameSettings(gameSettings);
        }

        $scope.$apply();
      }

      function _addNewGameSettings(gameSettings) {
        let updatedGameSettings = angular.extend({}, gameSettings);

        updatedGameSettings.selected = false;
        updatedGameSettings.settings.overlayEnabled = !updatedGameSettings.settings.overlayDisabled;
        updatedGameSettings.settings.fpsSettings.enabled = !updatedGameSettings.settings.fpsSettings.disabled;

        if(!updatedGameSettings.settings.autoLaunchDisabledExtensions){
          updatedGameSettings.settings.autoLaunchDisabledExtensions = [];
        }

        // for sorting
        updatedGameSettings.GameName = updatedGameSettings.info.name;
        updatedGameSettings.LastPlayed = new Date(updatedGameSettings.settings.statistics.lastPlayTime);
        updatedGameSettings.TotalTimeInSeconds = updatedGameSettings.settings.statistics.localPlayTimes;

        console.log("[LIBRARY GAMES] adding new game " + JSON.stringify(updatedGameSettings));
        $scope.localGames.push(updatedGameSettings);
      }

      function _updateGameApp(game, appId, value) {
        if(value) {
          let index = game.settings.autoLaunchDisabledExtensions.indexOf(appId);
          if(index >= 0) {
            game.settings.autoLaunchDisabledExtensions.splice(index, 1);
          }
        }
        else{
          game.settings.autoLaunchDisabledExtensions.push(appId);
        }
      }

      function _updateFpsHotkey() {
        OverwolfStore.gamesSettings.getHotkey("Enable_Disable_FPS_Monitor", function (result) {
          if(result && result.status){
            $scope.fpsHotKey = result.hotkey.name;
            $scope.$apply();
          }

          _fpsHotkeyTimeout = setTimeout(_updateFpsHotkey, FPS_HOTKEY_DELAY);
        });
      }

      function _stopUpdateFpsHotkey() {
        if(_fpsHotkeyTimeout){
          clearTimeout(_fpsHotkeyTimeout);
        }
      }

      $scope.hasAutoLaunchApps = function () {
        return $scope.apps.autoLaunch.length > 0;
      };

      $scope.hasNoAutoLaunchApps = function () {
        return $scope.apps.noAutoLaunch.length > 0;
      };

      $scope.hasNoApps = function () {
        return $scope.apps.autoLaunch.length === 0 && $scope.apps.noAutoLaunch.length === 0;
      };

      $scope.selectGame = function (game) {
        console.log("[LIBRARY GAMES] selecting game: " + JSON.stringify(game));
        let gameId = $scope.getGameId(game);
        for(let i = 0; i < $scope.localGames.length; i++){
          let curGameId = $scope.getGameId($scope.localGames[i]);
          let isSelected = curGameId === gameId;
          $scope.localGames[i].selected = isSelected;
        }
        $scope.selectedGame = game;
        $scope.gameIdFromRoute = gameId;
      };

      $scope.openGameAppsPage = function () {
        if($scope.selectedGame) {
          let gameId = $scope.getGameId();
          let displayName = $scope.getGameDisplayName();
          let now = Math.floor(Date.now() / 1000);
          TrackingService.trackEvent("gamessettings_discovery", null, null, null, now, {gameId: gameId});
          console.log("[LIBRARY GAMES] looking for game apps page link");
          let url = APP_PAGE_URL.replace("%GAME_NAME%", displayName);
          $http.get(url).then(
            function (result) {
              if(result && result.data && result.data.link){
                console.log("[LIBRARY GAMES] received link " + result.data.link);
                $rootScope.$broadcast("openGameAppsPage", result.data.link);
              }
              else{
                console.log("[LIBRARY GAMES] could not find link for game " + displayName);
                $rootScope.$broadcast("openGameAppsPage", "/");
              }
            },
            function (error) {
              console.log("[LIBRARY GAMES] error while looking for link for" +
                " game " + displayName);
              console.log("[LIBRARY GAMES] " + JSON.stringify(error));
              $rootScope.$broadcast("openGameAppsPage", "/");
            });
        }
      };

      $scope.showFpsSettings = function () {
        $rootScope.$broadcast('ShowFpsSettings');
      };

      $scope.onSettingsInnerHovered = function (hover) {
        $scope.settingsInnerHovered = hover;
      };

      $scope.onAppAutoLaunchChanged = function (gameId, appId, value) {

        OverwolfStore.gamesSettings.setAppAutoLaunch(gameId, appId, value, function (result) {
          console.log("result: " + JSON.stringify(result));
          _updateGameApp($scope.selectedGame, appId, value);
        });
      };

      $rootScope.$on("libraryMode", function (evt, value) {
        $scope.filteredGames = [];

        if (value === "games") {
        // $scope.setMode('scan-error');
          _start();
        } else {
          _stop();
        }
      });

      $scope.$on("$destroy", _stop);

      /** UI bindings **/

      $scope.overlayEnabledChange = function () {
        let newVal = $scope.selectedGame.settings.overlayEnabled;
        let gameId = $scope.getGameId();

        console.log(`[LIBRARY GAMES] overlay settings changed by user for ${gameId} to ${newVal}`);
        OverwolfStore.gamesSettings.setOverlay(gameId, newVal);

        if($scope.gameSummarySettings){
          _ignoreGSInput = true;
          if(!newVal){
            $scope.gameSummarySettings.activeButOverlayDisabled = $scope.gameSummarySettings.active;
            $scope.gameSummarySettings.activeByUser = true;
            $scope.gameSummarySettings.active = false;
          }
          if(newVal && ($scope.gameSummarySettings.input.enabled || window.gameSettingsFromExternal)){
            $scope.gameSummarySettings.input.enabled = true;
            window.gameSettingsFromExternal = false;
            $scope.gameSummarySettings.activeByUser = true;
            $scope.gameSummarySettings.activeButOverlayDisabled = false;
            $scope.gameSummarySettings.active = true;
          }

          OverwolfStore.gamesSettings.gameSummarySetGame(
            gameId,
            JSON.stringify($scope.gameSummarySettings),
            (response) => {
              console.log(`[LIBRARY GAMES] disabled game summary for ${gameId}: ${JSON.stringify(response)}`);
            });
        }
      };

      $scope.gameSummaryEnabledChange = function () {
        if (!$scope.gameSummarySettings) {
          return;
        }

        let newVal = $scope.gameSummarySettings.input.enabled;
        let gameId = $scope.getGameId();
        console.log(`[LIBRARY GAMES] game summary active changed by user for ${gameId} to ${newVal}:`);

        $scope.gameSummarySettings.activeByUser = true;
        $scope.gameSummarySettings.active = newVal;
        OverwolfStore.gamesSettings.gameSummarySetGame(
          gameId,
          JSON.stringify($scope.gameSummarySettings),
          (response) => {
            console.log(`[LIBRARY GAMES] game summary active change response: ${JSON.stringify(response)}`);
          });
      };

      $scope.gameSummaryDisplayChange = function () {
        if (!$scope.gameSummarySettings) {
          return;
        }

        let newVal = $scope.gameSummarySettings.input.display;
        let gameId = $scope.getGameId();
        $scope.gameSummarySettings.displayByUser = true;
        $scope.gameSummarySettings.display = newVal;
        console.log(`[LIBRARY GAMES] game summary display changed by user for ${gameId} to ${newVal}:`);
        OverwolfStore.gamesSettings.gameSummarySetGame(
          gameId,
          JSON.stringify($scope.gameSummarySettings),
          (response) => {
            console.log(`[LIBRARY GAMES] game summary display change response: ${JSON.stringify(response)}`);
          });
      };

      $scope.fpsEnabledChange = function () {
        let newVal = $scope.selectedGame.settings.fpsSettings.enabled;
        let gameId = $scope.getGameId();
        console.log(`[LIBRARY GAMES] fps enabled changed by user for ${gameId} to ${newVal}:`);
        OverwolfStore.gamesSettings.setFPSEnabled(gameId, newVal);
      };

      $scope.fpsLocationChange = function () {
        let newVal = $scope.selectedGame.settings.fpsSettings.location;
        let gameId = $scope.getGameId();
        console.log(`[LIBRARY GAMES] fps location changed by user for ${gameId} to ${newVal}:`);
        OverwolfStore.gamesSettings.setFPSLocation(gameId, newVal);
      };

      $scope.$watch("selectedGame", function(newVal){
        if(typeof newVal !== 'undefined' && newVal !== null) {
          let gameId = $scope.getGameId(newVal);
          _updateApps();
          _getGameSummarySettings(gameId);
        }
      });

      $scope.$watch("gamesSort", function(newVal, oldVal) {
        if (newVal && (newVal !== oldVal)) {
          let tempFilteredGames = $filter('filter')($scope.localGames, {GameName: $scope.search});
          $scope.filteredGames = $filter('orderBy')(tempFilteredGames, $scope.gamesSort, ($scope.gamesSort !== 'GameName'))
        }
      });

      // listen to localGames change - and then wait a few milliseconds to
      // make sure the list is sorted and that filteredGames is available
      $scope.$watch("localGames", function (newVal) {
        if(typeof newVal !== 'undefined' && newVal !== null) {
          console.log("[LIBRARY GAMES] game list changed: " + JSON.stringify(newVal));

          if ($scope.displayMode === 'games') {
            // change temporarily to avoid flickering
            $scope.setMode('scan-error');
          }

          $scope.filteredGames = [];

          _updateApps();

          let tempFilteredGames = $filter('filter')($scope.localGames, {GameName: $scope.search});
          $scope.filteredGames = $filter('orderBy')(tempFilteredGames, $scope.gamesSort, ($scope.gamesSort !== 'GameName'))

          if ($scope.filteredGames.length === 0) {
            return;
          }

          if ($scope.displayMode === 'games') {
            $scope.setMode('games');
          }

          try {
            if ($scope.gameIdFromRoute) {
              let gameId = parseInt($scope.gameIdFromRoute);
              for (let game of $scope.filteredGames) {
                let curGameId = $scope.getGameId(game);
                if (curGameId === gameId) {
                  $scope.selectGame(game);
                  return;
                }
              }
            }
          }
          catch(e){

          }

          $scope.filteredGames[0].selected = true;
          $scope.selectedGame = $scope.filteredGames[0];
          $scope.$apply();
        }
      });

      /** Getters **/

      $scope.getGameId = function(game){
        if (!game) {
          if (!$scope.selectedGame) {
            return "";
          }
          game = $scope.selectedGame;
        }

        return game.info.classId;
      };

      $scope.getGameLauncherIds = function (game) {
        if (!game) {
          if (!$scope.selectedGame) {
            return "";
          }
          game = $scope.selectedGame;
        }

        return game.info.launcherIds;
      };

      $scope.getGameName = function (game) {
        let selectedGame = game;
        if(!selectedGame){
          if(!$scope.selectedGame){
            return "";
          }
          selectedGame = $scope.selectedGame;
        }
        return selectedGame.info.name;
      };

      $scope.getGameDisplayName = function(game){
        let selectedGame = game;
        if(!selectedGame){
          if(!$scope.selectedGame){
            return "";
          }
          selectedGame = $scope.selectedGame;
        }
        return selectedGame.info.displayName ? selectedGame.info.displayName : selectedGame.info.name;
      };

      $scope.getGamePath = function () {
        if(!$scope.selectedGame){
          return "";
        }

        let process = $scope.selectedGame.settings.meta.process;
        let launcher = $scope.selectedGame.settings.meta.launcher;
        let result = process || launcher;
        return result;
      };

      $scope.isGameDetected = function (game) {
        if (!game) {
          if (!$scope.selectedGame) {
            return false;
          }

          try {
            return $scope.selectedGame.settings.meta.gameDetected;
          } catch (e) {
            return false;
          }
        }

        try {
          return game.settings.meta.gameDetected;
        } catch (e) {
          return false;
        }
      };

      $scope.openReportBugWindow = function () {
        OverwolfStore.openBugWindow('');
      }

    }]);
})(angular);