import firebase from 'firebase';
import firebaseService from 'firebase';

class AuthService {
  login(providerName) {
    const authProvider = new firebase.auth[`${providerName}AuthProvider`]();
    return firebaseService.auth().signInWithPopup(authProvider);
  }

  logout() {
    firebase.auth().signOut();
  }

  // loginCurrent() {
  //   const loginCurrentUser = new firebase.auth().currentUser;
  //   return firebaseService.auth().currentUser;
  // }

  loginCurrent() {
    return firebaseService.auth();
  }

  onAuthChange(onUserChanged) {
    firebase.auth().onAuthStateChanged((user) => {
      onUserChanged(user);
    });
  }
}

export default AuthService;
