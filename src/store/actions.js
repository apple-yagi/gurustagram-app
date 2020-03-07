import * as types from './mutation-types'
import { Logined } from '../api'

export default {
  setCurrentUser: ({ commit }) => {
    return commit(types.LOGINED, Logined.getCurrentUser)
  }
}