// pages/index.js - Página principal de inicio de sesión

import { useRouter } from 'next/router';
import styles from '@styles/login.module.css';

export default function LoginPage() {
  const router = useRouter();

  // Redirecciones según el tipo de rol seleccionado
  const handleLoginRedirect = (path) => {
    router.push(path);
  };

  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.loginTitle}>Bienvenido al Sistema</h1>
      <p className={styles.loginSubtitle}>Selecciona tu tipo de acceso</p>

      <div className={styles.formContainer}>
        <button
          onClick={() => handleLoginRedirect('/admin/login')}
          className={styles.loginButton}
        >
          Administrador
        </button>

        <button
          onClick={() => handleLoginRedirect('/manager/login')}
          className={styles.loginButton}
        >
          Gerente de Proyectos
        </button>

        <button
          onClick={() => handleLoginRedirect('/Usuarios/login')}
          className={styles.loginButton}
        >
          Usuario
        </button>
      </div>
    </div>
  );
}