import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDUe63sG0MxdSIDk4ui3SA7emJvGpYq8Ok",
  authDomain: "learning-language-6ce53.firebaseapp.com",
  projectId: "learning-language-6ce53",
  storageBucket: "learning-language-6ce53.firebasestorage.app",
  messagingSenderId: "708799915191",
  appId: "1:708799915191:web:09291bcd10aba053515932"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
