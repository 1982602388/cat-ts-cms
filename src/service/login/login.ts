import CCRequest from '../index'
import { IAccount, IDataType, ILoginResult } from './type'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  LoginUserMenu = '/role/'
}

export function accountLoginRequest(account: IAccount) {
  return CCRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}
export function requestUserInfoById(id: number) {
  return CCRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  })
}

export function requestUserMenuById(id: number) {
  return CCRequest.get<IDataType>({
    url: LoginAPI.LoginUserMenu + id + '/menu',
    showLoading: false
  })
}
