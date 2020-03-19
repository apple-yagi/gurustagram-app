import firebase from 'firebase/app'

export default {
  getShops() {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref("shops")
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

  async postShop(shop, user) {
    var newPostKey = firebase.database().ref("shops").push().key

    // shopsにデータを登録
    await firebase.database().ref("shops/" + newPostKey).set(shop)
      .catch(err => {
        reject("投稿に失敗しました")
      })

    var user_posted_count = 0;
    const userRef = firebase.database().ref("users/" + user.uid)

    // 投稿したユーザーにshopのidを登録
    await userRef.child("/posted")
      .push(newPostKey)
      .catch(err => {
        reject("ユーザーの投稿登録に失敗しました")
      })

    return Promise.resolve("投稿しました")
  },

  async loadUserPostedShops(user) {
    const shopsRef = firebase.database().ref("shops/");

    // ユーザーが投稿した記事のIDを取得
    var shopIDList = await this.loadUserPostedShopsID(user)

    // ユーザーが投稿した記事のデータを取得
    var shopList = []

    for (let i = 0; i < shopIDList.length; i++) {
      firebase.database().ref("shops/" + shopIDList[i])
        .on("value", snapshot => {
          shopList.push(snapshot.val())
        })
    }

    return Promise.resolve(shopList)
  },

  loadUserPostedShopsID(user) {
    var shopIDList = []

    firebase.database().ref("users/" + user.uid + "/posted")
      .on('value', snapshot => {
        for (let post in snapshot.val()) {
          shopIDList.push(snapshot.val()[post])
        }
      })

    if (shopIDList) {
      return Promise.resolve(shopIDList)
    } else {
      return Promise.reject(null)
    }
  },

}