/**
 * @file CGLeaderboard.js
 * @author Frank Hamilton
 * @date 2024/10/14
 * @brief CGLeaderboard.js
 * @copyright Copyright (c) 2023, ByteDance Inc, All Rights Reserved
 */
const {BaseNode} = require('../Utils/BaseNode');
const Forge = require('../../../forge.min');
const {
  getEffectInfo,
  DownloadRequest,
  RequestHandler,
  getUserInfo,
  getUserProfile,
  NetworkHandler,
  LeaderboardRequest,
  EncryptionKeyRequest,
} = require('../../../LeaderboardUtils');

const Amaz = effect.Amaz;

class CGLeaderboard extends BaseNode {
  constructor() {
    super();
    this.initialSettings();
  }

  resetOnRecord(sys) {
    this.initialSettings();
  }

  initialSettings() {
    this.needsToStartNetworkInitialization = true;
    this.finishedNetworkInitialization = false;
    this.makingNetworkCall = false;
    this.finishedNetworkCall = false;
    this.finishedNetworkCallSuccessfully = false;
    this.scoreChangeSendPulse = false;
    this.waitingForFirstExecutePulse = true;
    this.previousScore = -124357;
    this.currentScore = 0;
    this.effectId = '';
    this.currentRank_friends = -1;
    this.currentRank_national = -1;
    this.currentRank_global = -1;
    this.leaderboardOrder = 0;
    this.overall_friends_scores = [];
    this.overall_national_scores = [];
    this.overall_global_scores = [];
    this.postScoreNextFrame = false;
  }

  setNext(index, func) {
    this.nexts[index] = func;
  }

  setInput(index, func) {
    this.inputs[index] = func;
  }

  execute(index) {
    if (index === 0) {
      this.waitingForFirstExecutePulse = false;
      this.pulseOutputPorts();
      this.updateCurrentRankDisplay();
    } else if (index === 1) {
      this.postScoreNextFrame = true;
    }
  }

  pulseOutputPorts() {
    if (this.finishedNetworkCall === true) {
      this.finishedNetworkCall = false;
      if (this.finishedNetworkCallSuccessfully === true) {
        if (this.nexts[0]) {
          this.nexts[0]();
        }
      } else {
        if (this.nexts[1]) {
          this.nexts[1]();
        }
      }
    }
  }
  updateCurrentRankDisplay() {
    if (this.finishedNetworkInitialization === true && this.scoreChangeSendPulse === true) {
      this.outputs[8] = this.currentRank_friends;
      this.outputs[9] = this.currentRank_national;
      this.outputs[10] = this.currentRank_global;
      if (this.nexts[0]) {
        this.nexts[0]();
      }
    }
  }

  onUpdate(sys, deltatime) {
    this.userInfoNetworkInitialization(sys);

    if (this.finishedNetworkCallSuccessfully === true) {
      this.checkScore(sys);
      if (this.postScoreNextFrame === true) {
        this.postScoreNextFrame = false;
        this.postScore(sys);
      }
    }
  }

  checkScore(sys) {
    this.currentScore = this.inputs[2]();
    if (this.previousScore !== this.currentScore) {
      console.error('Score changed');
      this.previousScore = this.currentScore;
      this.scoreChangeSendPulse = true;
      this.updateCurrentRanks();
    }
  }
  updateCurrentRanks() {
    if (this.leaderboardOrder === 0) {
      this.updateCurrentRanks_HigherBetter();
    } else {
      this.updateCurrentRanks_LowerBetter();
    }
  }
  updateCurrentRanks_HigherBetter() {
    this.currentRank_friends = this.overall_friends_scores.length + 1;
    this.currentRank_national = this.overall_national_scores.length + 1;
    this.currentRank_global = this.overall_global_scores.length + 1;

    for (let i = 0; i < this.overall_friends_scores.length; i++) {
      const tempScore = this.overall_friends_scores[i];
      if (tempScore <= this.currentScore) {
        const index = i + 1;
        this.currentRank_friends = index;
        break;
      }
    }

    for (let i = 0; i < this.overall_national_scores.length; i++) {
      const tempScore = this.overall_national_scores[i];
      if (tempScore <= this.currentScore) {
        const index = i + 1;
        this.currentRank_national = index;
        break;
      }
    }

    for (let i = 0; i < this.overall_global_scores.length; i++) {
      const tempScore = this.overall_global_scores[i];
      if (tempScore <= this.currentScore) {
        const index = i + 1;
        this.currentRank_global = index;
        break;
      }
    }
  }

  updateCurrentRanks_LowerBetter() {
    this.currentRank_friends = this.overall_friends_scores.length + 1;
    this.currentRank_national = this.overall_national_scores.length + 1;
    this.currentRank_global = this.overall_global_scores.length + 1;

    for (let i = 0; i < this.overall_friends_scores.length; i++) {
      const tempScore = this.overall_friends_scores[i];
      if (tempScore >= this.currentScore) {
        const index = i + 1;
        this.currentRank_friends = index;
        break;
      }
    }

    for (let i = 0; i < this.overall_national_scores.length; i++) {
      const tempScore = this.overall_national_scores[i];
      if (tempScore >= this.currentScore) {
        const index = i + 1;
        this.currentRank_national = index;
        break;
      }
    }

    for (let i = 0; i < this.overall_global_scores.length; i++) {
      const tempScore = this.overall_global_scores[i];
      if (tempScore >= this.currentScore) {
        const index = i + 1;
        this.currentRank_global = index;
        break;
      }
    }
  }

  postScore(sys) {
    if (!this.safeMode) {
      const [lbVal, iv, locker] = this.lockV(this.currentScore);
      if (lbVal && iv && locker) {
        const messageBody = [
          {
            leaderboard_id: 1,
            effect_id: parseInt(this.effectId),
            order: this.leaderboardOrder,
            lb_val: lbVal,
            iv: iv,
            locker: locker,
            locker_version: this.lockerVersion,
            is_gaming_effect: true,
          },
        ];

        const arg = {
          interface: 'params_pass_through',
          action: 0,
          params: {
            tt_leaderboard: messageBody,
          },
        };

        sys.script.scene.postMessage(0x00006001, 0x00006001, 0, JSON.stringify(arg));
      }
    }
  }

  lockV(v) {
    if (!this.apk || this.lockerVersion === null) {
      return ['', '', ''];
    }
    const forge = Forge.forge;
    const key = forge.random.getBytesSync(16);
    const iv = forge.random.getBytesSync(12);

    const cipher = forge.cipher.createCipher('AES-GCM', key);
    cipher.start({iv: iv});
    cipher.update(forge.util.createBuffer(v.toString()));
    cipher.finish();

    const enVal = cipher.output.getBytes();
    const tag = cipher.mode.tag.getBytes();
    const enValT = enVal + tag;

    const lbVal = forge.util.encode64(enValT);
    const iv64 = forge.util.encode64(iv);

    const publicKey = forge.pki.publicKeyFromPem(this.apk);
    const locker = publicKey.encrypt(key, 'RSA-OAEP', {
      md: forge.md.sha256.create(),
      mgf1: forge.mgf.mgf1.create(forge.md.sha256.create()),
    });
    const locker64 = forge.util.encode64(locker);

    return [lbVal, iv64, locker64];
  }

  userInfoNetworkInitialization(sys) {
    if (this.needsToStartNetworkInitialization === true && this.waitingForFirstExecutePulse === false) {
      this.leaderboardOrder = this.inputs[3]() === 'High' ? 0 : 1;
      this.needsToStartNetworkInitialization = false;

      sys.script.networkCallBack = function (userData, networkResponse, eventType) {
        if (networkResponse.requestId) {
          const requestHandled = NetworkHandler.instance.handleResponse(
            networkResponse.requestId,
            networkResponse,
            eventType
          );
          if (!requestHandled) {
            console.error(`userInfoNetworkInitialization issue ${networkResponse.requestId} `);
          }
        }
      };
      sys.script.ref.leaderboardScript = sys.script;
      sys.script.ref.networkCallBack = function (userData, networkResponse, eventType) {
        sys.script.ref.leaderboardScript.networkCallBack(userData, networkResponse, eventType);
      };

      NetworkHandler.instance.initialize();
      NetworkHandler.instance.addListener(sys.script, this);
      this.initializeData(sys.script.scene);
    }
  }

  onEvent(sys, event) {
    const msgID = event.args[0];
    const arg1 = event.args[1];
    if (msgID === 0x29 || (msgID === 34952 && arg1 === 0x29)) {
      const taskId = event.args[2];
      const key = event.args[3];
      const info = Amaz.AmazingManager.getSingleton('BuiltinObject').getUserStringValue(key);
      const obj = JSON.parse(info);
      const requestHandled = RequestHandler.instance.handleResponse(taskId, obj);
      if (!requestHandled) {
        console.error(`onEvent issue ${taskId} `);
      }
    }
  }

  onDestroy(sys) {
    NetworkHandler.instance.removeListener(this);
  }

  initializeData(scene) {
    const basicInfoPromises = [getUserInfo(scene), getEffectInfo(scene), getUserProfile(scene)];
    this.uiUpdateQueue = [];
    Promise.all(basicInfoPromises)
      .then(([userInfo, effectInfo, userProfile]) => {
        this.effectId = effectInfo.effect_id;

        const isValid = /^\d+$/.test(this.effectId) && this.effectId !== '123456';
        if (!isValid) {
          throw new Error('Invalid effect id.');
        }

        this.un = userProfile.nickname;
        this.iu = userProfile.avatar_path;

        const downloadRequest = new DownloadRequest(this.iu);

        RequestHandler.instance.sendRequest(downloadRequest, scene, 5000).then(
          path => {
            const pngMeta = new effect.Amaz.PngMeta();
            pngMeta.needFlipY = true;
            pngMeta.innerAlphaPremul = false;
            pngMeta.outerAlphaPremul = false;
            this.icon = scene.assetMgr.SyncLoadWithMeta(path, pngMeta);
            this.outputs[3] = this.icon;
          },
          err => {
            console.error(`Failed to download file: ${this.iu}, reason: ${err && err.message}`);
            this.finishedNetworkCall = true;
            this.finishedNetworkCallSuccessfully = false;
          }
        );

        this.userId = userInfo.userID;
        this.safeMode = Number(userInfo.safeMode);
        this.outputs[2] = this.un;

        const leaderboardRequest = new LeaderboardRequest(this.effectId, this.leaderboardOrder);

        const encryptionKeyRequest = new EncryptionKeyRequest();
        NetworkHandler.instance
          .sendRequest(encryptionKeyRequest)
          .then(response => {
            if (response.body) {
              const encBody = JSON.parse(response.body);
              if (encBody && encBody.asymmetric_public_key && encBody.key_version !== undefined) {
                this.apk = encBody.asymmetric_public_key;
                this.lockerVersion = encBody.key_version;
                return NetworkHandler.instance.sendRequest(leaderboardRequest);
              }
            }
            throw new Error('Failed to obtain a valid encryption key from server');
          })
          .then(networkResponse => {
            this.handleNetworkResult(networkResponse);
          })
          .catch(error => {
            console.error('network response error: ' + error.message);
            this.finishedNetworkCall = true;
            this.finishedNetworkCallSuccessfully = false;
          });
      })
      .catch(err => {
        console.warn(`Failed to receive data from server, reason: ${err.message}`);
        this.finishedNetworkCall = true;
        this.finishedNetworkCallSuccessfully = false;
      });
  }

  handleNetworkResult(networkResponse) {
    const success = networkResponse.succeed;
    const result = {
      response: networkResponse,
    };

    if (success) {
      const statusCode = networkResponse.statusCode;
      if (statusCode < 200 || statusCode > 299) {
        this.finishedNetworkCall = true;
        this.finishedNetworkCallSuccessfully = false;
      } else {
        result.body = networkResponse.body;
        this.onNetworkResponseSuccess(result);
      }
    } else {
      console.error('Leaderboard onCallBack networkResponse.errorDesc: ' + networkResponse.errorDesc);

      result.error = networkResponse.errorDesc;
      this.finishedNetworkCall = true;
      this.finishedNetworkCallSuccessfully = false;
    }
    result.success = success;
  }

  onNetworkResponseSuccess(response) {
    try {
      const obj = JSON.parse(response.body);
      const statusCode = obj.status_code;
      response.status_code = statusCode;

      this.fetchDataDone = true;
      if (statusCode === 0 && obj.leaderboards) {
        obj.leaderboards.forEach(leaderboard => {
          this.processLeaderboardEntry(leaderboard);
          this.finishedNetworkInitialization = true;
          this.finishedNetworkCall = true;
          this.finishedNetworkCallSuccessfully = true;
          this.scoreChangeSendPulse = true;
        });
      } else {
        this.finishedNetworkCall = true;
        this.finishedNetworkCallSuccessfully = false;
      }
    } catch (e) {
      console.error('Error parsing the network response:', e.message);
      this.finishedNetworkCall = true;
      this.finishedNetworkCallSuccessfully = false;
    }
  }
  processLeaderboardEntry(leaderboard) {
    const boardType = leaderboard.leaderboard_type;

    const self_rank = leaderboard.self_rank;
    this.hasV = self_rank.has_score;

    if (self_rank.has_score) {
      const sc = leaderboard.self_rank.score;
      this.outputs[4] = sc;
    }
    this.handleBoardType(boardType, self_rank, leaderboard);
  }

  handleBoardType(boardType, self_rank, leaderboard) {
    switch (boardType) {
      case 1:
        if (self_rank.rank) {
          this.outputs[5] = self_rank.rank;
        } else {
          this.outputs[5] = -1;
        }
        if (leaderboard.overall_leaderboard) {
          this.overall_friends_scores = leaderboard.overall_leaderboard;
        }
        break;
      case 2:
        if (self_rank.rank) {
          this.outputs[6] = self_rank.rank;
        } else {
          this.outputs[6] = -1;
        }
        if (leaderboard.overall_leaderboard) {
          this.overall_national_scores = leaderboard.overall_leaderboard;
        }
        break;
      case 3:
        if (self_rank.rank) {
          this.outputs[7] = self_rank.rank;
        } else {
          this.outputs[7] = -1;
        }
        if (leaderboard.overall_leaderboard) {
          this.overall_global_scores = leaderboard.overall_leaderboard;
        }
        break;
      default:
    }
  }
}

exports.CGLeaderboard = CGLeaderboard;
