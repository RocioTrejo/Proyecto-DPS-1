import { useRouter } from 'next/router';

export default function UnauthorizedPage() {
  const router = useRouter();

  const handleLogout = () => {
    // Puedes limpiar el almacenamiento local si es necesario:
    localStorage.removeItem('user');
    router.push('/auth/login');
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Acceso Denegado</h1>
      <p>No tienes permiso para acceder a esta página.</p>
      <button
        onClick={handleLogout}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '1rem',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Volver al Login
      </button>
    </div>
  );
}