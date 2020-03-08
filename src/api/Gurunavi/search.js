import axios from "axios"

export default {
  searchShops() {
    return new Promise((resolve, reject) => {
      axios
        .get(process.env.VUE_APP_GNAVI_URL, { params: this.gnavi_keywd })
        .then(shops => {
          resolve(shops)
        })
        .catch(err => {
          reject(new Error(err))
        });
    })
  }
}