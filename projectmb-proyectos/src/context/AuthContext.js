import { createContext, useContext, useState } from 'react';
//import { ROLE_PERMISSIONS } from '@utils/roles';

import { ROLE_PERMISSIONS } from 'src/utils/roles'; // Usa alias si está configurado

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Usuario autenticado

  const login = (username, role) => {
    setUser({ username, role });
  };

  const logout = () => {
    setUser(null);
  };

  const hasPermission = (permission) => {
    if (!user) return false;
    return ROLE_PERMISSIONS[user.role]?.includes(permission);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);