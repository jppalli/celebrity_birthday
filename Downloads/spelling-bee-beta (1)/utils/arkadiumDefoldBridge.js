(function () {
  let sdkInstance = null;

  function notifyDefold(messageName, data) {
    JsToDef.send(messageName, data);
  }

  async function initArkadiumSDK() {
    try {
      await getSDKInstance();
      registerEventCallbacks();
      notifyDefold("sdk_initialized", {});
    } catch (error) {
      notifyDefold("error", { message: error.message });
    }
  }

  async function getSDKInstance() {
    if (!sdkInstance) {
      sdkInstance = await window.ArkadiumGameSDK.getInstance();
    }
    return sdkInstance;
  }

  async function registerEventCallbacks() {
    try {
      const sdk = await getSDKInstance();

      // Auth event callbacks
      sdk.auth.onAuthStatusChange((isAuthorized) => {
        notifyDefold("auth_status_changed", { authorized: isAuthorized });
      });

      sdk.auth.onOpenAuthForm((isOpened) => {
        notifyDefold("auth_form_opened", { open: isOpened });
      });

      // Host event callbacks
      sdk.host.onPurchaseFormStateChange((state) => {
        notifyDefold("purchase_form_state_changed", JSON.stringify(state));
      });

      // Lifecycle event callbacks
      sdk.lifecycle.registerEventCallback(
        sdk.lifecycle.LifecycleEvent.GAME_PAUSE,
        () => {
          notifyDefold("game_paused", {});
        },
      );

      sdk.lifecycle.registerEventCallback(
        sdk.lifecycle.LifecycleEvent.GAME_RESUME,
        () => {
          notifyDefold("game_resumed", {});
        },
      );
    } catch (error) {
      notifyDefold("error", { message: error.message });
    }
  }

  // Ads
  async function showRewardedAd() {
    try {
      const sdk = await getSDKInstance();
      if (sdk.ads.showRewardAd) {
        sdk.ads
          .showRewardAd()
          .then((reward) =>
            notifyDefold("rewarded_ad_shown", { success: true, value: reward.value }),
          );
      } else {
        notifyDefold("rewarded_ads_unavailable", { success: false });
      }
    } catch (error) {
      notifyDefold("ads_error", { message: error.message });
    }
  }

  async function showInterstitialAd() {
    try {
      const sdk = await getSDKInstance();
      if (sdk.ads.showInterstitialAd) {
        sdk.ads
          .showInterstitialAd()
          .then(() => notifyDefold("interstitial_ad_shown", { success: true }));
      } else {
        notifyDefold("interstitial_ads_unavailable", { success: false });
      }
    } catch (error) {
      notifyDefold("ads_error", { message: error.message });
    }
  }

  // Auth
  async function getUserAuthStatus() {
    try {
      const sdk = await getSDKInstance();
      const isAuthorized = await sdk.auth.isUserAuthorized();
      notifyDefold("user_auth_status_retrieved", { authorized: isAuthorized });
    } catch (error) {
      notifyDefold("auth_error", { message: error.message });
    }
  }

  async function getUserProfile() {
    try {
      const sdk = await getSDKInstance();
      const profile = await sdk.auth.getUserProfile();
      if (profile) {
        notifyDefold("user_profile_retrieved", {
          success: true,
          profile: JSON.stringify(profile),
        });
      } else {
        notifyDefold("user_profile_retrieved", {
          success: false,
          profile: "",
        });
      }
    } catch (error) {
      notifyDefold("auth_error", { message: error.message });
    }
  }

  async function openAuthenticationForm() {
    try {
      const sdk = await getSDKInstance();
      await sdk.auth.openAuthForm();
    } catch (error) {
      notifyDefold("auth_error", { message: error.message });
    }
  }

  // Host
  async function getGameId() {
    try {
      const sdk = await getSDKInstance();
      await sdk.host
        .getGameId()
        .then((id) => notifyDefold("game_id_get", { id: id }));
    } catch (error) {
      notifyDefold("host_error", { message: error.message });
    }
  }

  async function openPurchaseForm() {
    try {
      const sdk = await getSDKInstance();
      await sdk.host.openPurchaseForm();
    } catch (error) {
      notifyDefold("host_error", { message: error.message });
    }
  }

  // Lifecycle
  async function onTestReady() {
    try {
      const sdk = await getSDKInstance();
      await sdk.lifecycle.onTestReady();
      notifyDefold("on_test_ready", {});
    } catch (error) {
      notifyDefold("lifecycle_error", { message: error.message });
    }
  }

  async function onGameStart() {
    try {
      const sdk = await getSDKInstance();
      await sdk.lifecycle.onGameStart();
      notifyDefold("on_game_start", {});
    } catch (error) {
      notifyDefold("lifecycle_error", { message: error.message });
    }
  }

  async function onGameEnd() {
    try {
      const sdk = await getSDKInstance();
      await sdk.lifecycle.onGameEnd();
      notifyDefold("on_game_end", {});
    } catch (error) {
      notifyDefold("lifecycle_error", { message: error.message });
    }
  }

  async function onGamePause() {
    try {
      const sdk = await getSDKInstance();
      await sdk.lifecycle.onGamePause();
    } catch (error) {
      notifyDefold("lifecycle_error", { message: error.message });
    }
  }

  async function onGameResume() {
    try {
      const sdk = await getSDKInstance();
      await sdk.lifecycle.onGameResume();
    } catch (error) {
      notifyDefold("lifecycle_error", { message: error.message });
    }
  }

  async function onChangeScore(score) {
    try {
      const sdk = await getSDKInstance();
      await sdk.lifecycle.onChangeScore({ score: score });
    } catch (error) {
      notifyDefold("lifecycle_error", { message: error.message });
    }
  }

  // Persistence
  async function getLocalStorageItem(key) {
    try {
      const sdk = await getSDKInstance();
      sdk.persistence.getLocalStorageItem(key).then((item) => {
        notifyDefold("local_storage_get", { key: key, item: item });
      });
    } catch (error) {
      notifyDefold("persistence_error", { message: error.message });
    }
  }

  async function setLocalStorageItem(key, item) {
    try {
      const sdk = await getSDKInstance();
      sdk.persistence
        .setLocalStorageItem(key, item)
        .then(() => notifyDefold("local_storage_set", {}));
    } catch (error) {
      notifyDefold("persistence_error", { message: error.message });
    }
  }

  async function removeLocalStorageItem(key) {
    try {
      const sdk = await getSDKInstance();
      sdk.persistence
        .removeLocalStorageItem(key)
        .then(() => notifyDefold("local_storage_remove", {}));
    } catch (error) {
      notifyDefold("persistence_error", { message: error.message });
    }
  }

  async function getRemoteStorageItem(key) {
    try {
      const sdk = await getSDKInstance();
      sdk.persistence
        .getRemoteStorageItem(key)
        .then((item) =>
          notifyDefold("remote_storage_get", { key: key, item: item }),
        );
    } catch (error) {
      notifyDefold("persistence_error", { message: error.message });
    }
  }

  async function setRemoteStorageItem(key, item) {
    try {
      const sdk = await getSDKInstance();
      sdk.persistence
        .setRemoteStorageItem(key, item)
        .then(() => notifyDefold("remote_storage_set", {}));
    } catch (error) {
      notifyDefold("persistence_error", { message: error.message });
    }
  }

  async function removeRemoteStorageItem(key) {
    try {
      const sdk = await getSDKInstance();
      sdk.persistence
        .removeRemoteStorageItem(key)
        .then(() => notifyDefold("remote_storage_remove", {}));
    } catch (error) {
      notifyDefold("persistence_error", { message: error.message });
    }
  }

  async function getCookie(name) {
    try {
      const sdk = await getSDKInstance();
      sdk.persistence
        .getCookie(name)
        .then((cookie) => notifyDefold("cookie_get", { cookie: cookie }));
    } catch (error) {
      notifyDefold("persistence_error", { message: error.message });
    }
  }

  // Wallet
  async function getGems() {
    try {
      const sdk = await getSDKInstance();
      const isAuthorized = await sdk.auth.isUserAuthorized();
      if (isAuthorized) {
        const amount = await sdk.wallet.getGems();
        notifyDefold("arkadium_gems_amount", { success: true, amount: amount });
      } else {
        notifyDefold("arkadium_gems_amount", { success: false, amount: 0 });
      }
    } catch (error) {
      notifyDefold("wallet_error", { message: error.message });
    }
  }

  async function consumeGems(amount) {
    try {
      const sdk = await getSDKInstance();
      const isAuthorized = await sdk.auth.isUserAuthorized();
      if (isAuthorized) {
        const currentGems = await sdk.wallet.getGems();
        if (currentGems >= amount) {
          const result = await sdk.wallet.consumeGems(amount);
          if (result) {
            notifyDefold("arkadium_gems_consumed", { success: true, result: result });
          } else {
            notifyDefold("arkadium_gems_consumed", { success: false, result: null });
          }
        } else {
          notifyDefold("arkadium_gems_consumed", { success: false, result: null });
          await sdk.host.openPurchaseForm();
        }
      } else {
        notifyDefold("arkadium_gems_consumed", { success: false, result: null });
        await sdk.auth.openAuthForm();
      }
    } catch (error) {
      notifyDefold("wallet_error", { message: error.message });
    }
  }

  window.arkadiumBridge = {
    initArkadiumSDK: initArkadiumSDK,

    // Ads
    showInterstitialAd: showInterstitialAd,
    showRewardedAd: showRewardedAd,

    // Auth
    getUserAuthStatus: getUserAuthStatus,
    getUserProfile: getUserProfile,
    openAuthenticationForm: openAuthenticationForm,

    // Host
    getGameId: getGameId,
    openPurchaseForm: openPurchaseForm,

    // Lifecycle
    onTestReady: onTestReady,
    onGameStart: onGameStart,
    onGameEnd: onGameEnd,
    onGamePause: onGamePause,
    onGameResume: onGameResume,
    onChangeScore: onChangeScore,

    // Persistence
    getLocalStorageItem: getLocalStorageItem,
    setLocalStorageItem: setLocalStorageItem,
    removeLocalStorageItem: removeLocalStorageItem,
    getRemoteStorageItem: getRemoteStorageItem,
    setRemoteStorageItem: setRemoteStorageItem,
    removeRemoteStorageItem: removeRemoteStorageItem,
    getCookie: getCookie,

    // Wallet
    getGems: getGems,
    consumeGems: consumeGems,
  };
})();
