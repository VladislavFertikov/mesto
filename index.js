const popupElement = document.querySelector(".popup");
const popupCloseButtonElement = popupElement.querySelector(".popup__close");
const popupOpenButtonElement = document.querySelector(".profile__edit-button");

const openPopup = function () {
  popupElement.classList.add("popup_is-opened");
};

const closePopup = function () {
  popupElement.classList.remove("popup_is-opened");
};

popupOpenButtonElement.addEventListener("click", openPopup);
popupCloseButtonElement.addEventListener("click", closePopup);

let formElement = popupElement.querySelector(".popup__content");
let nameInput = formElement.querySelector(".popup__input_name");
let jobInput = formElement.querySelector(".popup__input_profession");
let nameTitle = document.querySelector(".profile__title");
let profileSubtitle = document.querySelector(".profile__subtitle");
let popupSaveButton = popupElement.querySelector(".popup__save");

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
}
formElement.addEventListener("submit", formSubmitHandler);
popupSaveButton.addEventListener("click", formSubmitHandler);
popupSaveButton.addEventListener("click", closePopup);
