export default class UserInfo {
  constructor({ userNameSelector, userDescSelector, userAvatarSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userDesc = document.querySelector(userDescSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userDesc: this._userDesc.textContent,
      userAvatar: this._userAvatar.textContent,
    };
  }

  setUserInfo({ name, about, avatar }) {
    this._userName.textContent = name;
    this._userDesc.textContent = about;
    this._userAvatar.src = avatar;
    this._userAvatar.alt = name;
  }
}
