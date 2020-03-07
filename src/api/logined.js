import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  getCurrentUser() {
    return firebase.auth().currentUser
  }
}