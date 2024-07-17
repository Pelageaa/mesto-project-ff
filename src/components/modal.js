export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', EscClose);
  popup.addEventListener('mousedown', OverlayClose);
}

export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', EscClose);
  popup.removeEventListener('mousedown', OverlayClose);
}

function EscClose(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

function OverlayClose(event) {
  if (event.target.classList.contains('popup_is-opened')) {
    closePopup(event.currentTarget);
  }
}

  