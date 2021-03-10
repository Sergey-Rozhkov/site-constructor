const elements = document.querySelectorAll(`div.element`);

// elements.forEach(addClickDeleteHandlers); // FixMe - удаляем после реализации ч4

export function addClickDeleteHandlers(element) {
  const buttonDelete = element.querySelector(`button.delete-btn`);

  buttonDelete.addEventListener(`click`, deleteElementHandler);
}

function deleteElementHandler(evt) {
  const buttonElement = evt.target;
  const blockElement = buttonElement.parentElement;
  const wrapperElement = blockElement.parentElement;
  const containerElement = wrapperElement.parentElement;

  blockElement.remove();

  if (wrapperElement.childElementCount === 0) {
    containerElement.classList.add(`empty`);
  }
}
