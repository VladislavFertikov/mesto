import { initialCards } from "./initialCards.js";
import { Card } from "./Сard.js";
import { FormValidator } from "./validation.js";
import { validationConfig } from "./constants.js";

const popupOpenZoomImage = document.querySelector(".popup_type_open-image");

const popupEditProfile = document.querySelector(".popup_type_edit-profile");

const profileEditorOpenButton = document.querySelector(".profile__edit-button");
const container = document.querySelector(".elements");
const linkInput = document.querySelector(".popup__input_type_link");
const titleInput = document.querySelector(".popup__input_type_title");
const popupContent = popupEditProfile.querySelector(".popup__content");
const nameInput = popupContent.querySelector(".popup__input_type_name");
const jobInput = popupContent.querySelector(".popup__input_type_profession");
const nameTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const popupOpenName = document.querySelector(".popup__name");
const popupOpenImage = document.querySelector(".popup__image");
const popupAddCard = document.querySelector(".popup_type_add-element");
const popupOpenButtonAddCard = document.querySelector(".profile__add-button");
const popups = document.querySelectorAll(".popup");

const popupCards = document.querySelector("#cards-popup");
const formCard = popupCards.querySelector(".popup__content");

const popupProfile = document.querySelector("#profile-popup");
const formProfile = popupProfile.querySelector(".popup__content");

/*откыртие картинки*/

function openImagePopup(evt) {
  popupOpenImage.src = evt.target.src;
  popupOpenImage.alt = evt.target.alt;
  popupOpenName.textContent = evt.target.alt;
  openPopup(popupOpenZoomImage);
}

/*открытие Popup*/

const openPopup = function (popupName) {
  popupName.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleCloseByEsc);
};

profileEditorOpenButton.addEventListener("click", () => {
  openPopup(popupEditProfile);
  nameInput.value = nameTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  profileEditeValidate.resetValidate();
  profileEditeValidate.disableSubmitButton();
});

popupOpenButtonAddCard.addEventListener("click", () => {
  openPopup(popupAddCard);
  cardItemValidate.disableSubmitButton();
});

/*закрытие Popup*/

const closePopup = function (popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleCloseByEsc);
};

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_is-opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
});
/*сохранение данных профиля*/

function saveEnterValues(evt) {
  evt.preventDefault();
  nameTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupEditProfile);
}
popupContent.addEventListener("submit", saveEnterValues);

/*добалвение карточек JS*/

const crateCards = function () {
  const elem = { name: titleInput.value, link: linkInput.value };
  const carding = new Card(elem, ".element-template", openImagePopup);
  container.prepend(carding.generateCard(carding));
};

const addNewCard = function (evt) {
  evt.preventDefault();
  crateCards();
  evt.target.reset();
  closePopup(popupAddCard);
};
popupAddCard.addEventListener("submit", addNewCard);

const renderCards = function () {
  initialCards.forEach((elem) => {
    const card = new Card(elem, ".element-template", openImagePopup);
    const cardElement = card.generateCard();
    document.querySelector(".elements").prepend(cardElement);
  });
};
renderCards();

/*закрытие попап по esc*/

const handleCloseByEsc = (evt) => {
  if (evt.key === "Escape")
    closePopup(document.querySelector(".popup_is-opened"));
};

/*валидация форм*/

const cardItemValidate = new FormValidator(validationConfig, formCard);
cardItemValidate.enableValidation();

const profileEditeValidate = new FormValidator(validationConfig, formProfile);
profileEditeValidate.enableValidation();
