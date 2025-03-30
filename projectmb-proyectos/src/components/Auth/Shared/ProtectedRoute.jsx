import { useAuth } from '@context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ProtectedRoute({ children, requiredRole }) {
  const { user, loading } = useAuth(); // Asegúrate de que `useAuth` proporcione el estado `loading`
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!loading) {
      console.log('Usuario:', user);
      console.log('Rol requerido:', requiredRole);

      if (!user) {
        console.log('Redirigiendo al login...');
        router.push('/auth/login'); // Redirige al login si no está autenticado
      } else if (requiredRole && user.role !== requiredRole) {
        console.log('Redirigiendo a no autorizado...');
        router.push('/unauthorized'); // Redirige si no tiene el rol requerido
      } else {
        console.log('Usuario autorizado');
        setIsAuthorized(true); // Usuario autorizado
      }
    }
  }, [user, requiredRole, router, loading]);

  // Mientras se verifica la autenticación, muestra un estado de carga
  if (loading || !isAuthorized) {
    return <p>Cargando...</p>; // Puedes personalizar este mensaje o usar un spinner
  }

  return children;
}