import { initialCards } from "./initialCards.js";
import { Card } from "./card.js";
import { FormValidator } from "./validation.js";

const popupOpenZoomImage = document.querySelector(".popup_type_open-image");

const popupEditProfile = document.querySelector(".popup_type_edit-profile");

const profileEditorOpenButton = document.querySelector(".profile__edit-button");
const container = document.querySelector(".elements");
const linkInput = document.querySelector(".popup__input_type_link");
const titleInput = document.querySelector(".popup__input_type_title");
const popupSaveAddCard = document.querySelector(".popup_type_add-element");
const formElement = popupEditProfile.querySelector(".popup__content");
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_profession");
const nameTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const popupAddCardSaveBtn = document.querySelector(".popup__save_add-element");
const cardTemplate = document.querySelector("#element-template").content;
// const popupOpenImg = document.querySelector(".popup_type_open-image");
const popupOpenName = document.querySelector(".popup__name");
const popupOpenImage = document.querySelector(".popup__image");
const popupAddCard = document.querySelector(".popup_type_add-element");
const popupOpenButtonAddCard = document.querySelector(".profile__add-button");

const popupCloseButton = document.querySelectorAll(".popup__close");
const openPopupBtn = document.querySelectorAll("#open-popup");

/*откыртие картинки*/

export function openImagePopup(evt) {
  popupOpenImage.src = evt.target.src;
  popupOpenImage.alt = evt.target.alt;
  popupOpenName.textContent = evt.target.alt;
  openPopup(popupOpenZoomImage);
}

/*очистка ошибки*/

const removeInputError = () => {
  const activeErrorElement = document.querySelectorAll(".popup__input-error");
  activeErrorElement.forEach((activeErrorElement) => {
    activeErrorElement.classList.remove(".popup__input-error");
    activeErrorElement.textContent = "";
  });
};

/*диактивация кнопки при открытии попап*/

const disabledButton = () => {
  const saveButton = document.querySelectorAll(".popup__save");
  saveButton.forEach((saveButton) => {
    saveButton.setAttribute("disabled", true);
    saveButton.classList.add("popup__save_not-active");
  });
};

/*открытие Popup*/

const openPopup = function (popupName) {
  popupName.classList.add("popup_is-opened");
  closePopupByEsc();
};

profileEditorOpenButton.addEventListener("click", () => {
  openPopup(popupEditProfile);
  nameInput.value = nameTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  removeInputError();
  disabledButton();
});

popupOpenButtonAddCard.addEventListener("click", () => {
  openPopup(popupAddCard);
  removeInputError();
  disabledButton();
});

/*закрытие Popup*/

const closePopup = function (popupName) {
  popupName.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", close);
};

const popups = document.querySelectorAll(".popup");

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
formElement.addEventListener("submit", saveEnterValues);

/*добалвение карточек JS*/

const addNewCard = function (evt) {
  evt.preventDefault();
  const setCard = { name: titleInput.value, link: linkInput.value };
  const carding = new Card(setCard);
  container.prepend(carding.generateCard(carding));
  evt.target.reset();
  closePopup(popupAddCard);
};
popupAddCard.addEventListener("submit", addNewCard);

const renderItem = function () {
  initialCards.forEach((elem) => {
    const card = new Card(elem);
    const cardElement = card.generateCard();
    document.querySelector(".elements").prepend(cardElement);
  });
};
renderItem();

/*закрытие попап по esc*/

function closePopupByEsc() {
  const close = function (evt) {
    if (evt.key !== "Escape") {
      return;
    }
    const openedPopup = document.querySelector(".popup_is-opened");
    if (!openedPopup) {
      return;
    }
    closePopup(openedPopup);
  };
  document.addEventListener("keydown", close);
}

/*валидация форм*/

const selectors = {
  formSelector: ".popup__content",
  sectionSelector: ".popup__section",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_not-active",
  inputErrorClass: ".popup__input-error",
  errorClass: "popup__input-error_active",
};

const validation = new FormValidator();
validation.enableValidation(selectors);
