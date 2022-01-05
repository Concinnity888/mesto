export default class Card {
  constructor(el, cardSelector, openPopup) {
    this._cardSelector = cardSelector;
    this._link = el.link;
    this._name = el.name;
    this._openPopup = openPopup;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _btnOpenPopupGalleryClickHandler(evt) {
    const link = evt.target.src;
    const title = evt.target.alt;

    this._openPopup({ link, title });
  }

  _btnLikeClickHandler(evt) {
    evt.target.classList.toggle('element__btn-like_active');
  }

  _btnRemoveClickHandler(evt) {
    const element = evt.target.closest('.element');
    element.remove();
  }

  _setEventListeners(elementPhoto) {
    elementPhoto.addEventListener('click', (evt) =>
      this._btnOpenPopupGalleryClickHandler(evt)
    );
    this._element
      .querySelector('.element__btn-like')
      .addEventListener('click', (evt) => this._btnLikeClickHandler(evt));
    this._element
      .querySelector('.element__btn-remove')
      .addEventListener('click', (evt) => this._btnRemoveClickHandler(evt));
  }

  generateCard() {
    this._element = this._getTemplate();
    const elementPhoto = this._element.querySelector('.element__photo');
    elementPhoto.src = this._link;
    elementPhoto.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    this._setEventListeners(elementPhoto);

    return this._element;
  }
}
