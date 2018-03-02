import firebase from 'firebase';
import DB_CONFIG from './config';

firebase.initializeApp(DB_CONFIG);

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const GithubAuthProvider = new firebase.auth.GithubAuthProvider();
export const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const FacebookAuthProvider = new firebase.auth.FacebookAuthProvider();
