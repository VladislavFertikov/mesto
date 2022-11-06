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
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Москва",
    link: "https://images.unsplash.com/photo-1578910330150-e1ab90fc81c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "Тюмень",
    link: "https://images.unsplash.com/photo-1592801918768-88b493ee069f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=650&q=80",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const container = document.querySelector(".elements");
const linkInput = document.querySelector(".popup__input_type_link");
const titleInput = document.querySelector(".popup__input_type_title");
const saveAddElement = document.querySelector(".popup__save_add-element");

function closePopupAddElement() {
  popupAddCard.classList.remove("popup_is-opened");
  linkInput.value = "";
  titleInput.value = "";
}

const cardTemplate = document.querySelector("#element-template").content;

const createCard = function (name, link) {
  const cardClonedElement = cardTemplate.cloneNode(true);
  const cardElement = cardClonedElement.querySelector(".element");
  const cardTitle = cardClonedElement.querySelector(".element__title");
  const cardImg = cardClonedElement.querySelector(".element__image");
  cardTitle.textContent = name;
  cardImg.src = link;
  cardImg.alt = name;
  deleteCard(cardClonedElement);
  activeLike(cardClonedElement);
  const increaseImg = function () {
    popupOpenName.textContent = name;
    popupOpenImage.src = link;
    popupOpenImage.alt = name;
    openImgPopup();
  };
  cardImg.addEventListener("click", increaseImg);

  return cardElement;
};

const renderItem = function () {
  initialCards.forEach(function (elem) {
    container.prepend(createCard(elem.name, elem.link));
  });
};
renderItem();

function formSubmit(evt) {
  evt.preventDefault();

  const cardClonedElement = cardTemplate.cloneNode(true);
  const cardElement = cardClonedElement.querySelector(".element");
  const cardTitle = cardClonedElement.querySelector(".element__title");
  const cardImg = cardClonedElement.querySelector(".element__image");

  cardTitle.textContent = titleInput.value;
  cardImg.src = linkInput.value;
  cardImg.alt = titleInput.value;
  container.prepend(cardElement);
  closePopupAddElement();
  deleteCard(cardElement);
  activeLike(cardElement);
  const increaseImg = function () {
    popupOpenName.textContent = cardTitle.textContent;
    popupOpenImage.src = cardImg.src;
    popupOpenImage.alt = cardImg.alt;
    openImgPopup();
  };
  cardImg.addEventListener("click", increaseImg);
}
popupAddCard.addEventListener("submit", formSubmit);

/*удаление карточки*/

function deleteCard(cardClonedElement) {
  cardClonedElement
    .querySelector(".element__delete")
    .addEventListener("click", function (evt) {
      evt.target.closest(".element").remove();
    });
}
/*добавление лайка*/

function activeLike(cardClonedElement) {
  cardClonedElement
    .querySelector(".element__like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("element__like_active");
    });
}

/*открытие картинки*/

const closePopupImgBtn = document.querySelector(
  ".popup__close_type_close-image"
);
const popupOpenImg = document.querySelector(".popup_type_open-image");
const popupOpenName = document.querySelector(".popup__name");
const popupOpenImage = document.querySelector(".popup__image");

function openImgPopup() {
  popupOpenImg.classList.add("popup_is-opened");
}

function closeImgPopup() {
  popupOpenImg.classList.remove("popup_is-opened");
}
closePopupImgBtn.addEventListener("click", closeImgPopup);
