import {AbstractComponent} from './abstract-component.js';
import {ElementType, KEYCODE_ENTER} from "../utils.js";

export class AbstractElementComponent extends AbstractComponent {
  constructor(data, changeDataHandler, deleteDataHandler) {
    super();

    this._data = data;
    this._changeDataHandler = changeDataHandler;
    this._deleteDataHandler = deleteDataHandler;
    this._contentChangeHandler = this._contentChangeHandler.bind(this);
    this._deleteBtnClickHandler = this._deleteBtnClickHandler.bind(this);
    this._contentBlurHandler = this._contentBlurHandler.bind(this);
    this._contentKeyDownHandler = this._contentKeyDownHandler.bind(this);
    this._contentClickHandler = this._contentClickHandler.bind(this);
  }

  _afterCreateElement() {
    switch (this._data.type) {
      case ElementType.H1:
      case ElementType.H2:
      case ElementType.H3:
      case ElementType.P:
        this.getElement().querySelector(`.content-element`).addEventListener(`blur`, this._contentBlurHandler);
        this.getElement().querySelector(`.content-element`).addEventListener(`keydown`, this._contentKeyDownHandler);
        break;
      case ElementType.IMG:
        this.getElement().querySelector(`.img-upload__label`).addEventListener(`click`, this._contentClickHandler);
        break;
    }

    this.getElement().querySelector(`button.delete-btn`).addEventListener(`click`, this._deleteBtnClickHandler);
  }

  _contentChangeHandler(content) {
    const data = Object.assign({}, this._data, {content});

    this._changeDataHandler(data);
  }

  _deleteBtnClickHandler() {
    this._deleteDataHandler(this._data);
  }

  _contentBlurHandler(evt) {
    const content = evt.target.innerText;

    this._contentChangeHandler(content);
  }

  _contentKeyDownHandler(evt) {
    if (evt.keyCode === KEYCODE_ENTER) {
      const content = evt.target.innerText;

      this._contentChangeHandler(content);
    }
  }

  _contentClickHandler() {
    const content = this.getElement().querySelector(`.content-element`).value;

    this._contentChangeHandler(content);
  }
}
