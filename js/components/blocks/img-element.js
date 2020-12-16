import {AbstractElementComponent} from '../abstract-element-component.js';

export class ImgElement extends AbstractElementComponent {
  _getTemplate() {
    const {title} = this._data;
    return `<div class="element title" tabindex="0">
              <h1 contenteditable="true" data-placeholder="${title}">${title}</h1>
              <button class="delete-btn" type="button">
                <span class="visually-hidden">Удалить элемент</span>
              </button>
            </div>`;
  }
}
