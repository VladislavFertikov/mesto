const popupOpenZoomImage = document.querySelector(".popup_type_open-image");
const popupZoomImageCloseBtn = document.querySelector(
  ".popup__close_type_close-image"
);
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupEditProfileCloseBtn = document.querySelector(
  ".popup__close_type_edit-profile"
);
const popupAddCardCloseBtn = document.querySelector(
  ".popup__close_type_add-element"
);
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
const popupOpenImg = document.querySelector(".popup_type_open-image");
const popupOpenName = document.querySelector(".popup__name");
const popupOpenImage = document.querySelector(".popup__image");
const popupAddCard = document.querySelector(".popup_type_add-element");
const popupOpenButtonAddCard = document.querySelector(".profile__add-button");

const popupCloseButton = document.querySelectorAll(".popup__close");
const OpenPopupBtn = document.querySelectorAll("#open-popup");

/*очистка ошибки*/

const removeInputError = () => {
  const ActiveErrorElement = document.querySelectorAll(".popup__input-error");
  ActiveErrorElement.forEach((ActiveErrorElement) => {
    ActiveErrorElement.classList.remove(".popup__input-error");
    ActiveErrorElement.textContent = "";
  });
};

/*диактивация кнопки при открытии попап*/

const disabledButton = () => {
  const SaveButton = document.querySelectorAll(".popup__save");
  SaveButton.forEach((SaveButton) => {
    SaveButton.setAttribute("disabled", true);
    SaveButton.classList.add("popup__save_not-active");
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

const popup = document.querySelector(".popup");

const closePopup = function (popupName) {
  popupName.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", close);
};

popupEditProfileCloseBtn.addEventListener("click", () => {
  closePopup(popupEditProfile);
});

popupAddCardCloseBtn.addEventListener("click", () => {
  closePopup(popupSaveAddCard);
});

popupZoomImageCloseBtn.addEventListener("click", () => {
  closePopup(popupOpenZoomImage);
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

const createCard = function (name, link) {
  const cardClonedElement = cardTemplate.cloneNode(true);
  const cardElement = cardClonedElement.querySelector(".element");
  const cardTitle = cardClonedElement.querySelector(".element__title");
  const cardImg = cardClonedElement.querySelector(".element__image");
  cardTitle.textContent = name;
  cardImg.src = link;
  cardImg.alt = name;
  deleteCard(cardClonedElement);
  handleLikeIcon(cardClonedElement);
  const increaseImg = function () {
    popupOpenName.textContent = name;
    popupOpenImage.src = link;
    popupOpenImage.alt = name;
    openPopup(popupOpenImg);
  };
  cardImg.addEventListener("click", increaseImg);

  return cardElement;
};

const addNewCard = function (evt) {
  evt.preventDefault();
  container.prepend(createCard(titleInput.value, linkInput.value));
  evt.target.reset();
  closePopup(popupAddCard);
};
popupAddCard.addEventListener("submit", addNewCard);

const renderItem = function () {
  initialCards.forEach(function (elem) {
    container.prepend(createCard(elem.name, elem.link));
  });
};
renderItem();

/*удаление карточки*/

function deleteCard(cardClonedElement) {
  cardClonedElement
    .querySelector(".element__delete")
    .addEventListener("click", function (evt) {
      evt.target.closest(".element").remove();
    });
}
/*добавление лайка*/

function handleLikeIcon(cardClonedElement) {
  cardClonedElement
    .querySelector(".element__like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("element__like_active");
    });
}

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

/*закрытие на оверлей*/

const closePopupByClickOnOverlay = function (event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closePopup(popupEditProfile);
  closePopup(popupSaveAddCard);
  closePopup(popupOpenZoomImage);
};

popupEditProfile.addEventListener("click", closePopupByClickOnOverlay);
popupSaveAddCard.addEventListener("click", closePopupByClickOnOverlay);
popupOpenZoomImage.addEventListener("click", closePopupByClickOnOverlay);

/*валидация форм*/

enableValidation();
