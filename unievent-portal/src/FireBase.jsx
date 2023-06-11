// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDocs, collection, getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBL89sJisvU3HhXwcy9CSRaNc_U-4Rouys",
  authDomain: "fyp-unievent.firebaseapp.com",
  databaseURL:
    "https://fyp-unievent-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fyp-unievent",
  storageBucket: "fyp-unievent.appspot.com",
  messagingSenderId: "380055339576",
  appId: "1:380055339576:web:70c375c422a53520acdccd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

const colRef = collection(db, 'events');
const data = getDocs(colRef).then((snapshot) => {
  snapshot.forEach((doc) => {
    console.log(doc.id, '=>', doc.data());
  });
});

const auth = getAuth(app);

export { data, auth };
