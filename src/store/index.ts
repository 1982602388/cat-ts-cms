import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState, IStoreType } from './type'
import login from './login/login'
import system from './main/system/system'
// import { Store } from 'element-plus/es/components/table/src/store'

const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'coderCat',
      age: 18
    }
  },
  mutations: {},
  actions: {},
  modules: {
    login,
    system
  }
})
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
export default store
