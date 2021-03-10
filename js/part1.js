import {renderElement} from './utils.js';
import {addClickDeleteHandlers} from "./part2.js";
import {addClickEditHandlers} from "./part3.js";
import {generateData} from "./part0.js";

const templateContainer = document.querySelector(`.template__elements-wrapper`);

const siteData = generateData(10); // FixMe - удаляем после реализации ч4
siteData.forEach(renderBlock); // FixMe - удаляем после реализации ч4

/**
 * Рендерим блок в ДОМ
 * @param {object} item
 */
export function renderBlock(item) {
  const template = templateContainer.querySelector(`#template-${item.type}`);
  const element = template.cloneNode(true);
  const containerBlock = document.querySelector(`.layout .${item.container}`);
  const container = containerBlock.querySelector(`.${item.container}__elements-wrapper`);

  if (item.type === `img`) {
    element.querySelector(`.content-element`).src = item.content;
  } else {
    element.querySelector(`.content-element`).innerText = item.content;
  }

  element.removeAttribute(`id`);

  // FixMe - добавляем после реализации ч4
  addClickDeleteHandlers(element);
  addClickEditHandlers(element);

  renderElement(container, element);

  containerBlock.classList.remove(`empty`);
}
