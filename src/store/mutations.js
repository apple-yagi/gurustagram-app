import * as types from './mutation-types'

export default {
  [types.LOGINED](state, payload) {
    state.currentUser = payload
  },

  [types.SEARCH_SHOPS](state, payload) {
    state.shops = payload
  }
}