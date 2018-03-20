import firebase from 'firebase';
import firebaseui from 'firebaseui';

import DB_CONFIG from './config';

firebase.initializeApp(DB_CONFIG);

export default firebase;
export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();

export const GithubAuthProvider = new firebase.auth.GithubAuthProvider();
export const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const FacebookAuthProvider = new firebase.auth.FacebookAuthProvider();

// firebase helper function

/**
 * user data scheme
 * uid
 * email,
 * display_name,
 * avatar,
 * features
 *  karma_disabled
 *  restriction
 *  karma_vacation
 *  dateist_lang
 *  beta
 *  has_push_reminders
 *  dateist_inline_disabled,
 * 
 */
export const writeUserData = ({ uid, email, displayName, photoURL, metadata}) => {
  let userRef = database.ref('users').child(uid);

  userRef.set({
    is_premium: false,
    next_week: 0,
    daily_goal: null,
    completed_today: 0,
    completed_count: 0,
    uid,
    email,
    display_name: displayName,
    avatar: photoURL,
    join_date: metadata.creationTime,
    last_signIn_time: null,
    theme: 0,
    weekly_goal: 0,
    mobile_number: null,
    mobile_host: null,
    features: {
      karma_disabled: 1,
      restriction: 0,
      karma_vacation: false,
      dateist_lang: null,
      beta: 1,
      has_push_reminders: false
    }
  })
}

export const addTodoItem = ({ uid, content, created_at, due }) => {
  let itemRef = database.ref('items').child(uid).push();
  
  itemRef.set({
    uid,
    content,
    created_at,
    is_completed: false,
    due,
    priority: 1,
    indent: 1,
    item_order: 0,
    labels: null,
    checked: false,
    in_history: 0,
    assigned_by_uid: null,
    responsible_by_uid: null,
    all_notes_fetched: true,
    project_id: null,
    day_order: -1,
    is_deleted: 0
  });
}