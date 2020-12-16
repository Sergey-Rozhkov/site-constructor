import {AppEvent, LayoutType} from './utils.js';

export class Service {
  constructor() {
    this._data = {};
    this._layoutType = LayoutType.LANDING;
  }

  getLayoutType() {
    return this._layoutType;
  }

  getBlockElements(blockName) {
    return this._data[blockName] || [];
  }

  setLayoutType(layoutType) {
    this._layoutType = layoutType;
    this._emitEvent(AppEvent.LAYOUT_CHANGED, this._layoutType);
  }

  addElement(container, element) {
    if (!this._data[container]) {
      this._data[container] = [];
    }

    this._data[container].push(element);

    this._emitEvent(AppEvent.ELEMENT_ADDED, {container, element});
  }

  _emitEvent(type, data) {
    console.log(this._data);
    window.dispatchEvent(new CustomEvent(type, {detail: data}));
  }
}
