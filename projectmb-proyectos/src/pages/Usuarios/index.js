import ProtectedRoute from '@components/Auth/Shared/ProtectedRoute';
import { ROLES } from 'src/utils/roles';

export default function UsuariosPage() {
  return (
    <ProtectedRoute requiredRole={ROLES.USER}>
      <div>
        <h1>Bienvenido a la página de Usuarios</h1>
      </div>
    </ProtectedRoute>
  );
}