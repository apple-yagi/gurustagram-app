import firebase from 'firebase/app'

export default {
  getShops() {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref("Shops")
        .on("value", snapshot => {
          if (snapshot.val()) {
            resolve(snapshot.val())
          }
          else {
            reject("投稿されていません")
          }
        })
    })
  },

  postShop(shop, user) {
    return new Promise((resolve, reject) => {
      var newPostKey = firebase.database().ref("Shops").push().key

      firebase
        .database().ref("Shops/" + newPostKey).set(shop)
        .then(() => {
          firebase.database().ref("users/" + user.uid + "/posted")
            .push(newPostKey)
            .then(() => {
              resolve("投稿できました")
            })
            .catch(err => {
              reject("ユーザーの投稿登録に失敗しました")
            })
        }).catch(err => {
          reject("投稿に失敗しました")
        })
    })
  }
}