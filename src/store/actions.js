import * as types from './mutation-types'
import { Gurunavi, Shops, Auth } from '../api'

export default {
  setCurrentUser: ({ commit }) => {
    return Auth.getCurrentUser()
      .then((user) => {
        commit(types.LOGINED, user)
      })
  },

  searchShops: ({ commit }, shopName) => {
    return Gurunavi.searchShops(shopName)
      .then((shops) => {
        commit(types.SEARCH_SHOPS, shops)
      })
      .catch(err => {
        throw err
      })
  },

  setShops: ({ commit }) => {
    return Shops.getShops()
      .then((shops) => {
        commit(types.SET_SHOPS, shops)
      })
      .catch(err => {
        throw err
      })
  },

  signOut: ({ commit }) => {
    return Auth.signOut()
      .then(() => {
        commit(types.SIGN_OUT)
      })
      .catch(err => {
        throw err
      })
  },

  setCurrentUserPostedShops: ({ commit }, user) => {
    return Shops.loadUserPostedShops(user)
      .then(shops => {
        commit(types.CURRENT_USER_POSTED_SHOPS, shops)
      })
      .catch(err => {
        throw err
      })
  }
}