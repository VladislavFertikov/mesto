export class FormValidator {
  constructor(validationConfig, formElement) {
    this._validationConfig = validationConfig;
    this._formElement = formElement;
    this._submitButton = this._formElement.querySelector(
      this._validationConfig.submitButtonSelector
    );
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._validationConfig.inputSelector)
    );
  }

  _checkInputValidity = (inputElement) => {
    const isValid = inputElement.validity.valid;
    const formSection = inputElement.closest(
      this._validationConfig.sectionSelector
    );
    const errorElement = formSection.querySelector(
      this._validationConfig.inputErrorClass
    );

    if (isValid) {
      this._hideInputError(errorElement);
    } else {
      this._showInputError(
        errorElement,
        inputElement.validationMessage,
        this._validationConfig
      );
    }
  };

  _hasInvalidInput() {
    return this._inputList.some((inputItem) => {
      return !inputItem.validity.valid;
    });
  }

  resetValidate() {
    this._inputList.forEach((inputItem) => {
      this._checkInputValidity(inputItem);
    });
    this._toggleButtonState();
  }

  disableSubmitButton() {
    this._submitButton.setAttribute("disabled", "true");
    this._submitButton.classList.add(
      this._validationConfig.inactiveButtonClass
    );
  }

  _enableSubmitButton() {
    this._submitButton.classList.remove(
      this._validationConfig.inactiveButtonClass
    );
    this._submitButton.removeAttribute("disabled");
  }

  _showInputError = (errorElement, errorMessage) => {
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validationConfig.errorClass);
  };

  _hideInputError = (errorElement) => {
    errorElement.textContent = "";
    errorElement.classList.remove(this._validationConfig.errorClass);
  };

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this.disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  };

  _setEventListeners = () => {
    this._formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  enableValidation() {
    this._setEventListeners();
  }
}
