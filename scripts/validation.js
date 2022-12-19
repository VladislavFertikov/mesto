export class FormValidator {
  constructor(formElement, selectors) {
    this.formElement = formElement;
    this.selectors = selectors;
  }

  _checkInputValidity = (inputElement, selectors) => {
    const isValid = inputElement.validity.valid;
    const formSection = inputElement.closest(selectors.sectionSelector);
    const errorElement = formSection.querySelector(selectors.inputErrorClass);

    if (isValid) {
      this._hideInputError(errorElement, selectors);
    } else {
      this._showInputError(
        errorElement,
        inputElement.validationMessage,
        selectors
      );
    }
  };

  _showInputError = (errorElement, errorMessage, selectors) => {
    errorElement.textContent = errorMessage;
    errorElement.classList.add(selectors.errorClass);
  };

  _hideInputError = (errorElement, selectors) => {
    errorElement.textContent = "";
    errorElement.classList.remove(selectors.errorClass);
  };

  _toggleButtonState = (inputList, buttonElement, selectors) => {
    const hasInvalidInput = inputList.some(
      (inputElement) => !inputElement.validity.valid
    );
    if (hasInvalidInput) {
      buttonElement.setAttribute("disabled", true);
      buttonElement.classList.add(selectors.inactiveButtonClass);
    } else {
      buttonElement.removeAttribute("disabled");
      buttonElement.classList.remove(selectors.inactiveButtonClass);
    }
  };

  _setEventListeners = (formElement, selectors) => {
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });

    const inputList = Array.from(
      formElement.querySelectorAll(selectors.inputSelector)
    );
    const submitButton = formElement.querySelector(
      selectors.submitButtonSelector
    );

    this._toggleButtonState(inputList, submitButton, selectors);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement, selectors);
        this._toggleButtonState(inputList, submitButton, selectors);
      });
    });
  };

  enableValidation = (selectors) => {
    const formList = document.querySelectorAll(selectors.formSelector);

    formList.forEach((formElement) => {
      this._setEventListeners(formElement, selectors);
    });
  };
}
