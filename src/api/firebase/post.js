import firebase from 'firebase/app'

export default {
  addShop(shop) {
    const Shops = firebase.database().ref("Shops/");
    Shops
      .push({
        shop
      })
  }
}