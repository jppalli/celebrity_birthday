define(function () {
  function inSpectatorMode(_gameInfo) {
    if (_gameInfo == null) {
      console.error('SpectatorDetection - null _gameInfo object passed');
      return false;
    }

    if (_gameInfo.commandLine == null) {
      console.error('SpectatorDetection - null command line');
      return false;
    }

    if ((_gameInfo.commandLine.indexOf('"spectator ') == -1) &&
        (_gameInfo.commandLine.indexOf('.rofl') == -1)) {
      return false;
    }

    return true;
  }

  return {
    inSpectatorMode: inSpectatorMode
  }
});
