const elements = document.querySelectorAll(`div.element`);

elements.forEach(addClickHandlers);

function addClickHandlers(element) {
  const contentElement = element.querySelector(`.content-element`);

  contentElement.addEventListener(`click`, contentClickHandler);
}

function contentClickHandler(evt) {
  const contentElement = evt.target;
  let content;

  if (contentElement.tagName === 'IMG') {
    content = contentElement.src;
  } else {
    content = contentElement.innerText;
  }

  const newContent = prompt(
    `Введите текст для блока ${contentElement.tagName}`,
    content,
  );

  if (newContent) {
    if (contentElement.tagName === 'IMG') {
      contentElement.src = newContent;
    } else {
      contentElement.innerText = newContent;
    }
  }
}

