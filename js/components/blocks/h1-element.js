import {AbstractElementComponent} from '../abstract-element-component.js';

export class H1Element extends AbstractElementComponent {
  _getTemplate() {
    const {text} = this._data;

    return `<div class="element title" tabindex="0">
              <h1 contenteditable="true" data-placeholder="${text}" class="content">${text}</h1>
              <button class="delete-btn" type="button">
                <span class="visually-hidden">Удалить элемент</span>
              </button>
            </div>`;
  }
}
