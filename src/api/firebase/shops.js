import firebase from "firebase/app";

export default {
  getShops() {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref("/shops")
        .on("value", snapshot => {
          if (snapshot.val()) {
            resolve(snapshot.val());
          } else {
            reject("投稿されていません");
          }
        });
    });
  },

  async postShop(shop, user) {
    var newPostKey = firebase
      .database()
      .ref("/shops")
      .push().key;

    // shopsにデータを登録
    await firebase
      .database()
      .ref("shops/" + newPostKey)
      .set(shop)
      .catch(err => {
        reject("投稿に失敗しました");
      });

    const userRef = firebase.database().ref("/users/" + user.uid);

    // 投稿したユーザーにshopのidを登録
    await userRef
      .child("/posted")
      .push(newPostKey)
      .catch(err => {
        reject("ユーザーの投稿登録に失敗しました");
      });

    return Promise.resolve("投稿しました");
  },

  async loadUserPostedShops(user) {
    // ユーザーが投稿した記事のIDを取得
    var shopIDList = await this.loadUserPostedShopsID(user);

    // ユーザーが投稿した記事のデータを取得
    var shopList = await this.searchPostedShops(shopIDList);

    return Promise.resolve(shopList);
  },

  async loadPostedShopsByAreaCode(areaCode) {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref("/area/" + areaCode)
        .on("value", snapshot => {
          this.searchPostedShops(snapshot.val()).then(shops => {
            resolve(shops);
          });
        });
    });
  },

  searchPostedShops(shopIDList) {
    var shopList = [];

    for (let shopID in shopIDList) {
      firebase
        .database()
        .ref("/shops/" + shopIDList[shopID])
        .on("value", snapshot => {
          shopList.push(snapshot.val());
        });
    }

    return Promise.resolve(shopList);
  },

  loadUserPostedShopsID(user) {
    return new Promise(resolve => {
      firebase
        .database()
        .ref("/users/" + user.uid + "/posted")
        .on("value", snapshot => {
          resolve(snapshot.val());
        });
    });
  }
};
