const popupElement = document.querySelector(".popup_type_edit-profile");
const popupCloseButtonElement = popupElement.querySelector(".popup__close");
const popupOpenButtonElement = document.querySelector(".profile__edit-button");

/*Popup редактор профиля*/

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
let popupSaveButton = popupElement.querySelector(".popup__save_profile");

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup();
}

formElement.addEventListener("submit", formSubmitHandler);

/*Popup добавление карточки*/

const popupAddCard = document.querySelector(".popup_type_add-element");
const popupOpenButtonAddCard = document.querySelector(".profile__add-button");
const popupCloseButtonAddCard = document.querySelector(
  ".popup__close_type_add-element"
);

const openAddPopup = function () {
  popupAddCard.classList.add("popup_is-opened");
};
popupOpenButtonAddCard.addEventListener("click", openAddPopup);

const closeAddPopup = function () {
  popupAddCard.classList.remove("popup_is-opened");
};
popupCloseButtonAddCard.addEventListener("click", closeAddPopup);

/*добалвение карточек JS*/

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const container = document.querySelector(".elements");
const addCard = document.querySelector(".element-template").content;
const linkInput = document.querySelector(".popup__input_type_link");
const titleInput = document.querySelector(".popup__input_type_title");
const saveAddElement = document.querySelector(".popup__save_add-element");

const closePopupAddElement = function () {
  popupAddCard.classList.remove("popup_is-opened");
  linkInput.value = "";
  titleInput.value = "";
};

initialCards.forEach(function (element) {
  const CardElement = addCard.cloneNode(true);
  addCard.querySelector(".element__title").textContent = element.name;
  addCard.querySelector(".element__image").src = element.link;
  addCard.querySelector(".element__image").alt = element.name;
  container.prepend(CardElement);
});

function formSubmit(evt) {
  evt.preventDefault();
  const CardElement = addCard.cloneNode(true);
  addCard.querySelector(".element__title").textContent = titleInput.value;
  addCard.querySelector(".element__image").src = linkInput.value;
  addCard.querySelector(".element__image").alt = titleInput.value;
  container.prepend(CardElement);
  closePopupAddElement();
  setEventListener(CardElement);
  activeLike(CardElement);
}
popupAddCard.addEventListener("submit", formSubmit);

/*удаление карточки*/

const deleteCard = (event) => {
  const target = event.target;
  const currentListItemEl = target.closest(".element");
  currentListItemEl.remove();
};

const setEventListener = (CardElement) => {
  const deleteBtn = document.querySelector(".element__delete");
  deleteBtn.addEventListener("click", deleteCard);
};

/*добавление лайка*/

function activeLike(like) {
  document
    .querySelector(".element__like")
    .addEventListener("click", activeLike);
  like.target.classList.toggle("element__like_active");
}
