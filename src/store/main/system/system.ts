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
    roleCount: 0
  },
  mutations: {
    usersListChange(state, userList: any[]) {
      state.usersList = userList
    },
    usersCounterChange(state, userCount: number) {
      state.usersCount = userCount
    },
    roleListChange(state, list: any[]) {
      state.roleList = list
    },
    roleCountChange(state, count: number) {
      state.roleCount = count
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
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      const pageName = payload.pageName
      console.log(payload.pageName)

      const pageUrl = `/${pageName}/list`
      console.log(pageUrl)

      const pageResult = await getPageListData(pageUrl, payload.queryInfo)

      const { list, totalCount } = pageResult.data

      commit(`${pageName}ListChange`, list)
      commit(`${pageName}CountChange`, totalCount)
    }
  }
}

export default systemModule
