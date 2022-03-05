import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = Array.from(this._popup.querySelectorAll('.popup__field'));
    this._btnSubmit = this._form.querySelector('.popup__btn-submit');
  }

  _getInputValues() {
    return this._inputs.reduce((acc, input) => {
      acc[input.name] = input.value;
      return acc;
    }, {});
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', () => {
      this._handleSubmit(this._getInputValues());
    });
  }

  renderLoading(isLoading, buttonText = 'Сохранить') {
    if (isLoading) {
      this._btnSubmit.textContent = 'Сохранение...';
    } else {
      this._btnSubmit.textContent = buttonText;
    }
  }

  close() {
    super.close();
    this._form.reset();
  }
}
