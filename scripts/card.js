import { openImagePopup } from "./index.js";
export class Card {
  constructor(data) {
    this._name = data.name;
    this._link = data.link;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector("#element-template")
      .content.querySelector(".element")
      .cloneNode(true);

    return cardTemplate;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector(".element__image");
    this._elementName = this._element.querySelector(".element__title");

    this._elementName.textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;

    this._deleteBtn = this._element.querySelector(".element__delete");
    this._likeBtn = this._element.querySelector(".element__like");
    this._setEventListeners();
    return this._element;
  }

  _deleteCard() {
    this._element.remove();
  }

  _handleLikeCard(event) {
    event.target.classList.toggle("element__like_active");
  }

  _setEventListeners = () => {
    this._deleteBtn.addEventListener("click", (event) =>
      this._deleteCard(event)
    );
    this._likeBtn.addEventListener("click", (event) =>
      this._handleLikeCard(event)
    );
    this._elementImage.addEventListener("click", openImagePopup);
  };
}
