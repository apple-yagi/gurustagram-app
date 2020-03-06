import * as types from './mutation-types'
import { Auth } from '../api'

export default {
  login: ({ commit }, authInfo) => {
    return Auth.login(authInfo)
      .then(({ currentUser }) => {
        commit(types.AUTH_LOGIN, { currentUser })
      })
      .catch(err => { throw err })
  }
}