import './index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import {
  FormEditValidator,
  FormAddValidator,
} from '../components/FormValidator.js';
import {
  initialCards,
  configForm,
  cardListSelector,
  btnAdd,
  btnEdit,
  userNameInput,
  userDescInput,
  popups,
} from '../utils/constants.js';

const popupGallery = new PopupWithImage('.popup-gallery');
popupGallery.setEventListeners();
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardList.addItem(cardElement);
    },
  },
  cardListSelector
);
cardList.renderItems();

function createCard(item) {
  const card = new Card(item, '#element', (item) => popupGallery.open(item));
  const cardElement = card.generateCard();
  return cardElement;
}

const popupAdd = new PopupWithForm('.popup-add', (evt) => submitFormAdd(evt));
popupAdd.setEventListeners();
btnAdd.addEventListener('click', () => {
  popupAdd.open();
});

const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userDescSelector: '.profile__desc',
});

const popupEditProfile = new PopupWithForm('.popup-edit-profile', (evt) =>
  submitFormEditProfile(evt)
);
popupEditProfile.setEventListeners();
btnEdit.addEventListener('click', () => {
  const { userName, userDesc } = userInfo.getUserInfo();
  userNameInput.value = userName;
  userDescInput.value = userDesc;
  popupEditProfile.open();
});

function submitFormEditProfile(data) {
  userInfo.setUserInfo(data);
}

function submitFormAdd(el) {
  const cardData = {
    name: el.title,
    link: el.link,
  };

  const cardElement = createCard(cardData);
  cardList.addItem(cardElement);
}

const forms = Array.from(document.querySelectorAll(configForm.formSelector));
forms.forEach((form) => {
  const formValidator = form.classList.contains('popup__form-edit-profile')
    ? new FormEditValidator(configForm, form)
    : new FormAddValidator(configForm, form);

  formValidator.enableValidation();
});

window.addEventListener('load', () => {
  popups.forEach((popup) => popup.classList.add('popup_transition'));
});
