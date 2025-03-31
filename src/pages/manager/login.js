import { useAuth } from '@context/AuthContext';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '@styles/login.module.css';

// Firebase Firestore
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from 'src/services/firebaseConfig';

export default function ManagerLoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    // Validación previa para evitar campos vacíos
    if (!username.trim() || !password.trim()) {
      setError('Por favor completa todos los campos.');
      return;
    }

    try {
      // Consulta para encontrar un usuario con username, password y rol = "Gerente"
      const q = query(
        collection(db, 'users'),
        where('username', '==', username),
        where('password', '==', password),
        where('role', '==', 'Gerente')
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Usuario válido con rol de Gerente encontrado
        const userData = querySnapshot.docs[0].data();
        login(username, userData.role); // Guardamos la sesión
        router.push('/manager/projects'); // Redirigir a la página del gerente
      } else {
        setError('Credenciales incorrectas o no tienes rol de Gerente.');
      }
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      setError('Ocurrió un error al iniciar sesión.');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.loginTitle}>Inicio de Sesión (Gerente)</h2>
      <div className={styles.formContainer}>
        <form onSubmit={handleLogin}>
          <label htmlFor="username">Usuario</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ingresa tu usuario"
            className={styles.inputField}
          />

          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
            className={styles.inputField}
          />

          {error && <p className={styles.errorMessage}>{error}</p>}

          <button type="submit" className={styles.loginButton}>
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}