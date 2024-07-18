import "./pages/index.css";
import initialCards from "./components/cards";
import { openPopup, closePopup } from "./components/modal";
import { createCard, handleLike, deleteButton } from "./components/card";

// @todo: DOM узлы
const cardList = document.querySelector(".places__list");
const popupImage = document.querySelector(".popup_type_image");
const popupImageContent = popupImage.querySelector(".popup__image");
const popupImageCaption = popupImage.querySelector(".popup__caption");
const popupNewCard = document.querySelector(".popup_type_new-card");
const formNewCard = popupNewCard.querySelector(".popup__form");
const inputCardName = formNewCard.querySelector(".popup__input_type_name");
const inputCardLink = formNewCard.querySelector(".popup__input_type_link");

// @todo: Функция открытия попапа с изображением
function openImage(link, name) {
  popupImageContent.src = link;
  popupImageContent.alt = name;
  popupImageCaption.textContent = name;
  openPopup(popupImage);
}

// Функция заполнения полей формы редактирования профиля
function fillProfilePopup() {
  const profileName = document.querySelector(".profile__title").textContent;
  const profileJob = document.querySelector(
    ".profile__description"
  ).textContent;

  nameInput.value = profileName;
  jobInput.value = profileJob;
}

// Обработчики для кнопок открытия и закрытия попапов
window.onload = () => {
  const editButton = document.querySelector(".profile__edit-button");
  const addButton = document.querySelector(".profile__add-button");
  const closeButtons = document.querySelectorAll(".popup__close");

  editButton.addEventListener("click", () => {
    fillProfilePopup();
    openPopup(document.querySelector(".popup_type_edit"));
  });
  addButton.addEventListener("click", () => openPopup(popupNewCard));

  closeButtons.forEach((button) => {
    button.addEventListener("click", () =>
      closePopup(button.closest(".popup"))
    );
  });
};

// @todo: Вывести карточки на страницу
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, deleteButton, handleLike, openImage);
  cardList.append(cardElement);
});

// @todo: Обработчик события submit для формы добавления новой карточки
formNewCard.addEventListener("submit", function (evt) {
  evt.preventDefault(); // Отменяем стандартную отправку формы

  // Получаем значения полей формы
  const name = inputCardName.value;
  const link = inputCardLink.value;

  // Создаем объект данных для новой карточки
  const newCardData = { link, name };

  const newCardElement = createCard(
    newCardData,
    deleteButton,
    handleLike,
    openImage
  );

  cardList.prepend(newCardElement);

  formNewCard.reset();

  closePopup(popupNewCard);
});

// Находим форму редактирования профиля
const formEditProfile = document.querySelector(".popup_type_edit .popup__form");
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(
  ".popup__input_type_description"
);

// Обработчик «отправки» формы редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  const profileName = document.querySelector(".profile__title");
  const profileJob = document.querySelector(".profile__description");

  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;

  closePopup(formEditProfile.closest(".popup"));
}

formEditProfile.addEventListener("submit", handleProfileFormSubmit);
