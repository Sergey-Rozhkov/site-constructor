import {AppEvent, renderElement} from '../utils.js';
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
  }

  _beforeCreateElement() {
    this._elements = this.service.getBlockElements(this._blockName) || [];
  }

  _afterCreateElement() {
    this._chooseElementComponent = new ChooseElementComponent(this._onAddElementAction.bind(this));
    renderElement(this.getElement(), this._chooseElementComponent.getElement());
    this._fillBlock();

    this.getElement().querySelector(`button.add-btn`).addEventListener(`click`, this._onAddBtnClick.bind(this));

    window.addEventListener(AppEvent.ELEMENT_ADDED, this._fillBlock.bind(this));
  }

  _onAddBtnClick() {
    this._chooseElementComponent.getElement().classList.toggle(`hidden-block`);
  }

  _onAddElementAction(type, text) {
    this._chooseElementComponent.getElement().classList.toggle(`hidden-block`, true);
    this.service.addElement(this._blockName, {type, text});
  }

  _fillBlock() {
    this._elements = this.service.getBlockElements(this._blockName) || [];

    if (this._elements.length) {
      this.getElement().classList.remove(`${this._blockName}--empty`);
    } else {
      this.getElement().classList.add(`${this._blockName}--empty`);
    }

    let wrapperElement = this.getElement().querySelector(`.${this._blockName}__elements-wrapper`);

    if (!wrapperElement) {
      wrapperElement = document.createElement(`div`);
      wrapperElement.classList.add(`${this._blockName}__elements-wrapper`);

      renderElement(this.getElement(), wrapperElement);
    } else {
      wrapperElement.innerText = ``;
    }

    this._elements.forEach((element) => {
      switch (element.type) {
        case `h1`:
          const h1Element = new H1Element(element);
          renderElement(wrapperElement, h1Element.getElement());
          break;
        case `h2`:
          const h2Element = new H2Element(element);
          renderElement(wrapperElement, h2Element.getElement());
          break;
        case `h3`:
          const h3Element = new H3Element(element);
          renderElement(wrapperElement, h3Element.getElement());
          break;
        case `p`:
          const pElement = new PElement(element);
          renderElement(wrapperElement, pElement.getElement());
          break;
        case `img`:
          const imgElement = new ImgElement(element);
          renderElement(wrapperElement, imgElement.getElement());
          break;
      }
    });
  }
}
