import OnLogin from './onlogin'
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  login: authInfo => {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(authInfo.email, authInfo.password)
        .then(() => {
          resolve(() => ({ currentUser: OnLogin }))
        })
        .catch(err => {
          reject(new Error(err.message || err.code))
        })
    })
  }
}