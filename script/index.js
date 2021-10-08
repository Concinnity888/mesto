const btnEdit = document.querySelector('.profile__btn-edit');
const btnClosePopup = document.querySelector('.popup__btn-close');
const popup = document.querySelector('.popup');
const formElement = document.querySelector('.popup__container');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#job');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__desc');

function openPopup () {
  popup.classList.add('popup_opened');
}

function closePopup () {
  popup.classList.remove('popup_opened');
}

function popupClickHandler (evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup();
  }
}

function formSubmitHandler (evt) {
  evt.preventDefault();

  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;

  closePopup();
}

function btnEditClickHandler (evt) {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;

  openPopup();
}

btnEdit.addEventListener('click', btnEditClickHandler);
btnClosePopup.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
popup.addEventListener('click', popupClickHandler);
