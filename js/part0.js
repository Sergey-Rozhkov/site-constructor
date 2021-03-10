import {generateId, getRandomElementFromArray} from "./utils.js";
import {BLOCK_TYPES, MOCK_IMAGES, MOCK_TITLES} from "./mock.js";

/**
 * Генерируем случайные данные
 * @param {number} count
 * @return {[]}
 */
export function generateData(count) {
  const result = [];

  for (let i = 0; i < count; i++) {
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
