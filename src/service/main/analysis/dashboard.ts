import CCRequest from '@/service/index'
enum DashboardAPI {
  categoryGoodsCount = '/goods/category/count',
  categoryGoodsSale = '/goods/category/sale',
  categoryGoodsFavor = '/goods/category/favor',
  addressGoodsSale = '/goods/address/sale'
}
export function getCategoryGoodsCount() {
  return CCRequest.get({
    url: DashboardAPI.categoryGoodsCount
  })
}
export function getCategoryGoodsSale() {
  return CCRequest.get({
    url: DashboardAPI.categoryGoodsSale
  })
}
export function getCategoryGoodsFavor() {
  return CCRequest.get({
    url: DashboardAPI.categoryGoodsFavor
  })
}
export function getAddressGoodsSale() {
  return CCRequest.get({
    url: DashboardAPI.addressGoodsSale
  })
}
