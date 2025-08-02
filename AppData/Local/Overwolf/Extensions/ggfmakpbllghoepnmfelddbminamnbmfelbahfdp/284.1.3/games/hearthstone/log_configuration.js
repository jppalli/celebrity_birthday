"use strict";

define(["/utils/io_plugin.js"], function (IOPlugin) {
  const Constants = {
    CONFIG_FOLDER: "Blizzard/Hearthstone",
    CONFIG_FILE: "log.config",
    CONFIG_FILE_SECTIONS_INFO: {
      'Achievements': [
        { 'key': 'LogLevel', 'value': '1' },
        { 'key': 'FilePrinting', 'value': 'true' },
        { 'key': 'ConsolePrinting', 'value': 'false' },
        { 'key': 'ScreenPrinting', 'value': 'false' },
        { 'key': 'Verbose', 'value': 'true' }
      ],
      'Net': [
        { 'key': 'LogLevel', 'value': '1' },
        { 'key': 'FilePrinting', 'value': 'true' },
        { 'key': 'ConsolePrinting', 'value': 'false' },
        { 'key': 'ScreenPrinting', 'value': 'false' },
        { 'key': 'Verbose', 'value': 'false' }
      ],
      'Power': [
        { 'key': 'LogLevel', 'value': '1' },
        { 'key': 'FilePrinting', 'value': 'true' },
        { 'key': 'ConsolePrinting', 'value': 'false' },
        { 'key': 'ScreenPrinting', 'value': 'false' },
        { 'key': 'Verbose', 'value': 'true' }
      ],
      "FullScreenFX": [
        { 'key': 'LogLevel', 'value': '1' },
        { 'key': 'FilePrinting', 'value': 'true' },
        { 'key': 'ConsolePrinting', 'value': 'false' },
        { 'key': 'ScreenPrinting', 'value': 'false' },
        { 'key': 'Verbose', 'value': 'true' }
      ],
      "Decks": [
        { 'key': 'LogLevel', 'value': '1' },
        { 'key': 'FilePrinting', 'value': 'true' },
        { 'key': 'ConsolePrinting', 'value': 'false' },
        { 'key': 'ScreenPrinting', 'value': 'false' },
        { 'key': 'Verbose', 'value': 'false' }
      ]
    }
  };

  function asyncRun() {
    return new Promise((resolve, reject) => {
      let localAppDataDirectory = IOPlugin.get().LOCALAPPDATA;
      let configDirectory =
        localAppDataDirectory + '/' + Constants.CONFIG_FOLDER;

      _checkDirectory(configDirectory).then(_ => {
        resolve();
      }).catch(err => {
        overwolf.games.getRunningGameInfo(function (res) {
          if (res && res.executionPath) {
            configDirectory = res.executionPath.replace("Hearthstone.exe", "");
            _checkDirectory(configDirectory).then(_ => {
              resolve();
            }).catch(err => {
              reject(err);
            });
          }
        });
      });
    });
  }



  function _checkDirectory(configDirectory) {
    return new Promise((resolve, reject) => {
      IOPlugin.get().isDirectory(configDirectory, status => {
        if (status == false) {
          return reject("couldn't find log directory for HS: " + configDirectory);
        }

        _createConfigFile(configDirectory);
        return resolve();
      });
    });
  }


  function _createConfigFile(configDirectory) {
    let configFile =
      configDirectory + '/' + Constants.CONFIG_FILE;

    console.log('updating ' + configFile + '...');

    _updateConfigurations(configFile);
  }

  function _updateConfigurations(configFile) {
    let sections = Object.keys(Constants.CONFIG_FILE_SECTIONS_INFO);

    sections.forEach(section => {

      Constants.CONFIG_FILE_SECTIONS_INFO[section].forEach(info => {

        IOPlugin.get().iniWriteValue(section,
          info.key,
          info.value,
          configFile,
          status => {
            if (!status) {
              console.warn(`failed to update: ${section}, ${info.key}`)
            }
          });
      });
    });
  }

  return {
    asyncRun: asyncRun
  }
});
