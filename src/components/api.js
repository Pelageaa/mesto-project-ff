// Токен: f870deea-671b-4432-85cb-15cd40d40eb2
//Идентификатор группы: wff-cohort-18

const config = {
    baseUrl: "https://nomoreparties.co/v1/wff-cohort-18",
    headers: {
      authorization: "f870deea-671b-4432-85cb-15cd40d40eb2",
      "Content-Type": "application/json",
    },
  };
  
  // Проверка ответа
  export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
  
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  } 

// получение данных о пользователе
export const getUserData = async () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(res => res.json());
};

// Список карточек
export const getCards = () => {
 return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(res => res.json());
};


// отправляем новую карточку на сервер
export const postNewCardServer = (newCardName, newCardLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: newCardName,
      link: newCardLink,
    })
  }).then(res => res.json());
};

// обновление данных профиля
export const newData = (newProfile, aboutProfile) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: newProfile,
      about: aboutProfile,
    })
  }).then(res => res.json());
};

// запрос на удаление карточки
export const deleteCard = (deleteCards) => {
  return fetch(`${config.baseUrl}/cards/${deleteCards}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(res => res.json());
};

// Добавление лайка
export const addLikeCard = (likeCard) => {
  return fetch(`${config.baseUrl}/cards/likes/${likeCard}`, {
    method: "PUT",
    headers: config.headers,
  }).then(res => res.json());
};

// Удаление лайка
export const deleteLike = (deleteLike) => {
  return fetch(`${config.baseUrl}/cards/likes/${deleteLike}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(res => res.json());
};

// запрос на изменение аватара
export const newAvatar = (newPhoto) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: newPhoto,
    })
  }).then(res => res.json());
};