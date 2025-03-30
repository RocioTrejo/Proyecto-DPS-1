import { useRouter } from 'next/router';
import Navbar from '@components/Auth/Shared/Navbar';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="home-container">
      <Navbar />
      <div className="content">
        <h1 className="title">Bienvenido al Sistema de Gestión</h1>
        <p className="subtitle">Administra tus proyectos y usuarios de manera eficiente.</p>
        
        <div className="button-container">
          {/* Botón para Iniciar Sesión */}
          <Link href="/auth/login">
            <button className="login-button">Iniciar Sesión</button>
          </Link>

          {/* Botón para Registrarse */}
          <Link href="/auth/register">
            <button className="register-button">Registrarse</button>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .home-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background: linear-gradient(135deg, #0070f3, #28a745);
          color: white;
          font-family: Arial, sans-serif;
        }

        .content {
          text-align: center;
          padding: 20px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }

        .title {
          font-size: 2.5rem;
          margin-bottom: 10px;
        }

        .subtitle {
          font-size: 1.2rem;
          margin-bottom: 20px;
        }

        .button-container {
          display: flex;
          gap: 20px;
          justify-content: center;
        }

        .login-button, .register-button {
          padding: 15px 30px;
          font-size: 1rem;
          font-weight: bold;
          color: white;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .login-button {
          background: #0070f3;
        }

        .login-button:hover {
          background: #005bb5;
          transform: scale(1.05);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        }

        .register-button {
          background: #28a745;
        }

        .register-button:hover {
          background: #218838;
          transform: scale(1.05);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
}