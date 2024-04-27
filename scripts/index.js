// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const cardList = document.querySelector(".places__list");
// @todo: Функция создания карточки
function createCard(cardData, removeCard) {
  const card = cardTemplate.querySelector(".places__item").cloneNode(true);
  card.querySelector(".card__image").src = cardData.link;
  card.querySelector(".card__title").textContent = cardData.name;
  const deleteCard = card.querySelector(".card__delete-button");
  deleteCard.addEventListener("click", () => removeCard(card));
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
