import { IRootState } from '@/store/type'
import { Module } from 'vuex'
import { ISystemState } from './type'
import { getPageListData } from '@/service/main/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state: {
    usersList: [],
    usersCount: 0,
    roleList: [],
    roleCount: 0,
    goodsList: [],
    goodsCount: 0,
    menuList: [],
    menuCount: 0
  },
  mutations: {
    usersListChange(state, userList: any[]) {
      state.usersList = userList
    },
    usersCountChange(state, userCount: number) {
      state.usersCount = userCount
    },
    roleListChange(state, list: any[]) {
      state.roleList = list
    },
    roleCountChange(state, count: number) {
      state.roleCount = count
    },
    goodsListChange(state, list: any[]) {
      state.goodsList = list
    },
    goodsCountChange(state, count: number) {
      state.goodsCount = count
    },
    menuListChange(state, list: any[]) {
      state.menuList = list
    },
    menuCountChange(state, count: number) {
      state.goodsCount = count
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
        // switch (pageName) {
        //   case 'users':
        //     return state.usersList
        //   case 'role':
        //     return state.roleList
        // }
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      const pageName = payload.pageName
      console.log(payload.pageName)

      const pageUrl = `/${pageName}/list`
      console.log(pageUrl)

      const pageResult = await getPageListData(pageUrl, payload.queryInfo)
      console.log(pageResult.data)

      const { list, totalCount } = pageResult.data

      commit(`${pageName}ListChange`, list)
      commit(`${pageName}CountChange`, totalCount)
    }
  }
}

export default systemModule
