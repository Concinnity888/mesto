export default class UserInfo {
  constructor({ userNameSelector, userDescSelector, userAvatarSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userDesc = document.querySelector(userDescSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
    this._id = '';
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userDesc: this._userDesc.textContent,
      userAvatar: this._userAvatar.textContent,
      _id: this._id,
    };
  }

  setUserInfo({ name, about, avatar, _id }) {
    this._id = _id;
    this._userName.textContent = name;
    this._userDesc.textContent = about;
    this._userAvatar.src = avatar;
    this._userAvatar.alt = name;
  }
}
