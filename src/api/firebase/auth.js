import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'

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
      }, 1000)
    })
  },

  signUp(email, password) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
          resolve(user)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  updateProfile(displayName, imageFile) {
    var photoURL = null
    var user = firebase.auth().currentUser;

    if (imageFile != process.env.VUE_APP_ACCOUNT_IMAGE_DEFAULT) {
      var storageRef = firebase.storage().ref();
      var moutainsRef = storageRef.child(user.uid + "/" + imageFile.name);

      console.log("putImageToStorage")

      moutainsRef.put(imageFile).then(() => {
        console.log("put success")
        moutainsRef.getDownloadURL()
          .then(url => {
            console.log("getDownload")
            photoURL = url
          })
          .catch(error => {
            console.log(error)
          })
      })
    }
    else {
      photoURL = imageFile
    }

    return new Promise((resolve, reject) => {
      user.updateProfile({
        displayName: displayName,
        photoURL: photoURL
      })
        .then(() => {
          resolve(user)
        })
        .catch(error => {
          reject(error)
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
  },

  setUserInfo(user) {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref("/users/" + user.uid)
        .set({
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        })
        .then(user => {
          resolve(user)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  getUserInfo(uid) {
    return new Promise((resolve, reject) => {
      firebase.database().ref("/users/" + uid)
        .on("value", snapshot => {
          if (snapshot.val()) {
            resolve(snapshot.val())
          } else {
            reject("no Account")
          }
        })
    })
  }
}