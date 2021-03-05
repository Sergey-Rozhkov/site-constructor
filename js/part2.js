const elements = document.querySelectorAll(`div.element`);

elements.forEach(addClickHandlers);

function addClickHandlers(element) {
  const buttonDelete = element.querySelector(`button.delete-btn`);

  buttonDelete.addEventListener(`click`, buttonDeleteClickHandler);
}

function buttonDeleteClickHandler(evt) {
  const buttonElement = evt.target;
  const blockElement = buttonElement.parentElement;
  const wrapperElement = blockElement.parentElement;
  const containerElement = wrapperElement.parentElement;

  blockElement.remove();

  if (wrapperElement.childElementCount === 0) {
    containerElement.classList.add(`empty`);
  }
}
