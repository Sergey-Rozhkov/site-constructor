import {AppEvent, generateId, LayoutType} from './utils.js';

export class Service {
  constructor() {
    // Нужно для отладки
    // this._data = JSON.parse(localStorage.getItem(`siteData`) || `{}`);
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
    this._data = {};
    this._emitEvent(AppEvent.LAYOUT_CHANGED, this._layoutType);
  }

  addElement(container, element) {
    if (!this._data[container]) {
      this._data[container] = [];
    }

    element.id = generateId();

    this._data[container].push(element);

    this._emitEvent(AppEvent.ELEMENT_ADDED, {container, element});
  }

  deleteElement(container, element) {
    const findIndex = this._getContainerElementIndex(container, element);

    this._data[container].splice(findIndex, 1);

    this._emitEvent(AppEvent.ELEMENT_DELETED, {container, element});
  }

  updateElement(container, element) {
    const findIndex = this._getContainerElementIndex(container, element);

    this._data[container].splice(findIndex, 1, element);

    this._emitEvent(AppEvent.ELEMENT_UPDATED, {container, element});
  }

  _emitEvent(type, data) {
    // Нужно для отладки
    // localStorage.setItem(`siteData`, JSON.stringify(this._data));
    window.dispatchEvent(new CustomEvent(type, {detail: data}));
  }

  _getContainerElementIndex(container, {id}) {
    return this._data[container].findIndex((item) => item.id === id);
  }
}
