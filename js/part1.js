import {BLOCK_TYPES, MOCK_IMAGES, MOCK_TITLES} from './mock.js';
import {generateId, getRandomElementFromArray, renderElement} from './utils.js';

/**
 * Генерируем случайные данные
 * @param number
 * @returns {[]}
 */
function generateData(number) {
  const result = [];

  for (let i = 0; i < number; i++) {
    const id = generateId();
    const type = getRandomElementFromArray(BLOCK_TYPES);

    let content;
    if (type === `img`) {
      content = getRandomElementFromArray(MOCK_IMAGES);
    } else {
      content = getRandomElementFromArray(MOCK_TITLES);
    }

    const container = getRandomElementFromArray([
      `header`,
      `content`,
      `footer`,
    ]);

    const item = {
      id,
      type,
      content,
      container,
    };

    result.push(item);
  }

  return result;
}

const data = generateData(10);

console.log(`generated data is`, data);

const templateContainer = document.querySelector(`.template__elements-wrapper`);

/**
 * Рендерим блок в ДОМ
 * @param item
 */
function renderBlock(item) {
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

  renderElement(container, element);

  containerBlock.classList.remove(`empty`);
}

data.forEach(renderBlock);
