export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", escClose);
  popup.addEventListener("mousedown", overlayClose);
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", escClose);
  popup.removeEventListener("mousedown", overlayClose);
}

function escClose(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

function overlayClose(event) {
  if (event.target.classList.contains("popup_is-opened")) {
    closePopup(event.currentTarget);
  }
}
