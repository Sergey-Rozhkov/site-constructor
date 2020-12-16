import {AbstractElementComponent} from '../abstract-element-component.js';

export class PElement extends AbstractElementComponent {
  _getTemplate() {
    const {text} = this._data;

    return `<div class="element text " tabindex="0">
              <p contenteditable="true" data-placeholder="${text}" class="content">${text}</p>
              <button class="delete-btn" type="button">
                <span class="visually-hidden">Удалить элемент</span>
              </button>
            </div>`;
  }
}
