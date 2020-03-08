import * as types from './mutation-types'
import { Logined, Gurunavi } from '../api'

export default {
  setCurrentUser: ({ commit }) => {
    return Logined.getCurrentUser()
      .then((user) => {
        commit(types.LOGINED, user)
      })
      .catch(err => {
        console.log(err);
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
  }
}