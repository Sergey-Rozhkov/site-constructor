import {AbstractElementComponent} from '../abstract-element-component.js';

export class H2Element extends AbstractElementComponent {
  _getTemplate() {
    const {content} = this._data;

    return `<div class="element title" tabindex="0">
              <h2 contenteditable="true" data-placeholder="${content}" class="content-element">${content}</h2>
              <button class="delete-btn" type="button">
                <span class="visually-hidden">Удалить элемент</span>
              </button>
            </div>`;
  }
}
