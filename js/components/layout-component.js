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
    console.log(`LayoutComponent.initLayout`, this._layoutType);
    this.cleanupLayout();
    this.getElement().classList.add(`layout--${this._layoutType}`);

    const headerBlockComponent = new HeaderBlockComponent(this.service);
    const headerBlockElement = headerBlockComponent.getElement();
    renderElement(this.getElement(), headerBlockElement);

    switch (this._layoutType) {
      case LayoutType.LANDING:
        this.initLanding();
        break;
      case LayoutType.BLOG:
        this.initBlog();
        break;
      case LayoutType.SHOP:
        this.initShop();
        break;
    }

    const footerBlockComponent = new FooterBlockComponent(this.service);
    const footerBlockElement = footerBlockComponent.getElement();
    renderElement(this.getElement(), footerBlockElement);
  }

  cleanupLayout() {
    this.getElement().innerText = ``;
    this.getElement().classList.remove(`layout--${LayoutType.LANDING}`);
    this.getElement().classList.remove(`layout--${LayoutType.BLOG}`);
    this.getElement().classList.remove(`layout--${LayoutType.SHOP}`);
  }

  initLanding() {
    const contentBlockComponent = new ContentBlockComponent(this.service);
    const contentBlockElement = contentBlockComponent.getElement();
    renderElement(this.getElement(), contentBlockElement);
  }

  initBlog() {
    const contentBlockComponentLeft = new ContentBlockComponent(this.service, ColumnIndex.LEFT);
    const contentBlockElementLeft = contentBlockComponentLeft.getElement();
    renderElement(this.getElement(), contentBlockElementLeft);

    const contentBlockComponentRight = new ContentBlockComponent(this.service, ColumnIndex.CENTER);
    const contentBlockElementRight = contentBlockComponentRight.getElement();
    renderElement(this.getElement(), contentBlockElementRight);
  }

  initShop() {
    const contentBlockComponentLeft = new ContentBlockComponent(this.service, ColumnIndex.LEFT);
    const contentBlockElementLeft = contentBlockComponentLeft.getElement();
    renderElement(this.getElement(), contentBlockElementLeft);

    const contentBlockComponentCenter = new ContentBlockComponent(this.service, ColumnIndex.CENTER);
    const contentBlockElementCenter = contentBlockComponentCenter.getElement();
    renderElement(this.getElement(), contentBlockElementCenter);

    const contentBlockComponentRight = new ContentBlockComponent(this.service, ColumnIndex.RIGHT);
    const contentBlockElementRight = contentBlockComponentRight.getElement();
    renderElement(this.getElement(), contentBlockElementRight);
  }
}
