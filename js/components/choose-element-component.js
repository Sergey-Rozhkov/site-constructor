import {AbstractComponent} from "./abstract-component.js";

export class ChooseElementComponent extends AbstractComponent {
  constructor(onElementAddAction) {
    super();
    this._onElementAddAction = onElementAddAction;
  }

  _getTemplate() {
    return `<div class="choose-elem hidden-block">
              <button class="choose-elem__btn" type="button" data-element="h1">Заголовок H1</button>
              <button class="choose-elem__btn" type="button" data-element="h2">Заголовок H2</button>
              <button class="choose-elem__btn" type="button" data-element="h3">Заголовок H3</button>
              <button class="choose-elem__btn" type="button" data-element="p">Абзац текста</button>
              <button class="choose-elem__btn" type="button" data-element="img">Изображение</button>
            </div>`
  }

  _afterCreateElement() {
    this.getElement()
      .querySelectorAll(`button.choose-elem__btn`)
      .forEach(el => el.addEventListener(`click`, this._onAddBtnClick.bind(this)))
  }

  _onAddBtnClick(e) {
    const newElementType = e.target.dataset.element;

    this._onElementAddAction(newElementType);
  }

}
