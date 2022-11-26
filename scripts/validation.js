const selectors = {
  formSelector: ".popup__content",
  sectionSelector: ".popup__section",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_not-active",
  inputErrorClass: ".popup__input-error",
  errorClass: "popup__input-error_active",
};

const checkInputValidity = (inputElement, selectors) => {
  const isValid = inputElement.validity.valid;
  const formSection = inputElement.closest(selectors.sectionSelector);
  const errorElement = formSection.querySelector(selectors.inputErrorClass);

  if (isValid) {
    hideInputError(errorElement, selectors);
  } else {
    showInputError(errorElement, inputElement.validationMessage, selectors);
  }
};

const showInputError = (errorElement, errorMessage, selectors) => {
  errorElement.textContent = errorMessage;
  errorElement.classList.add(selectors.errorClass);
};

const hideInputError = (errorElement, selectors) => {
  errorElement.textContent = "";
  errorElement.classList.remove(selectors.errorClass);
};

const toggleButtonState = (inputList, buttonElement, selectors) => {
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

const setEventListeners = (formElement) => {
  formElement.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  const inputList = Array.from(
    formElement.querySelectorAll(selectors.inputSelector)
  );
  const submitButton = formElement.querySelector(
    selectors.submitButtonSelector
  );

  toggleButtonState(inputList, submitButton, selectors);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(inputElement, selectors);
      toggleButtonState(inputList, submitButton, selectors);
    });
  });
};

const enableValidation = () => {
  const formList = document.querySelectorAll(selectors.formSelector);

  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};
