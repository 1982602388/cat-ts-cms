import { Module } from 'vuex'
import router from '@/router'
import { IRootState } from '../type'
import { ILoginState } from './type'
import { IAccount } from '@/service/login/type'
import localCache from '../../utils/cache'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenuById
} from '@/service/login/login'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state: () => {
    return {
      token: '',
      userInfo: {},
      userMenu: {}
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenu(state, userMenu: any) {
      state.userMenu = userMenu
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
      //登录验证
      const loginResult = await accountLoginRequest(payload)
      console.log(loginResult.data.id, loginResult.data.token)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      localCache.setCache('token', token)

      //请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      //获取用户菜单
      const userMenuResult = await requestUserMenuById(id)
      const userMenu = userMenuResult.data
      commit('changeUserMenu', userMenu)
      localCache.setCache('userMenu', userMenu)

      //跳转到主页
      router.push('/home')
    },
    // phoneLoginAction({ commit }, payload: any) {
    //   console.log('phoneLoginAction', payload)
    // }

    //避免刷新后vuex中数据消失
    //所以当刷新后再此赋值，在mian.js中调用该函数
    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localCache.getCache('userInfo')
      if (token) {
        commit('changeUserInfo', userInfo)
      }
      const userMenu = localCache.getCache('userMenu')
      if (userMenu) {
        commit('changeUserMenu', userMenu)
      }
    }
  }
}
export default loginModule
