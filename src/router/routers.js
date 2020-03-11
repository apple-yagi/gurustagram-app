import GstHome from '@/views/GstHome.vue'
import GstLoginView from '@/views/GstLoginView'
import GstPostView from '@/views/GstPostView'
import GstSignupView from '@/views/GstSignupView'
import GstRegisterProfile from '@/views/GstRegisterProfile'
import GstAccountView from '@/views/GstAccountView'

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
    path: '/account',
    component: GstAccountView,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    component: GstLoginView
  },
  {
    path: '/signup',
    component: GstSignupView
  },
  {
    path: '/profile',
    component: GstRegisterProfile
  },
  {
    path: '*',
    redirect: '/'
  }
]
