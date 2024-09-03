import "./pages/index.css";
import { openPopup, closePopup } from "./components/modal.js";
import { createCard, handleLike, deleteButton } from "./components/card.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import { getUserData, getCards, postNewCardServer, updateNewData, addnewAvatar } from "./components/api.js";

// @todo: DOM узлы
const cardList = document.querySelector(".places__list");
const popupImage = document.querySelector(".popup_type_image");
const popupImageContent = popupImage.querySelector(".popup__image");
const popupImageCaption = popupImage.querySelector(".popup__caption");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupEditAvatar = document.querySelector(".popup-avatar");
const formEditAvatar = popupEditAvatar.querySelector(".popup__form");
const inputAvatarLink = formEditAvatar.querySelector(".popup_avatar-url");
const formNewCard = popupNewCard.querySelector(".popup__form");
const inputCardName = formNewCard.querySelector(".popup__input_type_card-name");
const inputCardLink = formNewCard.querySelector(".popup__input_type_url");
const formEditProfile = document.querySelector(".popup_type_edit .popup__form");
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(".popup__input_type_description");
const profileNameElement = document.querySelector(".profile__title");
const profileJobElement = document.querySelector(".profile__description");
const profileAvatarElement = document.querySelector(".profile__image");

// Конфигурация валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(validationConfig);

// Функция открытия попапа с изображением
function openImage(link, name) {
  popupImageContent.src = link;
  popupImageContent.alt = name;
  popupImageCaption.textContent = name;
  openPopup(popupImage);
}

// Функция заполнения полей формы редактирования профиля
function fillProfilePopup() {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
}

// Функция изменения текста кнопки
function setButtonText(button, isLoading) {
  button.textContent = isLoading ? 'Сохранение...' : 'Сохранить';
}

Promise.all([getUserData(), getCards()])
  .then(([userData, cards]) => {
    // Обновление данных профиля
    profileNameElement.textContent = userData.name;
    profileJobElement.textContent = userData.about;
    profileAvatarElement.style.backgroundImage = `url('${userData.avatar}')`;

    // Вывод начальных карточек
    cards.forEach((cardData) => {
      const cardElement = createCard(cardData, deleteButton, handleLike, openImage, userData._id);
      cardList.append(cardElement);
    });
})
  .catch((error) => {
    console.error('Ошибка при загрузке данных:', error);
  });

// Обработчики для кнопок открытия и закрытия попапов
window.onload = () => {
  const editButton = document.querySelector(".profile__edit-button");
  const addButton = document.querySelector(".profile__add-button");
  const closeButtons = document.querySelectorAll(".popup__close");

  editButton.addEventListener("click", () => {
    fillProfilePopup();
    clearValidation(formEditProfile, validationConfig);
    openPopup(document.querySelector(".popup_type_edit"));
  });

  addButton.addEventListener("click", () => {
    clearValidation(formNewCard, validationConfig);
    openPopup(popupNewCard);
  });

  profileAvatarElement.addEventListener("click", () => {
    openPopup(popupEditAvatar);
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", () => closePopup(button.closest(".popup")));
  });
};

// Обработчик события submit для формы добавления новой карточки
formNewCard.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  setButtonText(submitButton, true);

  const name = inputCardName.value;
  const link = inputCardLink.value;

  postNewCardServer(name, link).then((newCardData) => {
      const newCardElement = createCard(newCardData, deleteButton, handleLike, openImage);
      cardList.prepend(newCardElement);
      formNewCard.reset();
      clearValidation(formNewCard, validationConfig); 
      closePopup(popupNewCard);
  }).catch((error) => {
      console.error('Ошибка при добавлении новой карточки:', error);
  })
  .finally(() => {
    setButtonText(submitButton, false); 
  });
});

// Обработчик события submit для формы редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;

  setButtonText(submitButton, true); 
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  updateNewData(nameValue, jobValue)
    .then((userData) => {
      profileNameElement.textContent = userData.name;
      profileJobElement.textContent = userData.about;
      closePopup(formEditProfile.closest(".popup"));
    })
    .catch((error) => {
      console.error('Ошибка при обновлении данных пользователя:', error);
    })
    .finally(() => {
      setButtonText(submitButton, false); 
    });
}

formEditProfile.addEventListener("submit", handleProfileFormSubmit);

// Обработчик события submit для формы редактирования аватара
formEditAvatar.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  setButtonText(submitButton, true);

  const link = inputAvatarLink.value;

  addnewAvatar(link).then((newUserData) => {
    profileAvatarElement.style.backgroundImage = `url('${newUserData.avatar}')`;
    formEditAvatar.reset();
    clearValidation(formEditAvatar, validationConfig);
    closePopup(popupEditAvatar);
  }).catch((error) => {
    console.error('Ошибка при изменении аватара:', error);
  })
  .finally(() => {
    setButtonText(submitButton, false);
  });
});




