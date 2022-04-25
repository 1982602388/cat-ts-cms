import axios from 'axios'
import { BASE_URL, TIME_OUT } from './request/config'

axios.get('BASE_URL/get').then((res) => {
  console.log(res.data)
})
