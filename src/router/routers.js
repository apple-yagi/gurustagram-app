import GstHome from '@/views/GstHome.vue'
import GstLoginView from '@/views/GstLoginView'
import GstPostView from '@/views/GstPostView'

export default [
  {
    path: '/',
    component: GstHome,
    meta: { requiresAuth: true }
  },
  {
    path: '/post',
    component: GstPostView
  },
  {
    path: '/login',
    component: GstLoginView
  },
  {
    path: '*',
    redirect: '/'
  }
]
