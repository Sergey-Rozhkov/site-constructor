import {addCreateHandlers} from "./part4.js";

const formElement = document.querySelector(`form.grid-select`);
const templateContainer = document.querySelector(`.template__elements-wrapper`);
const gridContainer = document.querySelector(`.grid`);

formElement.addEventListener(`change`, changeGridHandler);

function changeGridHandler(evt) {
  const gridType = evt.target.value;
  const grid = templateContainer.querySelector(`.layout--${gridType}`).cloneNode(true);

  gridContainer.firstElementChild.remove();
  gridContainer.append(grid);

  addCreateHandlers();
}
