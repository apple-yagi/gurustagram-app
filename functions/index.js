const functions = require('firebase-functions');
const admin = require('firebase-admin');
const alogliasearch = require('algoliasearch');
admin.initializeApp();

const database = admin.database();
const bucket = admin.storage().bucket();

const algolia = alogliasearch(
  "QG7FUGGCZS",
  "0d6f7531a77a1dcccc4afdb9996777fb"
);
const index = algolia.initIndex('gurustagram-app')

const contactsRef = database.ref('/shops');
contactsRef.on('child_added', addOrUpdateIndexRecord);
contactsRef.on('child_changed', addOrUpdateIndexRecord)
contactsRef.on('child_removed', deleteIndexRecord);

function addOrUpdateIndexRecord(contact) {
  const record = contact.val();
  record.objectID = contact.key;

  index
    .saveObject(record)
    .then(() => {
      console.log('Firebase object indexed in Aloglia', record.objectID);
    })
    .catch(error => {
      console.error('Error when indexing contact into Algolia', error);
      process.exit(1);
    })
}

function deleteIndexRecord(contact) {
  const objectID = contact.key;

  index
    .deleteObject(objectID)
    .then(() => {
      console.log('Firebase object deleted from Algolia', objectID);
    })
    .catch(error => {
      console.error('Error when deleting contact from Algolia', error);
      process.exit(1);
    });
}

exports.countShops = functions.database.ref(`/shops`)
  .onWrite((change, context) => {
    //変更後のshops要素を取得
    const data = change.after.val();
    //子要素の数をカウント
    const count = Object.keys(data).length;
    //カウントした件数を、shops_countに設定
    return change.after.ref.parent.child('shops_count').set(count);
  });

exports.separateShopByArea = functions.database.ref(`/shops/{pushId}`)
  .onCreate((snapshot, context) => {
    const prefcode = snapshot.val().code.prefcode
    // const prefname = snapshot.val().code.prefname
    const pushId = context.params.pushId
    const areaRef = database.ref(`/area/${prefcode}`);
    return areaRef.push(pushId)
  })

exports.deleteUser = functions.auth.user()
  .onDelete(user => {
    const uid = user.uid;
    const userDatabaseRef = database.ref(`/users/${uid}`);
    const userPhotoNameDatabaseRef = database.ref(`/users/${uid}/photoName`);
    return userPhotoNameDatabaseRef.once('value', snapshot => {
      if (snapshot.val()) {
        const photoName = snapshot.val();
        bucket.file(`${uid}/${photoName}`).delete().then(() => {
          return userDatabaseRef.set(null)
        })
      }
      else {
        return userDatabaseRef.set(null)
      }
    })
  });
