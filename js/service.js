import {AppEvent, LayoutType} from "./utils.js";

export class Service {
  constructor() {
    this._data = {};
    this._layoutType = LayoutType.LANDING;
  }

  getLayoutType() {
    return this._layoutType;
  }

  setLayoutType(layoutType) {
    this._layoutType = layoutType;
    this._emitEvent(AppEvent.LAYOUT_CHANGED, this._layoutType)
  }

  addNewElement(container, elementType) {
    if (!this._data[container]) {
      this._data[container] = [];
    }

    this._data[container].push({elementType});

    this._emitEvent(AppEvent.ELEMENT_ADDED, {container, elementType});
  }

  _emitEvent(type, data) {
    window.dispatchEvent(new CustomEvent(type, {detail: data}));
  }
}
