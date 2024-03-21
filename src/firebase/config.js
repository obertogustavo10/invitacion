import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHLPz3R5fo1wIZpEp5NLgR5NNS7-xfDeQ",
  authDomain: "vielma-shop.firebaseapp.com",
  projectId: "vielma-shop",
  storageBucket: "vielma-shop.appspot.com",
  messagingSenderId: "190459454528",
  appId: "1:190459454528:web:353504d54e31ac8e066ba5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
