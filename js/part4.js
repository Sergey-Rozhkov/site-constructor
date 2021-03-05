const addBtnElements = document.querySelectorAll(`.add-btn`);

function addBtnClickHandler(evt) {
  const target = evt.currentTarget.dataset.target;
  const chooseBlock = document.querySelector(target);

  chooseBlock.classList.remove(`hidden`);
}

addBtnElements.forEach(function (element) {
  element.addEventListener(`click`, addBtnClickHandler);
});
