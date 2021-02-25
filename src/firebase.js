import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDh73zS6N9eeK6OpqZYv3tX_Ty9MsE0Zmg",
    authDomain: "snapchat-clone-4073b.firebaseapp.com",
    projectId: "snapchat-clone-4073b",
    storageBucket: "snapchat-clone-4073b.appspot.com",
    messagingSenderId: "836443076477",
    appId: "1:836443076477:web:52c5763f2f587d821a7e14"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  const provider = new firebase.auth.GoogleAuthProvider();


  export { db, auth, storage, provider};
  