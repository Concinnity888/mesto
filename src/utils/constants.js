export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];
export const configForm = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  inputErrorClass: 'popup__field_invalid',
  submitButtonSelector: '.popup__btn-submit',
  submitButtonErrorClass: 'popup__btn-submit_invalid',
};
export const cardListSelector = '.elements__list';
export const btnAdd = document.querySelector('.profile__btn-add');
export const btnEdit = document.querySelector('.profile__btn-edit');
export const formEditProfile = document.querySelector(
  '.popup__form-edit-profile'
);
export const userNameInput = formEditProfile.querySelector('#name');
export const userDescInput = formEditProfile.querySelector('#desc');
export const popups = document.querySelectorAll('.popup');
