const kGameSettingsFile = 'GameSettings.ini';
const kIniVkWhitelistKey = 'VulkanWhitelistedLayers';
const kVkLayerOW = 'VK_LAYER_OW_OVERLAY';
const kVkLayerOWOBS = 'VK_LAYER_OW_OBS_HOOK';

const kGamesToPatch = [{
    rootDirSuffix: '\\my games\\Rainbow Six - Siege\\',
    logPrefix:'[R6-VLK]',
    iniSection: 'DISPLAY_SETTINGS'
  }, {
    rootDirSuffix: '\\my games\\HyperScape\\',
    logPrefix:'[HyperScape-VLK]',
    iniSection: 'DISPLAY'
  }, {
    rootDirSuffix: '\\my games\\Rainbow Six - Extraction\\',
    logPrefix:'[R6-Extraction-VLK]',
    iniSection: 'DISPLAY_SETTINGS'
  }
];

//------------------------------------------------------------------------------
const run = async () => {
  const plugin = new IOPlugin();

  const success = await plugin.initialize();
  if (!success) {
    console.error('vkinstall - plugin initialization error');
    return;
  }

  for (const gamePatchInfo of kGamesToPatch) {
    try {
     await patchGame(plugin, gamePatchInfo);
    } catch(err) {
      console.error(`patch game [${gamePatchInfo.logPrefix}] error`, err);
    }
  }
}

// -----------------------------------------------------------------------------
const patchGame = async (plugin, gameInfo) => {
  const gameLogPrefix = gameInfo.logPrefix
  const rootDir = plugin.$.MYDOCUMENTS + gameInfo.rootDirSuffix;
  success = await plugin.isDirectory(rootDir);
  if (!success) {
    console.info(`${gameLogPrefix} ${rootDir} was not found`);
    return;
  }

  const folders = await plugin.listDirectory(rootDir);
  if (!folders) {
    console.info(`${gameLogPrefix} Failed to list ${rootDir}`);
    return;
  }

  for (const folder of folders) {
    if (folder.type !== 'dir') {
      continue;
    }

    const settingsFile = rootDir + folder.name + '\\' + kGameSettingsFile;
    if (!await plugin.fileExists(settingsFile)) {
      console.log(`${gameLogPrefix} Couldn't find ${settingsFile}`);
      continue;
    }

    // Send folder.name as folderId for logging only
    await handleGameSettingsFile(
      plugin, settingsFile, folder.name, kVkLayerOW, gameInfo);	
    await handleGameSettingsFile(
      plugin, settingsFile, folder.name, kVkLayerOWOBS, gameInfo);
  }
}


// -----------------------------------------------------------------------------
const handleGameSettingsFile = (
  plugin,
  gameSettingsFile,
  folderId,
  layerName,
  gameInfo
) => {
  return new Promise(async resolve => {
    const gameLogPrefix = gameInfo.logPrefix;
    const kIniDisplaySection = gameInfo.iniSection;

    const result = await plugin.iniReadValue(
      kIniDisplaySection,
      kIniVkWhitelistKey,
      gameSettingsFile
    );

    let iniValue = layerName;

    // If we already have a value - check it doesn't include our layer already
    if (result.status) {
      const existingLayerValue = result.data;

      if (isOwLayerAlreadySet(existingLayerValue, layerName)) {
        console.log(`${gameLogPrefix} - ${folderId} - Detected layer already set`);
        return resolve();
      }

      // We have existing values - we need to concatenate them to iniValue
      iniValue = concateLayerValues(layerName, existingLayerValue);
    }

    success = await plugin.iniWriteValue(
      kIniDisplaySection,
      kIniVkWhitelistKey,
      iniValue,
      gameSettingsFile
    );

    if (!success) {
      console.log(`${gameLogPrefix} - ${folderId} - Failed to update ini`);
      return resolve();
    }

    console.log(
      `${gameLogPrefix} - ${folderId} - Successfully set ini - ${iniValue}`);
    return resolve();
  });
}

// -----------------------------------------------------------------------------
const isOwLayerAlreadySet = (data, layerName) => {
  if (data.indexOf(layerName) === -1) {
    return false;
  }

  return true;
}

// -----------------------------------------------------------------------------
const concateLayerValues = (firstPart, secondPart) => {
  return `${firstPart};${secondPart}`;
}

try {
  run();
} catch(err) {
  console.error(err);
}