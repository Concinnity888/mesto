import { initialCards } from './data.js';
import Card from './Card.js';
import { FormEditValidator, FormAddValidator } from './FormValidator.js';

const btnEdit = document.querySelector('.profile__btn-edit');
const btnAdd = document.querySelector('.profile__btn-add');
const popupEditProfile = document.querySelector('.popup-edit-profile');
const popupAdd = document.querySelector('.popup-add');
const formEditProfile = document.querySelector('.popup__form-edit-profile');
const nameInput = formEditProfile.querySelector('#name');
const jobInput = formEditProfile.querySelector('#job');
const profile = document.querySelector('.profile');
const nameProfile = profile.querySelector('.profile__name');
const jobProfile = profile.querySelector('.profile__desc');
const formAdd = document.querySelector('.popup__form-add');
const titleInput = formAdd.querySelector('#title');
const linkInput = formAdd.querySelector('#link');
const elements = document.querySelector('.elements__list');

const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }

    if (evt.target.classList.contains('popup__btn-close')) {
      closePopup(popup);
    }
  });
});

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

function submitFormEditProfile(evt) {
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;

  closePopup(popupEditProfile);
}

function submitFormAdd(evt) {
  const el = {
    name: titleInput.value,
    link: linkInput.value,
  };

  const cardElement = createCard(el);
  elements.prepend(cardElement);
  closePopup(popupAdd);

  evt.target.reset();
}

function pressBtnEdit(evt) {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;

  openPopup(popupEditProfile);
}

function pressBtnAdd(evt) {
  openPopup(popupAdd);
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

btnEdit.addEventListener('click', pressBtnEdit);
btnAdd.addEventListener('click', pressBtnAdd);
formEditProfile.addEventListener('submit', submitFormEditProfile);
formAdd.addEventListener('submit', submitFormAdd);

function createCard(el) {
  const card = new Card(el, '#element', openPopup);
  const cardElement = card.generateCard();
  return cardElement;
}

initialCards.forEach((el) => {
  const cardElement = createCard(el);
  elements.append(cardElement);
});

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  inputErrorClass: 'popup__field_invalid',
  submitButtonSelector: '.popup__btn-submit',
  submitButtonErrorClass: 'popup__btn-submit_invalid',
};
const forms = Array.from(document.querySelectorAll(config.formSelector));
forms.forEach((form) => {
  const formValidator = form.classList.contains('popup__form-edit-profile')
    ? new FormEditValidator(config, form)
    : new FormAddValidator(config, form);

  formValidator.enableValidation();
});

window.addEventListener('load', () => {
  popups.forEach((popup) => popup.classList.add('popup_transition'));
});
