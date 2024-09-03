import { addLikeCard, deleteLike} from "./api";
export function createCard(
  cardData,
  deleteButtonHandler,
  handleLikeHandler,
  openImageHandler,
  userId,
) {
  const { link, name, likes, owner, _id } = cardData;
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.cloneNode(true).querySelector(".places__item");
  const cardImage = card.querySelector(".card__image");
  const likesCountContainer = card.querySelector(".card__number");
  likesCountContainer.textContent = likes.length;
  const likeButton = card.querySelector(".card__like-button");

  cardImage.src = link;
  cardImage.alt = name;
  card.querySelector(".card__title").textContent = name;
  const deleteButton = card.querySelector(".card__delete-button");

  const isOwner = owner._id === userId;
  if (isOwner) {
    deleteButton.addEventListener("click", () => deleteButtonHandler(card));
  } else {
    card.removeChild(deleteButton);
  }

  likeButton.addEventListener("click", () => handleLikeHandler(likeButton, _id, likesCountContainer));
  cardImage.addEventListener("click", () => openImageHandler(link, name));

  // Проверка, был ли лайк поставлен текущим пользователем
  if (likes.some((like) => like._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  return card;
}
export function handleLike(likeButton, cardId, likesCountContainer) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  
  if (isLiked) {
    deleteLike(cardId)
      .then((updatedCard) => {
        likeButton.classList.remove("card__like-button_is-active");
        likesCountContainer.textContent = updatedCard.likes.length;
      })
      .catch((error) => {
        console.error('Ошибка при удалении лайка:', error);
      });
  } else {
    addLikeCard(cardId)
      .then((updatedCard) => {
        likeButton.classList.add("card__like-button_is-active");
        likesCountContainer.textContent = updatedCard.likes.length;
      })
      .catch((error) => {
        console.error('Ошибка при добавлении лайка:', error);
      });
  }
}

export function deleteButton(cardElement) {
  cardElement.remove();
}
