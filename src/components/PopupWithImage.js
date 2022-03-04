import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupElementPhoto = this._popup.querySelector('.popup__photo');
    this._popupElementTitle = this._popup.querySelector('.popup__title-image');
  }

  open({ link, title }) {
    this._popupElementPhoto.src = link;
    this._popupElementPhoto.alt = title;
    this._popupElementTitle.textContent = title;

    super.open();
  }
}
