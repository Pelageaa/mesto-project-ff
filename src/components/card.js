export function createCard(
  cardData,
  deleteButtonHandler,
  handleLikeHandler,
  openImageHandler,
  userId
) {
  const { link, name, likes, owner } = cardData;
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
  const isOwner = owner._id ===userId
  if (isOwner) {
    deleteButton.addEventListener("click", () => deleteButtonHandler(card));
  }
else {
  card.removeChild(deleteButton);
}
  likeButton.addEventListener("click", () => handleLikeHandler(likeButton));
  cardImage.addEventListener("click", () => openImageHandler(link, name));

  return card;
}

export function handleLike(likedItem) {
  likedItem.classList.toggle("card__like-button_is-active");
}

export function deleteButton(cardElement) {
  cardElement.remove();
}
