import {AbstractElementComponent} from '../abstract-element-component.js';

export class H3Element extends AbstractElementComponent {
  _getTemplate() {
    const {content} = this._data;

    return `<div class="element title" tabindex="0">
              <h3 contenteditable="true" data-placeholder="${content}" class="content-element">${content}</h3>
              <button class="delete-btn" type="button">
                <span class="visually-hidden">Удалить элемент</span>
              </button>
            </div>`;
  }
}
