"use strict";

//------------------------------------------------------------------------------
class SettingsService {
  //----------------------------------------------------------------------------
  static async retrieveListAsync() {    
  }

  //----------------------------------------------------------------------------
  static getSettingsAsync(category) {
    return new Promise((resolve, reject) => {     
      overwolfInternal.settings.get(category, (result) => {
        if (result.status != "success") {
          console.error(`Failed to get ${category} settings: ` + 
                        JSON.stringify(result));
          return reject();
        } else {
          return resolve(result.setting);
        }
      });
    });
  }

  //----------------------------------------------------------------------------
  static setSettingAsync(category, object) {
    return new Promise((resolve, reject) => {     
      overwolfInternal.settings.set(category, object, (res) => {
        if (res.status != "success") {
          console.error(`Failed to set ${category} setting: ` +
                        JSON.stringify(object) +
                        JSON.stringify(res));
          return reject();
        } else {
          return resolve();
        }
      });     
    });
  }  

}
