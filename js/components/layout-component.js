import {AppEvent, LayoutContentColumn, LayoutType, renderElement} from '../utils.js';
import {AbstractComponent} from './abstract-component.js';
import {ContentBlockComponent} from './content-block-component.js';
import {FooterBlockComponent} from './footer-block-component.js';
import {HeaderBlockComponent} from './header-block-component.js';

export class LayoutComponent extends AbstractComponent {
  constructor(service) {
    super();

    this.service = service;
    this._layoutType = service.getLayoutType();
    this._layoutElements = [];
  }

  _getTemplate() {
    return `<div class="layout"></div>`;
  }

  _afterCreateElement() {
    this.initLayout();
    window.addEventListener(AppEvent.LAYOUT_CHANGED, (e) => {
      this._layoutType = e.detail;
      this.initLayout();
    });
  }

  initLayout() {
    this.cleanupLayout();
    this.getElement().classList.add(`layout--${this._layoutType}`);

    const headerBlockComponent = new HeaderBlockComponent(this.service);
    const headerBlockElement = headerBlockComponent.getElement();
    renderElement(this.getElement(), headerBlockElement);
    this._layoutElements.push(headerBlockComponent);

    switch (this._layoutType) {
      case LayoutType.LANDING:
        this.initContent(LayoutContentColumn.LANDING);
        break;
      case LayoutType.BLOG:
        this.initContent(LayoutContentColumn.BLOG);
        break;
      case LayoutType.SHOP:
        this.initContent(LayoutContentColumn.SHOP);
        break;
    }

    const footerBlockComponent = new FooterBlockComponent(this.service);
    const footerBlockElement = footerBlockComponent.getElement();
    renderElement(this.getElement(), footerBlockElement);
    this._layoutElements.push(footerBlockComponent);
  }

  cleanupLayout() {
    this._layoutElements.forEach((element) => element.removeEventListeners());
    this._layoutElements = [];
    this.getElement().innerText = ``;
    this.getElement().classList.remove(`layout--${LayoutType.LANDING}`);
    this.getElement().classList.remove(`layout--${LayoutType.BLOG}`);
    this.getElement().classList.remove(`layout--${LayoutType.SHOP}`);
  }

  initContent(contentBlockCount) {
    for (let i = 1; i <= contentBlockCount; i++) {
      const contentBlock = new ContentBlockComponent(this.service, i);
      const contentBlockElement = contentBlock.getElement();

      renderElement(this.getElement(), contentBlockElement);
      this._layoutElements.push(contentBlock);
    }
  }
}
