"use strict";

//------------------------------------------------------------------------------
class LanguageTabController extends BaseController {
  //------------------------------------------------------------------------------
  constructor() {
    super(overwolfInternal.settings.enums.SettingsCategory.Language);

    this._view = new LanguageTabView(this);
  }

  //------------------------------------------------------------------------------
  init(settings) {
    this._view.init();
    this._initStartupSettings(settings);
  }

  //------------------------------------------------------------------------------
  async _initStartupSettings(settings) {
    try {
      if (settings == null) {
        return;
      }

      this._initialLanguage = settings.clientLanguage;
      this._currentLanguage = this._initialLanguage;
      this._view.language = settings.clientLanguage;
    } catch (e) {
      console.error(e);
    }
  }


  //----------------------------------------------------------------------------
  // IViewDelegate

  //----------------------------------------------------------------------------
  async onClicked(name) {
    switch (name) {
      //------------------------------------------------------------------------
      case this._view.Constants.restartOverwolf:
        try {
          overwolfInternal.utils.performRestart();
          AnalyticsService.trackRSEvent('settings_language_restart_ow_click');
        } catch (e) {
          console.error(e);
        }
        break;
    }
  }

  //----------------------------------------------------------------------------
  async onChanged(name) {
    switch (name) {
      case this._view.Constants.language:
        try {
          const newLang = this._view.language;
          await SettingsService.setSettingAsync(
            super.settingCategory,
            { clientLanguage: newLang }
          );

          AnalyticsService.trackRSEvent('settings_language_change', {
            oldLang: this._currentLanguage,
            newLang: newLang
          });

          this._currentLanguage = newLang;

          if (this._initialLanguage !== this._currentLanguage) {
          } else {
          }
        } catch (e) {
        }

        break;
    }
  }

}
