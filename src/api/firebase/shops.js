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

    // ユーザーの投稿数を取得
    await userRef.child("/posted_count")
      .on('value', snapshot => {
        if (snapshot.val()) {
          console.log(snapshot.val())
          user_posted_count = snapshot.val()
        }
      })

    // ユーザーの投稿数を更新
    await userRef.child("/posted_count")
      .set(user_posted_count)
      .catch(err => {
        reject("投稿数の更新に失敗しました")
      })

    return Promise.resolve("投稿しました")
  },

  // loadUserPostedShop(user) {
  //   return new Promise((resolve, reject) => {
  //     var userRef = firebase.database().ref("users/" + user.id + "/posted")

  //     userRef.
  //   })
  // }
}