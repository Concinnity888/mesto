export default class FormValidator {
  constructor(config, form) {
    this._form = form;
    this._submitButtonSelector = config.submitButtonSelector;
    this._submitButtonErrorClass = config.submitButtonErrorClass;
    this._inputSelector = config.inputSelector;
    this._inputErrorClass = config.inputErrorClass;
    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._button = this._form.querySelector(this._submitButtonSelector);
  }

  _setSubmitButtonState() {
    this._button.disabled = !this._form.checkValidity();
    this._button.classList.toggle(
      this._submitButtonErrorClass,
      !this._form.checkValidity()
    );
  }

  _handleSubmit(evt) {
    evt.preventDefault();
  }

  _handleFieldValidation(input) {
    if (!input.validity.valid) {
      this._showError(input);
    } else {
      this._hideError(input);
    }
  }

  _showError(input) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    errorElement.textContent = input.validationMessage;
  }

  _hideError(input) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
  }

  _toggleButtonState() {
    this._button.classList.add(this._submitButtonErrorClass);
    this._button.disabled = true;
  }

  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideError(inputElement);
    });
  }

  enableValidation() {
    this._form.addEventListener('submit', (evt) => this._handleSubmit(evt));
    this._form.addEventListener('input', () => this._setSubmitButtonState());

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () =>
        this._handleFieldValidation(inputElement)
      );
    });

    this._setSubmitButtonState();
  }
}
