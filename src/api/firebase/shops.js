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

  postShop(shop) {
    return new Promise((resolve, reject) => {
      firebase
        .database().ref("Shops")
        .push(shop)
        .then(() => {
          resolve("投稿できました")
        }).catch(err => {
          reject("投稿に失敗しました")
        })
    })
  }
}