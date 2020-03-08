import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  getCurrentUser() {
    return new Promise((resolve, reject) => {
      const user = firebase.auth().currentUser
      setTimeout(function () {
        if (user) {
          resolve(user)
        }
        else {
          reject("userが取得できませんでした")
        }
      }, 1000)
    })
  }
}