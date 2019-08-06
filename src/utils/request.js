import axios from 'axios'
import { Message } from 'element-ui'

const CONFIG = require('../../env/config.js')

// create an axios instance
const service = axios.create({
  baseURL: CONFIG.BASE_API, // api的base_url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    // if (store.getters.token) {
    //   // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    //   config.headers['Authorization'] = 'bearer ' + store.getters.token
    // }
    // "Accept":"application/json, text/plain
    config.headers['Accept'] = 'application/json'

    return config
  },
  error => {
    // Do something with request error
    // console.log(error) // for debug
    Promise.reject(error)
  }
)
// respone interceptor
service.interceptors.response.use(
  // response => response,
  response => {
    if (response.data.data === 501) {
      store.dispatch('LoginByUsername', { username: store.getters.loginParam.accountname, password: store.getters.loginParam.password }).then((res) => {
        if (res.data.code === 200) {
          location.reload()
        } else {
          Message({
            message: res.data.message,
            type: 'error',
            duration: 5 * 1000
          })
        }
      })
    } else if (response.data.code === 415) {
      storagelib.del('token')
      storagelib.del('loginParam')
      storagelib.del('roles')
      location.href = '/login'
      return Promise.reject('error')
    } else {
      return response
    }
  },
  error => {
    console.log(error,'-----------------')
    if (error && error.response) {
        console.log(error.response.status, '=======error.response.status====')
      switch (error.response.status) {
        case 401:
          store.dispatch('LoginByUsername', { username: store.getters.loginParam.accountname, password: store.getters.loginParam.password }).then((res) => {
            if (res.data.code === 200) {
            //  location.reload()
            } else {
              Message({
                message: res.data.message,
                type: 'error',
                duration: 5 * 1000
              })
            }
          })
          break
      }
    } else if (error) {
    //  console.log('err' + error) // for debug
      Message({
        message: '请求超时，请联系运维',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    } else {
    //  console.log('err' + error) // for debug
      Message({
        message: '请求超时，请联系运维',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
  }
)

export default service

