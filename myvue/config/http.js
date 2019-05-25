
/**
 * http配置
 */
// 引入axios以及element ui中的loading和message组件
import axios from 'axios'
import iView from 'iview'
import router from '../src/router'
//import { Loading, Message } from 'element-ui'
// 超时时间
axios.defaults.timeout = 5000
//axios.defaults.headers.post['Content-Type'] = 'application/json'
// http请求拦截器
axios.interceptors.request.use(config => {
  //iview loading
  iView.LoadingBar.start()
  return config
}, error => {
  iView.LoadingBar.error()
  return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use(data => {
  // 响应成功关闭loading
  iView.LoadingBar.finish()
  return data
}, error => {
  iView.LoadingBar.error()
  if (error.response) {
    switch (error.response.status) {
      case 401:
        // 返回 401 清除token信息并跳转到登录页面
        //store.commit(types.LOGOUT);
        router.replace({
          path: '/Login',
          query: {redirect: router.currentRoute.fullPath}
        })
    }
  }
  return Promise.reject(error)
})

export default axios
