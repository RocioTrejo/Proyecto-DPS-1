// Página de login que valida usuarios desde Firebase Firestore (no Firebase Auth)

import { useAuth } from '@context/AuthContext';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '@styles/login.module.css';

// Importa funciones de Firebase Firestore
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from 'src/services/firebaseConfig'; // Asegúrate que esta ruta sea correcta

export default function AdminLoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Función para validar las credenciales contra Firestore
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Buscar en Firestore al usuario con ese nombre y contraseña
      const q = query(
        collection(db, 'users'),
        where('username', '==', username),
        where('password', '==', password)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Usuario encontrado
        const userData = querySnapshot.docs[0].data();
        login(username, userData.role); // Guarda sesión
        router.push('/admin'); // Redirige al panel
      } else {
        // Usuario no encontrado o credenciales incorrectas
        setError('Usuario o contraseña incorrectos.');
      }
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      setError('Ocurrió un error al iniciar sesión.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.loginTitle}>Inicio de Sesión</h2>
      <div className={styles.formContainer}>
        <form onSubmit={handleLogin}>
          <label htmlFor="username" className={styles.label}>
            Usuario
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ingresa tu usuario"
            className={styles.inputField}
            required
          />

          <label htmlFor="password" className={styles.label}>
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
            className={styles.inputField}
            required
          />

          {error && <p className={styles.errorMessage}>{error}</p>}

          <button type="submit" className={styles.loginButton} disabled={loading}>
            {loading ? 'Validando...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  );
}