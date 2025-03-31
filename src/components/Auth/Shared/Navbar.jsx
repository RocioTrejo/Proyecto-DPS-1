import Link from "next/link";
import { useContext } from "react";
import AuthContext from "@context/AuthContext";
import styles from '@styles/navbar.module.css';
//import { useAuth } from "@context/AuthContext";
import { useAuth } from "@context/AuthContext";
export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        <span className={styles.username}>
          {user ? `Bienvenido, ${user.username}` : 'No autenticado'}
        </span>
        {user && (
          <button onClick={logout} className={styles.logoutButton}>
            Cerrar sesión
          </button>
        )}
      </div>
    </nav>
  );
}