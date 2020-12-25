import {AbstractElementComponent} from '../abstract-element-component.js';

export class PElement extends AbstractElementComponent {
  _getTemplate() {
    const {content} = this._data;

    return `<div class="element text" tabindex="0">
              <p contenteditable="true" data-placeholder="${content}" class="content-element">${content}</p>
              <button class="delete-btn" type="button">
                <span class="visually-hidden">Удалить элемент</span>
              </button>
            </div>`;
  }
}
