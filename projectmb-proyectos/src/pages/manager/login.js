import { useAuth } from '@context/AuthContext';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '@styles/login.module.css';

export default function ManagerLoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Validar credenciales
    if (username === 'Deysi' && password === 'manager2025') {
      login(username, 'Gerente'); // Inicia sesión como gerente
      router.push('/manager/projects'); // Redirige a la página de gestión de proyectos
    } else {
      setError('Credenciales incorrectas. Inténtalo de nuevo.');
    }
  };
  

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.loginTitle}>Inicio de Sesión</h2>
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