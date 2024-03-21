// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

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
//agregar a firestore
export const addOrEditareas = async (product) => {
  await addDoc(collection(db, "products"), {
    product,
  });
  console.log("campos agg");
};
//traer los datos de fireSore

export const querySnapshot = async () => {
  await getDocs(collection(db, "products"));
};
