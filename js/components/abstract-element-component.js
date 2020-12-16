import {AbstractComponent} from './abstract-component.js';

export class AbstractElementComponent extends AbstractComponent {
  constructor(data) {
    super();

    this._data = data;
  }

  _afterCreateElement() {
    this.getElement().querySelector(`.content`).addEventListener(`blur`, this._contentChangeHandler.bind(this));
  }

  _contentChangeHandler(evt) {
    const content = evt.target.innerText;
  }
}
