import { initialCards } from './data.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

const btnEdit = document.querySelector('.profile__btn-edit');
const btnAdd = document.querySelector('.profile__btn-add');
const closePopupBtns = document.querySelectorAll('.popup__btn-close');
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
const popupGallery = document.querySelector('.popup-gallery');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

function popupClickHandler(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

function formEditProfileSubmitHandler(evt) {
  evt.preventDefault();

  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;

  closePopup(popupEditProfile);
}

function formAddSubmitHandler(evt) {
  evt.preventDefault();

  const el = {
    name: titleInput.value,
    link: linkInput.value
  }

  const cardElement = createCard(el);
  elements.prepend(cardElement);
  closePopup(popupAdd);

  evt.target.reset();
  const btnSubmit = formAdd.querySelector('.popup__btn-submit');
  btnSubmit.classList.add('popup__btn-submit_invalid');
  btnSubmit.disabled = true;
}

function btnEditClickHandler(evt) {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;

  openPopup(popupEditProfile);
}

function btnAddClickHandler(evt) {
  openPopup(popupAdd);
}

function btnCloseClickHandler(evt) {
  const popup = evt.target.closest('.popup');
  closePopup(popup);
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

btnEdit.addEventListener('click', btnEditClickHandler);
btnAdd.addEventListener('click', btnAddClickHandler);
formEditProfile.addEventListener('submit', formEditProfileSubmitHandler);
formAdd.addEventListener('submit', formAddSubmitHandler);
popupEditProfile.addEventListener('click', popupClickHandler);
popupAdd.addEventListener('click', popupClickHandler);
popupGallery.addEventListener('click', popupClickHandler);

closePopupBtns.forEach(btnClosePopup => {
  btnClosePopup.addEventListener('click', btnCloseClickHandler);
});

function createCard(el) {
  const card = new Card(el, '#element', openPopup);
  const cardElement = card.generateCard();
  return cardElement;
}

initialCards.forEach(el => {
  const cardElement = createCard(el);
  elements.append(cardElement);
});

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  inputErrorClass: 'popup__field_invalid',
  submitButtonSelector: '.popup__btn-submit',
  submitButtonErrorClass: 'popup__btn-submit_invalid'
};
const forms = Array.from(document.querySelectorAll(config.formSelector));
forms.forEach(form => {
  const formValidator = new FormValidator(config, form);
  formValidator.enableValidation();
});

window.addEventListener('load', () => {
  document.querySelectorAll('.popup').forEach((popup) => popup.classList.add('popup_transition'));
});
