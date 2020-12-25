import {App} from './app.js';

const app = new App();
const containerElement = document.querySelector(`.container`);

app.init(containerElement);
