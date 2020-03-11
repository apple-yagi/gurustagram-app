import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  login(email, password) {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
          setTimeout(function () {
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
              .then(() => {
                resolve(firebase.auth().signInWithEmailAndPassword(email, password))
              })
              .catch(err => {
                reject("認証状態の永続化に失敗しました")
              })
          })
        })
        .catch(err => {
          reject("ログインに失敗しました")
        })
    })
  },

  signOut() {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}