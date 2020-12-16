import {AbstractElementComponent} from '../abstract-element-component.js';

export class H3Element extends AbstractElementComponent {
  _getTemplate() {
    const {text} = this._data;

    return `<div class="element title" tabindex="0">
              <h3 contenteditable="true" data-placeholder="${text}" class="content">${text}</h3>
              <button class="delete-btn" type="button">
                <span class="visually-hidden">Удалить элемент</span>
              </button>
            </div>`;
  }
}
