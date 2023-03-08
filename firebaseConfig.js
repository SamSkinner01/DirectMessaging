import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBYyNv042RlLG5NX2gs9UI2q8y7oOjFlNc",
  authDomain: "messagingtest-c20df.firebaseapp.com",
  projectId: "messagingtest-c20df",
  storageBucket: "messagingtest-c20df.appspot.com",
  messagingSenderId: "274556607917",
  appId: "1:274556607917:web:fccee34d37db5990581524"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };