import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCl4TOMG_Wm2mJNptlONAfwbLcrOAE3sRw",
  authDomain: "reminder-3c1e8.firebaseapp.com",
  projectId: "reminder-3c1e8",
  storageBucket: "reminder-3c1e8.appspot.com",
  messagingSenderId: "873607580475",
  appId: "1:873607580475:web:9cdd1da9f67d4cfc4b451e",
  measurementId: "G-XNJ84RNM0W",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
