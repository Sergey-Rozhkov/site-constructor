import {AbstractComponent} from './abstract-component.js';

export class ChooseElementComponent extends AbstractComponent {
  constructor(addElementCallback) {
    super();
    this._addElementCallback = addElementCallback;
  }

  _getTemplate() {
    return `<div class="choose-elem hidden-block">
              <button class="choose-elem__btn" type="button" data-element="h1">Заголовок H1</button>
              <button class="choose-elem__btn" type="button" data-element="h2">Заголовок H2</button>
              <button class="choose-elem__btn" type="button" data-element="h3">Заголовок H3</button>
              <button class="choose-elem__btn" type="button" data-element="p">Абзац текста</button>
              <button class="choose-elem__btn" type="button" data-element="img">Изображение</button>
            </div>`;
  }

  _afterCreateElement() {
    this.getElement()
      .querySelectorAll(`button.choose-elem__btn`)
      .forEach((el) => el.addEventListener(`click`, this._onAddElementBtnClick.bind(this)));
  }

  _onAddElementBtnClick(e) {
    const newElementType = e.target.dataset.element;
    const newElementText = e.target.innerText;

    this._addElementCallback(newElementType, newElementText);
  }
}
