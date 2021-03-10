const elements = document.querySelectorAll(`div.element`);

// elements.forEach(addClickEditHandlers); // FixMe - удаляем после реализации ч4

export function addClickEditHandlers(element) {
  const contentElement = element.querySelector(`.content-element`);

  contentElement.addEventListener(`click`, editElementHandler);
}

function editElementHandler(evt) {
  const contentElement = evt.target;
  let content;

  if (contentElement.tagName === `IMG`) {
    content = contentElement.src;
  } else {
    content = contentElement.innerText;
  }

  // eslint-disable-next-line no-alert
  const newContent = prompt(`Введите текст для блока ${contentElement.tagName}`, content);

  if (newContent) {
    if (contentElement.tagName === `IMG`) {
      contentElement.src = newContent;
    } else {
      contentElement.innerText = newContent;
    }
  }
}

