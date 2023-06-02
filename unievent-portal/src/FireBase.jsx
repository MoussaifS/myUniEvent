
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: process.env.REACT_FIRE_BASE_KEY,
    authDomain: "fyp-unievent.firebaseapp.com",
    projectId: "fyp-unievent",
    storageBucket: "fyp-unievent.appspot.com",
    messagingSenderId: "380055339576",
    appId: "1:380055339576:web:70c375c422a53520acdccd"
  };

const app = initializeApp(firebaseConfig);
