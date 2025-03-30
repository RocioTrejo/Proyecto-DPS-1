import sqlite3 from 'sqlite3';
import { open } from 'sqlite';


// Configuración de la base de datos SQLite
export async function openDb() {
  return open({
    filename: './database.sqlite', // Archivo de la base de datos
    driver: sqlite3.Database,
  });
}

// Inicializar la tabla de usuarios si no existe
export async function initializeDb() {
  const db = await openDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      role TEXT NOT NULL
    )
  `);
}