import * as types from './mutation-types'
import { Logined } from '../api'

export default {
  setCurrentUser: ({ commit }) => {
    return Logined.getCurrentUser()
      .then((user) => {
        commit(types.LOGINED, user)
      })
      .catch(err => {
        console.log(err);
      })
  }
}