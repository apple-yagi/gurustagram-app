import * as types from './mutation-types'

export default {
  [types.LOGINED](state, payload) {
    state.currentUser = payload
  },

  [types.SEARCH_SHOPS](state, payload) {
    state.searchShops = payload
  },

  [types.SET_SHOPS](state, payload) {
    state.postedShops = payload
  }
}