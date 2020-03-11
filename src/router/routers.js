import GstHome from '@/views/GstHome.vue'
import GstLoginView from '@/views/GstLoginView'
import GstPostView from '@/views/GstPostView'

export default [
  {
    path: '/',
    component: GstHome,
  },
  {
    path: '/post',
    component: GstPostView,
    meta: { requiresAuth: true }
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
