const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  inputErrorClass: 'popup__field_invalid',
  submitButtonSelector: '.popup__btn-submit',
  submitButtonErrorClass: 'popup__btn-submit_invalid'
};

function enableValidation(formConfig) {
  const forms = Array.from(document.querySelectorAll(formConfig.formSelector));
  forms.forEach(form => setFormListeners(form, formConfig));
}

function setFormListeners(form, config) {
  form.addEventListener('submit', handleSubmit);
  form.addEventListener('input', () => setSubmitButtonState(form, config));

  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  inputs.forEach(inputElement => {
    inputElement.addEventListener('input', () => handleFieldValidation(inputElement, form, config));
  });

  setSubmitButtonState(form, config);
}

function setSubmitButtonState(form, config) {
  const button = form.querySelector(config.submitButtonSelector);
  button.disabled = !form.checkValidity();
  button.classList.toggle(config.submitButtonErrorClass, !form.checkValidity());
}

function handleSubmit(evt) {
  evt.preventDefault();
}

function handleFieldValidation(input, form, config) {
  if (!input.validity.valid) {
    showError(input, form, config);
  } else {
    hideError(input, form, config);
  }
}

function showError(input, form, config) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  input.classList.add(config.inputErrorClass);
  errorElement.textContent = input.validationMessage;
}

function hideError(input, form, config) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  input.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
}

enableValidation(config);
