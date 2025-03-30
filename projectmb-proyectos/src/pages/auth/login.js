import { useRouter } from 'next/router';
import styles from '@styles/login.module.css';

export default function LoginPage() {
  const router = useRouter();

  const handleAdminLoginRedirect = () => {
    router.push('/admin/login'); // Redirige a la página de inicio de sesión del administrador
  };

  const handleManagerLoginRedirect = () => {
    router.push('/manager/login'); // Redirige a la página de inicio de sesión del gerente
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.loginTitle}>Inicio de Sesión</h2>
      <div className={styles.formContainer}>
        <button onClick={handleAdminLoginRedirect} className={styles.loginButton}>
          Iniciar Sesión como Administrador
        </button>
        <button onClick={handleManagerLoginRedirect} className={styles.loginButton}>
          Iniciar Sesión como Gerente de Proyectos
        </button>
      </div>
    </div>
  );
}
