import store from '../store'

export const authorizeToken = (to, from, next) => {
  store.dispatch("setCurrentUser")

  setTimeout(function () {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!store.state.currentUser) {
        next({ path: '/login' })
      } else {
        next()
      }
    } else {
      next()
    }
  }, 1000)
}
