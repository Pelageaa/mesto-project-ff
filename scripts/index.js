// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(cardData, removeCard) {
  const { link, name } = cardData;
  const card = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  cardImage.src = link; // Устанавливаем ссылку на изображение
  cardImage.alt = name; // Устанавливаем текст для атрибута alt
  card.querySelector(".card__title").textContent = name;
  const deleteButton = card.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => removeCard(card));
  return card; 
}

// @todo: Функция удаления карточки
function deleteButton(cardElement) {
  cardElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, deleteButton);
  cardList.append(cardElement);
});
