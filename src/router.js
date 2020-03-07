import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import LoginForm from './views/GstLoginView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: LoginForm
    }
  ]
})
