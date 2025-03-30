import { createContext, useContext, useState, useEffect } from 'react';
import { ROLE_PERMISSIONS } from 'src/utils/roles'; // Usa alias si está configurado

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Usuario autenticado
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    // Simula la carga inicial del usuario (puedes reemplazar esto con una API real)
    const fetchUser = async () => {
      try {
        // Simula una llamada a la API para obtener el usuario autenticado
        const storedUser = JSON.parse(localStorage.getItem('user')); // Ejemplo con localStorage
        if (storedUser) {
          setUser(storedUser);
        }
      } catch (error) {
        console.error('Error al cargar el usuario:', error);
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };

    fetchUser();
  }, []);

  const login = (username, role) => {
    if (!role || !ROLE_PERMISSIONS[role]) {
      console.error('Rol inválido o no definido:', role);
      return;
    }

    const newUser = { username, role };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser)); // Guarda el usuario en localStorage
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Elimina el usuario de localStorage
  };

  const hasPermission = (permission) => {
    if (!user) return false;
    return ROLE_PERMISSIONS[user.role]?.includes(permission);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);