import { useAuth } from '@context/AuthContext';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '@styles/login.module.css';

import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from 'src/services/firebaseConfig';

export default function UserLoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const q = query(
        collection(db, 'users'),
        where('username', '==', username),
        where('password', '==', password),
        where('role', '==', 'Usuario') // Filtra solo usuarios con tipo "Usuario"
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        login(username, userData.role);
        router.push('/Usuarios');
      } else {
        setError('Usuario o contraseña incorrectos, o tipo de usuario no permitido.');
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
