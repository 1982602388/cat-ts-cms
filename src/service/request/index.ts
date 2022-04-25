import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { CCRequestConfig, CCRequestInterceptors } from './type'

class CCRequest {
  instance: AxiosInstance

  interceptors?: CCRequestInterceptors

  constructor(config: CCRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)

    // 保存基本信息
    this.interceptors = config.interceptors

    // 使用拦截器
    // 1.从config中取出的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
    // 2.添加所有的实例都有的拦截器
    this.instance.interceptors.request.use((config) => {
      console.log('所有的实例都有的拦截器：请求成功')
      return config
    })
    this.instance.interceptors.response.use((res) => {
      console.log('所有的实例都有的拦截器：响应成功')
      return res
    })
  }

  request(config: CCRequestConfig): void {
    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(config)
    }
    this.instance.request(config).then((res) => {
      if (config.interceptors?.responseInterceptor) {
        res = config.interceptors.responseInterceptor(res)
      }

      console.log(res)
    })
  }
}

export default CCRequest
