const onError = (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
};

export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        ...this._headers,
      },
    }).then(onError);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        ...this._headers,
      },
    }).then(onError);
  }

  editProfile(user) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
      },
      body: JSON.stringify({
        name: user.name,
        about: user.desc,
      }),
    }).then(onError);
  }

  addNewCard(newCard) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        ...this._headers,
      },
      body: JSON.stringify({
        name: newCard.name,
        link: newCard.link,
      }),
    }).then(onError);
  }

  removeCard(idCard) {
    return fetch(`${this._baseUrl}/cards/${idCard}`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
      },
    }).then(onError);
  }

  addLike(idCard) {
    return fetch(`${this._baseUrl}/cards/${idCard}/likes`, {
      method: 'PUT',
      headers: {
        ...this._headers,
      },
    }).then(onError);
  }

  removeLike(idCard) {
    return fetch(`${this._baseUrl}/cards/${idCard}/likes`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
      },
    }).then(onError);
  }

  updateAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
      },
      body: JSON.stringify({
        avatar,
      }),
    }).then(onError);
  }
}
