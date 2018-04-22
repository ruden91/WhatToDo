import * as firebase from "firebase";

import DB_CONFIG from "./config";
import Alert from "react-s-alert";

firebase.initializeApp(DB_CONFIG);

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();

const authProviderList = {
  github: new firebase.auth.GithubAuthProvider(),
  google: new firebase.auth.GoogleAuthProvider(),
  facebook: new firebase.auth.FacebookAuthProvider()
};

export const signInAnonymously = (): void => {
  auth.signInAnonymously().catch(function(error) {
    // Handle Errors here.
    // var errorCode = error.code;
    // var errorMessage = error.message;
    // ...
  });
};

export const createUserWithEmail = (email: string, password: string): void => {
  auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
    Alert.warning(error.message, {
      position: "top",
      effect: "scale",
      beep: false,
      timeout: 3000
    });
  });
};

export const signInWithEmail = (email: string, password: string): void => {
  auth.signInWithEmailAndPassword(email, password).catch((error: any): void => {
    Alert.warning(error.message, {
      position: "top",
      effect: "scale",
      beep: false,
      timeout: 3000
    });
  });
};

export const authProvider = (provider: any) => {
  auth
    .signInWithPopup(authProviderList[provider])
    .then(result => {})
    .catch(error => {
      Alert.warning(error.message, {
        position: "top",
        effect: "scale",
        beep: false,
        timeout: 3000
      });
    });
};

// // firebase logout function
export const signOut = (): void => {
  auth.signOut();
};

// // firebase helper function

// /**
//  * user data scheme
//  * uid
//  * email,
//  * display_name,
//  * avatar,
//  * features
//  *  karma_disabled
//  *  restriction
//  *  karma_vacation
//  *  dateist_lang
//  *  beta
//  *  has_push_reminders
//  *  dateist_inline_disabled,
//  *
//  */
// export const saveUserData = () => {
//   let { uid, email, displayName, photoURL, metadata } = auth.currentUser;
//   let userRef = database.ref('users').child(uid);

//   userRef.set({
//     is_premium: false,
//     next_week: 0,
//     daily_goal: 10,
//     completed_today: 0,
//     completed_count: 0,
//     uid,
//     email,
//     display_name: displayName,
//     avatar: photoURL,
//     join_date: metadata.creationTime,
//     last_signIn_time: null,
//     theme: 0,
//     weekly_goal: 0,
//     mobile_number: null,
//     mobile_host: null,
//     features: {
//       karma_disabled: 1,
//       restriction: 0,
//       karma_vacation: false,
//       dateist_lang: null,
//       beta: 1,
//       has_push_reminders: false
//     }
//   });
// };

// export const addTodoItem = ({ uid, content, created_at, due }) => {
//   let itemRef = database
//     .ref('items')
//     .child(uid)
//     .push();

//   itemRef.set({
//     uid,
//     content,
//     created_at,
//     is_completed: false,
//     completed_at: null,
//     due,
//     priority: 1,
//     indent: 1,
//     item_order: 0,
//     labels: null,
//     checked: false,
//     in_history: 0,
//     assigned_by_uid: null,
//     responsible_by_uid: null,
//     all_notes_fetched: true,
//     project_id: null,
//     day_order: -1,
//     is_deleted: 0
//   });
// };

// // user의 특정 필드 값을 가져오는 함수
// export const fetchSpecificUserData = (field = null) => {
//   // field 파라미터가 null일 때 예외처리
//   if (field === null) {
//     throw '필드값을 넣어주세요.';
//   }
//   let result;
//   let { uid } = auth.currentUser;
//   let userRef = database.ref('users').child(uid);

//   userRef
//     .child(field)
//     .once('value')
//     .then(snap => {
//       return snap.val();
//     });
// };

// export const updateSpecificUserData = (field = null, data) => {
//   // field 파라미터가 null일 때 예외처리
//   if (field === null) {
//     throw '필드값을 넣어주세요.';
//   }
//   let updateData = {};
//   let { uid } = auth.currentUser;
//   let userRef = database.ref('users').child(uid);

//   updateData[field] = data;

//   userRef.update(updateData);
// };

// /**
//  * uid에 해당하는 전체 데이터를 받아오는 함수
//  *
//  * @param {string} uid
//  * @return {Array} user, items, settings dataSet
//  */
interface fetchFirebaseUserData {}

export const fetchFirebaseUserData = async (uid: string) => {
  return await Promise.all([
    fetchFirebaseUserInfoData(uid),
    fetchFirebaseUserTodoItemsData(uid),
    fetchFirebaseUserSettingsData(uid)
  ]);
};

// ////////////////// firebase 함수를 Promise로 사용하기 위해 Promise 객체로 변환 //////////////////
// /**
//  * uid에 해당하는 유저 데이터를 받아오는 함수
//  *
//  * @param {string} uid
//  * @return {Object} user Data
//  */
export const fetchFirebaseUserInfoData = (uid: string) => {
  let userRef = database.ref("users").child(uid);
  return new Promise(resolve => {
    userRef.on("value", (snap: any) => resolve(snap.val()));
  });
};

// /**
//  * uid에 해당하는 유저 아이템 목록 데이터를 받아오는 함수
//  *
//  * @param {string} uid
//  * @return {Object} user items Data
//  */
export const fetchFirebaseUserTodoItemsData = (uid: string) => {
  let userRef = database.ref("items").child(uid);
  return new Promise(resolve => {
    userRef.on("value", (snap: any) => resolve(snap.val()));
  });
};

// /**
//  * uid에 해당하는 유저 세팅 데이터를 받아오는 함수
//  *
//  * @param {string} uid
//  * @return {Object} user Data
//  */
export const fetchFirebaseUserSettingsData = (uid: string) => {
  let userRef = database.ref("settings").child(uid);
  return new Promise(resolve => {
    userRef.on("value", (snap: any) => resolve(snap.val()));
  });
};

export const createItem = (content: string, due: any): void => {
  let { uid }: any = auth.currentUser;
  let ItemRef = database
    .ref("items")
    .child(uid)
    .push();

  ItemRef.set({
    uid,
    content,
    created_at: new Date().getTime(),
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
    is_deleted: 0,
    project: "shopping"
  });
};

export const removeItem = (uniqueKey: string): void => {
  let { uid }: any = auth.currentUser;

  database
    .ref("items")
    .child(uid)
    .child(uniqueKey)
    .remove();
};

export const updateItemContent = (
  uniqueKey: string,
  content: string,
  due: any
): void => {
  let { uid }: any = auth.currentUser;

  database
    .ref("items")
    .child(uid)
    .child(uniqueKey)
    .update({
      content,
      due
    });
};

export const updateItem = (uniqueKey: string): void => {
  let { uid }: any = auth.currentUser;

  database
    .ref("items")
    .child(uid)
    .child(uniqueKey)
    .update({
      is_completed: true,
      completed_at: new Date().getTime()
    });
};

export const postponeTodoItemData = (uniqueKey: string, due: string): void => {
  let { uid }: any = auth.currentUser;

  database
    .ref("items")
    .child(uid)
    .child(uniqueKey)
    .update({
      due
    });
};

export const createProjectItem = (items: any[]) => {
  let { uid }: any = auth.currentUser;
  let projectRef = database.ref("projects").child(uid);

  projectRef.set(items);
};

////////////// 초기데이터 설정 ////////////////////////////////
export const initProjectItems = () => {
  let { uid }: any = auth.currentUser;
  let projectRef = database.ref("projects").child(uid);

  projectRef.set([
    {
      name: "쇼핑",
      filterIndex: 0,
      colorIndex: 0
    },
    {
      name: "심부름",
      filterIndex: 1,
      colorIndex: 1
    },
    {
      name: "일",
      filterIndex: 2,
      colorIndex: 2
    },
    {
      name: "개인",
      filterIndex: 3,
      colorIndex: 3
    }
  ]);
};
