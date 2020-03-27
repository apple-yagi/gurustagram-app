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

  async updateProfile(displayName, imageFile) {
    var photoURL = null
    var imageFileName = null
    var user = firebase.auth().currentUser;

    if (imageFile != process.env.VUE_APP_ACCOUNT_IMAGE_DEFAULT && imageFile != user.photoURL) {
      await this.putImageToStorage(user, imageFile)
        .then(url => {
          photoURL = url
        })
      var imageFileName = imageFile.name
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
          this.setUserInfo(user, imageFileName)
            .then(() => {
              resolve()
            })
            .catch(error => {
              reject(error)
            })
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  putImageToStorage(user, imageFile) {
    var storageRef = firebase.storage().ref();
    var moutainsRef = storageRef.child(user.uid + "/" + imageFile.name);

    return new Promise((resolve, reject) => {
      moutainsRef.put(imageFile).then(() => {
        moutainsRef.getDownloadURL()
          .then(url => {
            resolve(url)
          })
          .catch(error => {
            console.log("putImageToStorage Error")
            reject(error)
          })
      })
        .catch(err => {
          console.log("putImageToStorage Error")
        })
    })
  },

  setUserInfo(user, imageFileName) {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref("/users/" + user.uid)
        .update({
          name: user.displayName,
          email: user.email,
          photoName: imageFileName,
          photoURL: user.photoURL
        })
        .then(() => {
          resolve()
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