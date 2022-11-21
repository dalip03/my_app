import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAu10FPOBbr_aOUCmoOGJHSS_i8wl4OgNU",
    authDomain: "project1-3e7fe.firebaseapp.com",
    projectId: "project1-3e7fe",
    storageBucket: "project1-3e7fe.appspot.com",
    messagingSenderId: "696357853556",
    appId: "1:696357853556:web:b2380f09aec9c0c5d13421"
  };

  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const storage = firebase.storage();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  export {db , storage , auth , provider}
