import { useAuth } from '@context/AuthContext';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '@styles/login.module.css';

export default function AdminLoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Validar credenciales
    if (username === 'Melissa' && password === 'admin2025') {
      login(username, 'Administrador'); // Inicia sesión como administrador
      router.push('/admin'); // Redirige al panel de administración
    } else {
      setError('Credenciales incorrectas. Inténtalo de nuevo.');
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