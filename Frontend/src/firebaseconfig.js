import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDEfUbyxieHU0W24ypqqqkTKNB7TaXTsNw",
  authDomain: "acebot-60192.firebaseapp.com",
  projectId: "acebot-60192",
  storageBucket: "acebot-60192.firebasestorage.app",
  messagingSenderId: "675922640696",
  appId: "1:675922640696:web:87a465da7096caeabbcbcd",
  measurementId: "G-LEJVX41G22"
};

const app=initializeApp(firebaseConfig);
const auth=getAuth(app);
export {auth};