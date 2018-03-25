import firebase from 'firebase';

import DB_CONFIG from './config';

firebase.initializeApp(DB_CONFIG);

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();

export const authProviderList = {
  github: new firebase.auth.GithubAuthProvider(),
  google: new firebase.auth.GoogleAuthProvider(),
  facebook: new firebase.auth.FacebookAuthProvider()
};

export const createUserWithEmail = (email, password) => {
  auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(error);
  });
};

export const authEmailAndPassword = (email, password) => {
  auth.signInWithEmailAndPassword(email, password).catch(error => {
    console.log(error);
  });
};

export const authProvider = provider => {
  auth
    .signInWithPopup(authProviderList[provider])
    .then(result => {
      console.log(provider);
      console.log('가즈아아아아');
      console.log(result);
    })
    .catch(error => {});
};
// firebase logout function
export const signOut = () => {
  auth.signOut();
};

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
export const writeUserData = ({
  uid,
  email,
  displayName,
  photoURL,
  metadata
}) => {
  let userRef = database.ref('users').child(uid);

  userRef.set({
    is_premium: false,
    next_week: 0,
    daily_goal: 10,
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
  });
};

export const checkUserData = () => {
  setTimeout(() => {
    return 'anskldf';
  }, 1500);
};

export const addTodoItem = ({ uid, content, created_at, due }) => {
  let itemRef = database
    .ref('items')
    .child(uid)
    .push();

  itemRef.set({
    uid,
    content,
    created_at,
    is_completed: false,
    completed_at: null,
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
};

// user의 특정 필드 값을 가져오는 함수
export const fetchSpecificUserData = (field = null) => {
  // field 파라미터가 null일 때 예외처리
  if (field === null) {
    throw '필드값을 넣어주세요.';
  }
  let result;
  let { uid } = auth.currentUser;
  let userRef = database.ref('users').child(uid);

  userRef
    .child(field)
    .once('value')
    .then(snap => {
      return snap.val();
    });
};

export const updateSpecificUserData = (field = null, data) => {
  // field 파라미터가 null일 때 예외처리
  if (field === null) {
    throw '필드값을 넣어주세요.';
  }
  let updateData = {};
  let { uid } = auth.currentUser;
  let userRef = database.ref('users').child(uid);

  updateData[field] = data;

  userRef.update(updateData);
};
