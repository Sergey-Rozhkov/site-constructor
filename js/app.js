import {GridSelectorComponent} from './components/grid-selector-component.js';
import {LayoutComponent} from './components/layout-component.js';
import {Service} from './service.js';
import {renderElement, RenderPosition} from './utils.js';

export class App {
  constructor() {
    this.service = new Service();
  }

  init(constructorAppElement) {
    const gridSelectorComponent = new GridSelectorComponent(this.service);
    const gridSelectorElement = gridSelectorComponent.getElement();
    renderElement(constructorAppElement, gridSelectorElement, RenderPosition.BEFOREEND);

    const layoutComponent = new LayoutComponent(this.service);
    const layoutElement = layoutComponent.getElement();
    renderElement(constructorAppElement, layoutElement, RenderPosition.BEFOREEND);
  }
}
