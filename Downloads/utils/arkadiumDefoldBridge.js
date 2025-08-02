const arkSt = {
  api: undefined,
  loaded: false,
  loading: false,
  logsEnabled: true,

  load(environment) {
    if (!this.loaded && !this.loading) {
      if ("ArkadiumGameSDK" in window) {
        this.loaded = true;
        return Promise.resolve();
      } else {
        this.loading = this.loadInternal(environment);
        return this.loading;
      }
    } else if (!this.loaded) {
      return this.loading;
    } else {
      return Promise.resolve();
    }
  },

  loadInternal(environment) {
    return new Promise((resolve) => {
      let isDev = environment === "DEV";

      if (environment === "URL") {
        const urlParams = new URLSearchParams(window.location.search);
        isDev = urlParams.get("useSDKDevCDN") === "true";
      }

      console.log(
        "Initializing Arkadium SDK with environment: ",
        isDev ? "DEV" : "PROD",
      );

      const el = document.createElement("script");
      el.src = `https://developers.arkadium.com/cdn/sdk/${isDev ? "dev/" : ""}v2/sdk.js`;
      document.head.appendChild(el);

      el.addEventListener("load", () => {
        this.loaded = true;
        resolve();
      });
    });
  },
};
window.arkSt = arkSt;

const arkadiumBridge = {
  notifyDefold(messageName, data) {
    JsToDef.send(messageName, data);
  },

  initArkadiumSDK(environmentName) {
    if (arkSt.api) {
      return Promise.resolve(api);
    }

    arkSt.environment = environmentName;
    arkSt.load(environmentName).then(() => {
      if (window.ArkadiumGameSDK) {
        window.ArkadiumGameSDK.getInstance().then(
          (api) => {
            console.log("Arkadium SDK Initialized!");
            api.debugMode(true);
            arkSt.api = api;
            this.registerEventCallbacks();
            this.notifyDefold("sdk_initialized", {});
          },
          (err) => {
            console.log("Arkadium SDK not initialized", err);
            this.notifyDefold("error", { message: err });
          },
        );
      } else {
        console.log("Arkadium SDK not initialized - SDK not available");
        this.notifyDefold("error", {
          message: "Arkadium SDK not initialized - SDK not available",
        });
      }
    });
  },

  registerEventCallbacks() {
    try {
      // Auth event callbacks
      arkSt.api.auth.onAuthStatusChange((isAuthorized) => {
        this.notifyDefold("user_auth_status_changed", {
          authorized: isAuthorized,
        });
      });

      arkSt.api.auth.onOpenAuthForm(() => {
        this.notifyDefold("auth_form_opened");
      });

      // Host event callbacks
      arkSt.api.host.onPurchaseFormStateChange((state) => {
        this.notifyDefold("purchase_form_state_changed", JSON.stringify(state));
      });

      // Lifecycle event callbacks
      arkSt.api.lifecycle.registerEventCallback(
        arkSt.api.lifecycle.LifecycleEvent.GAME_PAUSE,
        () => {
          this.notifyDefold("game_paused", {});
        },
      );

      arkSt.api.lifecycle.registerEventCallback(
        arkSt.api.lifecycle.LifecycleEvent.GAME_RESUME,
        () => {
          this.notifyDefold("game_resumed", {});
        },
      );
    } catch (error) {
      this.notifyDefold("error", { message: error.message });
    }
  },

  // Ads
  showRewardedAd(ad_duration = null) {
    try {
      if (arkSt.api.ads.showRewardAd) {
        const promise =
          ad_duration != null
            ? arkSt.api.ads.showRewardAd({ duration: ad_duration })
            : arkSt.api.ads.showRewardAd();

        promise.then((reward) =>
          this.notifyDefold("rewarded_ad_shown", {
            success: true,
            value: reward.value,
          }),
        );
      } else {
        this.notifyDefold("rewarded_ads_unavailable", { success: false });
      }
    } catch (error) {
      this.notifyDefold("ads_error", { message: error.message });
    }
  },

  showInterstitialAd() {
    try {
      if (arkSt.api.ads.showInterstitialAd) {
        arkSt.api.ads
          .showInterstitialAd()
          .then(() =>
            this.notifyDefold("interstitial_ad_shown", { success: true }),
          );
      } else {
        this.notifyDefold("interstitial_ads_unavailable", { success: false });
      }
    } catch (error) {
      this.notifyDefold("ads_error", { message: error.message });
    }
  },

  // Auth
  getUserAuthStatus() {
    try {
      arkSt.api.auth.isUserAuthorized().then((isAuthorized) => {
        this.notifyDefold("user_auth_status_retrieved", {
          authorized: isAuthorized,
        });
      });
    } catch (error) {
      this.notifyDefold("auth_error", { message: error.message });
    }
  },

  getUserProfile() {
    try {
      arkSt.api.auth.getUserProfile().then((profile) => {
        if (profile) {
          this.notifyDefold("user_profile_retrieved", {
            success: true,
            profile: JSON.stringify(profile),
          });
        } else {
          this.notifyDefold("user_profile_retrieved", {
            success: false,
            profile: "",
          });
        }
      });
    } catch (error) {
      this.notifyDefold("auth_error", { message: error.message });
    }
  },

  openAuthenticationForm() {
    try {
      arkSt.api.auth.openAuthForm();
    } catch (error) {
      this.notifyDefold("auth_error", { message: error.message });
    }
  },

  // Host
  getGameId() {
    try {
      arkSt.api.host
        .getGameId()
        .then((id) => this.notifyDefold("game_id_get", { id: id }));
    } catch (error) {
      this.notifyDefold("host_error", { message: error.message });
    }
  },

  openPurchaseForm() {
    try {
      arkSt.api.host.openPurchaseForm();
    } catch (error) {
      this.notifyDefold("host_error", { message: error.message });
    }
  },

  // Lifecycle
  onTestReady() {
    try {
      arkSt.api.lifecycle.onTestReady().then(() => {
        this.notifyDefold("on_test_ready", {});
      });
    } catch (error) {
      this.notifyDefold("lifecycle_error", { message: error.message });
    }
  },

  onGameStart() {
    try {
      arkSt.api.lifecycle.onGameStart().then(() => {
        this.notifyDefold("on_game_start", {});
      });
    } catch (error) {
      this.notifyDefold("lifecycle_error", { message: error.message });
    }
  },

  onGameEnd() {
    try {
      arkSt.api.lifecycle.onGameEnd().then(() => {
        this.notifyDefold("on_game_end", {});
      });
    } catch (error) {
      this.notifyDefold("lifecycle_error", { message: error.message });
    }
  },

  onGamePause() {
    try {
      arkSt.api.lifecycle.onGamePause().then(() => {
        this.notifyDefold("on_game_pause", {});
      });
    } catch (error) {
      this.notifyDefold("lifecycle_error", { message: error.message });
    }
  },

  onGameResume() {
    try {
      arkSt.api.lifecycle.onGameResume().then(() => {
        this.notifyDefold("on_game_resume", {});
      });
    } catch (error) {
      this.notifyDefold("lifecycle_error", { message: error.message });
    }
  },

  onChangeScore(score) {
    try {
      arkSt.api.lifecycle.onChangeScore({ score: score }).then(() => {
        this.notifyDefold("score_changed");
      });
    } catch (error) {
      this.notifyDefold("lifecycle_error", { message: error.message });
    }
  },

  onLevelStart(level) {
    try {
      arkSt.api.lifecycle.onLevelStart(level).then(() => {
        this.notifyDefold("on_level_start", {});
      });
    } catch (error) {
      this.notifyDefold("lifecycle_error", { message: error.message });
    }
  },

  onLevelEnd(level) {
    try {
      arkSt.api.lifecycle.onLevelEnd(level).then(() => {
        this.notifyDefold("on_level_end", {});
      });
    } catch (error) {
      this.notifyDefold("lifecycle_error", { message: error.message });
    }
  },

  // Persistence
  getLocalStorageItem(key) {
    try {
      arkSt.api.persistence.getLocalStorageItem(key).then((item) => {
        this.notifyDefold("local_storage_get", { key: key, item: item });
      });
    } catch (error) {
      this.notifyDefold("persistence_error", { message: error.message });
    }
  },

  setLocalStorageItem(key, item) {
    try {
      arkSt.api.persistence
        .setLocalStorageItem(key, item)
        .then(() => this.notifyDefold("local_storage_set", {}));
    } catch (error) {
      this.notifyDefold("persistence_error", { message: error.message });
    }
  },

  removeLocalStorageItem(key) {
    try {
      arkSt.api.persistence
        .removeLocalStorageItem(key)
        .then(() => this.notifyDefold("local_storage_remove", {}));
    } catch (error) {
      this.notifyDefold("persistence_error", { message: error.message });
    }
  },

  getRemoteStorageItem(key) {
    try {
      arkSt.api.persistence
        .getRemoteStorageItem(key)
        .then((item) =>
          this.notifyDefold("remote_storage_get", { key: key, item: item }),
        );
    } catch (error) {
      this.notifyDefold("persistence_error", { message: error.message });
    }
  },

  setRemoteStorageItem(key, item) {
    try {
      arkSt.api.persistence
        .setRemoteStorageItem(key, item)
        .then(() => this.notifyDefold("remote_storage_set", {}));
    } catch (error) {
      this.notifyDefold("persistence_error", { message: error.message });
    }
  },

  removeRemoteStorageItem(key) {
    try {
      arkSt.api.persistence
        .removeRemoteStorageItem(key)
        .then(() => this.notifyDefold("remote_storage_remove", {}));
    } catch (error) {
      this.notifyDefold("persistence_error", { message: error.message });
    }
  },

  getCookie(name) {
    try {
      arkSt.api.persistence
        .getCookie(name)
        .then((cookie) => this.notifyDefold("cookie_get", { cookie: cookie }));
    } catch (error) {
      this.notifyDefold("persistence_error", { message: error.message });
    }
  },

  // Wallet
  getGems() {
    try {
      arkSt.api.auth.isUserAuthorized().then((isAuthorized) => {
        if (isAuthorized) {
          arkSt.api.wallet.getGems().then((amount) => {
            this.notifyDefold("arkadium_gems_amount", {
              success: true,
              amount: amount,
            });
          });
        } else {
          this.notifyDefold("arkadium_gems_amount", {
            success: false,
            amount: 0,
          });
        }
      });
    } catch (error) {
      this.notifyDefold("wallet_error", { message: error.message });
    }
  },

  async consumeGems(amount) {
    try {
      arkSt.api.auth.isUserAuthorized().then((isAuthorized) => {
        if (isAuthorized) {
          arkSt.api.wallet.getGems().then((currentGems) => {
            if (currentGems >= amount) {
              arkSt.api.wallet.consumeGems(amount).then((result) => {
                if (result) {
                  this.notifyDefold("arkadium_gems_consumed", {
                    success: true,
                    result: result,
                  });
                } else {
                  this.notifyDefold("arkadium_gems_consumed", {
                    success: false,
                    result: null,
                  });
                }
              });
            } else {
              this.notifyDefold("arkadium_gems_consumed", {
                success: false,
                result: null,
              });
              arkSt.api.host.openPurchaseForm().then(() => {
                this.notifyDefold("purchase_form_opened");
              });
            }
          });
        } else {
          this.notifyDefold("arkadium_gems_consumed", {
            success: false,
            result: null,
          });
          this.openAuthenticationForm();
        }
      });
    } catch (error) {
      this.notifyDefold("wallet_error", { message: error.message });
    }
  },
};

window.arkadiumBridge = arkadiumBridge;
