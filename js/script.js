/* global generateData getRandomNumber */

const currentData = []; // можем подключить utils.js и вызвать generateData() для получения тестовых данных
const currentLayout = 'landing';

// Пример структуры данных
// const generatedExample = {
//   id: '1', // уникальный id
//   type: 'h1', // типы блоков описаны в BLOCK_TYPES
//   content: 'Это пример блока H1', // содержимое блока
//   container: 'header', // контейнеры описаны в CONTAINER_TYPES
// };

/**
 * Инициализация приложения
 */
const init = function () {
  switchLayout(currentLayout);
  currentData.forEach(renderElement);

  const inputElement = document.querySelector('#grid-' + currentLayout);
  inputElement.setAttribute('checked', 'checked');

  const addButtonElements = document.querySelectorAll('.add-btn');
  addButtonElements.forEach(function (item) {
    return item.addEventListener('click', showAddMenuHandler);
  });

  const chooseButtonElements = document.querySelectorAll('.choose-elem__btn');
  chooseButtonElements.forEach(function (item) {
    return item.addEventListener('click', addElementHandler);
  });

  document.querySelector('.grid-select').addEventListener('change', changeLayoutHandler);
};

/**
 * Создание DOM элемента и вставка в документ на основе данных block
 * @param {object} block
 */
const renderElement = function (block) {
  // 1. Выбрать и заполнить шаблон
  const templateElement = document.querySelector('.' + block.type + '-template').content.cloneNode(true);
  const contentElement = templateElement.querySelector('.template-content');

  if (block.type === 'img') {
    contentElement.src = block.content;
  } else {
    contentElement.textContent = block.content;
  }

  const blockElement = templateElement.firstElementChild;
  blockElement.dataset.id = block.id; // currentData-id

  // 2. Вставить элемент в контейнер
  const containerWrapperElement = document.querySelector('.' + block.container + '__elements-wrapper');
  containerWrapperElement.append(blockElement);

  // 3. Добавить обработчики
  blockElement.querySelector('.delete-btn').addEventListener('click', buttonDeleteHandler);
  blockElement.querySelector('.template-content').addEventListener('dblclick', editContentHandler, true);

  // 4. Удаление признака пустого контейнера
  if (block.container.includes('content')) {
    containerWrapperElement.parentElement.classList.remove('content--empty');
  } else {
    containerWrapperElement.parentElement.classList.remove(block.container + '--empty');
  }
};

/**
 * Обработчик удаления элемента
 * @param {MouseEvent} evt
 */
const buttonDeleteHandler = function (evt) {
  const element = evt.target.parentNode;
  const id = +element.dataset.id;
  const blockIndex = currentData.findIndex(function (item) {
    return item.id === id;
  });
  const block = currentData[blockIndex];

  const wrapper = element.parentNode;
  element.remove();

  if (wrapper.childNodes.length === 0) {
    if (block.container.includes('content')) {
      wrapper.parentNode.classList.add('content--empty');
    } else {
      wrapper.parentNode.classList.add(block.container + '--empty');
    }
  }

  currentData.splice(blockIndex, 1);
};

/**
 * Обработчик изменения контента
 * @param {MouseEvent} evt
 */
const editContentHandler = function (evt) {
  const editedElement = evt.target;
  const id = +editedElement.parentNode.dataset.id;
  const blockIndex = currentData.findIndex(function (item) {
    return item.id === id;
  });
  const block = currentData[blockIndex];

  let currentValue;

  if (editedElement.tagName === 'IMG') {
    currentValue = editedElement.src;
  } else {
    currentValue = editedElement.textContent;
  }

  const newValue = window.prompt('Вы хотите поменять значение ?', currentValue);

  if (newValue) {
    if (editedElement.tagName === 'IMG') {
      editedElement.src = newValue;
    } else {
      editedElement.textContent = newValue;
    }

    block.content = newValue;
  }
};

/**
 * Обработчик клика на "+" для добавления блока
 * @param {MouseEvent} evt
 */
const showAddMenuHandler = function (evt) {
  const parentElement = evt.currentTarget.parentNode;
  const addMenuElement = parentElement.querySelector('.choose-elem');

  addMenuElement.classList.toggle('hidden');
};

const DEFAULT_IMG = 'img/empty.png';

/**
 * Обработчик добавление блока
 * @param {MouseEvent} evt
 */
const addElementHandler = function (evt) {
  const clickedBtn = evt.target;
  const addMenuElement = clickedBtn.parentNode;

  const block = {
    id: getRandomNumber(1000000),
    type: clickedBtn.dataset.type,
    content: clickedBtn.dataset.type === 'img' ? DEFAULT_IMG : clickedBtn.dataset.type,
    container: clickedBtn.dataset.container,
  };

  renderElement(block);

  addMenuElement.classList.add('hidden');

  currentData.push(block);
};

/**
 * Обработчик изменения сетки сайта
 * @param {MouseEvent} evt
 */
const changeLayoutHandler = function (evt) {
  const newLayout = evt.target.value;

  switchLayout(newLayout);
};

/**
 * Метод переключения сетки сайта
 * @param {string} layoutType
 */
const switchLayout = function (layoutType) {
  const layoutElement = document.querySelector('.layout');
  layoutElement.classList.remove('layout--landing');
  layoutElement.classList.remove('layout--blog');
  layoutElement.classList.remove('layout--shop');
  layoutElement.classList.add('layout--' + layoutType);
};

init();
