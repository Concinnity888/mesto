import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupGallery = document.querySelector(popupSelector);
    this._popupElementPhoto = this._popupGallery.querySelector('.popup__photo');
    this._popupElementTitle = this._popupGallery.querySelector(
      '.popup__title-image'
    );
  }

  open({ link, title }) {
    this._popupElementPhoto.src = link;
    this._popupElementPhoto.alt = title;
    this._popupElementTitle.textContent = title;

    super.open();
  }
}
