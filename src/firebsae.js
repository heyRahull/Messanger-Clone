import firebase from "firebase";

const fireBaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCb4xpJvF4h86yDwCNqBiNiOhAKrXJ9Il4",
  authDomain: "messanger-clone-60be2.firebaseapp.com",
  projectId: "messanger-clone-60be2",
  storageBucket: "messanger-clone-60be2.appspot.com",
  messagingSenderId: "925466703863",
  appId: "1:925466703863:web:6eb9db969fb84a04fe60f2",
});

const db = fireBaseApp.firestore();
export default db;
