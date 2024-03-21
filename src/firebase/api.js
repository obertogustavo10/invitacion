import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  doc,
  deleteDoc,
  getDoc,
  query,
  updateDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { db, storage, auth } from "./config";
import { v4 } from "uuid";

//nombre de colecccion
/* 
const collectionName = "products"; 
const collectionName = "cumpleTim";*/
const collectionName = "cumpleJesus";

//funcion que crea y guarda los documentos en la coleccion

export const addProduct = (product, collectionName) => {
  addDoc(collection(db, collectionName), { product });
};

//funcion que elimina un documento de la seleccionpor id

export const onDeleteProduct = (id) => {
  deleteDoc(doc(db, collectionName, id));
};

//funcion que trae solo un documento por id

export const getProduct = (id) => getDoc(doc(db, collectionName, id));

//funcion que obtinene toda la coleccion

export const getAllProducts = () => {
  getDocs(collection(db, collectionName));
};

//funcion para actualizar un documento de la coleccion por id

export const updateProduct = (id, product) => {
  updateDoc(doc(db, collectionName, id), { product });
};

//funcion que obtinene toda la coleccion en tiempo real fatz
export const onGetProduct = (callback) => {
  const unsub = onSnapshot(collection(db, collectionName), callback);
  return unsub;
};

//funcion que obtinene toda la coleccion en tiempo real docu
export const onGetProducts = (callback) => {
  const unsub = onSnapshot(collection(db, collectionName), callback);
  return unsub;
};
// funcion para subir un archivo(jpg, png, pdf)
const storageRef = ref(storage, v4());

export const uploadFile = (file) => uploadBytes(storageRef, file);

//funcion para traer la url de las imagenes en el storage
export const getUrlImg = () => getDownloadURL(storageRef);

//funcion para registrar usuarios
export const singUpUser = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

//funcion para ingresar con email y clave
export const logInUser = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

//funcion para cerrar seccion
export const singOutUser = () => signOut(auth);

//funcion que se actualiza automaticamente cuando hay cambios en el usuario
export const stateUser = (callback) => {
  const unsub = onAuthStateChanged(auth, callback);
  return unsub;
};

//funcion registrarse con google
const provider = new GoogleAuthProvider();
export const singUpGoogle = () => signInWithPopup(auth, provider);

//funcion para resetear la contraseña
export const resetPasswordSendEmail = (email) =>
  sendPasswordResetEmail(auth, email);
