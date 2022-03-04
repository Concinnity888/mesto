import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
  constructor(popupSelector, handlerConfirm) {
    super(popupSelector);
    this._handlerConfirm = handlerConfirm;
    this._btnConfirm = this._popup.querySelector('.popup__btn-submit');
    this._id = '';
    this._element = '';
  }

  _confirmDeleting() {
    this._handlerConfirm(this._element, this._id);
  }

  setEventListeners() {
    super.setEventListeners();
    this._btnConfirm.addEventListener('click', () => this._confirmDeleting());
  }

  open(element, id) {
    this._id = id;
    this._element = element;
    super.open();
  }
}
