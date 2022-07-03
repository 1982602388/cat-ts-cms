import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState, IStoreType } from './type'
import login from './login/login'
import system from './main/system/system'
import dashboard from './main/analysis/dashboard'
import { getPageListData } from '@/service/main/system'
// import { Store } from 'element-plus/es/components/table/src/store'

const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'coderCat',
      age: 18,
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  mutations: {
    entireDepartmentChange(state, list) {
      state.entireDepartment = list
    },
    entireRoleChange(state, list) {
      state.entireRole = list
    },
    entireMenuChange(state, list) {
      state.entireMenu = list
    }
  },
  actions: {
    //调用看下面
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

      const menuResult = await getPageListData('/menu/list', {})
      const { list: menuList } = menuResult.data

      commit('entireDepartmentChange', departmentList)
      commit('entireRoleChange', roleList)
      commit('entireMenuChange', menuList)
    }
  },
  modules: {
    login,
    system,
    dashboard
  }
})
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
  // store.dispatch('getInitialDataAction') 转到登录拿到token之后再调用
}
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
export default store
