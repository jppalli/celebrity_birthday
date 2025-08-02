"use strict";

//------------------------------------------------------------------------------
class IDropDownItemAdapter {
  shouldSkip(rawItem) {} // returns bool
  isDisabled(rawItem) {} // returns bool
  getDisplayName(rawItem) {} // returns string
  getSettingId(rawItem) {} // returns string
}

//------------------------------------------------------------------------------
class DropDownComponent {
  //----------------------------------------------------------------------------
  constructor(dropDownComponent, 
              selectedItemComponent, 
              adapter, 
              onChangedCallback) {
    this._dropDown = dropDownComponent;
    this._selectedItem = selectedItemComponent;
    this._adapter = adapter;

    if (!onChangedCallback) {
      return;
    }

    this._selectedItem.element.addEventListener("change", () => {
      onChangedCallback(this._selectedItem.name);
    });
  }

  //----------------------------------------------------------------------------
  setItems(items) {
    // Clear all items (if any exist)
    this._dropDown.element.innerHTML = "";

    if (!items) {
      return;
    }
  
    for (let i = 0; i < items.length; ++i) {
      let item = items[i];
      this._addItem(item);
    }

    if (items.length > 0) {
      this.selectedItem = this._adapter.getSettingId(items[0]);
    }
  }

  //----------------------------------------------------------------------------
  set selectedItem(itemSettingsId) {
    try {
      let itemElement = this._dropDown.element.querySelector(
        `li[data-setting-id='${itemSettingsId}']`);

      if (!itemElement) {
        // try to fallback to the default if we failed
        itemElement = this._dropDown.element.firstElementChild;
      }

      this._selectedItem.element.innerHTML = itemElement.innerHTML;
      this._selectedItem.element.dataset.settingId = itemSettingsId;
    } catch (e) {
      console.log(e);
    }
  }

  //----------------------------------------------------------------------------
  get selectedItem() {
    try {
      return this._selectedItem.element.dataset.settingId;
    } catch (e) {
      return null;
    }   
  }

  //----------------------------------------------------------------------------
  _addItem(item) {
    if (this._adapter.shouldSkip(item)) {
      return;
    }

    let element = document.createElement("li");
    element.innerHTML = this._adapter.getDisplayName(item);
    element.dataset.settingId = this._adapter.getSettingId(item);

    if (this._adapter.isDisabled(item)) {
      element.classList.add("disabled");
    }

    this._dropDown.element.appendChild(element);
  }
}