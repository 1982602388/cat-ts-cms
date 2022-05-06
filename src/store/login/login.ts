import { Module } from 'vuex'
import { IRootState } from '../type'
import { ILoginState } from './type'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state: () => {
    return {
      token: '',
      userInfo: {}
    }
  },
  mutations: {},
  actions: {
    accountLoginAction({ commit }, payload: any) {
      console.log('accountLoginAction', payload)
    }
  }
}
export default loginModule
