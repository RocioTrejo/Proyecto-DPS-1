// Importa funciones necesarias desde Firestore
// src/services/projectService.js

import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore';

import { db } from './firebaseConfig';

const PROJECTS_COLLECTION = 'projects';

/**
 * Obtiene todos los proyectos desde Firestore
 * @returns {Promise<Array>} Lista de proyectos con sus datos y ID
 */
export async function getProjects() {
  try {
    const querySnapshot = await getDocs(collection(db, PROJECTS_COLLECTION));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error al obtener proyectos desde Firestore:', error);
    return [];
  }
}

/**
 * Agrega un nuevo proyecto a Firestore
 * @param {Object} project - Objeto con los datos del proyecto (name, createdAt, createdBy, users)
 */
export async function addProject(project) {
  try {
    await addDoc(collection(db, PROJECTS_COLLECTION), project);
    console.log('Proyecto agregado exitosamente');
  } catch (error) {
    console.error('Error al agregar el proyecto a Firestore:', error);
  }
}

/**
 * Actualiza un proyecto existente
 * @param {string} id - ID del documento del proyecto
 * @param {Object} data - Datos a actualizar (name, users, etc.)
 */
export async function updateProject(id, data) {
  try {
    const projectRef = doc(db, PROJECTS_COLLECTION, id);
    await updateDoc(projectRef, data);
    console.log('Proyecto actualizado correctamente');
  } catch (error) {
    console.error('Error al actualizar el proyecto:', error);
  }
}

/**
 * Elimina un proyecto de Firestore
 * @param {string} id - ID del documento a eliminar
 */
export async function deleteProject(id) {
  try {
    const projectRef = doc(db, PROJECTS_COLLECTION, id);
    await deleteDoc(projectRef);
    console.log('Proyecto eliminado correctamente');
  } catch (error) {
    console.error('Error al eliminar el proyecto:', error);
  }
}

