export default class UserInfo {
  constructor({ userNameSelector, userDescSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userDesc = document.querySelector(userDescSelector);
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userDesc: this._userDesc.textContent,
    };
  }

  setUserInfo({ name, desc }) {
    this._userName.textContent = name;
    this._userDesc.textContent = desc;
  }
}
