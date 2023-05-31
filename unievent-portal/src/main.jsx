import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBL89sJisvU3HhXwcy9CSRaNc_U-4Rouys",
  authDomain: "fyp-unievent.firebaseapp.com",
  projectId: "fyp-unievent",
  storageBucket: "fyp-unievent.appspot.com",
  messagingSenderId: "380055339576",
  appId: "1:380055339576:web:70c375c422a53520acdccd"
};

const app = initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);