const kSimpleIoPlugin = 'simple-io-plugin';

//------------------------------------------------------------------------------
class IOPlugin {
  //----------------------------------------------------------------------------
  constructor() {
    this._plugin = null;
  }

  //----------------------------------------------------------------------------
  get $() {
    return this._plugin;
  }

  //----------------------------------------------------------------------------
  async initialize() {
    return new Promise(resolve => {
      if (this._plugin) {
        return resolve(true);
      }

      const that = this;

      overwolf.extensions.current.getExtraObject(kSimpleIoPlugin, (result) => {
        if (result.success) {
          that._plugin = result.object;
          return resolve(true);
        } else {
          console.error('Failed to load io-plugin: ' + JSON.stringify(result));
          return resolve(false);
        }
      }); // getExtraObject
    })
  }

  //----------------------------------------------------------------------------
  async fileExists(filename) {
    return new Promise(resolve => {
      if (!this._plugin) {
        return resolve(false);
      }

      this._plugin.fileExists(filename, resolve);
    });
  }

  //----------------------------------------------------------------------------
  async isDirectory(path) {
    return new Promise(resolve => {
      if (!this._plugin) {
        return resolve(false);
      }

      this._plugin.isDirectory(path, resolve);
    });
  }

  //----------------------------------------------------------------------------
  async listDirectory(path) {
    return new Promise(resolve => {
      if (!this._plugin) {
        return resolve(null);
      }

      this._plugin.listDirectory(path, (success, json) => {
        if (!success) {
          return resolve(null);
        }

        try {
          return resolve(JSON.parse(json));
        } catch {
          return resolve(null);
        }
      });
    });
  }

  //----------------------------------------------------------------------------
  async iniReadValue(section, key, file) {
    return new Promise(resolve => {
      if (!this._plugin) {
        return resolve(false);
      }

      this._plugin.iniReadValue(section, key, file, (status, data) => {
        resolve({ status, data });
      });
    });
  }

  //----------------------------------------------------------------------------
  async iniWriteValue(section, key, value, file) {
    return new Promise(resolve => {
      if (!this._plugin) {
        return resolve(false);
      }

      this._plugin.iniWriteValue(section, key, value, file, (status, data) => {
        resolve(status);
      });
    });
  }

}
