import CCRequest from '../index'
import { IDataType } from '../types'

export function getPageListData(url: string, queryInfo: any) {
  return CCRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}
