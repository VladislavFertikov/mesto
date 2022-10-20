const popupElement = document.querySelector(".popup");
const popupCloseButtonElement = popupElement.querySelector(".popup__close");
const popupOpenButtonElement = document.querySelector(".profile__edit-button");

const openPopup = function () {
  popupElement.classList.add("popup_is-opened");
};
popupOpenButtonElement.addEventListener("click", openPopup);

const closePopup = function () {
  popupElement.classList.remove("popup_is-opened");
  nameInput.value = nameTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
};
popupCloseButtonElement.addEventListener("click", closePopup);

let formElement = popupElement.querySelector(".popup__content");
let nameInput = formElement.querySelector(".popup__input_type_name");
let jobInput = formElement.querySelector(".popup__input_type_profession");
let nameTitle = document.querySelector(".profile__title");
let profileSubtitle = document.querySelector(".profile__subtitle");
let popupSaveButton = popupElement.querySelector(".popup__save");

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup();
}

formElement.addEventListener("submit", formSubmitHandler);
