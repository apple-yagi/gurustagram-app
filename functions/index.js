const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const database = admin.database();
const bucket = admin.storage().bucket();

exports.countShops = functions.database.ref(`/shops`).onWrite((change, context) => {
  //変更後のshops要素を取得
  const data = change.after.val();
  //子要素の数をカウント
  const count = Object.keys(data).length;
  //カウントした件数を、shops_countに設定
  return change.after.ref.parent.child('shops_count').set(count);
});

exports.deleteUser = functions.auth.user().onDelete(user => {
  const uid = user.uid
  const userDatabaseRef = database.ref(`/users/${uid}`);
  const userPhotoNameDatabaseRef = database.ref(`/users/${uid}/photoName`);
  return userPhotoNameDatabaseRef.once('value', snapshot => {
    if (snapshot.val()) {
      const photoName = snapshot.val()
      bucket.file(`${uid}/${photoName}`).delete()
    }
    return userDatabaseRef.set(null)
  })
})
