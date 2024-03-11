import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAEDO-NsqdSkkzQ7Kn43iOU0YVldvG78k4",
  authDomain: "ai-hub-83c63.firebaseapp.com",
  projectId: "ai-hub-83c63",
  storageBucket: "ai-hub-83c63.appspot.com",
  messagingSenderId: "718727500173",
  appId: "1:718727500173:web:c400eb6820874d02efedc4",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
