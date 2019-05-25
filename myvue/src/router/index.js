import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Upload from '@/components/Upload'
import SpecialPicture from '@/components/SpecialPicture'
import Time from '@/components/Time'

Vue.use(Router)

export default new Router({
  base:'/ROOT/',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/Home/SpecialPicture',
          name: 'SpecialPicture',
          component: SpecialPicture
        },
        {
          path: '/Home/Upload',
          name: 'Upload',
          component: Upload
        },
        {
          path: '/Home/Time',
          name: 'Time',
          component: Time
        }
      ]
    }

  ]
})
