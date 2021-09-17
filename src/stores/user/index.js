import { action, computed, makeObservable, observable } from 'mobx'

export class UserStore {
  @observable _isLogin = false

  @observable _loggedIn = []

  @computed
  get loggedIn() {
    return this._loggedIn
  }

  @computed
  get isLogin() {
    return this._isLogin
  }

  constructor() {
    makeObservable(this)
  }

  @action
  login(login) {
    this._loggedIn = login
    this._isLogin = true
  }
}

const instance = new UserStore()
export default instance
