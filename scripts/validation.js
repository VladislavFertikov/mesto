const checkInputValidity = (inputElement) => {
  const isValid = inputElement.validity.valid;
  const formSection = inputElement.closest(".popup__section");
  const errorElement = formSection.querySelector(".popup__input-error");

  if (isValid) {
    hideInputError(errorElement);
  } else {
    showInputError(errorElement, inputElement.validationMessage);
  }
};

const showInputError = (errorElement, errorMessage) => {
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error_active");
};

const hideInputError = (errorElement) => {
  errorElement.textContent = "";
  errorElement.classList.remove("popup__input-error_active");
};

const toggleButtonState = (inputList, buttonElement) => {
  const hasInvalidInput = inputList.some(
    (inputElement) => !inputElement.validity.valid
  );
  if (hasInvalidInput) {
    buttonElement.setAttribute("disabled", true);
    buttonElement.classList.add("popup__save_not-active");
  } else {
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.remove("popup__save_not-active");
  }
};

const setEventListeners = (formElement) => {
  formElement.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const submitButton = formElement.querySelector(".popup__save");

  toggleButtonState(inputList, submitButton);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(inputElement);
      toggleButtonState(inputList, submitButton);
    });
  });
};

const enableValidation = () => {
  const formList = document.querySelectorAll(".popup__content");

  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};
