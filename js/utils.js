const BLOCK_TYPES = ['h1', 'h2', 'h3', 'p', 'img'];
const CONTAINER_TYPES = ['header', 'content', 'footer'];
const MOCK_TITLES = [
  'Я - длинный текст, который займет много места и обязательно растянет блок по вертикали',
  'Я - короткий текст',
  'Тут может быть заголовок разных уровней или обычный текст',
  'Кстати, еще можно и картинку вставить',
  'Обнови страницу и посмотри, что будет',
  'Генератор подставляет строки случайным образом',
  'Попробуйте поэкспериментировать',
  'Поменяйте раскладку страницы',
  'Содержимое блоков сохраняется даже при смене раскладки',
  'Хочешь научиться делать такой генератор сам?',
];
const MOCK_IMAGES = [
  'img/lion.png',
  'img/cat.png',
  'img/fox.png',
  'img/owl.png',
  'img/dog.png',
];

const getRandomNumber = function (max) {
  return Math.floor(Math.random() * max);
};

const getRandomElementFromArray = function (list) {
  return list[getRandomNumber(list.length)];
};

const generateData = function (count = 10) {
  const result = [];

  for (let i = 0; i < count; i++) {
    const id = getRandomNumber(1000000);
    const type = getRandomElementFromArray(BLOCK_TYPES);

    let source = [];

    if (type === 'img') {
      source = MOCK_IMAGES;
    } else {
      source = MOCK_TITLES;
    }

    const content = getRandomElementFromArray(source);
    const container = getRandomElementFromArray(CONTAINER_TYPES);

    const item = {
      id,
      type,
      content,
      container,
    };

    result.push(item);
  }

  return result;
};
