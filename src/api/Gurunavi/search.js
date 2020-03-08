import axios from "axios"

export default {
  searchShops(shopName) {
    return new Promise((resolve, reject) => {
      axios
        .get(process.env.VUE_APP_GNAVI_URL, {
          params: {
            name: shopName
          }
        })
        .then(shops => {
          resolve(shops.data.rest)
        })
        .catch(err => {
          reject("お店が見つかりませんでした")
        });
    })
  }
}