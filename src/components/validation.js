// Функция показывает ошибку
function showError(inputElement, errorMessage, config) {
  const errorElement = inputElement.closest("form").querySelector(`#${inputElement.name}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

// Функция скрывает ошибку
function hideError(inputElement, config) {
  const errorElement = inputElement.closest("form").querySelector(`#${inputElement.name}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
}

// Функция проверяет валидность поля ввода
function checkInputValidity(inputElement, config) {
  if (!inputElement.validity.valid) {
    const errorMessage = inputElement.dataset.errorCustom || inputElement.validationMessage;
    showError(inputElement, errorMessage, config);
  } else {
    hideError(inputElement, config);
  }
}

// Функция проверяет валидность всех полей формы
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// Функция переключает состояние кнопки отправки формы
function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

// Функция устанавливает слушатели событий на поля ввода
function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
}

// Функция включает валидацию для всех форм на странице
export function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
}

// Функция очищает ошибки валидации и делает кнопку неактивной
export function clearValidation(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideError(inputElement, config);
  });

  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.disabled = true;
}
