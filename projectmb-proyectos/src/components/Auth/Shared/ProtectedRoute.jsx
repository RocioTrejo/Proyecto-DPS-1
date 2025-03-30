import { useAuth } from '@context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function ProtectedRoute({ children, requiredRole }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/auth/login'); // Redirige al login si no está autenticado
    } else if (user.role !== requiredRole) {
      router.push('/unauthorized'); // Redirige si no tiene el rol requerido
    }
  }, [user, requiredRole, router]);

  // Mientras se realiza la redirección, no renderiza nada
  if (!user || user.role !== requiredRole) {
    return null;
  }

  return children;
}