import {generateId} from "./utils.js";
import {renderBlock} from "./part1.js";

addCreateHandlers();

export function addCreateHandlers() {
  const gridContainer = document.querySelector(`.grid`);
  const addBtnElements = gridContainer.querySelectorAll(`.add-btn`);
  const addElementBtnElements = gridContainer.querySelectorAll(`.choose-elem__btn`);

  addBtnElements.forEach(addClickShowCreateHandler);

  addElementBtnElements.forEach(addClickCreateHandler);
}

function addClickShowCreateHandler(element) {
  element.addEventListener(`click`, clickShowCreateHandler);
}

function clickShowCreateHandler(evt) {
  const target = evt.currentTarget.dataset.target;
  const chooseBlock = document.querySelector(target);

  chooseBlock.classList.remove(`hidden`);
}

function addClickCreateHandler(element) {
  element.addEventListener(`click`, clickCreateHandler);
}

function clickCreateHandler(evt) {
  const type = evt.currentTarget.dataset.type;
  let content;
  const container = evt.currentTarget.dataset.container;

  if (type === `img`) {
    content = `/img/default.jpg`;
  } else {
    content = evt.currentTarget.textContent;
  }

  const item = {
    id: generateId(),
    type,
    content,
    container,
  };

  evt.currentTarget.parentNode.classList.add(`hidden`);
  renderBlock(item);
}
