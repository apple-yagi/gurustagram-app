import firebase from 'firebase/app'

export default {
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