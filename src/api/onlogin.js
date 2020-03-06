import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  onlogin() {
    return firebase.auth().currentUser
  }
}