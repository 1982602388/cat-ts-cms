import { IRootState } from '@/store/type'
import { Module } from 'vuex'
import { ISystemState } from './type'
import { getPageListData } from '@/service/main/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state: {
    userList: [],
    userCount: 0
  },
  mutations: {
    userListChange(state, userList: any[]) {
      state.userList = userList
    },
    userCounterChange(state, userCount: number) {
      state.userCount = userCount
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      const pageResult = await getPageListData(
        payload.pageUrl,
        payload.queryInfo
      )
      const { list, totalCount } = pageResult.data
      commit('userListChange', list)
      commit('userCounterChange', totalCount)
      console.log(pageResult)
    }
  }
}

export default systemModule
