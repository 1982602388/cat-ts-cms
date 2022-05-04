import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import 'normalize.css'
import './assets/css/index.less'
//导入全局注册的插件
import { globalRegister } from './global'

//导入封装的axios
import CCRequest1 from './service'

// CCRequest1.request({
//   url: '/home/multidata',
//   interceptors: {
//     requestInterceptor: (config) => {
//       console.log("单独请求拦截config");
//       return config

//     },
//     responseInterceptor: res => {
//       console.log("单独响应拦截的res");
//       return res

//     }
//   }
// })
CCRequest1.request({
  url: '/home/multidata'
})

interface DataType {
  data: any
  returnCode: string
  success: boolean
}
CCRequest1.get<DataType>({
  url: '/home/multidata',
  showLoading: false
}).then((res) => {
  console.log(res.data)
  console.log(res.returnCode)
  console.log(res.success)
})

createApp(App).use(store).use(router).use(globalRegister).mount('#app')
