import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import 'normalize.css'
import './assets/css/index.less'
//导入全局注册的插件
import { globalRegister } from './global'
import { setupStore } from './store/index'

// 国际化
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

// import { mapMenusToRoutes } from '@/utils/map-menus'
// import { useStore } from '@/store/index'

// mapMenusToRoutes(useStore().state.login.userMenu)
// //导入封装的axios
// import CCRequest1 from './service'

// // CCRequest1.request({
// //   url: '/home/multidata',
// //   interceptors: {
// //     requestInterceptor: (config) => {
// //       console.log("单独请求拦截config");
// //       return config

// //     },
// //     responseInterceptor: res => {
// //       console.log("单独响应拦截的res");
// //       return res

// //     }
// //   }
// // })
// CCRequest1.request({
//   url: '/home/multidata'
// })

// interface DataType {
//   data: any
//   returnCode: string
//   success: boolean
// }
// CCRequest1.get<DataType>({
//   url: '/home/multidata',
//   showLoading: false
// }).then((res) => {
//   console.log(res.data)
//   console.log(res.returnCode)
//   console.log(res.success)
// })
//位置调换解决刷新后找不到页面
setupStore()

const app = createApp(App)
app.use(store)
app.use(router)
app.use(globalRegister)

// 国际化
app.use(ElementPlus, {
  locale: zhCn
})

app.mount('#app')
