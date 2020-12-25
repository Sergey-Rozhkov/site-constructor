import {AppEvent, ElementType, renderElement} from '../utils.js';
import {AbstractComponent} from './abstract-component.js';
import {H1Element} from './blocks/h1-element.js';
import {H2Element} from './blocks/h2-element.js';
import {H3Element} from './blocks/h3-element.js';
import {ImgElement} from './blocks/img-element.js';
import {PElement} from './blocks/p-element.js';
import {ChooseElementComponent} from './choose-element-component.js';

export class AbstractBlockComponent extends AbstractComponent {
  constructor(service) {
    super();

    this.service = service;

    this._blockName = `abstract`;
    this._elements = [];

    this._changeDataHandler = this._changeDataHandler.bind(this);
    this._deleteDataHandler = this._deleteDataHandler.bind(this);
    this._addBtnClickHandler = this._addBtnClickHandler.bind(this);
    this._addElementHandler = this._addElementHandler.bind(this);
    this._fillBlock = this._fillBlock.bind(this);
  }

  removeEventListeners() {
    window.removeEventListener(AppEvent.ELEMENT_ADDED, this._fillBlock);
    window.removeEventListener(AppEvent.ELEMENT_DELETED, this._fillBlock);
    window.removeEventListener(AppEvent.ELEMENT_UPDATED, this._fillBlock);
  }

  _beforeCreateElement() {
    this._elements = this.service.getBlockElements(this._blockName);
  }

  _afterCreateElement() {
    this._chooseElementComponent = new ChooseElementComponent(this._addElementHandler);
    renderElement(this.getElement(), this._chooseElementComponent.getElement());
    this._fillBlock();

    this.getElement().querySelector(`button.add-btn`).addEventListener(`click`, this._addBtnClickHandler);

    window.addEventListener(AppEvent.ELEMENT_ADDED, this._fillBlock);
    window.addEventListener(AppEvent.ELEMENT_DELETED, this._fillBlock);
    window.addEventListener(AppEvent.ELEMENT_UPDATED, this._fillBlock);
  }

  _addBtnClickHandler() {
    this._chooseElementComponent.toggleVisibility();
  }

  _addElementHandler(type, content) {
    this._chooseElementComponent.toggleVisibility(true);
    this.service.addElement(this._blockName, {type, content});
  }

  _fillBlock() {
    this._elements = this.service.getBlockElements(this._blockName);

    const emptyBlockClass = `${this._columnIndex ? `content` : this._blockName}--empty`;

    this.getElement().classList.toggle(emptyBlockClass, !this._elements.length);

    let wrapperElement = this.getElement().querySelector(`.${this._blockName}__elements-wrapper`);

    if (!wrapperElement) {
      wrapperElement = document.createElement(`div`);
      wrapperElement.classList.add(`${this._blockName}__elements-wrapper`);

      renderElement(this.getElement(), wrapperElement);
    } else {
      wrapperElement.innerText = ``;
    }

    this._elements.forEach((element) => {
      let elementComponent;
      switch (element.type) {
        case ElementType.H1:
          elementComponent = new H1Element(element, this._changeDataHandler, this._deleteDataHandler);
          break;
        case ElementType.H2:
          elementComponent = new H2Element(element, this._changeDataHandler, this._deleteDataHandler);
          break;
        case ElementType.H3:
          elementComponent = new H3Element(element, this._changeDataHandler, this._deleteDataHandler);
          break;
        case ElementType.P:
          elementComponent = new PElement(element, this._changeDataHandler, this._deleteDataHandler);
          break;
        case ElementType.IMG:
          elementComponent = new ImgElement(element, this._changeDataHandler, this._deleteDataHandler);
          break;
      }

      renderElement(wrapperElement, elementComponent.getElement());
    });
  }

  _changeDataHandler(data) {
    this.service.updateElement(this._blockName, data);
  }

  _deleteDataHandler(data) {
    this.service.deleteElement(this._blockName, data);
  }
}
