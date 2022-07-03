import { IRootState } from '@/store/type'
import { IDashboardState } from './type'
import { Module } from 'vuex'
import {
  getAddressGoodsSale,
  getCategoryGoodsCount,
  getCategoryGoodsFavor,
  getCategoryGoodsSale
} from '@/service/main/analysis/dashboard'

const dashboardModule: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      addressGoodsSale: []
    }
  },
  mutations: {
    goodsCountChange(state, list) {
      state.categoryGoodsCount = list
    },
    goodsSaleChange(state, list) {
      state.categoryGoodsSale = list
    },
    goodsFavorChange(state, list) {
      state.categoryGoodsFavor = list
    },
    addressSaleChange(state, list) {
      state.addressGoodsSale = list
    }
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      const goodsCountResult = await getCategoryGoodsCount()
      commit('goodsCountChange', goodsCountResult.data)
      const goodsSaleResult = await getCategoryGoodsSale()
      commit('goodsSaleChange', goodsSaleResult.data)
      const goodsFavorResult = await getCategoryGoodsFavor()
      commit('goodsFavorChange', goodsFavorResult.data)
      const addressSaleResult = await getAddressGoodsSale()
      commit('addressSaleChange', addressSaleResult.data)
    }
  }
}
export default dashboardModule
