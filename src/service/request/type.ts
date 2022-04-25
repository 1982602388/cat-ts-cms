import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface CCRequestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: AxiosResponse) => AxiosResponse
  responseInterceptorCatch?: (error: any) => any
}
export interface CCRequestConfig extends AxiosRequestConfig {
  interceptors?: CCRequestInterceptors
}
