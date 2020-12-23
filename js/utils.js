export const HIDE_BLOCK_CLASS = `hidden-block`;
export const DEFAULT_COLUMN_INDEX = 1;
export const KEYCODE_ENTER = 13;

export const RenderPosition = {
  BEFOREBEGIN: `beforebegin`,
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`,
};

export const ColumnIndex = {
  LEFT: 1,
  CENTER: 2,
  RIGHT: 3,
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

export const renderElement = (container, child, position = RenderPosition.BEFOREEND) => {
  // if (container instanceof AbstractView) {
  //   container = container.getElement();
  // }
  //
  // if (child instanceof AbstractView) {
  //   child = child.getElement();
  // }

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
};

export function setElementVisibility(element, visibility) {
  element.classList.toggle(HIDE_BLOCK_CLASS, !visibility);
}

export function generateId() {
  return Math.random().toString(16).slice(8);
}
