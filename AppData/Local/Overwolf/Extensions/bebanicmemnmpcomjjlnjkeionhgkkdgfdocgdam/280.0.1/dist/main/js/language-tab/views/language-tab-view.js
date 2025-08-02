"use strict";

const kDefaultLanguage = 'en';

//------------------------------------------------------------------------------
class LanguageTabView extends View {
  //----------------------------------------------------------------------------
  get Constants() {
    return {
      language: "language"
    }
  }

  //----------------------------------------------------------------------------
  constructor(viewDelegate) {
    super(viewDelegate);

    const kSelectorLanguageOptions = ".language-selector";
        
    this._optionsLanguages = new ViewComponent(this.Constants.language, `${kSelectorLanguageOptions} input[id^='language--']`, true);
  }

  //----------------------------------------------------------------------------
  init() {
    super.initComponents();
  
    try {
      this._optionsLanguages.element.forEach(optionElement => {
        optionElement.addEventListener("change", () => {
          super.onChanged(this._optionsLanguages.name);
        });
      });

      this._buttonRestartOverwolf.element.addEventListener('click', () => {
        super.onClicked(this._buttonRestartOverwolf.name);
      });
    } catch (e) {
    }
  }

  //----------------------------------------------------------------------------
  // Getters/Setters
  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
  set language(value) {
    try {
      this._optionsLanguages.element.forEach((option, index) => {
        if (value === option.value) {
          option.checked = true;
        } else {
          option.checked = false;
        }
      });
    } catch (e) {      
    }   
  }

  //----------------------------------------------------------------------------
  get language() {
    try {
      let checkedLanguage = kDefaultLanguage;
      for (let option of this._optionsLanguages.element) {
        if (option.checked) {
          checkedLanguage = option.value;
          return checkedLanguage;
        }
      }
    } catch (e) {
      return null;
    }   
  }
}