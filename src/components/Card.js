export default class Card {
  constructor(el, cardSelector, openPopup, handlerConfirm, user, changeLikes) {
    this._cardSelector = cardSelector;
    this._idCard = el._id;
    this._link = el.link;
    this._name = el.name;
    this._likes = el.likes || [];
    this._openPopup = openPopup;
    this._ownerId = el?.owner?._id || '';
    this._userId = user._id;
    this._handlerConfirm = handlerConfirm;
    this._changeLikes = changeLikes;
    this._counterLike = '';
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _handleImageClick(evt) {
    const link = this._link;
    const title = this._name;

    this._openPopup({ link, title });
  }

  _handleLike(evt) {
    const isLike = this._getStatusLike(this._likes);
    const btnLike = evt.target;
    this._changeLikes(this, isLike, this._idCard, btnLike);
  }

  _handleCardRemove(evt) {
    const element = evt.target.closest('.element');
    this._handlerConfirm(element, this._idCard);
  }

  _setLikes(likes) {
    const quantity = likes.length;
    this._counterLike.textContent = quantity;
  }

  _setEventListeners(elementPhoto) {
    elementPhoto.addEventListener('click', (evt) =>
      this._handleImageClick(evt)
    );
    this._element
      .querySelector('.element__btn-like')
      .addEventListener('click', (evt) => this._handleLike(evt));
    this._element
      .querySelector('.element__btn-remove')
      .addEventListener('click', (evt) => this._handleCardRemove(evt));
  }

  updateLikes({ likes }, btnLike, isLike = false) {
    this._likes = likes;
    this._setLikes(likes);
    this._showActiveLike(isLike, btnLike);
  }

  _getStatusLike(likes) {
    return likes.some((item) => {
      return item._id === this._userId;
    });
  }

  _showActiveLike(isLike, btnLike) {
    if (isLike) {
      btnLike.classList.add('element__btn-like_active');
    } else {
      btnLike.classList.remove('element__btn-like_active');
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._counterLike = this._element.querySelector('.element__counter-like');
    const elementPhoto = this._element.querySelector('.element__photo');
    elementPhoto.src = this._link;
    elementPhoto.alt = this._name;
    this._setLikes(this._likes);
    const isLike = this._getStatusLike(this._likes);
    this._showActiveLike(
      isLike,
      this._element.querySelector('.element__btn-like')
    );
    this._element.querySelector('.element__title').textContent = this._name;
    this._setEventListeners(elementPhoto);

    if (this._userId !== this._ownerId) {
      this._element
        .querySelector('.element__btn-remove')
        .classList.add('element__btn-remove_hide');
    }

    return this._element;
  }
}
