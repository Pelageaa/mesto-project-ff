const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-18",
  headers: {
    authorization: "f870deea-671b-4432-85cb-15cd40d40eb2",
    "Content-Type": "application/json",
  },
};

// Функция проверки ответа сервера
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

// Получение данных о пользователе
export const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(checkResponse);
};

// Получение списка карточек
export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(checkResponse);
};

// Отправка новой карточки на сервер
export const postNewCardServer = (newCardName, newCardLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: newCardName,
      link: newCardLink,
    }),
  }).then(checkResponse);
};

// Обновление данных профиля
export const updateNewData = (newProfile, aboutProfile) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: newProfile,
      about: aboutProfile,
    }),
  }).then(checkResponse);
};

// Удаление карточки
export const deleteCard = (deleteCards) => {
  return fetch(`${config.baseUrl}/cards/${deleteCards}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
};

// Добавление лайка карточке
export const addLikeCard = (likeCard) => {
  return fetch(`${config.baseUrl}/cards/likes/${likeCard}`, {
    method: "PUT",
    headers: config.headers,
  }).then(checkResponse);
};

// Удаление лайка
export const deleteLike = (deleteLike) => {
  return fetch(`${config.baseUrl}/cards/likes/${deleteLike}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
};

// Изменение аватара пользователя
export const addnewAvatar = (newPhoto) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: newPhoto,
    }),
  }).then(checkResponse);
};
