"use strict";

// limit playing to 1 second
const kSoundCheckPlayingLimitIntervalInMS = 1000;

//------------------------------------------------------------------------------
// We have two audio files to play using the really buggy overwolf.media.audio
// api. We use this service to limit the calls to this api so that it won't 
// crash/dead-lock if someone clicks the play button many times fast
class SoundCheckService {
  //----------------------------------------------------------------------------
  constructor() {
    this._audioIds = [];
    this._lastPlayedTimestamp = 0;
  }

  //----------------------------------------------------------------------------
  async init() {
    try {
      this._audioIds = await this._generateAudioIdsAsync([
        "/assets/audio/SoundCheck_PewPew.mp3", 
        "/assets/audio/SoundCheck_Drop.mp3"
      ]);
    } catch (e) {      
    }
  }

  //----------------------------------------------------------------------------
  play(volume) {
    let timeFromLastPlayed = Date.now() - this._lastPlayedTimestamp;
    if (timeFromLastPlayed <= kSoundCheckPlayingLimitIntervalInMS) {
      return;
    }

    console.log("Played sounds of Fiesta");

    let randomIndex = Math.floor(Math.random() * this._audioIds.length);
    if (!this._audioIds || !this._audioIds[randomIndex]) {
      return console.error("Couldn't find audio id ??");
    }

    let audioId = this._audioIds[randomIndex];
    // NOTE(twolf): The overwolf.media.audio apis seem buggy as hell, so we use
    // a lot of context-switching timeouts
    overwolf.media.audio.setVolumeById(audioId, parseInt(volume), () => {
      setTimeout(() => {
        overwolf.media.audio.play(audioId, () => {
          this._lastPlayedTimestamp = new Date();
        });
      }, 0);
    });
  }

  //----------------------------------------------------------------------------
  async _generateAudioIdsAsync(audioFiles) {
    return new Promise(async resolve => {
      let audioIds = [];

      if (!audioFiles || audioFiles.length == 0) {
        return resolve(audioIds);
      }

      try {       
        let extensionId = await this._getExtensionIdAsync();
        let uriPrefix = `overwolf-extension://${extensionId}`;

        let createdAudioIdsCount = 0;

        for (let i = 0; i < audioFiles.length; ++i) {
          let audioFileUri = uriPrefix;
          let currentFile = audioFiles[i];
          
          if (!currentFile.startsWith("/")) {
            audioFileUri += "/";
          }
          audioFileUri += currentFile;

          overwolf.media.audio.create(audioFileUri, result => {
            createdAudioIdsCount++;

            if (!result.id) {
              console.error("Failed creating audio: " + JSON.stringify(result));
            } else {
              audioIds.push(result.id);
            }

            if (createdAudioIdsCount == audioFiles.length) {
              return resolve(audioIds);
            }
          });
        }
      } catch(e) {
        console.log(e);
        return resolve(audioIds);
      }
    });
  }

  //----------------------------------------------------------------------------
  async _getExtensionIdAsync() {
    return new Promise((resolve, reject) => {
      overwolf.extensions.current.getManifest(manifest => {
        if (!manifest || !manifest.UID) {
          return reject();
        }

        return resolve(manifest.UID);
      });
    })
  }


}
