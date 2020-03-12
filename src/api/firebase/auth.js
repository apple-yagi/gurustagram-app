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
  },

  signUp(email) {
    console.log(process.env.VUE_APP_ACTION_CODE_SETTINGS_URL);


    var actionCodeSettings = {
      url: process.env.VUE_APP_ACTION_CODE_SETTINGS_URL,
      handleCodeInApp: true
    };

    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .sendSignInLinkToEmail(email, actionCodeSettings)
        .then(() => {
          window.localStorage.setItem("emailForSignIn", email);
          resolve("メールを送信しました")
        })
        .catch(error => {
          reject("登録に失敗しました")
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