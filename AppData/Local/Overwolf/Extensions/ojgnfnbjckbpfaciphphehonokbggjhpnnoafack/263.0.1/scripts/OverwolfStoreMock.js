window.OverwolfStore = {
  getWasDockEverIntroduced : function(callback){
    return callback(true);
  },
  getIsFirstStoreExecution: function(callback){
    return callback(false);
  },
  getGlobalInformation: function(){
  },
  getManifestData: function(callback){
    return callback({
      meta: {
        version: "159.0.0"
      }
    });
  },
  onDockConnectionStateChanged: {
    addListener: function(){},
    removeListener: function(){}
  },
  login: {
    onLoginStateChanged: {
      addListener: function(){},
      removeListener: function(){}
    },
    onUserProfileChanged: {
      addListener: function(){},
      removeListener: function(){}
    },
    performOverwolfLogin: function (data, callback) {
      callback({
        result: "success",
        error: ""
      });
    },
    setToken: function (token, callback) {
      callback({
        scope: {
          expired: false,
          email: "aogenius@gmail.com",
          username: "yousuck",
          avatar: ""//,
          // unVerified: true
        }
      })
    },
    enums: {
      SocialNetwork: {
        Discord: "Discord",
        Facebook: "Facebook",
        Gfycat: "Gfycat",
        Google: "Google",
        None: "None",
        Reddit: "Reddit",
        Twitter: "Twitter",
        VKontakte: "VKontakte",
        Youtube: "Youtube"
      }
    }
  },
  skins: {
    getLocalSkins: function(callback){
      // callback({status: "success", skins: []});
      callback({skins: []});
    },
    onSkinInstalled: {
      addListener: function(){},
      removeListener: function(){}
    },
    onSkinUninstalled: {
      addListener: function(){},
      removeListener: function(){}
    }
  },
  apps: {
    onAppInstalled: {
      addListener: function(){},
      removeListener: function(){}
    },
    onAppUninstalled: {
      addListener: function(){},
      removeListener: function(){}
    },
    onAppInstallationProgressChanged: {
      addListener: function(){},
      removeListener: function(){}
    },
    onAppRemovedFromDock: {
      addListener: function(){},
      removeListener: function(){}
    },
    onAppAddedToDock: {
      addListener: function(){},
      removeListener: function(){}
    },
    getLocalApps: function(callback){
      // return callback({status: "success", apps: []})
      return callback({apps: []});
    },
    onAppDesktopShortcutAdded: {
      addListener: function(){},
      removeListener: function(){}
    },
    onAppDesktopShortcutRemoved: {
      addListener: function(){},
      removeListener: function(){}
    }
  },
  games: {
    getMyGames: function(callback){
      // return callback({status: "success", games: []})
      return callback({games: []})
    },
    onRunningGameDataUpdated: {
      addListener: function(){},
      removeListener: function(){}
    }
  },
  giveaways: {
    getGiveawayInfo: function(){}
  },
  openUrlInDefaultBrowser: function(url){
    window.open(url);
  }
};