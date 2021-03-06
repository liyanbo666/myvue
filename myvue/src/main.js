// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css' // 使用 CSS
import axios from 'axios'
import "../config/http"
import $ from 'jquery'
// import './utils/three.min'
//import '../../my-theme/d';//使用iview的主题
Vue.prototype.$axios = axios    //使用axios
Vue.use(iView)
Vue.config.productionTip = false




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
