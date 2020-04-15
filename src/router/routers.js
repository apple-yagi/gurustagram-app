import GstHomeView from '@/views/GstHomeView'
import GstLoginView from '@/views/GstLoginView'
import GstPostView from '@/views/GstPostView'
import GstSignupView from '@/views/GstSignupView'
import GstAccountView from '@/views/GstAccountView'
import GstSearchView from '@/views/GstSearchView'

export default [{
    path: '/',
    component: GstHomeView,
  },
  {
    path: '/post',
    component: GstPostView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/mypage',
    component: GstAccountView,
    meta: {
      requiresAuth: true
    }
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
    path: '/search',
    component: GstSearchView
  },
  {
    path: '*',
    redirect: '/'
  }
]
