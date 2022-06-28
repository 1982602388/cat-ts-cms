import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState, IStoreType } from './type'
import login from './login/login'
import system from './main/system/system'
import { getPageListData } from '@/service/main/system'
// import { Store } from 'element-plus/es/components/table/src/store'

const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'coderCat',
      age: 18,
      entireDepartment: [],
      entireRole: []
    }
  },
  mutations: {
    entireDepartmentChange(state, list) {
      state.entireDepartment = list
    },
    entireRoleChange(state, list) {
      state.entireRole = list
    }
  },
  actions: {
    async getInitialDataAction({ commit }) {
      const departmentResult = await getPageListData('department/list', {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = departmentResult.data
      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data
      commit('entireDepartmentChange', departmentList)
      commit('entireRoleChange', roleList)
    }
  },
  modules: {
    login,
    system
  }
})
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
  store.dispatch('getInitialDataAction')
}
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
export default store
