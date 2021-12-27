class FormValidator {
  constructor(config, form) {
    this._form = form;
    this._submitButtonSelector = config.submitButtonSelector;
    this._submitButtonErrorClass = config.submitButtonErrorClass;
    this._inputSelector = config.inputSelector;
    this._inputErrorClass = config.inputErrorClass;
    this._inputErrorClass = config.inputErrorClass;
  }

  _setSubmitButtonState() {
    const button = this._form.querySelector(this._submitButtonSelector);
    button.disabled = !this._form.checkValidity();
    button.classList.toggle(
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
}

class FormEditValidator extends FormValidator {
  constructor(config, form) {
    super(config, form);
    this._submitButtonSelector = config.submitButtonSelector;
    this._submitButtonErrorClass = config.submitButtonErrorClass;
    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
  }

  enableValidation() {
    this._form.addEventListener('submit', (evt) => super._handleSubmit(evt));
    this._form.addEventListener('input', () => super._setSubmitButtonState());

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () =>
        super._handleFieldValidation(inputElement)
      );
    });

    super._setSubmitButtonState();
  }
}

class FormAddValidator extends FormValidator {
  constructor(config, form) {
    super(config, form);
    this._submitButtonSelector = config.submitButtonSelector;
    this._submitButtonErrorClass = config.submitButtonErrorClass;
    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
  }

  _setSubmitButtonState() {
    const button = this._form.querySelector(this._submitButtonSelector);
    button.classList.add(this._submitButtonErrorClass);
    button.disabled = true;
  }

  _handleSubmit(evt) {
    super._handleSubmit(evt);
    this._setSubmitButtonState();
  }

  enableValidation() {
    this._form.addEventListener('submit', (evt) => this._handleSubmit(evt));
    this._form.addEventListener('input', () => super._setSubmitButtonState());

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () =>
        super._handleFieldValidation(inputElement)
      );
    });

    super._setSubmitButtonState();
  }
}

export { FormEditValidator, FormAddValidator };
