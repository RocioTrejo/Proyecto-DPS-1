// Importa las funciones necesarias desde Firebase Firestore
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore';

// Importa la instancia de Firestore desde tu configuración
import { db } from './firebaseConfig'; // Ruta relativa (corrige errores de resolución)

// Nombre de la colección en Firestore
const USERS_COLLECTION = 'users';

/**
 * Obtiene todos los usuarios desde Firestore
 * @returns {Promise<Array>} Lista de usuarios
 */
export async function getUsers() {
  const querySnapshot = await getDocs(collection(db, USERS_COLLECTION));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
}

/**
 * Agrega un nuevo usuario a Firestore
 * @param {Object} user - Objeto con los datos del usuario (username, role, etc.)
 */
export async function addUser(user) {
  await addDoc(collection(db, USERS_COLLECTION), user);
}

/**
 * Actualiza un usuario existente en Firestore
 * @param {string} id - ID del documento del usuario
 * @param {Object} data - Datos a actualizar (por ejemplo: { username: 'nuevo' })
 */
export async function updateUser(id, data) {
  const userRef = doc(db, USERS_COLLECTION, id);
  await updateDoc(userRef, data);
}

/**
 * Elimina un usuario de Firestore
 * @param {string} id - ID del documento del usuario a eliminar
 */
export async function deleteUser(id) {
  const userRef = doc(db, USERS_COLLECTION, id);
  await deleteDoc(userRef);
}