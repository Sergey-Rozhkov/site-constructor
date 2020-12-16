import {AppEvent, ColumnIndex, LayoutType, renderElement} from '../utils.js';
import {AbstractComponent} from './abstract-component.js';
import {ContentBlockComponent} from './content-block-component.js';
import {FooterBlockComponent} from './footer-block-component.js';
import {HeaderBlockComponent} from './header-block-component.js';

export class LayoutComponent extends AbstractComponent {
  constructor(service) {
    super();

    this.service = service;
    this._layoutType = service.getLayoutType();
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

    switch (this._layoutType) {
      case LayoutType.BLOG:
        this.initBlog();
        break;
      case LayoutType.SHOP:
        this.initShop();
        break;
      case LayoutType.LANDING:
        this.initLanding();
        break;
    }

    const footerBlockComponent = new FooterBlockComponent(this.service);
    const footerBlockElement = footerBlockComponent.getElement();
    renderElement(this.getElement(), footerBlockElement);
  }

  cleanupLayout() {
    this.getElement().innerText = ``;
    this.getElement().setAttribute(`class`, `layout`);
  }

  initLanding() {
    const contentBlockComponent = new ContentBlockComponent(this.service);
    const contentBlockElement = contentBlockComponent.getElement();
    renderElement(this.getElement(), contentBlockElement);
  }

  initBlog() {
    const contentBlockComponent1 = new ContentBlockComponent(this.service, ColumnIndex.LEFT);
    const contentBlockElement1 = contentBlockComponent1.getElement();
    renderElement(this.getElement(), contentBlockElement1);

    const contentBlockComponent2 = new ContentBlockComponent(this.service, ColumnIndex.CENTER);
    const contentBlockElement2 = contentBlockComponent2.getElement();
    renderElement(this.getElement(), contentBlockElement2);
  }

  initShop() {
    const contentBlockComponent1 = new ContentBlockComponent(this.service, ColumnIndex.LEFT);
    const contentBlockElement1 = contentBlockComponent1.getElement();
    renderElement(this.getElement(), contentBlockElement1);

    const contentBlockComponent2 = new ContentBlockComponent(this.service, ColumnIndex.CENTER);
    const contentBlockElement2 = contentBlockComponent2.getElement();
    renderElement(this.getElement(), contentBlockElement2);

    const contentBlockComponent3 = new ContentBlockComponent(this.service, ColumnIndex.RIGHT);
    const contentBlockElement3 = contentBlockComponent3.getElement();
    renderElement(this.getElement(), contentBlockElement3);
  }
}
