import './index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupConfirm from '../components/PopupConfirm.js';
import UserInfo from '../components/UserInfo.js';
import {
  FormEditValidator,
  FormAddValidator,
} from '../components/FormValidator.js';
import {
  configForm,
  cardListSelector,
  btnAdd,
  btnEdit,
  btnUpdateAvatar,
  userNameInput,
  userDescInput,
  popups,
} from '../utils/constants.js';
import Api from '../components/Api';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort36',
  headers: {
    authorization: '7e3826f0-8e28-4e2e-ad8b-a8b56b5e3157',
    'Content-Type': 'application/json',
  },
});

let cardList;
Promise.all([api.getInitialCards(), api.getUser()])
  .then((data) => {
    const [initialCards, user] = data;
    cardList = new Section(
      {
        items: initialCards,
        renderer: (item) => {
          const cardElement = createCard(item, user);
          cardList.addItem(cardElement);
        },
      },
      cardListSelector
    );
    cardList.renderItems();
    userInfo.setUserInfo(user);
  })
  .catch((err) => console.log(err));

const popupGallery = new PopupWithImage('.popup-gallery');
popupGallery.setEventListeners();

const popupConfirm = new PopupConfirm('.popup-confirm', removeCard);
popupConfirm.setEventListeners();

function createCard(item, user) {
  const card = new Card(
    item,
    '#element',
    (item) => popupGallery.open(item),
    handlerConfirm,
    user,
    changeLikes
  );
  const cardElement = card.generateCard();
  return cardElement;
}

function changeLikes(card, isLike, idCard, btnLike) {
  if (isLike) {
    api
      .removeLike(idCard)
      .then((res) => card.updateLikes(res, btnLike))
      .catch((err) => console.log(err));
  } else {
    api
      .addLike(idCard)
      .then((res) => card.updateLikes(res, btnLike, !isLike))
      .catch((err) => console.log(err));
  }
}

function handlerConfirm(element, id) {
  popupConfirm.open(element, id);
}

function removeCard(element, id) {
  api
    .removeCard(id)
    .then(() => element.remove())
    .catch((err) => console.log(err));
}

const popupAdd = new PopupWithForm('.popup-add', (evt) => submitFormAdd(evt));
popupAdd.setEventListeners();
btnAdd.addEventListener('click', () => {
  popupAdd.open();
});

const popupUpdateAvatar = new PopupWithForm('.popup-update-avatar', (evt) =>
  submitFormUpdateAvatar(evt)
);
popupUpdateAvatar.setEventListeners();
btnUpdateAvatar.addEventListener('click', () => {
  popupUpdateAvatar.open();
});

const popupEditProfile = new PopupWithForm('.popup-edit-profile', (evt) =>
  submitFormEditProfile(evt)
);
popupEditProfile.setEventListeners();

const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userDescSelector: '.profile__desc',
  userAvatarSelector: '.profile__avatar',
});

btnEdit.addEventListener('click', () => {
  const { userName, userDesc } = userInfo.getUserInfo();
  userNameInput.value = userName;
  userDescInput.value = userDesc;
  popupEditProfile.open();
});

function submitFormEditProfile(data) {
  setLoading(true, '.popup-edit-profile');

  api
    .editProfile(data)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupEditProfile.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      setLoading(false, '.popup-edit-profile');
    });
}

function submitFormAdd(el) {
  const cardData = {
    name: el.title,
    link: el.link,
  };
  setLoading(true, '.popup-add');

  api
    .addNewCard(cardData)
    .then((card) => {
      const cardElement = createCard(card, userInfo.getUserInfo());
      cardList.addItem(cardElement);
      popupAdd.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      setLoading(false, '.popup-add');
    });
}

function submitFormUpdateAvatar(data) {
  const avatar = data['avatar-link'];
  setLoading(true, '.popup-update-avatar');

  api
    .updateAvatar(avatar)
    .then(({ name, about, avatar }) => {
      userInfo.setUserInfo({ name, about, avatar });
      popupUpdateAvatar.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      setLoading(false, '.popup-update-avatar');
    });
}

const forms = Array.from(document.querySelectorAll(configForm.formSelector));
forms.forEach((form) => {
  const formValidator = form.classList.contains('popup__form-edit-profile')
    ? new FormEditValidator(configForm, form)
    : new FormAddValidator(configForm, form);

  formValidator.enableValidation();
});

function setLoading(isLoading, selectorPopup) {
  const btnSubmit = document
    .querySelector(selectorPopup)
    .querySelector('.popup__btn-submit');

  if (isLoading) {
    btnSubmit.textContent = 'Сохранение...';
  } else {
    if (selectorPopup === '.popup-add') {
      btnSubmit.textContent = 'Создать';
    } else {
      btnSubmit.textContent = 'Сохранить';
    }
  }
}

window.addEventListener('load', () => {
  popups.forEach((popup) => popup.classList.add('popup_transition'));
});
