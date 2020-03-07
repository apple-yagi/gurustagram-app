import Home from '@/views/Home.vue'
import LoginForm from '@/views/GstLoginView'

export default [
  {
    path: '/',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    component: LoginForm
  },
  {
    path: '*',
    redirect: '/'
  }
]
