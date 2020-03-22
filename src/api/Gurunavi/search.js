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
        .catch(error => {
          const errorStatus = error.response.status;

          switch (errorStatus) {
            case 400:
              reject("不正なパラメータが指定されました");
              break;

            case 401:
              reject("不正なアクセスです");
              break;

            case 404:
              reject("お店が見つかりませんでした");
              break;

            case 405:
              reject("不正なアクセスです");
              break;

            case 429:
              reject("リクエスト回数上限超過");
              break;

            case 500:
              reject("処理中にエラーが発生しました");
              break;

            default:
              reject("不明なエラーです");
              break;
          }
        });
    })
  }
}