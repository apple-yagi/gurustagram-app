const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.countShops = functions.database.ref(`/shops`).onWrite((change, context) => {
  //変更後のshops要素を取得
  const data = change.after.val();
  //子要素の数をカウント
  const count = Object.keys(data).length;
  //カウントした件数を、shops_countに設定
  return change.after.ref.parent.child('shops_count').set(count);
});

exports.createUser = functions.auth.user().onCreate((user) => {
  console.log(user);

})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
