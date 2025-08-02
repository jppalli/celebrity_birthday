class ExtensionsService {
  constructor() {
    this._initialized = false;
    this._extensionsChangeListeners = [];

    this.extensions = {};

    this.onExtensionsChange = {
      addListener: ((fn) => {
        this._extensionsChangeListeners.push(fn);
      }),
      removeListener: ((fn) => {
        let i = this._extensionsChangeListeners.indexOf(fn);
        if (i >= 0) {
          this._extensionsChangeListeners.splice(i, 1);
        }
      })
    };
  }

  async init() {
    if (this._initialized) {
      return;
    }

    overwolf.extensions.onAppLoaded.removeListener(this._onAppInstalled.bind(this));
    overwolf.extensions.onAppLoaded.addListener(this._onAppInstalled.bind(this));

    overwolf.extensions.onAppUninstalled.removeListener(this._onAppInstalled.bind(this));
    overwolf.extensions.onAppUninstalled.addListener(this._onAppInstalled.bind(this));

    await this._reloadExtensions();

    this._initialized = true;
  }

  async _onAppInstalled() {
    await this._reloadExtensions();
    this._notifyExtensionsChanged();
  }

  _reloadExtensions() {
    return new Promise((resolve) => {
      this.extensions = {};

      overwolf.extensions.getExtensions((extensionsManifestStrings) => {
        let manifests = extensionsManifestStrings.map(JSON.parse);
        for (let manifest of manifests) {
          let uid = manifest.UID;
          this.extensions[uid] = manifest;
        }

        return resolve();
      });
    });

  }

  _notifyExtensionsChanged() {
    for (let listener of this._extensionsChangeListeners) {
      listener(this.extensions);
    }
  }

  async getExtension(extensionId) {
    // NOTE(twolf): Resolve race conditions (who listens on the app loaded 
    // first)
    await this._reloadExtensions();
    return this.extensions[extensionId];
  }

  async getExtensions() {
    await this.init();
    return this.extensions;
  }
}

window.extensionsService = new ExtensionsService();