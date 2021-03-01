export const HIDE_BLOCK_CLASS = `hidden-block`;
export const DEFAULT_COLUMN_INDEX = 1;
export const KEYCODE_ENTER = 13;

export const RenderPosition = {
  BEFOREBEGIN: `beforebegin`,
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`,
};

export const LayoutContentColumn = {
  LANDING: 1,
  BLOG: 2,
  SHOP: 3,
};

export const LayoutType = {
  LANDING: `landing`,
  BLOG: `blog`,
  SHOP: `shop`,
};

export const BlockType = {
  HEADER: `header`,
  CONTENT: `content`,
  FOOTER: `footer`,
};

export const ElementType = {
  H1: `h1`,
  H2: `h2`,
  H3: `h3`,
  P: `p`,
  IMG: `img`,
};

export const AppEvent = {
  LAYOUT_CHANGED: `LayoutChanged`,
  ELEMENT_ADDED: `ElementAdded`,
  ELEMENT_DELETED: `ElementDeleted`,
  ELEMENT_UPDATED: `ElementUpdated`,
};

export function createElement(template) {
  const element = document.createElement(`div`);
  element.innerHTML = template;
  return element.firstElementChild;
}

export function renderElement(
  container, child, position = RenderPosition.BEFOREEND) {
  // https://javascript.info/article/modifying-document/before-prepend-append-after.svg
  switch (position) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(child);
      break;
    case RenderPosition.BEFOREEND:
      container.append(child);
      break;
    case RenderPosition.AFTEREND:
      container.parentNode.insertBefore(child, container.nextSibling);
      break;
    case RenderPosition.BEFOREBEGIN:
      container.parentNode.insertBefore(child, container);
      break;
  }
}

export function setElementVisibility(element, visibility) {
  element.classList.toggle(HIDE_BLOCK_CLASS, !visibility);
}

export function generateId() {
  return Math.random().toString(16).slice(8);
}

export function getRandomElementFromArray(items) {
  const randomIndex = Math.floor(Math.random() * items.length);
  const randomItem = items[randomIndex];

  return randomItem;
}
