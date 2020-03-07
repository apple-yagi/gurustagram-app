import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  login(email, password) {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
          resolve()
        })
        .catch(err => {
          reject(new Error(err.message || err.response))
        })
    })
  }
}